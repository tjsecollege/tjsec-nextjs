import { getDepartment, getShDepartment } from "@/lib/wordpress";
import FacultyTabs from "./FacultyTabs";

// Order mirrors the Departments menu: UG, Science & Humanities, PG.
const FULL_DEPARTMENTS = ["cse", "aiml", "ece", "eee", "mech", "it", "aids", "me-cse", "me-vlsi", "mba"];
const SH_DEPARTMENTS = ["chemistry", "english", "maths", "physics", "tamil"];

function mapFaculty(faculty) {
  return (Array.isArray(faculty) ? faculty : []).map((f) => ({
    name: f.name,
    photo: f.photo?.url,
    role: [f.designation, f.qualification].filter(Boolean).join(", "),
    spec: [f.aicte_id && `AICTE ID: ${f.aicte_id}`, f.au_fin && `AU-FIN: ${f.au_fin}`].filter(Boolean).join("\n"),
  }));
}

// Same contract as every department page: getDepartment/getShDepartment throw
// when WordPress is unreachable, so a transient outage fails this render and
// Next keeps serving the last good cached page instead of one missing
// departments. Only a resolved `null` (department not found) is skipped.
async function loadDepartments() {
  const jobs = [
    ...FULL_DEPARTMENTS.map((slug) => getDepartment(slug)),
    ...SH_DEPARTMENTS.map((slug) => getShDepartment(slug)),
  ];
  const results = await Promise.all(jobs);

  return results
    .filter(Boolean)
    .map((dept) => ({ slug: dept.slug, title: dept.title, faculty: mapFaculty(dept.faculty) }))
    .filter((dept) => dept.faculty.length > 0);
}

export default async function FacultyPage() {
  const departments = await loadDepartments();

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Academics</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Faculty</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Faculty
          </h2>
          {departments.length ? (
            <FacultyTabs departments={departments} />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
