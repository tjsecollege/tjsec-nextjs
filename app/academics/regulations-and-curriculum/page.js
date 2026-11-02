import Link from "next/link";
import { Fragment } from "react";
import { getRegulations } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Regulations

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

function LinkList({ items }) {
  return (
    <div className="tjs-dept-link-list">
      {items.map((item, i) => (
        <a href={item.url} target="_blank" rel="noopener" key={item.label + i}>
          <span>{item.label}</span>
          <span className="tjs-dept-link-arrow">
            <ArrowIcon />
          </span>
        </a>
      ))}
    </div>
  );
}

export default async function RegulationsAndCurriculum() {
  const { sections } = await getRegulations();

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Academics</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Regulations and Curriculum</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        {sections.map((section, i) => (
          <section className={"tjs-dept-section" + (i % 2 ? " tjs-dept-section-alt" : "")} key={section.title + i}>
            <h2 className="tjs-subpage-title">
              <span className="tjs-subpage-title-bar"></span>
              {section.title}
            </h2>

            {section.groups.length ? (
              // Fragment (not a wrapper div) so each heading keeps its top margin.
              section.groups.map((group, j) => (
                <Fragment key={group.heading + j}>
                  <p className="tjs-dept-group-label">{group.heading}</p>
                  <LinkList items={group.documents} />
                </Fragment>
              ))
            ) : (
              <p className="tjs-dept-pending">Documents will be added soon.</p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
