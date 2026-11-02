"use client";

import Link from "next/link";
import { useState } from "react";
import YearPdfTabs from "./YearPdfTabs";

// Sidebar of categories, each showing its documents in YearPdfTabs (a lone
// document opens straight away, without a tab). Used by List of MoUs and
// Mandatory Disclosure. categories: [{ label, title, docs: [{ tab, url }] }]
export default function CategoryDocsView({ bannerTitle, crumb, pageTitle, categories }) {
  const [active, setActive] = useState(0);
  const category = categories[active];
  const title = category ? category.title || category.label : "";

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>{bannerTitle}</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{crumb}</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {pageTitle}
          </h2>

          {category ? (
            <div className="tjs-approvals-layout">
              <aside className="tjs-approvals-sidebar">
                {categories.map((c, i) => (
                  <button
                    key={c.label + i}
                    type="button"
                    className={"tjs-approvals-cat" + (active === i ? " active" : "")}
                    onClick={() => setActive(i)}
                  >
                    {c.label}
                  </button>
                ))}
              </aside>

              <div className="tjs-approvals-panel">
                <h3>{title}</h3>
                {category.docs.length ? (
                  // key: switching category starts again at its first document
                  <YearPdfTabs key={active} docs={category.docs} title={title} hideSingleTab />
                ) : (
                  <p className="tjs-dept-pending">Documents will be added soon.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="tjs-dept-pending">Documents will be added soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
