"use client";

import { useState } from "react";

const CATEGORIES = [
  { id: "academic", label: "Academic Institutions", title: "Academic Institutions", url: "/assets/pdf/Academic-colloboration.pdf" },
  { id: "industries", label: "Industries", title: "Industries", url: null },
];

export default function ListOfMoUs() {
  const [activeCat, setActiveCat] = useState("academic");

  const category = CATEGORIES.find((c) => c.id === activeCat);

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Industry Interface</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>List of MoUs</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            List of MoUs
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
              <h3>{category.title}</h3>

              {category.url ? (
                <div className="tjs-approvals-viewer">
                  <iframe key={category.url} src={category.url} title={category.title} />
                </div>
              ) : (
                <p className="tjs-dept-pending">Documents will be added soon.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
