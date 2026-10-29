"use client";

import Link from "next/link";
import { useState } from "react";

const OFFICE_EXT = /\.(docx?|pptx?|xlsx?)$/i;

function fileExt(url) {
  return (/\.([a-z0-9]+)(?:$|\?)/i.exec(url || "")?.[1] || "").toLowerCase();
}

// Browsers can't show Word/PowerPoint/Excel files, so open those in Microsoft's
// free online viewer; PDFs open directly.
function viewUrl(url) {
  return OFFICE_EXT.test(url) ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}` : url;
}

function fileIcon(url) {
  const ext = fileExt(url);
  if (ext.startsWith("doc")) return "ri-file-word-2-line";
  if (ext.startsWith("ppt")) return "ri-file-ppt-2-line";
  if (ext.startsWith("xls")) return "ri-file-excel-2-line";
  if (ext === "pdf") return "ri-file-pdf-2-line";
  return "ri-file-text-line";
}

function DocList({ docs }) {
  return (
    <div className="tjs-doc-list">
      {docs.map((d, i) => (
        <div className="tjs-doc-item" key={d.url + i}>
          <a className="tjs-doc-view" href={viewUrl(d.url)} target="_blank" rel="noopener">
            <i className={fileIcon(d.url)}></i>
            <span>{d.title}</span>
          </a>
          <a className="tjs-dept-link-arrow" href={d.url} download aria-label={`Download ${d.title}`} title="Download">
            <i className="ri-download-2-line"></i>
          </a>
        </div>
      ))}
    </div>
  );
}

// Groups documents by academic year, newest first; documents without a
// year go into a final "Other documents" group.
function groupByYear(docs) {
  const map = new Map();
  for (const d of docs) {
    const key = d.year || "";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(d);
  }
  return [...map.entries()]
    .sort(([a], [b]) => (a === "" ? 1 : b === "" ? -1 : b.localeCompare(a)))
    .map(([year, items]) => ({ year, label: year || "Other documents", items }));
}

// One collapsible panel per year; the newest is open. If no document has a
// year, it's just the plain list.
function YearAccordion({ docs }) {
  const groups = groupByYear(docs);
  const [open, setOpen] = useState(0);
  if (groups.length === 1 && groups[0].year === "") return <DocList docs={docs} />;
  return (
    <div className="tjs-committee-list" style={{ marginTop: 12 }}>
      {groups.map((g, i) => (
        <div className="tjs-committee-item" key={g.label}>
          <button
            type="button"
            className={"tjs-committee-toggle" + (open === i ? " active" : "")}
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span>
              {g.label}
              <span className="tjs-doc-year-count">
                {" "}
                · {g.items.length} {g.items.length === 1 ? "document" : "documents"}
              </span>
            </span>
            <i className="ri-arrow-down-s-line"></i>
          </button>
          {open === i && (
            <div className="tjs-committee-body" style={{ paddingTop: 4 }}>
              <DocList docs={g.items} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// clubs: [{ name, title, description, documents: [{ title, url, year }] }]
export default function StudentsClubView({ pageTitle, clubs }) {
  const [active, setActive] = useState(0);
  const club = clubs[active];

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Campus Life</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Students Club</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {pageTitle || "Students Club"}
          </h2>

          {club ? (
            <div className="tjs-approvals-layout">
              <aside className="tjs-approvals-sidebar">
                {clubs.map((c, i) => (
                  <button
                    key={c.name + i}
                    type="button"
                    className={"tjs-approvals-cat" + (active === i ? " active" : "")}
                    onClick={() => setActive(i)}
                  >
                    {c.name}
                  </button>
                ))}
              </aside>

              <div className="tjs-approvals-panel">
                <h3>{club.title || club.name}</h3>
                {club.description && (
                  <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: club.description }} />
                )}

                {club.documents.length ? (
                  // key: switching club re-opens that club's newest year
                  <YearAccordion key={active} docs={club.documents} />
                ) : (
                  !club.description && <p className="tjs-dept-pending">Documents will be added soon.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
