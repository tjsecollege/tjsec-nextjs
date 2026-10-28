"use client";

import { useEffect, useRef, useState } from "react";

// Year tabs (scrollable, with ‹ › arrows) above an embedded PDF viewer.
// Used by About → Approval & Affiliations and Placements → Placed Students.
// docs: [{ tab: "2026-27", url: "https://…pdf" }] — the first one opens by default.
export default function YearPdfTabs({ docs, title }) {
  const [active, setActive] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabsRef = useRef(null);
  const doc = docs[active];

  function updateScrollState() {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
    const el = tabsRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [docs]);

  function scrollTabs(direction) {
    tabsRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  }

  return (
    <>
      <div className="tjs-approvals-year-tabs-row">
        {docs.length > 1 && (
          <button
            type="button"
            className="tjs-approvals-year-nav"
            aria-label="Scroll years left"
            onClick={() => scrollTabs(-1)}
            disabled={!canScrollLeft}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
        )}
        <div className="tjs-approvals-year-tabs" ref={tabsRef}>
          {docs.map((d, i) => (
            <button
              key={d.tab + i}
              type="button"
              className={"tjs-approvals-year" + (active === i ? " active" : "")}
              onClick={() => setActive(i)}
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
            onClick={() => scrollTabs(1)}
            disabled={!canScrollRight}
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        )}
      </div>

      {doc && (
        <div className="tjs-approvals-viewer">
          <iframe key={doc.url} src={doc.url} title={`${title} ${doc.tab}`} />
        </div>
      )}
    </>
  );
}
