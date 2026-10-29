const WP_API_URL = process.env.WP_API_URL || "https://admin.tjsec.ac.in/wp-json";

// Seconds before a department page is rebuilt with fresh WordPress content.
const DEPARTMENT_REVALIDATE = 300;

// The WordPress host occasionally answers a burst of requests (e.g. during
// `next build`) with a one-off 5xx, or stalls without answering; a short
// retry gets a normal response. Each attempt is abandoned after
// REQUEST_TIMEOUT_MS so a stalled connection can't blow Next's 60s
// per-page build limit.
const RETRY_DELAYS_MS = [500, 1500];
const REQUEST_TIMEOUT_MS = 15000;

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
// responses, network errors and timeouts a couple of times, then throws — so a
// background revalidation keeps serving the last good page instead of an
// empty one.
async function wpFetch(path, tag, what) {
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await fetch(`${WP_API_URL}${path}`, {
        next: { revalidate: DEPARTMENT_REVALIDATE, tags: [tag] },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
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

// Fetches the WordPress-managed parts of the Placements page:
// { placedStudents: [{ tab, url }], recruiterGroups: [{ tab, logos: [{ url, name }] }] }.
export async function getPlacements() {
  const data = clean(await wpFetch("/tjs/v1/placements", "placements", "the Placements page"));
  const placedStudents = (data.placed_students || [])
    .filter((d) => d.document?.url)
    .map((d) => ({ tab: d.tab, url: d.document.url }));
  const recruiterGroups = (data.recruiter_groups || []).map((g) => ({
    tab: g.tab,
    logos: (g.logos || []).map((l) => ({ url: l.url, name: l.title || l.alt })),
  }));
  return { placedStudents, recruiterGroups };
}

// Fetches the Campus Life → Students Club page:
// { page_title, clubs: [{ name, title, description, documents: [{ title, url, year }] }] }.
export async function getStudentsClub() {
  const data = clean(await wpFetch("/tjs/v1/students-club", "students-club", "the Students Club page"));
  const clubs = (data.clubs || []).map((c) => ({
    name: c.name,
    title: c.title || "",
    description: c.description || "",
    documents: (c.documents || [])
      .filter((d) => d.file?.url)
      .map((d) => ({ title: d.title, url: d.file.url, year: d.year || "" })),
  }));
  return { page_title: data.page_title || "", clubs };
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
