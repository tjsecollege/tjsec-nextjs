"use client";

function docUrl(path) {
  return "/assets/images/Regulations-and-Curriculam/" + path.split("/").map(encodeURIComponent).join("/");
}

const UG_REGULATIONS_2026 = [
  { label: "B.E. / B.Tech. Regulations (2026)", href: docUrl("Regulation-2026/TJSEC 2026 UG REGULATIONS.pdf") },
];

const PG_REGULATIONS_2026 = [
  { label: "M.E. / MBA Regulations (2026)", href: docUrl("Regulation-2026/TJSEC 2026 PG REGULATIONS.pdf") },
];

const UG_CURRICULUM_2026 = [
  { label: "B.Tech. Artificial Intelligence and Data Science", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - UG - AI&DS.pdf") },
  { label: "B.E. CSE (Artificial Intelligence and Machine Learning)", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - UG - CSE (AIML).pdf") },
  { label: "B.E. Computer Science and Engineering", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - UG - CSE.pdf") },
  { label: "B.E. Electronics and Communication Engineering", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - UG - ECE.pdf") },
  { label: "B.E. Electrical and Electronics Engineering", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - UG - EEE.pdf") },
  { label: "B.Tech. Information Technology", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - UG - IT.pdf") },
  { label: "B.E. Mechanical Engineering", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - UG - MECH.pdf") },
];

const PG_CURRICULUM_2026 = [
  { label: "M.E. Computer Science and Engineering", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - PG - CSE.pdf") },
  { label: "M.E. VLSI Design", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - PG - VLSI DESIGN.pdf") },
  { label: "MBA", href: docUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - PG - MBA.pdf") },
];

const UG_REGULATIONS_2025 = [
  { label: "B.Tech. Artificial Intelligence and Data Science", href: docUrl("AIDS/Regulations/ACADEMIC REGULATIONS 2025-AIDS.pdf") },
  { label: "B.E. CSE (Artificial Intelligence and Machine Learning)", href: docUrl("AIML/Regulations/ACADEMIC REGULATIONS 2025-AIDS.pdf") },
  { label: "B.E. Computer Science and Engineering", href: docUrl("CSE/Regulations/ACADEMIC REGULATIONS 2025-AIDS.pdf") },
  { label: "B.E. Electronics and Communication Engineering", href: docUrl("ECE/Regulations/ACADEMIC REGULATIONS 2025-AIDS.pdf") },
  { label: "B.E. Electrical and Electronics Engineering", href: docUrl("EEE/Regulations/AU- REGULATIONS 2025.pdf") },
  { label: "B.Tech. Information Technology", href: docUrl("IT/Regulations/AU- REGULATIONS 2025.pdf") },
  { label: "B.E. Mechanical Engineering", href: docUrl("MECH/Regulations/AU- REGULATIONS 2025.pdf") },
];

const UG_REGULATIONS_2021 = [
  { label: "B.Tech. Artificial Intelligence and Data Science", href: docUrl("AIDS/Regulations/Undergraduate Programme - Academic Regulations 2021 -AIDS.pdf") },
  { label: "B.E. CSE (Artificial Intelligence and Machine Learning)", href: docUrl("AIML/Regulations/Undergraduate Programme - Academic Regulations 2021 -AIDS.pdf") },
  { label: "B.E. Computer Science and Engineering", href: docUrl("CSE/Regulations/Undergraduate Programme - Academic Regulations 2021 -AIDS.pdf") },
  { label: "B.E. Electronics and Communication Engineering", href: docUrl("ECE/Regulations/Undergraduate Programme - Academic Regulations 2021 -AIDS.pdf") },
  { label: "B.E. Electrical and Electronics Engineering", href: docUrl("EEE/Regulations/UG Regulation 2021.pdf") },
  { label: "B.Tech. Information Technology", href: docUrl("IT/Regulations/UG Regulation 2021.pdf") },
  { label: "B.E. Mechanical Engineering", href: docUrl("MECH/Regulations/UG Regulation 2021.pdf") },
];

const PG_REGULATIONS_2025 = [
  { label: "M.E. Regulations 2025 (Computer Science & Engineering / VLSI Design)", href: docUrl("PG Regulations 2025-CSE And VLSI-Regulations.pdf") },
  { label: "MBA Regulations", href: docUrl("MBA-Regulations.pdf") },
];

const UG_CURRICULUM_2025 = [
  { label: "B.Tech. Artificial Intelligence and Data Science", href: docUrl("AIDS/curriculam/B.Tech. AI and DS 2025.pdf") },
  { label: "B.E. CSE (Artificial Intelligence and Machine Learning)", href: docUrl("AIML/curriculam/B.E. CSE (AI & ML)-2025.pdf") },
  { label: "B.E. Computer Science and Engineering", href: docUrl("CSE/curriculam/BE CSE-2025.pdf") },
  { label: "B.E. Electronics and Communication Engineering", href: docUrl("ECE/curriculam/B.E ECE-2025.pdf") },
  { label: "B.E. Electrical and Electronics Engineering", href: docUrl("EEE/curriculam/AU B.E. EEE 2025.pdf") },
  { label: "B.Tech. Information Technology", href: docUrl("IT/curriculam/2025.pdf") },
  { label: "B.E. Mechanical Engineering", href: docUrl("MECH/curriculam/B.E. Mechanical Engineering-2025.pdf") },
];

const UG_CURRICULUM_2021 = [
  { label: "B.Tech. Artificial Intelligence and Data Science", href: docUrl("AIDS/curriculam/B.Tech.AIDS-2021.pdf") },
  { label: "B.E. CSE (Artificial Intelligence and Machine Learning)", href: docUrl("AIML/curriculam/B.E-AIML-2021.pdf") },
  { label: "B.E. Computer Science and Engineering", href: docUrl("CSE/curriculam/B.E.CSE-2021.pdf") },
  { label: "B.E. Electronics and Communication Engineering", href: docUrl("ECE/curriculam/B.E.ECE-2021.pdf") },
  { label: "B.E. Electrical and Electronics Engineering", href: docUrl("EEE/curriculam/B.E. EEE-2021.pdf") },
  { label: "B.Tech. Information Technology", href: docUrl("IT/curriculam/B.Tech.IT-2021.pdf") },
  { label: "B.E. Mechanical Engineering", href: docUrl("MECH/curriculam/B.E. Mech-2021.pdf") },
];

const PG_CURRICULUM_2025 = [
  { label: "M.E. Computer Science and Engineering", href: docUrl("PG-CSE-Curriculam.pdf") },
  { label: "M.E. VLSI Design", href: docUrl("PG-VLSI&DESIGN-Curriculam.pdf") },
  { label: "MBA", href: docUrl("M.B.A-Curriculam.pdf") },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

function LinkList({ items }) {
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

export default function RegulationsAndCurriculum() {
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
          <span>Regulations and Curriculum</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Regulations
          </h2>

          <p className="tjs-dept-group-label">UG Regulations 2026</p>
          <LinkList items={UG_REGULATIONS_2026} />

          <p className="tjs-dept-group-label">UG Regulations 2025</p>
          <LinkList items={UG_REGULATIONS_2025} />

          <p className="tjs-dept-group-label">UG Regulations 2021</p>
          <LinkList items={UG_REGULATIONS_2021} />

          <p className="tjs-dept-group-label">PG Regulations 2026</p>
          <LinkList items={PG_REGULATIONS_2026} />

          <p className="tjs-dept-group-label">PG Regulations 2025</p>
          <LinkList items={PG_REGULATIONS_2025} />
        </section>

        <section className="tjs-dept-section tjs-dept-section-alt">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Curriculum &amp; Syllabi
          </h2>

          <p className="tjs-dept-group-label">Undergraduate &ndash; 2026 Curriculum &amp; Syllabi</p>
          <LinkList items={UG_CURRICULUM_2026} />

          <p className="tjs-dept-group-label">Undergraduate &ndash; 2025 Curriculum &amp; Syllabi</p>
          <LinkList items={UG_CURRICULUM_2025} />

          <p className="tjs-dept-group-label">Undergraduate &ndash; 2021 Curriculum &amp; Syllabi</p>
          <LinkList items={UG_CURRICULUM_2021} />

          <p className="tjs-dept-group-label">Postgraduate &ndash; 2026 Curriculum &amp; Syllabi</p>
          <LinkList items={PG_CURRICULUM_2026} />

          <p className="tjs-dept-group-label">Postgraduate &ndash; 2025 Curriculum &amp; Syllabi</p>
          <LinkList items={PG_CURRICULUM_2025} />
        </section>
      </div>
    </>
  );
}
