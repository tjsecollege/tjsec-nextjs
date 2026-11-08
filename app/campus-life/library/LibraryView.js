"use client";

import Link from "next/link";
import { useState } from "react";
import DeptJumpNav from "../../departments/DeptJumpNav";

function Badge({ label, link }) {
  return link ? (
    <a href={link} target="_blank" rel="noopener" className="tjs-pub-badge">
      {label}
    </a>
  ) : (
    <span className="tjs-pub-badge">{label}</span>
  );
}

function Stats({ items }) {
  return (
    <div className="tjs-lib-stats">
      {items.map((s, i) => (
        <div className="tjs-lib-stat" key={s.label + i}>
          <i className={s.icon}></i>
          <strong>{s.value}</strong>
          {s.label && <span>{s.label}</span>}
        </div>
      ))}
    </div>
  );
}

function Photos({ items }) {
  return items.length > 0 ? (
    <div className="tjs-lib-photo-grid">
      {items.map((p) => (
        <img loading="lazy" key={p.src} src={p.src} alt={p.alt} />
      ))}
    </div>
  ) : null;
}

function JournalTable({ title, journals }) {
  if (!journals.length) return null;
  return (
    <>
      <h4>{title}</h4>
      <div className="tjs-dept-table-wrap">
        <table className="tjs-dept-table">
          <thead>
            <tr>
              <th>Journal Name</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((j, i) => (
              <tr key={j.name + i}>
                <td>{j.name}</td>
                <td>{j.publisher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const sum = (rows, key) => rows.reduce((total, r) => total + (Number(r[key]) || 0), 0);
const formatCount = (n) => n.toLocaleString("en-IN");
const orDash = (v) => (v === "" || v === null || v === undefined ? "–" : v);

// lib: see getLibrary() in lib/wordpress.js. Sections without content are left out.
export default function LibraryView({ lib }) {
  const [openDept, setOpenDept] = useState(0);
  const half = Math.ceil(lib.facilities.length / 2);

  const sections = [
    { id: "about", label: "About", show: lib.about || lib.aboutStats.length || lib.aboutPhotos.length },
    { id: "facilities", label: "Facilities & Services", show: lib.facilities.length },
    { id: "collections", label: "Collections", show: lib.collectionStats.length || lib.collectionLinks.length },
    { id: "deptwise", label: "Department-wise", show: lib.deptwise.length },
    { id: "eresources", label: "E-Resources", show: lib.eresources.length || lib.otherCollections.length },
    { id: "journals", label: "Journals", show: lib.journals.length },
    { id: "rules", label: "Library Rules", show: lib.generalRules.length || lib.digitalRules.length },
    { id: "committee", label: "Committee", show: lib.committee.length },
    { id: "contact", label: "Contact", show: lib.contact },
  ].filter((s) => s.show);
  const shown = new Set(sections.map((s) => s.id));
  // Sections alternate white / tinted backgrounds in the order they appear.
  const alt = (id) => (sections.findIndex((s) => s.id === id) % 2 === 1 ? " tjs-dept-section-alt" : "");

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Campus Life</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Library</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <DeptJumpNav items={sections.map((s) => ({ href: `#${s.id}`, label: s.label }))} />

        {shown.has("about") && (
          <section id="about" className={"tjs-dept-section" + alt("about")}>
            <h2>About the Library</h2>
            {lib.about && <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: lib.about }} />}
            {lib.memberships.length > 0 && (
              <div className="tjs-pub-badges" style={{ marginBottom: 24 }}>
                {lib.memberships.map((m, i) => (
                  <Badge key={m.label + i} {...m} />
                ))}
              </div>
            )}
            {lib.aboutStats.length > 0 && <Stats items={lib.aboutStats} />}
            {lib.softwareNote && (
              <p style={{ marginTop: 20 }}>
                <strong>Library Management Software:</strong> {lib.softwareNote}
              </p>
            )}
            <Photos items={lib.aboutPhotos} />
          </section>
        )}

        {shown.has("facilities") && (
          <section id="facilities" className={"tjs-dept-section" + alt("facilities")}>
            <h2>Library Facilities &amp; Services</h2>
            <div className="tjs-dept-grid-2">
              {[lib.facilities.slice(0, half), lib.facilities.slice(half)]
                .filter((col) => col.length)
                .map((col, i) => (
                  <div className="tjs-dept-card" key={i}>
                    <ul>
                      {col.map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>
        )}

        {shown.has("collections") && (
          <section id="collections" className={"tjs-dept-section" + alt("collections")}>
            <h2>{lib.collectionsTitle || "Library Collections"}</h2>
            {lib.collectionStats.length > 0 && <Stats items={lib.collectionStats} />}
            {lib.collectionLinks.length > 0 && (
              <div className="tjs-pub-badges" style={{ marginTop: 20 }}>
                {lib.collectionLinks.map((l, i) => (
                  <Badge key={l.label + i} {...l} />
                ))}
              </div>
            )}
          </section>
        )}

        {shown.has("deptwise") && (
          <section id="deptwise" className={"tjs-dept-section" + alt("deptwise")}>
            <h2>Details of Library Books, Journals &amp; CD&apos;s</h2>
            <Photos items={lib.deptwisePhotos} />
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Department</th>
                    <th>Titles</th>
                    <th>Volumes</th>
                    <th>Journals (Nat.)</th>
                    <th>Journals (Int.)</th>
                    <th>CD&apos;s</th>
                  </tr>
                </thead>
                <tbody>
                  {lib.deptwise.map((d, i) => (
                    <tr key={d.department + i}>
                      <td>{i + 1}</td>
                      <td>{d.department}</td>
                      <td>{orDash(d.titles)}</td>
                      <td>{orDash(d.volumes)}</td>
                      <td>{orDash(d.nationalJournals)}</td>
                      <td>{orDash(d.internationalJournals)}</td>
                      <td>{orDash(d.cds)}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: 700 }}>
                    <td colSpan={2}>Total</td>
                    <td>{formatCount(sum(lib.deptwise, "titles"))}</td>
                    <td>{formatCount(sum(lib.deptwise, "volumes"))}</td>
                    <td>{formatCount(sum(lib.deptwise, "nationalJournals"))}</td>
                    <td>{formatCount(sum(lib.deptwise, "internationalJournals"))}</td>
                    <td>{formatCount(sum(lib.deptwise, "cds"))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {shown.has("eresources") && (
          <section id="eresources" className={"tjs-dept-section" + alt("eresources")}>
            <h2>E-Resources Details</h2>
            <div className="tjs-dept-grid-2">
              {lib.eresources.length > 0 && (
                <div className="tjs-dept-table-wrap">
                  <table className="tjs-dept-table">
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th>Category</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lib.eresources.map((r, i) => (
                        <tr key={i}>
                          <td>
                            {r.link ? (
                              <a href={r.link} target="_blank" rel="noopener">
                                {r.source}
                              </a>
                            ) : (
                              r.source
                            )}
                          </td>
                          <td>{r.category}</td>
                          <td>{r.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {lib.otherCollections.length > 0 && (
                <div className="tjs-dept-table-wrap">
                  <table className="tjs-dept-table">
                    <thead>
                      <tr>
                        <th>Other Collections</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lib.otherCollections.map((r, i) => (
                        <tr key={r.category + i}>
                          <td>{r.category}</td>
                          <td>{r.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {shown.has("journals") && (
          <section id="journals" className={"tjs-dept-section" + alt("journals")}>
            <h2>National &amp; International Journals (Department-wise)</h2>
            <div className="tjs-committee-list">
              {lib.journals.map((d, i) => (
                <div className="tjs-committee-item" key={d.department + i}>
                  <button
                    type="button"
                    className={"tjs-committee-toggle" + (openDept === i ? " active" : "")}
                    onClick={() => setOpenDept(openDept === i ? -1 : i)}
                  >
                    <span>{d.department}</span>
                    <i className="ri-arrow-down-s-line"></i>
                  </button>
                  {openDept === i && (
                    <div className="tjs-committee-body">
                      <JournalTable title="National Journals" journals={d.national} />
                      <JournalTable title="International Journals" journals={d.international} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {shown.has("rules") && (
          <section id="rules" className={"tjs-dept-section" + alt("rules")}>
            <h2>Library Rules</h2>
            <div className="tjs-dept-grid-2">
              {lib.generalRules.length > 0 && (
                <div className="tjs-dept-card">
                  <h3>General Library Rules</h3>
                  <ul>
                    {lib.generalRules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
              {lib.digitalRules.length > 0 && (
                <div className="tjs-dept-card">
                  <h3>Digital Library Rules</h3>
                  <ul>
                    {lib.digitalRules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {shown.has("committee") && (
          <section id="committee" className={"tjs-dept-section" + alt("committee")}>
            <h2>Library Committee</h2>
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name of the Faculty</th>
                    <th>Designation</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {lib.committee.map((m, i) => (
                    <tr key={m.name + i}>
                      <td>{i + 1}</td>
                      <td>{m.name}</td>
                      <td>{m.designation}</td>
                      <td>{m.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {shown.has("contact") && (
          <section id="contact" className={"tjs-dept-section" + alt("contact")}>
            <h2>Contact</h2>
            <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: lib.contact }} />
          </section>
        )}
      </div>
    </>
  );
}
