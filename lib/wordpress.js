const WP_API_BASE = "https://tjsec.vsjsoftware.com/wp-json/wp/v2";

const JSON_FIELDS = [
  "about_paragraphs",
  "mission_points",
  "hod_message",
  "hod_signature",
  "faculty",
  "non_teaching_staff",
  "programmes",
  "regulations_ug",
  "regulations_pg",
  "syllabus_ug",
  "syllabus_pg",
  "trainings",
  "internships",
  "facilities_labs",
  "facilities_centres",
];

function parseJsonField(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// Fetches a "department" post from the WordPress REST API by slug and
// flattens its custom fields into a plain object for the page to render.
export async function getDepartment(slug) {
  let res;
  try {
    res = await fetch(
      `${WP_API_BASE}/departments?slug=${encodeURIComponent(slug)}&_embed`,
      { next: { revalidate: 3600 } }
    );
  } catch {
    // Network failure (e.g. the WP host is unreachable or times out during
    // a build) — fall back to the "content pending" state instead of
    // crashing the whole build/page.
    return null;
  }

  if (!res.ok) return null;

  const [post] = await res.json();
  if (!post) return null;

  const meta = post.meta || {};
  const data = { title: post.title?.rendered || "" };

  for (const [key, value] of Object.entries(meta)) {
    data[key] = JSON_FIELDS.includes(key) ? parseJsonField(value, []) : value;
  }

  data.heroImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return data;
}
