"use client";

import { useState } from "react";

function auImg(n) {
  return "/assets/images/Anna_University_Faculty_Images/image_" + n + ".jpeg";
}

const FACULTY = [
  { name: "Dr. Anitha S", designation: "Assistant Professor", auFin: "2644741981", aicteId: "1-9595851843", photo: auImg(39) },
  { name: "Dr. Senthilkumar R", designation: "Associate Professor", auFin: "2676821982", aicteId: "1-1504585787", photo: auImg(38) },
];

const CATEGORIES = [
  { id: "objectives", label: "Objectives" },
  { id: "faculty", label: "Faculty Profile" },
  { id: "staff", label: "Non-Teaching Staff" },
  { id: "scholars", label: "Gallery" },
];

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
                </div>
              )}

              {activeCat === "staff" && (
                <div className="tjs-committee-body">
                  <h4>Non-Teaching Staff</h4>
                  <p className="tjs-dept-pending">Content coming soon.</p>
                </div>
              )}

              {activeCat === "scholars" && (
                <div className="tjs-committee-body">
                  <h4>Gallery</h4>
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
