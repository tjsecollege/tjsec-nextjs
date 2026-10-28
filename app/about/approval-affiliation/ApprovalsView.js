"use client";

import Link from "next/link";
import { useState } from "react";
import YearPdfTabs from "../../components/YearPdfTabs";

function list(value) {
  return Array.isArray(value) ? value : [];
}

// categories: [{ label, title, documents: [{ tab, document: { url } }] }]
export default function ApprovalsView({ pageTitle, categories }) {
  const [activeCat, setActiveCat] = useState(0);

  const category = categories[activeCat];
  const docs = list(category?.documents)
    .filter((d) => d.document?.url)
    .map((d) => ({ tab: d.tab, url: d.document.url }));
  const title = category ? category.title || category.label : "";

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>About</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Approval &amp; Affiliation</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {pageTitle || "Approval & Affiliations"}
          </h2>

          {category ? (
            <div className="tjs-approvals-layout">
              <aside className="tjs-approvals-sidebar">
                {categories.map((cat, i) => (
                  <button
                    key={cat.label + i}
                    type="button"
                    className={"tjs-approvals-cat" + (activeCat === i ? " active" : "")}
                    onClick={() => setActiveCat(i)}
                  >
                    {cat.label}
                  </button>
                ))}
              </aside>

              <div className="tjs-approvals-panel">
                <h3>{title}</h3>
                {docs.length > 0 ? (
                  // key: switching category starts again at its first (newest) year
                  <YearPdfTabs key={activeCat} docs={docs} title={title} />
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
