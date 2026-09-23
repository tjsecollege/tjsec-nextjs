"use client";

import { useState } from "react";

const QUICK_LINKS = [
  { id: "results", label: "Results", icon: "ri-file-list-3-line", tab: null },
  { id: "timetable", label: "Exam Timetable", icon: "ri-calendar-2-line", tab: null },
  { id: "circulars", label: "Circulars", icon: "ri-megaphone-line", tab: "circulars" },
  { id: "guidelines", label: "Guidelines", icon: "ri-information-line", tab: "about" },
];

const CATEGORIES = [
  { id: "about", label: "About" },
  { id: "people", label: "People" },
  { id: "circulars", label: "Circulars" },
  { id: "contact", label: "Contact" },
];

const CIRCULARS = [
  { label: "Malpractice Instructions", href: "/assets/pdf/" + encodeURIComponent("Malpractice Instructions.pdf") },
  { label: "AU Malpractice Guidelines", href: "/assets/pdf/" + encodeURIComponent("Malpractice_Annauniversity.pdf") },
];

const RULES = [
  "Students must be present in the examination hall at least 15 minutes before the scheduled start time. Latecomers will not be allowed to enter the exam hall after the exam has started.",
  "Students must occupy the seats assigned to them. Any changes in seating arrangements must be approved by the CoE.",
  "Students are required to carry their student ID card and admit card to the examination hall. These will be checked by the invigilators before entry.",
  "Only essential items such as pens, pencils, and an approved calculator (if allowed) should be brought to the examination hall. Bags, mobile phones, books and notes are strictly prohibited inside the hall.",
  "Students must bring their own writing materials. The use of pencils is permitted only for drawing or diagrams and only black or blue ink pens should be used for writing answers.",
  "Students must maintain silence throughout the examination. Any form of disturbance or talking with fellow students will be treated as misconduct.",
  "Students must write their answers clearly and legibly. Only the answer sheets provided by the examination authorities should be used. The use of rough paper is not allowed unless provided by the invigilator.",
  "Students will not be allowed to leave the examination hall before the scheduled end time unless in case of an emergency. Once a student has submitted their paper, they are not allowed to re-enter the hall.",
  "Any student found engaging in disruptive behaviour, cheating or violating the rules will be reported and may face serious consequences, including disqualification from the exam and disciplinary actions.",
];

export default function ControllerOfExaminations() {
  const [activeCat, setActiveCat] = useState("about");

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
          <span>Controller of Examinations</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Controller of Examinations
          </h2>

          <div className="tjs-coe-quicklinks">
            {QUICK_LINKS.map((q) =>
              q.tab ? (
                <button type="button" key={q.id} className="tjs-coe-quicklink" onClick={() => setActiveCat(q.tab)}>
                  <span className="tjs-coe-quicklink-icon"><i className={q.icon}></i></span>
                  {q.label}
                </button>
              ) : (
                <div key={q.id} className="tjs-coe-quicklink tjs-coe-quicklink-pending">
                  <span className="tjs-coe-quicklink-icon"><i className={q.icon}></i></span>
                  {q.label}
                </div>
              )
            )}
          </div>

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
              {activeCat === "about" && (
                <>
                  <h3>About</h3>
                  <p>
                    Controller of Examinations at T.J.S. Engineering College is dedicated to ensuring a seamless and
                    organized examination process for all students. Smooth conduct of examinations by coordinating
                    with faculty invigilators and other staff, ensuring that all protocols are followed for a fair
                    examination environment. Our primary goal is to uphold academic integrity, maintain transparency
                    and provide a smooth experience for students and faculty alike.
                  </p>

                  <h3>Rules and Regulations for the Conduct of Examinations</h3>
                  <ol className="tjs-coe-rules">
                    {RULES.map((rule, i) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ol>
                </>
              )}

              {activeCat === "people" && (
                <>
                  <h3>Controller of Examinations</h3>
                  <p className="tjs-dept-pending">Details will be added soon.</p>
                </>
              )}

              {activeCat === "circulars" && (
                <>
                  <h3>Circulars</h3>
                  <div className="tjs-dept-link-list">
                    {CIRCULARS.map((c) => (
                      <a href={c.href} key={c.label} target="_blank" rel="noopener">
                        <span>{c.label}</span>
                        <span className="tjs-dept-link-arrow">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {activeCat === "contact" && (
                <>
                  <h3>Contact</h3>
                  <p className="tjs-dept-pending">Contact details will be added soon.</p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
