"use client";

import { useState } from "react";

function auImg(n) {
  return "/assets/images/Anna_University_Faculty_Images/image_" + n + ".jpeg";
}

const FACULTY = [
  { name: "Dr. Venkata Mohan Reddy P", designation: "Associate Professor", auFin: "2791141977", aicteId: "1-461088893", photo: auImg(84) },
  { name: "Mr. Vidhurankumar M", designation: "Assistant Professor", auFin: "2611691984", aicteId: "1-2190877895", photo: auImg(77) },
  { name: "Dr. Satheesh S", designation: "Associate Professor", auFin: "2687391983", aicteId: "1-2918935994", photo: auImg(65) },
  { name: "Dr. Vijayaragavan M", designation: "Associate Professor", auFin: "2682771985", aicteId: "1-43385499800", photo: auImg(64) },
  { name: "Dr. Ramesh B", designation: "Assistant Professor", auFin: "2650431978", aicteId: "1-467902397", photo: auImg(18) },
];

const CATEGORIES = [
  { id: "objectives", label: "Objectives" },
  { id: "faculty", label: "Faculty Profile" },
  { id: "staff", label: "Non-Teaching Staff" },
  { id: "scholars", label: "Gallery" },
];

export default function MathsDepartment() {
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
          <span>Department of Maths</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Department of Mathematics
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
                  <h4>Department of Mathematics</h4>
                  <p>
                    The Department of Mathematics at T.J.S. Engineering College provides the mathematical
                    infrastructure required for engineering analysis, computational thinking, modelling, and
                    technological innovation. The department focuses on transforming mathematical concepts into
                    tools for interpreting engineering systems and solving quantitative problems. Areas including
                    differential and integral calculus, linear algebra, differential equations, probability,
                    statistics, numerical techniques, and mathematical modelling are approached from an
                    engineering perspective.
                  </p>
                  <p>
                    Particular emphasis is given to analytical formulation, computational approximation, data
                    interpretation, optimization, and the mathematical representation of real-world systems. By
                    developing quantitative reasoning and algorithmic thinking, the department enables students to
                    construct mathematical models, evaluate engineering parameters, and arrive at technically
                    sound solutions. The department thereby serves as a foundation for advanced engineering
                    studies, computational applications, research, and emerging technology domains.
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
