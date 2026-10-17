"use client";

import { useState } from "react";

function auImg(n) {
  return "/assets/images/Anna_University_Faculty_Images/image_" + n + ".jpeg";
}

const FACULTY = [
  { name: "Mrs. Padmini R", designation: "Assistant Professor in English", auFin: "2658331978", aicteId: "1-757179377", photo: auImg(63) },
  { name: "Dr. Poornima J P", designation: "Assistant Professor", auFin: "2668991984", aicteId: "1-4241612896", photo: auImg(16) },
  { name: "Dr. Vivek K R", designation: "Assistant Professor", auFin: "2697131993", aicteId: "1-43710194416", photo: auImg(17) },
];

const CATEGORIES = [
  { id: "objectives", label: "Objectives" },
  { id: "faculty", label: "Faculty Profile" },
  { id: "staff", label: "Non-Teaching Staff" },
  { id: "scholars", label: "Gallery" },
];

export default function EnglishDepartment() {
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
          <span>Department of English</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Department of English
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
                  <h4>Department of English</h4>
                  <p>
                    The Department of English at T.J.S. Engineering College focuses on developing the
                    linguistic, communicative, and professional competencies required for engineers to operate
                    effectively in academic, industrial, and global environments. The department adopts a
                    technology-integrated approach to language development, with emphasis on technical
                    communication, professional discourse, academic writing, presentation skills, workplace
                    interaction, and employability-oriented communication.
                  </p>
                  <p>
                    The Language Laboratory provides a structured digital environment for developing listening
                    comprehension, speech production, pronunciation, phonological awareness, vocabulary
                    acquisition, fluency, and interactive communication. Students engage in activities such as
                    simulated interviews, group discussions, technical presentations, role plays, professional
                    conversations, and structured speaking exercises. The department also develops competencies
                    in technical documentation, report preparation, business correspondence, resume
                    development, and academic communication.
                  </p>
                  <p>
                    Through this integrated approach, T.J.S. Engineering College seeks to produce technically
                    proficient graduates who can articulate ideas with clarity, collaborate effectively, and
                    communicate confidently across professional and multidisciplinary settings.
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
