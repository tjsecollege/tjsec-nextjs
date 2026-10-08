"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tab-row + embedded PDF viewer for a list of {label, href} documents —
 * same visual pattern as the Approval & Affiliations year-tabs viewer, but
 * keyed by document label instead of year.
 */
export default function MouTabsViewer({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabsRef = useRef(null);

  const active = items[activeIndex];

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
  }, [items]);

  function scrollTabs(direction) {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: direction * 240, behavior: "smooth" });
    }
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="tjs-approvals-panel">
      <div className="tjs-approvals-year-tabs-row">
        {items.length > 1 && (
          <button
            type="button"
            className="tjs-approvals-year-nav"
            aria-label="Scroll documents left"
            onClick={() => scrollTabs(-1)}
            disabled={!canScrollLeft}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
        )}
        <div className="tjs-approvals-year-tabs" ref={tabsRef}>
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              className={"tjs-approvals-year" + (activeIndex === i ? " active" : "")}
              onClick={() => setActiveIndex(i)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {items.length > 1 && (
          <button
            type="button"
            className="tjs-approvals-year-nav"
            aria-label="Scroll documents right"
            onClick={() => scrollTabs(1)}
            disabled={!canScrollRight}
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        )}
      </div>

      {active && (
        <div className="tjs-approvals-viewer">
          <iframe key={active.href} src={active.href} title={active.label} />
        </div>
      )}
    </div>
  );
}
