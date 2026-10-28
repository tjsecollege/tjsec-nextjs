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

// clubs: [{ name, title, description, documents: [{ title, url }] }]
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
                  <div className="tjs-doc-list">
                    {club.documents.map((d, i) => (
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
