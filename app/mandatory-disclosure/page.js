"use client";

import { useEffect, useRef, useState } from "react";

const DOCS = [
  { year: "2026-27", file: "Mandatory-Disclosure-2026-2027_F.pdf" },
  { year: "2025-26", file: "Mandatory-Disclosure-2025-2026.pdf" },
  { year: "2024-25", file: "Mandatory-Disclosure-2024-2025.pdf" },
  { year: "2023-24", file: "Mandatory-Disclosure-2023-2024-1.pdf" },
  { year: "2022-23", file: "mandatory-disclosure-2022-2023.pdf" },
  { year: "2021-22", file: "mandatory-disclosure-2021-2022-2.pdf" },
  { year: "2020-21", file: "Mandatory-Disclosure-2020-2021-1.pdf" },
];

const CATEGORIES = [
  { id: "disclosure", label: "Public self disclosure/Mandatory disclosure" },
  { id: "ugc", label: "UGC Undertaking Letter by HEI" },
  { id: "rti", label: "Right to Information (RTI)" },
];

function docUrl(file) {
  return "/assets/pdf/mandatorydisclosure/" + encodeURIComponent(file);
}

export default function MandatoryDisclosure() {
  const [activeCat, setActiveCat] = useState("disclosure");
  const [activeYear, setActiveYear] = useState(DOCS[0].year);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const yearTabsRef = useRef(null);

  const activeDoc = DOCS.find((d) => d.year === activeYear);

  function updateScrollState() {
    const el = yearTabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    if (activeCat !== "disclosure") return;
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

  function scrollYearTabs(direction) {
    if (yearTabsRef.current) {
      yearTabsRef.current.scrollBy({ left: direction * 240, behavior: "smooth" });
    }
  }

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Mandatory Disclosure</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Mandatory Disclosure</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Public Self Disclosure / Mandatory Disclosure
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
              {activeCat === "disclosure" && (
                <>
                  <h3>Public self disclosure/Mandatory disclosure</h3>
                  <div className="tjs-approvals-year-tabs-row">
                    <button
                      type="button"
                      className="tjs-approvals-year-nav"
                      aria-label="Scroll years left"
                      onClick={() => scrollYearTabs(-1)}
                      disabled={!canScrollLeft}
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <div className="tjs-approvals-year-tabs" ref={yearTabsRef}>
                      {DOCS.map((doc) => (
                        <button
                          key={doc.year}
                          type="button"
                          className={"tjs-approvals-year" + (activeYear === doc.year ? " active" : "")}
                          onClick={() => setActiveYear(doc.year)}
                        >
                          {doc.year}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="tjs-approvals-year-nav"
                      aria-label="Scroll years right"
                      onClick={() => scrollYearTabs(1)}
                      disabled={!canScrollRight}
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </div>

                  {activeDoc && (
                    <div className="tjs-approvals-viewer">
                      <iframe
                        key={activeDoc.file}
                        src={docUrl(activeDoc.file)}
                        title={"Mandatory Disclosure " + activeDoc.year}
                      />
                    </div>
                  )}
                </>
              )}

              {activeCat === "ugc" && (
                <>
                  <h3>UGC Undertaking Letter by HEI</h3>
                  <p className="tjs-dept-pending">Documents will be added soon.</p>
                </>
              )}

              {activeCat === "rti" && (
                <>
                  <h3>Right to Information (RTI)</h3>
                  <div className="tjs-approvals-viewer">
                    <iframe
                      src="/assets/pdf/RTI-Statutory-Declaration-on-RTI-Act.pdf"
                      title="Right to Information (RTI)"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
