"use client";

import { useState } from "react";

function auImg(n) {
  return "/assets/images/Anna_University_Faculty_Images/image_" + n + ".jpeg";
}

const FACULTY = [
  { name: "Mrs. Usha P", designation: "Assistant Professor", auFin: "2632591985", aicteId: "1-2190925585", photo: auImg(79) },
  { name: "Mrs. Priya D", designation: "Assistant Professor", auFin: "2675571976", aicteId: "1-451574778", photo: auImg(78) },
  { name: "Dr. Charitha L", designation: "Professor", auFin: "2615021978", aicteId: "1-451574771", photo: auImg(11) },
];

const CATEGORIES = [
  { id: "objectives", label: "Objectives" },
  { id: "faculty", label: "Faculty Profile" },
  { id: "staff", label: "Non-Teaching Staff" },
  { id: "scholars", label: "Gallery" },
];

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
