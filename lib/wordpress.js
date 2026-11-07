const WP_API_URL = process.env.WP_API_URL || "https://admin.tjsec.ac.in/wp-json";

// Seconds before a department page is rebuilt with fresh WordPress content.
const DEPARTMENT_REVALIDATE = 300;

// The WordPress host (Hostinger) caps how many PHP requests it serves at
// once and answers the overflow with a 5xx — which `next build` triggers by
// fetching many pages in parallel. So each process keeps at most
// MAX_CONCURRENT requests in flight, and a 5xx / network error / timeout is
// retried with growing, jittered delays. Worst case (every attempt timing
// out) stays under Next's 60s per-page build limit.
const MAX_CONCURRENT = 4;
const RETRY_DELAYS_MS = [1000, 3000, 6000];
const REQUEST_TIMEOUT_MS = 12000;

let inFlight = 0;
const waiting = [];

async function withSlot(task) {
  if (inFlight >= MAX_CONCURRENT) await new Promise((resolve) => waiting.push(resolve));
  inFlight++;
  try {
    return await task();
  } finally {
    inFlight--;
    waiting.shift()?.();
  }
}

function backoff(attempt) {
  const base = RETRY_DELAYS_MS[attempt];
  return new Promise((r) => setTimeout(r, base + Math.random() * base * 0.5));
}

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
      res = await withSlot(() =>
        fetch(`${WP_API_URL}${path}`, {
          next: { revalidate: DEPARTMENT_REVALIDATE, tags: [tag] },
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        })
      );
    } catch (err) {
      if (attempt < RETRY_DELAYS_MS.length) {
        await backoff(attempt);
        continue;
      }
      throw err;
    }
    if (res.ok) return res.json();
    if (res.status >= 500 && attempt < RETRY_DELAYS_MS.length) {
      await backoff(attempt);
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

// Fetches the IQAC → Capacity Building and Skill Enhancement page:
// { pageTitle, intro, groups: [{ heading, description, programs: [{ title, person, date, photo }] }] }.
export async function getCapacityBuilding() {
  const d = clean(await wpFetch("/tjs/v1/capacity-building", "capacity-building", "the Capacity Building page"));
  return {
    pageTitle: d.page_title || "",
    intro: d.intro || "",
    groups: (d.groups || []).map((g) => ({
      heading: g.heading,
      description: g.description || "",
      programs: (g.items || []).map((p) => ({
        title: p.title || "",
        person: p.resource_person || "",
        date: p.date || "",
        photo: p.photo?.url ? { url: p.photo.url, alt: p.photo.alt || p.title || "" } : null,
      })),
    })),
  };
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

// Fetches the Industry Interface → Industry Visit (IV) Forms page.
export async function getIvForms() {
  const d = clean(await wpFetch("/tjs/v1/iv-forms", "iv-forms", "the IV Forms page"));
  return {
    pageTitle: d.page_title || "",
    steps: (d.steps || []).map((s) => ({ icon: s.icon || "ri-download-2-line", title: s.title, description: s.description || "" })),
    forms: (d.forms || [])
      .filter((f) => f.file?.url)
      .map((f) => ({ title: f.title, description: f.description || "", url: f.file.url })),
    instructionsTitle: d.instructions_title || "",
    instructions: (d.instructions || []).map((i) => i.text).filter(Boolean),
  };
}

// { page_title, categories: [{ label, title, documents: [{ tab, file }] }] } →
// { pageTitle, categories: [{ label, title, docs: [{ tab, url }] }] } for CategoryDocsView.
function categoryDocs(d) {
  return {
    pageTitle: d.page_title || "",
    categories: (d.categories || []).map((c) => ({
      label: c.label,
      title: c.title || "",
      docs: (c.documents || [])
        .filter((doc) => doc.file?.url)
        .map((doc, i) => ({ tab: doc.tab || `Document ${i + 1}`, url: doc.file.url })),
    })),
  };
}

// Fetches the Industry Interface → List of MoUs page.
export async function getMous() {
  return categoryDocs(clean(await wpFetch("/tjs/v1/mous", "mous", "the List of MoUs page")));
}

// Fetches the Mandatory Disclosure page.
export async function getMandatoryDisclosure() {
  return categoryDocs(
    clean(await wpFetch("/tjs/v1/mandatory-disclosure", "mandatory-disclosure", "the Mandatory Disclosure page"))
  );
}

// Fetches the Academics → Regulations and Curriculum page:
// { sections: [{ title, groups: [{ heading, documents: [{ label, url }] }] }] }.
export async function getRegulations() {
  const d = clean(await wpFetch("/tjs/v1/regulations", "regulations", "the Regulations and Curriculum page"));
  const groups = (list) =>
    (list || [])
      .map((g) => ({
        heading: g.heading,
        documents: (g.documents || []).filter((doc) => doc.file?.url).map((doc) => ({ label: doc.label, url: doc.file.url })),
      }))
      .filter((g) => g.documents.length);
  return {
    sections: [
      { title: d.regulations_title || "Regulations", groups: groups(d.regulations) },
      { title: d.curriculum_title || "Curriculum & Syllabi", groups: groups(d.curriculum) },
    ],
  };
}

// Fetches the Campus Life → Wellness Centre page.
export async function getWellnessCentre() {
  const d = clean(await wpFetch("/tjs/v1/wellness-centre", "wellness-centre", "the Wellness Centre page"));
  return {
    pageTitle: d.page_title || "",
    heroEyebrow: d.hero_eyebrow || "",
    heroTitle: d.hero_title || "",
    heroText: d.hero_text || "",
    bookLink: d.book_link || "",
    thoughtsLink: d.thoughts_link || "",
    heroPhoto: d.hero_photo?.url ? { src: d.hero_photo.url, alt: d.hero_photo.alt || "Wellness Centre" } : null,
    heroNote: d.hero_note || "",
    objectiveTitle: d.objective_title || "",
    objectiveText: d.objective_text || "",
    pillars: (d.pillars || []).map((p) => ({ icon: p.icon || "ri-heart-pulse-line", title: p.title, text: p.text || "" })),
    faqTitle: d.faq_title || "",
    faqIntro: d.faq_intro || "",
    faqs: (d.faqs || []).filter((f) => f.question).map((f) => ({ question: f.question, answer: f.answer || "" })),
    challengesTitle: d.challenges_title || "",
    challenges: (d.challenges || []).map((c) => c.text).filter(Boolean),
    privacyTitle: d.privacy_title || "",
    privacyText: d.privacy_text || "",
    contactTitle: d.contact_title || "",
    contactText: d.contact_text || "",
    location: d.location || "",
    email: d.email || "",
    phone: d.phone || "",
    instagram: d.instagram || "",
  };
}

// Fetches the Campus Life → Other Facilities → Medical Centre page.
export async function getMedicalCentre() {
  const d = clean(await wpFetch("/tjs/v1/medical-centre", "medical-centre", "the Medical Centre page"));
  return {
    pageTitle: d.page_title || "",
    subtitle: d.subtitle || "",
    intro: d.intro || "",
    photos: (d.photos || []).map((p) => ({ src: p.url, alt: p.alt || "Medical Centre" })),
    facilitiesHeading: d.facilities_heading || "",
    facilitiesIntro: d.facilities_intro || "",
    facilities: (d.facilities || []).map((f) => ({
      icon: f.icon || "ri-first-aid-kit-line",
      title: f.title,
      description: f.description || "",
    })),
    commitmentHeading: d.commitment_heading || "",
    commitment: d.commitment || "",
    objectivesHeading: d.objectives_heading || "",
    objectives: (d.objectives || []).map((o) => o.text).filter(Boolean),
  };
}

// Year-wise file rows ({ year, file }) → YearPdfTabs docs, newest year first.
function yearDocs(rows) {
  return (rows || [])
    .filter((d) => d.file?.url)
    .map((d) => ({ tab: d.year || "Other", url: d.file.url }))
    .sort((a, b) => (a.tab === "Other" ? 1 : b.tab === "Other" ? -1 : b.tab.localeCompare(a.tab)));
}

// Fetches the Research menu pages: { publications, patents, grants }, each
// { title, intro, docs: [{ tab, url }] } with the newest year first.
export async function getResearch() {
  const d = clean(await wpFetch("/tjs/v1/research", "research", "the Research pages"));
  const section = (key) => ({ title: d[`${key}_title`] || "", intro: d[`${key}_intro`] || "", docs: yearDocs(d[key]) });
  return { publications: section("publications"), patents: section("patents"), grants: section("grants") };
}

// Fetches the Campus Life → Sports and Fitness page.
export async function getSports() {
  const d = clean(await wpFetch("/tjs/v1/sports", "sports", "the Sports and Fitness page"));
  const photos = (list) => (list || []).map((p) => ({ url: p.url, alt: p.alt }));
  return {
    topPhotos: photos(d.top_photos),
    overview: d.overview || "",
    outdoor: { html: d.outdoor || "", photos: photos(d.outdoor_photos) },
    indoor: { html: d.indoor || "", photos: photos(d.indoor_photos) },
    fitness: { html: d.fitness || "", photos: photos(d.fitness_photos) },
    eventCategories: (d.event_categories || []).map((c) => ({ name: c.name, description: c.description || "", docs: yearDocs(c.documents) })),
    achievementsIntro: d.achievements_intro || "",
    achievements: yearDocs(d.achievements),
    albums: (d.gallery_albums || [])
      .map((a) => ({ title: a.title, photos: photos(a.photos) }))
      .filter((a) => a.photos.length),
    videos: (d.videos || [])
      .map((v) => ({ title: v.title, youtube: v.youtube || "", file: v.file?.url || "" }))
      .filter((v) => v.youtube || v.file),
    committeeIntro: d.committee_intro || "",
    committeeGroups: (d.committee_groups || [])
      .map((g) => ({ heading: g.heading, members: (g.members || []).map((m) => ({ name: m.name, branch: m.branch || "" })) }))
      .filter((g) => g.members.length),
    committee: (d.committee || []).map((m) => ({
      name: m.name,
      role: m.role || "",
      designation: m.designation || "",
      photo: m.photo?.url || "",
    })),
  };
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

// Fetches an About page's content by slug: about-tjs, chairman, secretary,
// the-director, principal, directors, governing-council, committees or
// organogram. Shape depends on the slug — see wordpress/mu-plugins/tjs-about.php.
export async function getAboutPage(slug) {
  return clean(await wpFetch(`/tjs/v1/about/${encodeURIComponent(slug)}`, `about:${slug}`, `the About → ${slug} page`));
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
