const WP_API_URL = process.env.WP_API_URL || "https://admin.tjsec.ac.in/wp-json";

// Seconds before a department page is rebuilt with fresh WordPress content.
const DEPARTMENT_REVALIDATE = 300;

// The WordPress host occasionally answers a burst of requests (e.g. during
// `next build`) with a one-off 5xx; a short retry gets a normal response.
const RETRY_DELAYS_MS = [500, 1500];

const NAMED_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return String.fromCodePoint(n);
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

// Secure Custom Fields returns `false` for empty images/repeaters, CRLF line
// endings from textareas, full attachment records for every image/file, and
// a "<field>_source" debug twin for each field. Reduce all of that to plain
// values the page can render directly.
function clean(value) {
  if (value === false || value === null || value === undefined) return null;
  if (typeof value === "string") return value.replace(/\r\n?/g, "\n");
  if (Array.isArray(value)) return value.map(clean);
  if (typeof value === "object") {
    if ("mime_type" in value && "url" in value) {
      return { url: value.url, alt: value.alt || "", title: value.title || "" };
    }
    const out = {};
    for (const [key, v] of Object.entries(value)) {
      if (!key.endsWith("_source")) out[key] = clean(v);
    }
    return out;
  }
  return value;
}

// GETs a WordPress REST path and returns the parsed JSON. Retries 5xx
// responses and network errors a couple of times, then throws — so a
// background revalidation keeps serving the last good page instead of an
// empty one.
async function wpFetch(path, tag, what) {
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await fetch(`${WP_API_URL}${path}`, {
        next: { revalidate: DEPARTMENT_REVALIDATE, tags: [tag] },
      });
    } catch (err) {
      if (attempt < RETRY_DELAYS_MS.length) {
        await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
        continue;
      }
      throw err;
    }
    if (res.ok) return res.json();
    if (res.status >= 500 && attempt < RETRY_DELAYS_MS.length) {
      await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
      continue;
    }
    throw new Error(`WordPress returned ${res.status} for ${what}`);
  }
}

// Fetches the IQAC → NAAC page content ({ page_title, sections }).
export async function getNaac() {
  const data = clean(await wpFetch("/tjs/v1/naac", "naac", "the NAAC page"));
  return { page_title: data.page_title || "", sections: data.sections || [] };
}

// Fetches the About → Approval & Affiliations page ({ page_title, categories }).
export async function getApprovals() {
  const data = clean(await wpFetch("/tjs/v1/approvals", "approvals", "the Approval & Affiliations page"));
  return { page_title: data.page_title || "", categories: data.categories || [] };
}

// Fetches the Alumni page content.
export async function getAlumni() {
  return clean(await wpFetch("/tjs/v1/alumni", "alumni", "the Alumni page"));
}

// Fetches a Science & Humanities page (Chemistry, English, Maths, Physics,
// Tamil) by slug. Returns null when it doesn't exist.
export async function getShDepartment(slug) {
  const [post] = await wpFetch(
    `/wp/v2/sh-departments?slug=${encodeURIComponent(slug)}&acf_format=standard&_fields=id,slug,title,acf`,
    `sh-department:${slug}`,
    `S&H department "${slug}"`
  );
  if (!post) return null;
  return { ...clean(post.acf || {}), slug: post.slug, title: decodeEntities(post.title?.rendered || "") };
}

// Fetches a "department" post by slug (e.g. "eee"). Returns null when no such
// department exists.
export async function getDepartment(slug) {
  const [post] = await wpFetch(
    `/wp/v2/departments?slug=${encodeURIComponent(slug)}&acf_format=standard&_fields=id,slug,title,modified,acf`,
    `department:${slug}`,
    `department "${slug}"`
  );
  if (!post) return null;

  return {
    ...clean(post.acf || {}),
    slug: post.slug,
    title: decodeEntities(post.title?.rendered || ""),
    modified: post.modified,
  };
}
