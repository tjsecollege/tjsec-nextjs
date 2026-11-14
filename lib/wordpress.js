import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const WP_API_URL = process.env.WP_API_URL || "https://admin.tjsec.ac.in/wp-json";

// Seconds before a department page is rebuilt with fresh WordPress content.
const DEPARTMENT_REVALIDATE = 300;

// The WordPress host (Hostinger) caps how many PHP requests it serves at
// once and answers the overflow with a 5xx — which `next build` triggers by
// fetching many pages in parallel (several worker processes, each with its
// own limit below). So each process keeps at most MAX_CONCURRENT requests in
// flight, and a 5xx / network error / timeout is retried with growing,
// jittered delays. The worst case (every attempt timing out) fits in the
// per-page build limit set in next.config.mjs (staticPageGenerationTimeout).
const MAX_CONCURRENT = 2;
const RETRY_DELAYS_MS = [2000, 5000, 10000];
const REQUEST_TIMEOUT_MS = 15000;

// The last successful response of every request is kept on disk. If WordPress
// still fails after the retries (or is down altogether), that copy is used
// instead, so a build or page refresh never fails because of the backend.
// Best effort: where the disk is read-only nothing is saved and a failure
// throws as before (Next then keeps serving the last good page).
const SNAPSHOT_DIR = path.join(process.cwd(), ".next", "cache", "wp-snapshots");

function snapshotFile(apiPath) {
  return path.join(SNAPSHOT_DIR, createHash("sha1").update(apiPath).digest("hex") + ".json");
}

async function saveSnapshot(apiPath, text) {
  try {
    await mkdir(SNAPSHOT_DIR, { recursive: true });
    await writeFile(snapshotFile(apiPath), text);
  } catch {
    // read-only file system: no snapshot
  }
}

