"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = 767;
const GAP = 4;
// Combined height of the sticky site header (46px) + this sticky jump-nav
// bar (~56px) plus a little breathing room, so an anchor jump doesn't land
// a section's own heading underneath those fixed bars.
const SCROLL_OFFSET = 120;

function scrollToSection(e, href) {
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
}

export default function DeptJumpNav({ items }) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const othersMeasureRef = useRef(null);
  const wrapRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    function recalc() {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;

      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setVisibleCount(items.length);
        return;
      }

      const containerWidth = container.clientWidth;
      const itemEls = Array.from(measure.querySelectorAll("[data-jump-item]"));
      const othersWidth = othersMeasureRef.current?.offsetWidth || 0;

      let used = 0;
      let count = 0;
      for (let i = 0; i < itemEls.length; i++) {
        const w = itemEls[i].offsetWidth + GAP;
        const isLast = i === itemEls.length - 1;
        const budget = containerWidth - (isLast ? 0 : othersWidth + GAP);
        if (used + w <= budget) {
          used += w;
          count += 1;
        } else {
          break;
        }
      }
      setVisibleCount(count);
    }

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [items]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const visible = items.slice(0, visibleCount);
  const overflow = items.slice(visibleCount);

  return (
    <nav className="tjs-dept-jump" ref={containerRef}>
      {/* Only this inner row clips horizontally. Keeping overflow-x:hidden
          off the <nav> itself matters: CSS forces overflow-y to compute as
          "auto" on any element where overflow-x is non-visible and
          overflow-y isn't explicitly the same, which would turn the
          "Others" dropdown below into a clipped, scrollable sliver. */}
      <div className="tjs-dept-jump-tabs">
        {visible.map((item) => (
          <a key={item.href} href={item.href} onClick={(e) => scrollToSection(e, item.href)}>
            {item.label}
          </a>
        ))}
      </div>

      {overflow.length > 0 && (
        <div className="tjs-dept-jump-others" ref={wrapRef}>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            Others <i className="ri-arrow-down-s-line"></i>
          </button>
          {open && (
            <div className="tjs-dept-jump-others-menu">
              {overflow.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    scrollToSection(e, item.href);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Off-screen clone used only to measure each item's natural width
          before deciding how many fit on one line. */}
      <div className="tjs-dept-jump-measure" ref={measureRef} aria-hidden="true">
        {items.map((item) => (
          <a key={item.href} data-jump-item="true">
            {item.label}
          </a>
        ))}
        <button type="button" ref={othersMeasureRef}>
          Others <i className="ri-arrow-down-s-line"></i>
        </button>
      </div>
    </nav>
  );
}
