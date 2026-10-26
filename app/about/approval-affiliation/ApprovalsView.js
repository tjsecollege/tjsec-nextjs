"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function list(value) {
  return Array.isArray(value) ? value : [];
}

// categories: [{ label, title, documents: [{ tab, document: { url } }] }]
export default function ApprovalsView({ pageTitle, categories }) {
  const [activeCat, setActiveCat] = useState(0);
  const [activeDoc, setActiveDoc] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const yearTabsRef = useRef(null);

  const category = categories[activeCat];
  const docs = list(category?.documents).filter((d) => d.document?.url);
  const doc = docs[activeDoc];
  const title = category ? category.title || category.label : "";

  function updateScrollState() {
    const el = yearTabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
    const el = yearTabsRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [activeCat]);

  function selectCategory(i) {
    setActiveCat(i);
    setActiveDoc(0);
  }

  function scrollYearTabs(direction) {
    yearTabsRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  }

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
                    onClick={() => selectCategory(i)}
                  >
                    {cat.label}
                  </button>
                ))}
              </aside>

              <div className="tjs-approvals-panel">
                <h3>{title}</h3>

                {docs.length > 0 ? (
                  <>
                    <div className="tjs-approvals-year-tabs-row">
                      {docs.length > 1 && (
                        <button
                          type="button"
                          className="tjs-approvals-year-nav"
                          aria-label="Scroll years left"
                          onClick={() => scrollYearTabs(-1)}
                          disabled={!canScrollLeft}
                        >
                          <i className="ri-arrow-left-s-line"></i>
                        </button>
                      )}
                      <div className="tjs-approvals-year-tabs" ref={yearTabsRef}>
                        {docs.map((d, i) => (
                          <button
                            key={d.tab + i}
                            type="button"
                            className={"tjs-approvals-year" + (activeDoc === i ? " active" : "")}
                            onClick={() => setActiveDoc(i)}
                          >
                            {d.tab}
                          </button>
                        ))}
                      </div>
                      {docs.length > 1 && (
                        <button
                          type="button"
                          className="tjs-approvals-year-nav"
                          aria-label="Scroll years right"
                          onClick={() => scrollYearTabs(1)}
                          disabled={!canScrollRight}
                        >
                          <i className="ri-arrow-right-s-line"></i>
                        </button>
                      )}
                    </div>

                    {doc && (
                      <div className="tjs-approvals-viewer">
                        <iframe key={doc.document.url} src={doc.document.url} title={`${title} ${doc.tab}`} />
                      </div>
                    )}
                  </>
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