async function readSnapshot(apiPath) {
  try {
    return JSON.parse(await readFile(snapshotFile(apiPath), "utf8"));
  } catch {
    return null;
  }
}

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
// responses, network errors and timeouts a few times; if it still fails, falls
// back to the last good copy of the same request (see SNAPSHOT_DIR), and only
// throws when there is none — so a background revalidation keeps serving the
// last good page instead of an empty one.
async function wpFetch(apiPath, tag, what) {
  let reason = "";
  for (let attempt = 0; ; attempt++) {
    let retryable = true;
    try {
      const res = await withSlot(() =>
        fetch(`${WP_API_URL}${apiPath}`, {
          next: { revalidate: DEPARTMENT_REVALIDATE, tags: [tag] },
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        })
      );
      if (res.ok) {
        const text = await res.text();
        const data = JSON.parse(text);
        await saveSnapshot(apiPath, text);
        return data;
      }
      // Keep what the server said, to explain the failure in the log.
      const body = (await res.text().catch(() => "")).replace(/\s+/g, " ").slice(0, 160);
      reason = `returned ${res.status}${body ? ` (${body})` : ""}`;
      retryable = res.status >= 500;
    } catch (err) {
      reason = `failed: ${err.name === "TimeoutError" ? `no answer in ${REQUEST_TIMEOUT_MS / 1000}s` : err.message}`;
    }
    if (retryable && attempt < RETRY_DELAYS_MS.length) {
      await backoff(attempt);
      continue;
    }
    break;
  }
  const snapshot = await readSnapshot(apiPath);
  if (snapshot) {
    console.warn(`[wordpress] ${what}: WordPress ${reason} — using the last good copy.`);
    return snapshot;
  }
  throw new Error(`WordPress ${reason} for ${what}`);
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

// Fetches the IQAC → About IQAC page: { pageTitle, sections } where each section
// has { layout, menuLabel, title } plus its layout's fields (see tjs-iqac-pages.php).
export async function getAboutIqac() {
  const d = clean(await wpFetch("/tjs/v1/iqac/about", "iqac:about", "the About IQAC page"));
  const sections = (d.sections || []).map((s) => {
    const base = { layout: s.acf_fc_layout, menuLabel: s.menu_label, title: s.title || "" };
    switch (s.acf_fc_layout) {
      case "text":
        return { ...base, content: s.content || "" };
      case "documents":
        return {
          ...base,
          intro: s.intro || "",
          items: (s.items || [])
            .map((i) => ({ label: i.label, url: i.document?.url || i.link || "", isFile: Boolean(i.document?.url) }))
            .filter((i) => i.url),
        };
      case "composition":
        return {
          ...base,
          groups: (s.groups || []).map((g) => ({
            criteria: g.criteria,
            members: (g.members || []).map((m) => ({ name: m.name, designation: m.designation || "" })),
          })),
        };
      case "contact":
        return {
          ...base,
          photo: s.photo?.url ? { src: s.photo.url, alt: s.photo.alt || s.name } : null,
          name: s.name || "",
          role: s.role || "",
          phone: s.phone || "",
          email: s.email || "",
        };
      default:
        return base;
    }
  });
  return { pageTitle: d.page_title || "", sections };
}

// Fetches the IQAC → Innovation Cell or NIRF page ("innovation-cell" / "nirf"):
// { pageTitle, intro, docs: [{ tab, url }] }.
export async function getIqacDocuments(slug) {
  const d = clean(await wpFetch(`/tjs/v1/iqac/${slug}`, `iqac:${slug}`, `the IQAC ${slug} page`));
  return {
    pageTitle: d.page_title || "",
    intro: d.intro || "",
    docs: (d.documents || [])
      .filter((doc) => doc.file?.url)
      .map((doc, i) => ({ tab: doc.tab || `Document ${i + 1}`, url: doc.file.url })),
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

// Fetches the Campus Life → Library page (field names as in tjs-campus-life.php).
export async function getLibrary() {
  const d = clean(await wpFetch("/tjs/v1/library", "library", "the Library page"));
  const rows = (v) => (Array.isArray(v) ? v : []);
  const texts = (v) => rows(v).map((r) => r.text).filter(Boolean);
  const photos = (v) => rows(v).map((p) => ({ src: p.url, alt: p.alt || "T.J.S Engineering College Library" }));
  const stats = (v) => rows(v).map((s) => ({ icon: s.icon || "ri-book-2-line", value: s.value, label: s.label || "" }));
  const links = (v) => rows(v).map((l) => ({ label: l.label, link: l.link || "" }));
  return {
    about: d.about || "",
    memberships: links(d.memberships),
    aboutStats: stats(d.about_stats),
    softwareNote: d.software_note || "",
    aboutPhotos: photos(d.about_photos),
    facilities: texts(d.facilities),
    collectionsTitle: d.collections_title || "",
    collectionStats: stats(d.collection_stats),
    collectionLinks: links(d.collection_links),
    deptwisePhotos: photos(d.deptwise_photos),
    deptwise: rows(d.deptwise).map((r) => ({
      department: r.department,
      titles: r.titles ?? "",
      volumes: r.volumes ?? "",
      nationalJournals: r.national_journals ?? "",
      internationalJournals: r.international_journals ?? "",
      cds: r.cds ?? "",
    })),
    eresources: rows(d.eresources).map((r) => ({ source: r.source, link: r.link || "", category: r.category || "", count: r.count || "" })),
    otherCollections: rows(d.other_collections).map((r) => ({ category: r.category, count: r.count || "" })),
    journals: rows(d.journals).map((j) => ({
      department: j.department,
      national: rows(j.national).map((x) => ({ name: x.name, publisher: x.publisher || "" })),
      international: rows(j.international).map((x) => ({ name: x.name, publisher: x.publisher || "" })),
    })),
    generalRules: texts(d.general_rules),
    digitalRules: texts(d.digital_rules),
    committee: rows(d.committee).map((m) => ({ name: m.name, designation: m.designation || "", position: m.position || "" })),
    contact: d.contact || "",
  };
}

// Fetches the Campus Life → Transport page.
export async function getTransport() {
  const d = clean(await wpFetch("/tjs/v1/transport", "transport", "the Transport page"));
  return {
    pageTitle: d.page_title || "",
    intro: d.intro || "",
    routes: (d.routes || []).map((r) => ({
      routeNo: r.route_no,
      vehicleNo: r.vehicle_no || "",
      routeName: r.route_name || "",
      driver: r.driver || "",
      phone: r.phone || "",
    })),
    coordinatorsTitle: d.coordinators_title || "",
    coordinators: (d.coordinators || []).map((c) => ({ name: c.name, phone: c.phone || "" })),
  };
}

// Fetches a simple info page (intro, photos, highlight cards, more text) —
// the layout shared by the Campus Life facility pages and Industry Interface → About.
async function getInfoPage(path, tag, what) {
  const d = clean(await wpFetch(path, tag, what));
  return {
    pageTitle: d.page_title || "",
    intro: d.intro || "",
    photos: (d.photos || []).map((p) => ({ src: p.url, alt: p.alt || d.page_title || "" })),
    highlightsHeading: d.highlights_heading || "",
    highlights: (d.highlights || []).map((h) => ({ icon: h.icon || "ri-star-line", title: h.title, description: h.description || "" })),
    moreHeading: d.more_heading || "",
    more: d.more || "",
  };
}

// Fetches one of the simple Campus Life facility pages (convention-centre,
// software-development-cell, canteen, student-hostel).
export async function getFacility(slug) {
  return getInfoPage(`/tjs/v1/facility/${slug}`, `facility:${slug}`, `the ${slug} page`);
}

// Fetches the Industry Interface → About page.
export async function getIndustryAbout() {
  return getInfoPage("/tjs/v1/industry/about", "industry:about", "the Industry Interface About page");
}

// Fetches the Industry Interface → Professor of Practice page.
export async function getProfessorsOfPractice() {
  const d = clean(await wpFetch("/tjs/v1/industry/professor-of-practice", "industry:professor-of-practice", "the Professor of Practice page"));
  return {
    pageTitle: d.page_title || "",
    intro: d.intro || "",
    professors: (d.professors || []).map((p) => ({
      name: p.name,
      designation: p.designation || "",
      department: p.department || "",
      period: p.period || "",
      expertise: p.expertise || "",
      photo: p.photo?.url ? { src: p.photo.url, alt: p.photo.alt || p.name } : null,
    })),
  };
}

// Fetches the Industry Interface → Industry Academy Conclave page; conclaves
// as raw rows ({ title, start_date, end_date, description, coordinators, photos }).
export async function getIndustryConclave() {
  const d = clean(await wpFetch("/tjs/v1/industry/conclave", "industry:conclave", "the Industry Academy Conclave page"));
  return { pageTitle: d.page_title || "", intro: d.intro || "", conclaves: d.conclaves || [] };
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

// Fetches the Academics → Programmes Offered page:
// { pageTitle, intro, categories: [{ label, programmes: [{ name, duration, intake, href }] }] }.
export async function getProgrammes() {
  const d = clean(await wpFetch("/tjs/v1/programmes", "programmes", "the Programmes Offered page"));
  return {
    pageTitle: d.page_title || "",
    intro: d.intro || "",
    categories: (d.categories || [])
      .map((c) => ({
        label: c.label,
        programmes: (c.programmes || []).map((p) => ({
          name: p.name,
          duration: p.duration || "",
          intake: p.intake || "",
          href: p.department?.post_name ? `/departments/${p.department.post_name}` : "",
        })),
      }))
      .filter((c) => c.label && c.programmes.length),
  };
}

// Fetches the Academics → Academic Calendar page: { pageTitle, intro, docs: [{ tab, url }] }.
export async function getAcademicCalendar() {
  const d = clean(await wpFetch("/tjs/v1/academic-calendar", "academic-calendar", "the Academic Calendar page"));
  return { pageTitle: d.page_title || "", intro: d.intro || "", docs: yearDocs(d.calendars) };
}

// Fetches the Academics → Controller of Examinations page.
export async function getCoe() {
  const d = clean(await wpFetch("/tjs/v1/coe", "coe", "the Controller of Examinations page"));
  return {
    resultsLink: d.results_link || "",
    timetableLink: d.timetable_file?.url || d.timetable_link || "",
    about: d.about || "",
    rulesHeading: d.rules_heading || "",
    rules: (d.rules || []).map((r) => r.text).filter(Boolean),
    people: (d.people || []).map((p) => ({
      name: p.name,
      designation: p.designation || "",
      contact: p.contact || "",
      photo: p.photo?.url || "",
    })),
    circulars: (d.circulars || [])
      .filter((c) => c.file?.url)
      .map((c) => ({ title: c.title, date: c.date || "", url: c.file.url })),
    contact: {
      address: d.contact_address || "",
      email: d.contact_email || "",
      phone: d.contact_phone || "",
      hours: d.contact_hours || "",
    },
  };
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
    reportsIntro: d.reports_intro || "",
    reports: yearDocs(d.reports),
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
