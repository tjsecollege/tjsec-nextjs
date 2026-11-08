"use client";

import Link from "next/link";
import { useState } from "react";

function LinkList({ items }) {
  return (
    <div className="tjs-dept-link-list">
      {items.map((item, i) => (
        <a href={item.url} target="_blank" rel="noopener" key={item.label + i}>
          <span>{item.label}</span>
          <span className="tjs-dept-link-arrow">
            <i className={item.isFile ? "ri-file-pdf-2-line" : "ri-external-link-line"}></i>
          </span>
        </a>
      ))}
    </div>
  );
}

function Html({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function SectionBody({ section }) {
  const heading = section.title || section.menuLabel;
  switch (section.layout) {
    case "text":
      return (
        <div className="tjs-committee-body">
          <h4>{heading}</h4>
          <Html html={section.content} />
        </div>
      );
    case "documents":
      return (
        <div className="tjs-committee-body">
          <h4>{heading}</h4>
          {section.intro && <Html html={section.intro} />}
          {section.items.length ? (
            <LinkList items={section.items} />
          ) : (
            <p className="tjs-dept-pending">Documents will be added soon.</p>
          )}
        </div>
      );
    case "composition":
      return (
        <div className="tjs-committee-body">
          <h4>{heading}</h4>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Composition Criteria (NAAC)</th>
                  <th>Name</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {section.groups.map((group, g) =>
                  group.members.map((member, i) => (
                    <tr key={g + "-" + i}>
                      {i === 0 && <td rowSpan={group.members.length}>{g + 1}</td>}
                      {i === 0 && <td rowSpan={group.members.length}>{group.criteria}</td>}
                      <td>
                        <strong>{member.name}</strong>
                      </td>
                      <td>{member.designation}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "contact":
      return (
        <>
          {section.title && <h4>{section.title}</h4>}
          <div className="tjs-iqac-contact-card">
            {section.photo && <img loading="lazy" src={section.photo.src} alt={section.photo.alt} />}
            <div>
              <h4>{section.name}</h4>
              {section.role && <p className="tjs-trustee-role">{section.role}</p>}
              {(section.phone || section.email) && (
                <p>
                  {section.phone && (
                    <>
                      Phone: <a href={`tel:+91${section.phone.replace(/\D/g, "").slice(-10)}`}>{section.phone}</a>
                    </>
                  )}
                  {section.phone && section.email && <br />}
                  {section.email && (
                    <>
                      Email: <a href={`mailto:${section.email}`}>{section.email}</a>
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </>
      );
    default:
      return null;
  }
}

// sections: see getAboutIqac() in lib/wordpress.js
export default function AboutIqacView({ pageTitle, sections }) {
  const [active, setActive] = useState(0);
  const section = sections[active];

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>IQAC</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>About IQAC</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {pageTitle || "Internal Quality Assurance Cell"}
          </h2>

          {section ? (
            <div className="tjs-approvals-layout">
              <aside className="tjs-approvals-sidebar">
                {sections.map((s, i) => (
                  <button
                    key={s.menuLabel + i}
                    type="button"
                    className={"tjs-approvals-cat" + (active === i ? " active" : "")}
                    onClick={() => setActive(i)}
                  >
                    {s.menuLabel}
                  </button>
                ))}
              </aside>

              <div className="tjs-approvals-panel">
                <SectionBody key={active} section={section} />
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
