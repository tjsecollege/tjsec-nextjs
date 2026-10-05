"use client";

import { useState } from "react";

const FACULTY = [
  {
    name: "Ms. P. Usha",
    designation: "Assistant Professor",
    qualification: "M.Sc., M.Phil., (Ph.D).,",
    experience: "18 Years",
    email: "usha@tjsec.in",
    orcid: "https://orcid.org/0009-0001-2989-869X",
    scholar: null,
    photo: "/assets/images/Department_of_Chemistry/image_1.png",
    publications: [
      {
        title: "Corrosion behaviour of aluminium in the presence of an aqueous extract of Hibiscus Rosa-sinensis",
        authors: "S Rajendran, J Jeyasundari, P Usha, JA Selvi, B Narayanasamy, et al.",
        journal: "Portugaliae Electrochimica Acta 27 (2), 153-164",
        year: "2009",
      },
      {
        title: "Dual-route synthesis for cerium oxide nanoparticles for rechargeable supercapacitor applications",
        authors: "U Palanichamy, SS Gunasekaran, P Devarajan, R Jaganathan, S Michael, et al.",
        journal: "Ionics 32 (7), 7189-7207",
        year: "2026",
      },
      {
        title: "Phytogenic Generation of TiO2 Nanoparticles as Green-Electrode Material for High-Performance Supercapacitor Applications",
        authors: "D Priya, G Nithya, SS Gunasekaran, P Usha, E Selvarajan, J Ramkumar, et al.",
        journal: "Energy Technology 13 (11), 2500200",
        year: "2025",
      },
      {
        title: "Nano-Architectonics of Porous α-Fe2O3 for High-Performance Asymmetric Supercapacitor Applications",
        authors: "P Devarajan, SS Gunasekaran, U Palanichamy, R Jaganathan, S Michael, et al.",
        journal: "Energy Storage 8 (5), e70458",
        year: "2026",
      },
      {
        title: "Exploring experimental and theoretical insights on green synthesized TiO2 nanoparticles using Cissus quadrangularis Extract",
        authors: "P Usha, J Ramkumar, D Priya, C Rajeevgandhi, N Hajarabeevi",
        journal: "Journal of the Indian Chemical Society, 102464",
        year: "2026",
      },
      {
        title: "A physical and chemical study of ground water and Heavy metal analysis of estuarine area in Chennai",
        authors: "J Ramkumar, P Usha, D Priya, MS Deenadayalan",
        journal: "",
        year: "",
      },
    ],
  },
  {
    name: "Ms. D. Priya",
    designation: null,
    qualification: "M.Sc., M.Phil., B.Ed., Ph.D. (Pursuing)",
    experience: "21.3 Years",
    email: "priya@tjsec.in",
    orcid: "https://orcid.org/0009-0008-0811-4578",
    scholar: "https://scholar.google.com/citations?user=dvdRiXwAAAAJ&hl=en",
    photo: "/assets/images/Department_of_Chemistry/image_2.png",
    publications: [
      {
        title: "Dual-route synthesis for cerium oxide nanoparticles for rechargeable supercapacitor applications",
        authors: "U Palanichamy, SS Gunasekaran, P Devarajan, R Jaganathan, S Michael, et al.",
        journal: "Ionics 32 (7), 7189-7207",
        year: "2026",
      },
      {
        title: "Phytogenic Generation of TiO2 Nanoparticles as Green-Electrode Material for High-Performance Supercapacitor Applications",
        authors: "D Priya, G Nithya, SS Gunasekaran, P Usha, E Selvarajan, J Ramkumar, et al.",
        journal: "Energy Technology 13 (11), 2500200",
        year: "2025",
      },
      {
        title: "Nano-Architectonics of Porous α-Fe2O3 for High-Performance Asymmetric Supercapacitor Applications",
        authors: "P Devarajan, SS Gunasekaran, U Palanichamy, R Jaganathan, S Michael, et al.",
        journal: "Energy Storage 8 (5), e70458",
        year: "2026",
      },
      {
        title: "Exploring experimental and theoretical insights on green synthesized TiO2 nanoparticles using Cissus quadrangularis Extract",
        authors: "P Usha, J Ramkumar, D Priya, C Rajeevgandhi, N Hajarabeevi",
        journal: "Journal of the Indian Chemical Society, 102464",
        year: "2026",
      },
      {
        title: "A physical and chemical study of ground water and Heavy metal analysis of estuarine area in Chennai",
        authors: "J Ramkumar, P Usha, D Priya, MS Deenadayalan",
        journal: "",
        year: "",
      },
    ],
  },
  {
    name: "Dr. L. Charitha",
    designation: "Professor",
    qualification: "M.Sc., Ph.D. (Chemistry)",
    experience: null,
    email: "charitha1978@gmail.com",
    orcid: "https://orcid.org/0009-0006-0684-0985",
    scholar: "https://scholar.google.com/citations?user=jSnMAjYAAAAJ&hl=en",
    photo: null,
    publications: [
      {
        title: "Kinetics and mechanism of protection of uracil from sulphate radical anion by caffeic acid under anoxic conditions",
        authors: "M Sudha Swaraga, L. Charitha & M Adinarayana",
        journal: "Research Journal of Chemistry and Environment, 6(4), 29-32",
        year: "2002",
      },
      {
        title: "Photooxidation of substituted pyrimidines in presence of peroxydisulphate in aqueous solution",
        authors: "M Sudha Swaraga, L. Charitha & M Adinarayana",
        journal: "Journal of Indian Chemical Society, 81, 579",
        year: "2004",
      },
      {
        title: "Mechanism of protection of adenosine from sulphate radical anion and repair of adenosine radicals by caffeic acid in aqueous solution",
        authors: "M Sudha Swaraga, L. Charitha & M Adinarayana",
        journal: "Journal of Chemical Sciences, 117, 1",
        year: "2005",
      },
      {
        title: "Kinetics of oxidation of adenosine by t-butoxyl radical – protection and repair by caffeic acid",
        authors: "L. Charitha & M Adinarayana",
        journal: "International Journal of Chemical Kinetics, 37, 1",
        year: "2005",
      },
      {
        title: "Reaction of substituted pyrimidines with photochemically generated t-BuO radicals",
        authors: "L. Charitha & M Adinarayana",
        journal: "Indian Journal of Biochemistry and Biophysics, 42, 38",
        year: "2005",
      },
      {
        title: "Kinetics of oxidation of thymine by t-butoxyl radical – protection and repair by caffeic acid",
        authors: "L. Charitha & M Adinarayana",
        journal: "Indian Journal of Chemistry, 45A, 2435",
        year: "2006",
      },
      {
        title:
          "New Ruthenium (II) polypyridyl complexes bearing 2-(4-methyl thio) phenyl-1H-imidazo[4,5-F][1,10]phenanthroline ligand: Synthesis, characterization, biophysical study and biological activity",
        authors: "Navaneetha Nambigari, Markandeya Namani and Charitha Lingareddy",
        journal: "International Journal of Creative Research Thoughts, vol.12, issue 10, 207-226",
        year: "2024",
      },
    ],
  },
];

