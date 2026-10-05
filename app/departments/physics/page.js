"use client";

import { useState } from "react";

const FACULTY = [
  {
    name: "Dr. S. Anitha",
    designation: "Assistant Professor",
    qualification: "M.Sc., M.Phil., B.Ed., Ph.D.,",
    experience: "20.6 Years",
    email: "anitha@tjsec.in",
    orcid: "https://orcid.org/0009-0003-7518-8079",
    photo: "/assets/images/Department_of_Physics/image_2.png",
    publications: [
      {
        text: "Priya R, Anitha S, Latha Mageshwari PS & Ragu R 2020, ‘Exploration on transport process of optically active third-order nonlinear disodium succinate hexahydrate (β phase) single crystals encompassing Self-focusing nature’, Journal of Material Science: Materials in Electronics, vol. 31, issue 23, pp. 21288-21302 (Impact Factor: 2.8).",
      },
      {
        text: "Anitha S, Latha Mageshwari PS, Priya R, Ragu, R & Jerome Das, S 2022, ‘Prospective theoretical investigations of optical, dielectric, mechanical and third-order NLO property in potassium tri-hydrogen di-succinate single crystal’, Chinese Journal of Physics, vol. 76, pp. 145-171 (Impact Factor: 4.6).",
      },
      {
        text: "Anitha S, Priya R, Latha Mageshwari PS, Jerome Das S, 2021, ‘Dielectric relaxation and optical properties in ferroelectric bis (methylammonium) tetrachloro zincate single crystal’, Ferroelectrics, vol. 585, issue 1, pp. 211-229 (Impact Factor: 0.695).",
      },
      {
        text: "Anitha S, Priya R, Latha Mageshwari PS & Jerome Das S 2022, ‘Growth, optical, dielectric and mechanical studies in ferroelectric bis(methyl ammonium) tetrachlorocadmate single crystal’, Ferroelectrics, vol. 600, issue 1, pp. 212-234 (Impact Factor: 0.695).",
      },
      {
        text: "Anitha S, Priya R, Latha Mageshwari PS 2024, ‘Optical, Mechanical and Dielectric Behavior of Urea and Thiourea Doped Lithium Sulphate Monohydrate Single Crystals’, International Conference on Integration of Emerging Technologies for the Digital World.",
      },
    ],
  },
  {
    name: "Dr. R. Senthilkumar",
    designation: null,
    qualification: "B.Sc., M.Sc., Ph.D.,",
    experience: "20 Years",
    email: null,
    orcid: null,
    photo: "/assets/images/Department_of_Physics/image_3.jpeg",
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
        <img
          src={f.photo}
          alt={f.name}
          style={{ width: 110, height: 130, objectFit: "cover", borderRadius: 8, flex: "0 0 auto" }}
        />
        <div style={{ flex: "1 1 240px" }}>
          <h3 style={{ marginTop: 0, marginBottom: 6 }}>{f.name}</h3>
          {f.designation && (
            <p style={{ margin: "0 0 4px" }}>
              <strong>{f.designation}</strong>
            </p>
          )}
          <p style={{ margin: "0 0 4px" }}>{f.qualification}</p>
          <p style={{ margin: "0 0 4px" }}>Experience: {f.experience}</p>
          {f.email && (
            <p style={{ margin: "0 0 4px" }}>
              Email: <a href={`mailto:${f.email}`}>{f.email}</a>
            </p>
          )}
          {f.orcid && (
            <p style={{ margin: 0 }}>
              ORCID:{" "}
              <a href={f.orcid} target="_blank" rel="noopener">
                {f.orcid}
              </a>
            </p>
          )}
        </div>
      </div>

      {f.publications && (
        <>
          <h4 style={{ marginTop: 20 }}>Publications</h4>
          <ol className="tjs-dept-bullets">
            {f.publications.map((p, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                {p.text}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default function PhysicsDepartment() {
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
          <span>Department of Physics</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Department of Physics
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
                  <h4>Department of Physics</h4>
                  <p>
                    The Department of Physics at T.J.S. Engineering College is committed to establishing a
                    strong scientific framework that enables engineering students to understand, model, and
                    apply the physical principles governing technological systems. The department integrates
                    foundational physics with engineering-oriented applications in areas such as mechanics,
                    optics, electromagnetism, semiconductor physics, materials science, and modern physics.
                  </p>
                  <p>
                    The Physics Laboratory serves as an experiential learning environment where students
                    translate theoretical principles into measurable physical phenomena through
                    instrumentation, experimentation, data acquisition, uncertainty analysis, and interpretation
                    of results. Emphasis is placed on developing experimental competence, scientific reasoning,
                    quantitative analysis, and familiarity with laboratory instrumentation.
                  </p>
                  <p>
                    Through this approach, the department nurtures an investigative mindset and prepares
                    students to connect fundamental physical sciences with emerging engineering technologies
                    and interdisciplinary applications.
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
