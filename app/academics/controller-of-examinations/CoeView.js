"use client";

import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { id: "about", label: "About" },
  { id: "people", label: "People" },
  { id: "circulars", label: "Circulars" },
  { id: "contact", label: "Contact" },
];

// "2025-02-27" -> "27-02-2025"
function formatDate(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd || "");
  return m ? `${m[3]}-${m[2]}-${m[1]}` : ymd;
}

function Pending({ text }) {
  return <p className="tjs-dept-pending">{text}</p>;
}

// coe: see getCoe() in lib/wordpress.js
export default function CoeView({ coe }) {
  const [activeCat, setActiveCat] = useState("about");
  const { contact } = coe;
  const hasContact = contact.address || contact.email || contact.phone || contact.hours;

  // Results / Exam Timetable open their link; Circulars / Guidelines open a sidebar section.
  const quickLinks = [
    { id: "results", label: "Results", icon: "ri-file-list-3-line", href: coe.resultsLink },
    { id: "timetable", label: "Exam Timetable", icon: "ri-calendar-2-line", href: coe.timetableLink },
    { id: "circulars", label: "Circulars", icon: "ri-megaphone-line", tab: "circulars" },
    { id: "guidelines", label: "Guidelines", icon: "ri-information-line", tab: "about" },
  ];

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Academics</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
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
            {quickLinks.map((q) => {
              const inner = (
                <>
                  <span className="tjs-coe-quicklink-icon">
                    <i className={q.icon}></i>
                  </span>
                  {q.label}
                </>
              );
              if (q.tab) {
                return (
                  <button type="button" key={q.id} className="tjs-coe-quicklink" onClick={() => setActiveCat(q.tab)}>
                    {inner}
                  </button>
                );
              }
              return q.href ? (
                <a key={q.id} className="tjs-coe-quicklink" href={q.href} target="_blank" rel="noopener">
                  {inner}
                </a>
              ) : (
                <div key={q.id} className="tjs-coe-quicklink tjs-coe-quicklink-pending">
                  {inner}
                </div>
              );
            })}
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
                  {coe.about ? (
                    <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: coe.about }} />
                  ) : (
                    !coe.rules.length && <Pending text="Details will be added soon." />
                  )}
                  {coe.rules.length > 0 && (
                    <>
                      <h3>{coe.rulesHeading || "Rules and Regulations for the Conduct of Examinations"}</h3>
                      <ol className="tjs-coe-rules">
                        {coe.rules.map((rule, i) => (
                          <li key={i}>{rule}</li>
                        ))}
                      </ol>
                    </>
                  )}
                </>
              )}

              {activeCat === "people" && (
                <>
                  <h3>Controller of Examinations</h3>
                  {coe.people.length ? (
                    <div className="tjs-dept-people-grid-full">
                      {coe.people.map((p, i) => (
                        <div className="tjs-dept-people-card" key={p.name + i}>
                          <div className="tjs-dept-people-photo">
                            {p.photo ? <img loading="lazy" src={p.photo} alt={p.name} /> : <span>Photo</span>}
                          </div>
                          <h4>{p.name}</h4>
                          {p.designation && <p className="tjs-dept-people-role">{p.designation}</p>}
                          {p.contact && <p className="tjs-dept-people-spec">{p.contact}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Pending text="Details will be added soon." />
                  )}
                </>
              )}

              {activeCat === "circulars" && (
                <>
                  <h3>Circulars</h3>
                  {coe.circulars.length ? (
                    <div className="tjs-dept-link-list">
                      {coe.circulars.map((c, i) => (
                        <a href={c.url} key={c.url + i} target="_blank" rel="noopener">
                          <span>
                            {c.title}
                            {c.date && <span className="tjs-coe-circular-date">{formatDate(c.date)}</span>}
                          </span>
                          <span className="tjs-dept-link-arrow">
                            <i className="ri-file-pdf-2-line"></i>
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <Pending text="Circulars will be added soon." />
                  )}
                </>
              )}

              {activeCat === "contact" && (
                <>
                  <h3>Contact</h3>
                  {hasContact ? (
                    <ul className="tjs-coe-contact">
                      {contact.address && (
                        <li>
                          <i className="ri-map-pin-line"></i>
                          <span style={{ whiteSpace: "pre-line" }}>{contact.address}</span>
                        </li>
                      )}
                      {contact.email && (
                        <li>
                          <i className="ri-mail-line"></i>
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </li>
                      )}
                      {contact.phone && (
                        <li>
                          <i className="ri-phone-line"></i>
                          <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a>
                        </li>
                      )}
                      {contact.hours && (
                        <li>
                          <i className="ri-time-line"></i>
                          <span>{contact.hours}</span>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <Pending text="Contact details will be added soon." />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
