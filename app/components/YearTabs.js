"use client";

import { useEffect, useRef, useState } from "react";

// Scrollable row of year tabs with ‹ › arrows (Approval & Affiliations style).
// Used by YearPdfTabs and the department Publication section.
// tabs: ["2026-27", "2025-26", …]; active: index of the selected tab.
export default function YearTabs({ tabs, active, onSelect }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabsRef = useRef(null);

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
  }, [tabs]);

  function scrollTabs(direction) {
    tabsRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  }

  return (
    <div className="tjs-approvals-year-tabs-row">
      {tabs.length > 1 && (
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
        {tabs.map((tab, i) => (
          <button
            key={tab + i}
            type="button"
            className={"tjs-approvals-year" + (active === i ? " active" : "")}
            onClick={() => onSelect(i)}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs.length > 1 && (
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
  );
}