const CATEGORIES = [
  { id: "objectives", label: "Objectives" },
  { id: "faculty", label: "Faculty Profile" },
  { id: "staff", label: "Staff Profile" },
  { id: "scholars", label: "Research Scholars" },
];

function FacultyProfile({ f }) {
  return (
    <div className="tjs-dept-card" style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        {f.photo ? (
          <img
            src={f.photo}
            alt={f.name}
            style={{ width: 110, height: 130, objectFit: "cover", borderRadius: 8, flex: "0 0 auto" }}
          />
        ) : (
          <div className="tjs-dept-hod-photo" aria-hidden="true">
            Photo
          </div>
        )}
        <div style={{ flex: "1 1 240px" }}>
          <h3 style={{ marginTop: 0, marginBottom: 6 }}>{f.name}</h3>
          {f.designation && (
            <p style={{ margin: "0 0 4px" }}>
              <strong>{f.designation}</strong>
            </p>
          )}
          <p style={{ margin: "0 0 4px" }}>{f.qualification}</p>
          {f.experience && <p style={{ margin: "0 0 4px" }}>Experience: {f.experience}</p>}
          <p style={{ margin: "0 0 4px" }}>
            Email: <a href={`mailto:${f.email}`}>{f.email}</a>
          </p>
          {f.orcid && (
            <p style={{ margin: "0 0 4px" }}>
              ORCID:{" "}
              <a href={f.orcid} target="_blank" rel="noopener">
                {f.orcid}
              </a>
            </p>
          )}
          {f.scholar && (
            <p style={{ margin: 0 }}>
              Google Scholar:{" "}
              <a href={f.scholar} target="_blank" rel="noopener">
                Profile
              </a>
            </p>
          )}
        </div>
      </div>

      <h4 style={{ marginTop: 20 }}>Publications</h4>
      <ol className="tjs-dept-bullets">
        {f.publications.map((p, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <strong>{p.title}</strong>
            <br />
            {p.authors}
            {p.journal && (
              <>
                {" "}
                — {p.journal}
                {p.year && `, ${p.year}`}
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ChemistryDepartment() {
  const [activeCat, setActiveCat] = useState("objectives");

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Departments</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Department of Chemistry</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Department of Chemistry
          </h2>

          <div className="tjs-approvals-layout">
            <aside className="tjs-approvals-sidebar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={"tjs-approvals-cat" + (activeCat === cat.id ? " active" : "")}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </aside>

            <div className="tjs-approvals-panel">
              {activeCat === "objectives" && (
                <div className="tjs-committee-body">
                  <h4>Department of Chemistry</h4>
                  <p>
                    The Department of Chemistry at T.J.S. Engineering College aims to equip engineering
                    students with the chemical knowledge and laboratory competencies required to understand
                    materials, processes, and environmental systems encountered in engineering practice. The
                    curriculum connects fundamental chemistry with application-oriented domains such as
                    electrochemistry, corrosion science, water chemistry, energy resources, nanomaterials, and
                    sustainable chemical processes. The Chemistry Laboratory provides an applied learning
                    platform for volumetric analysis, water quality assessment, and corrosion studies. Students
                    are trained in quantitative chemical analysis, instrumental awareness, safe laboratory
                    practices, experimental documentation, and scientific interpretation. The department
                    promotes the principles of green chemistry, resource efficiency, environmental stewardship,
                    and sustainable engineering, enabling students to recognize and address chemical aspects of
                    contemporary technological challenges.
                  </p>
                </div>
              )}

              {activeCat === "faculty" && (
                <div className="tjs-committee-body">
                  <h4>Faculty Profile</h4>
                  {FACULTY.map((f) => (
                    <FacultyProfile f={f} key={f.name} />
                  ))}
                </div>
              )}

              {activeCat === "staff" && (
                <div className="tjs-committee-body">
                  <h4>Staff Profile</h4>
                  <p className="tjs-dept-pending">Content coming soon.</p>
                </div>
              )}

              {activeCat === "scholars" && (
                <div className="tjs-committee-body">
                  <h4>Research Scholars</h4>
                  <p className="tjs-dept-pending">Content coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
