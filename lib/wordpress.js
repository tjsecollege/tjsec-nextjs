const WP_API_URL = process.env.WP_API_URL || "https://admin.tjsec.ac.in/wp-json";

// Seconds before a department page is rebuilt with fresh WordPress content.
const DEPARTMENT_REVALIDATE = 300;

const NAMED_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

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

// Fetches the IQAC → NAAC page content ({ page_title, sections }). Throws when
// WordPress is unreachable, like getDepartment.
export async function getNaac() {
  const res = await fetch(`${WP_API_URL}/tjs/v1/naac`, {
    next: { revalidate: DEPARTMENT_REVALIDATE, tags: ["naac"] },
  });
  if (!res.ok) {
    throw new Error(`WordPress returned ${res.status} for the NAAC page`);
  }
  const data = clean(await res.json());
  return { page_title: data.page_title || "", sections: data.sections || [] };
}

// Fetches a "department" post by slug (e.g. "eee"). Returns null when no such
// department exists. Throws when WordPress is unreachable, so a background
// revalidation keeps serving the last good page instead of an empty one.
export async function getDepartment(slug) {
  const url =
    `${WP_API_URL}/wp/v2/departments?slug=${encodeURIComponent(slug)}` +
    "&acf_format=standard&_fields=id,slug,title,modified,acf";
  const res = await fetch(url, {
    next: { revalidate: DEPARTMENT_REVALIDATE, tags: [`department:${slug}`] },
  });
  if (!res.ok) {
    throw new Error(`WordPress returned ${res.status} for department "${slug}"`);
  }

  const [post] = await res.json();
  if (!post) return null;

  return {
    ...clean(post.acf || {}),
    slug: post.slug,
    title: decodeEntities(post.title?.rendered || ""),
    modified: post.modified,
  };
}
