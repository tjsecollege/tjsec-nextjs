"use client";

import { useEffect, useRef, useState } from "react";

// Height of this nav bar plus a little breathing room, so an anchor jump
// doesn't land a section's own heading right underneath it. The site
// header itself is no longer sticky, so it needs no offset here.
const SCROLL_OFFSET = 74;

function scrollToSection(e, href, after) {
  // Let modifier/middle clicks behave normally (open in new tab, etc).
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const el = document.querySelector(href);
  if (!el) return;
  e.preventDefault();
  if (window.tjsLenis) {
    // Lenis drives scrolling itself, so a native hash-jump gets fought (and
    // usually reverted) by its own render loop on the very next frame —
    // route the scroll through Lenis instead of relying on the browser's
    // default anchor behaviour.
    window.tjsLenis.scrollTo(el, { offset: -SCROLL_OFFSET });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
  history.replaceState(null, "", href);
  if (after) after();
}

/**
 * Full-width, two-level department quick-nav: top-level categories (About,
 * People, Academics, ...) are dropdown triggers only — clicking one opens a
 * panel listing its real sub-section anchors. Desktop shows a flyout panel
 * under the clicked category; CSS alone switches it to a vertical accordion
 * on narrow viewports, since flyout panels don't suit a narrow screen. Only
 * one category is open at a time.
 */
export default function DeptMegaNav({ categories }) {
  const [openIndex, setOpenIndex] = useState(-1);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (openIndex === -1) return;
    function onPointerDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenIndex(-1);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpenIndex(-1);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  return (
    <nav className="tjs-dept-mega-nav" ref={wrapRef}>
      <div className="tjs-dept-mega-list">
        {categories.map((cat, i) => {
          const isOpen = openIndex === i;
          return (
            <div className={"tjs-dept-mega-item" + (isOpen ? " open" : "")} key={cat.label}>
              <button
                type="button"
                className="tjs-dept-mega-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span>{cat.label}</span>
                <i className="ri-arrow-down-s-line"></i>
              </button>
              {isOpen && (
                <div className="tjs-dept-mega-dropdown">
                  {cat.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={(e) => scrollToSection(e, child.href, () => setOpenIndex(-1))}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
