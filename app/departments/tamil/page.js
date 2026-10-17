"use client";

import { useState } from "react";

function auImg(n) {
  return "/assets/images/Anna_University_Faculty_Images/image_" + n + ".jpeg";
}

const FACULTY = [
  { name: "Mr. Priyanbabu B", designation: "Assistant Professor", auFin: "2676321999", aicteId: "1-44717873235", photo: auImg(34) },
  { name: "Mrs. Grace Mary A", designation: "Assistant Professor", auFin: "2667911994", aicteId: "1-47363395749", photo: auImg(35) },
];

const CATEGORIES = [
  { id: "objectives", label: "Objectives" },
  { id: "faculty", label: "Faculty Profile" },
  { id: "staff", label: "Non-Teaching Staff" },
  { id: "scholars", label: "Gallery" },
];

export default function TamilDepartment() {
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
          <span>Department of Tamil</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Department of Tamil
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
                  <h4>Department of Tamil</h4>
                  <p className="tjs-dept-pending">Content coming soon.</p>
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
