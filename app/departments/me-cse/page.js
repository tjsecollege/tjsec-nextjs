import DeptMegaNav from "../DeptMegaNav";
import PeopleCarousel from "../PeopleCarousel";
import MouTabsViewer from "../MouTabsViewer";
import YearGroupedVisits from "../YearGroupedVisits";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

function regDocUrl(file) {
  return "/assets/images/Regulations-and-Curriculam/" + file.split("/").map(encodeURIComponent).join("/");
}

const TOPPERS = [];

const FACULTY = [
  { name: "Dr. Venkatraman K", degree: "Ph.D.", designation: "Associate Professor", auFin: "2659751988", aicteId: "1-43852645305", photo: null },
  { name: "Dr. Srigowthem S", degree: "Ph.D.", designation: "Associate Professor", auFin: "2692331990", aicteId: "1-3739343136", photo: null },
  { name: "Ramya M", degree: "M.E.", designation: "Assistant Professor", auFin: "2691911988", aicteId: "1-45828286472", photo: null },
  { name: "Varshini J", degree: "M.E.", designation: "Assistant Professor", auFin: "2675871999", aicteId: "1-44715186804", photo: null },
];

const NON_TEACHING = [];
const PEOS = [];
const POS = [];
const PSOS = [];

const BOS_DOCS = [
  { label: "M.E. CSE 2026 Curriculum & Regulations (PG)", href: regDocUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - PG - CSE.pdf") },
  { label: "M.E. CSE 2025 Curriculum (PG)", href: regDocUrl("PG-CSE-Curriculam.pdf") },
  { label: "M.E. CSE 2025 Regulations (PG)", href: regDocUrl("PG Regulations 2025-CSE And VLSI-Regulations.pdf") },
];

const BOS_MEMBERS = [];
const NEWSLETTERS = [];
const MOU_DOCS = [];
const CONSULTANCY = [];
const STUDENT_PROJECTS = [];
const LABS = [];
const INDUSTRIAL_VISITS = [];
const ALUMNI_INTERACTIONS = [];

const MENU = [
  {
    label: "About",
    children: [
      { href: "#about", label: "About us" },
      { href: "#vision-mission", label: "Vision and Mission" },
      { href: "#hod", label: "HOD's Desk" },
      { href: "#magazine", label: "Magazine" },
    ],
  },
  {
    label: "People",
    children: [
      { href: "#faculty", label: "Faculty" },
      { href: "#staff", label: "Non-Teaching" },
    ],
  },
  {
    label: "Academics",
    children: [
      { href: "#programmes", label: "Programme Offered" },
      { href: "#bos", label: "BOS" },
      { href: "#curriculum", label: "Curriculum & Syllabi" },
    ],
  },
  {
    label: "Industry Interface",
    children: [
      { href: "#mou", label: "MOU's" },
      { href: "#consultancy", label: "Area of Consultancy" },
      { href: "#industry-visits", label: "Industry Visits" },
      { href: "#internships", label: "Internship" },
    ],
  },
  {
    label: "Research",
    children: [
      { href: "#publication", label: "Publication" },
      { href: "#patent", label: "Patent" },
      { href: "#books-chapters", label: "Books & Chapters" },
    ],
  },
  {
    label: "Facilities",
    children: [{ href: "#facilities", label: "Department Laboratories" }],
  },
  {
    label: "Events",
    children: [
      { href: "#conferences", label: "Conference" },
      { href: "#fdp-workshop", label: "Guest Lecturer, FDP & Workshop" },
      { href: "#value-added-course", label: "Value Added Course" },
      { href: "#symposium", label: "Symposium" },
      { href: "#seminars", label: "Seminars & Activities" },
    ],
  },
  {
    label: "Placements",
    children: [
      { href: "#recruiters", label: "Major Recruiters" },
      { href: "#placed-students", label: "Placed Students" },
    ],
  },
  {
    label: "Achievements",
    children: [
      { href: "#faculty-achievements", label: "Faculty Achievements" },
      { href: "#students-achievements", label: "Students Achievements" },
      { href: "#co-curricular", label: "Co-Curricular" },
      { href: "#extra-curricular", label: "Extra-Curricular" },
    ],
  },
  {
    label: "Others",
    children: [
      { href: "#gallery", label: "Gallery" },
      { href: "#alumni", label: "Alumni Interactions" },
      { href: "#distinguished-alumni", label: "Distinguished Alumni" },
      { href: "#entrepreneurship", label: "Entrepreneurship" },
    ],
  },
];

function LinkList({ items }) {
  if (!items.length) return <p className="tjs-dept-pending">Content coming soon.</p>;
  return (
    <div className="tjs-dept-link-list">
      {items.map((item) => (
        <a href={item.href} target="_blank" rel="noopener" key={item.label}>
          <span>{item.label}</span>
          <span className="tjs-dept-link-arrow">
            <ArrowIcon />
          </span>
        </a>
      ))}
    </div>
  );
}

export default function MECSEDepartment() {
  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">Department</span>
          <h1>M.E. Computer Science and Engineering</h1>
          <p>
            The M.E. Computer Science and Engineering programme builds advanced expertise in algorithms, systems,
            and emerging computing technologies, preparing graduates for research and specialised industry roles.
          </p>
        </div>
        <div className="tjs-dept-hero-image">
          <img src="/assets/images/campus/computer-lab-01.jpg" alt="M.E. Computer Science and Engineering at T.J.S Engineering College" />
        </div>
      </section>

      <div className="tjs-dept-page">
        <DeptMegaNav categories={MENU} />

        {TOPPERS.length > 0 && (
          <div className="tjs-dept-toppers-top">
            <h3>Academic Toppers</h3>
            <PeopleCarousel items={TOPPERS} />
          </div>
        )}

        <section id="about" className="tjs-dept-section">
          <h2>About us</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision and Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p className="tjs-dept-pending">Content coming soon.</p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <p className="tjs-dept-pending">Content coming soon.</p>
            </div>
          </div>
        </section>

        <section id="hod" className="tjs-dept-section">
          <h2>HOD&apos;s Desk</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="magazine" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Magazine</h2>
          <LinkList items={NEWSLETTERS} />
        </section>

        <section id="faculty" className="tjs-dept-section">
          <h2>Faculty</h2>
          {FACULTY.length > 0 ? (
            <div className="tjs-dept-people-grid-full">
              {FACULTY.map((f) => (
                <div className="tjs-dept-people-card" key={f.name}>
                  <div className="tjs-dept-people-photo">
                    {f.photo ? <img src={f.photo} alt={f.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{f.name}</h4>
                  <p className="tjs-dept-people-role">{f.designation}</p>
                  <p className="tjs-dept-people-spec">
                    AICTE ID: {f.aicteId || "—"}
                    <br />
                    AU-FIN: {f.auFin || "—"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="staff" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Non-Teaching</h2>
          {NON_TEACHING.length > 0 ? (
            <div className="tjs-dept-people-grid">
              {NON_TEACHING.map((s) => (
                <div className="tjs-dept-people-card" key={s.name}>
                  <div className="tjs-dept-people-photo">
                    {s.photo ? <img src={s.photo} alt={s.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{s.name}</h4>
                  <p className="tjs-dept-people-role">{s.designation}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="programmes" className="tjs-dept-section">
          <h2>Programme Offered</h2>
          <div className="tjs-dept-tabs">
            <button type="button" className="tjs-dept-tab active">M.E &ndash; Computer Science and Engineering</button>
          </div>

          <h3>Program Educational Objectives (PEOs)</h3>
          {PEOS.length > 0 ? (
            <div className="tjs-dept-peo-list">
              {PEOS.map((peo, i) => (
                <div className="tjs-dept-peo" key={i}><p>{i + 1}. {peo}</p></div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}

          <h3>Program Outcomes (POs)</h3>
          {POS.length > 0 ? (
            <div className="tjs-dept-peo-list">
              {POS.map((po, i) => (
                <div className="tjs-dept-peo" key={i}><p>{i + 1}. {po}</p></div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}

          <h3>Program Specific Outcomes (PSOs)</h3>
          {PSOS.length > 0 ? (
            <div className="tjs-dept-peo-list">
              {PSOS.map((pso, i) => (
                <div className="tjs-dept-peo" key={i}><p>{i + 1}. {pso}</p></div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="bos" className="tjs-dept-section tjs-dept-section-alt">
          <h2>BOS</h2>
          <h3>Board of Studies Composition</h3>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="curriculum" className="tjs-dept-section">
          <h2>Curriculum &amp; Syllabi</h2>
          <LinkList items={BOS_DOCS} />
        </section>

        <section id="mou" className="tjs-dept-section tjs-dept-section-alt">
          <h2>MOU&apos;s</h2>
          {MOU_DOCS.length > 0 ? <MouTabsViewer items={MOU_DOCS} /> : <p className="tjs-dept-pending">Content coming soon.</p>}
        </section>

        <section id="consultancy" className="tjs-dept-section">
          <h2>Area of Consultancy</h2>
          <LinkList items={CONSULTANCY} />
        </section>

        <section id="industry-visits" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Industry Visits</h2>
          {INDUSTRIAL_VISITS.length > 0 ? (
            <YearGroupedVisits items={INDUSTRIAL_VISITS} title="Industry Visits" />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="internships" className="tjs-dept-section">
          <h2>Internship</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="publication" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Publication</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="patent" className="tjs-dept-section">
          <h2>Patent</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="books-chapters" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Books &amp; Chapters</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="facilities" className="tjs-dept-section">
          <h2>Department Laboratories</h2>
          {LABS.length > 0 ? <p>{LABS.length} laboratories.</p> : <p className="tjs-dept-pending">Content coming soon.</p>}
        </section>

        <section id="conferences" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Conference</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="fdp-workshop" className="tjs-dept-section">
          <h2>Guest Lecturer, FDP &amp; Workshop</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="value-added-course" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Value Added Course</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="symposium" className="tjs-dept-section">
          <h2>Symposium</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="seminars" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Seminars &amp; Activities</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="recruiters" className="tjs-dept-section">
          <h2>Major Recruiters</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="placed-students" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Placed Students</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="faculty-achievements" className="tjs-dept-section">
          <h2>Faculty Achievements</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="students-achievements" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Students Achievements</h2>
          <LinkList items={STUDENT_PROJECTS} />
        </section>

        <section id="co-curricular" className="tjs-dept-section">
          <h2>Co-Curricular</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="extra-curricular" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Extra-Curricular</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="gallery" className="tjs-dept-section">
          <h2>Gallery</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="alumni" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Alumni Interactions</h2>
          {ALUMNI_INTERACTIONS.length > 0 ? (
            <YearGroupedVisits items={ALUMNI_INTERACTIONS} title="Alumni Interactions" />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="distinguished-alumni" className="tjs-dept-section">
          <h2>Distinguished Alumni</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="entrepreneurship" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Entrepreneurship</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>
      </div>
    </>
  );
}
