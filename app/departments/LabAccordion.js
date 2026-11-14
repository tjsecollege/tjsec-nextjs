"use client";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { ZoomableGrid } from "../components/AlbumGallery";

// Height of the sticky department menu bar plus a little room (same as DeptMegaNav).
const NAV_OFFSET = 74;

// The site scrolls through Lenis; a native scroll would be undone by its loop.
function scrollWindowTo(top, smooth) {
  if (window.tjsLenis) window.tjsLenis.scrollTo(top, smooth ? { duration: 0.6 } : { immediate: true });
  else window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}

// Lab photos: a grid that fills the panel width; clicking a photo opens the
// full-screen zoom with ‹ › arrows (same as the department Gallery).
function LabContent({ lab }) {
  return (
    <>
      {lab.label && <p className="tjs-dept-lab-label">{lab.label}</p>}
      {lab.paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      {lab.imgs && lab.imgs.length > 0 && (
        <ZoomableGrid photos={lab.imgs.map((img) => ({ url: img.src, alt: img.alt }))} fallbackAlt={lab.name || lab.label} />
      )}
    </>
  );
}

/**
 * Collapsible lab list — replaces the old side-by-side photo-slider layout.
 * Images render directly in a wrapped grid (no slider) inside each expanded
 * entry, matching the reference accordion design.
 */
export default function LabAccordion({ items }) {
  const [open, setOpen] = useState(0);
  const itemRefs = useRef([]);
  const clicked = useRef(null); // { index, top } of the title the visitor just clicked

  function toggle(i) {
    const el = itemRefs.current[i];
    clicked.current = el ? { index: i, top: el.getBoundingClientRect().top } : null;
    setOpen(open === i ? -1 : i);
  }

  // Opening a lab closes the one that was open. When that one is above (often a
  // long text + photos block), the page used to jump up past the title just
  // clicked. Before the browser paints, put the clicked title back where it was;
  // then, if the lab opened low on the screen, glide its title up under the menu
  // so its content is in view.
  useLayoutEffect(() => {
    const c = clicked.current;
    clicked.current = null;
    const el = c && itemRefs.current[c.index];
    if (!el) return;
    const drift = el.getBoundingClientRect().top - c.top;
    if (Math.abs(drift) > 1) scrollWindowTo(window.scrollY + drift, false);
    const opened = open === c.index;
    if (opened && (c.top > window.innerHeight * 0.4 || c.top < NAV_OFFSET)) {
      scrollWindowTo(window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET, true);
    }
  }, [open]);

  return (
    <div className="tjs-committee-list tjs-lab-accordion">
      {items.map((item, i) => (
        <div className="tjs-committee-item" key={item.name} ref={(el) => (itemRefs.current[i] = el)}>
          <button
            type="button"
            className={"tjs-committee-toggle" + (open === i ? " active" : "")}
            aria-expanded={open === i}
            onClick={() => toggle(i)}
          >
            <span>{item.name}</span>
            <i className="ri-arrow-down-s-line"></i>
          </button>
          {open === i && (
            <div className="tjs-committee-body">
              {item.subLabs ? (
                item.subLabs.map((sub) => (
                  <Fragment key={sub.name}>
                    <h4>{sub.name}</h4>
                    <LabContent lab={sub} />
                  </Fragment>
                ))
              ) : (
                <LabContent lab={item} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
