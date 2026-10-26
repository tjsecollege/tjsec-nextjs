"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Lets a single (non-slider) photo open the same full-screen zoom overlay
// used elsewhere, so the zoom popup works regardless of photo count.
export default function ZoomableImage({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    function onKey(e) {
      if (e.key === "Escape") setZoomed(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // The floating admissions CTA and chatbot are fixed-position widgets that
    // can render above this overlay despite its higher z-index (Chrome
    // compositing quirk with their own transform/transition layers), so hide
    // them outright instead of relying on stacking order.
    document.body.classList.add("tjs-zoom-open");
    window.tjsLenis?.stop();
    function stopBubble(e) {
      e.stopPropagation();
    }
    document.addEventListener("wheel", stopBubble, { capture: true, passive: true });
    document.addEventListener("touchmove", stopBubble, { capture: true, passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("tjs-zoom-open");
      document.removeEventListener("wheel", stopBubble, { capture: true });
      document.removeEventListener("touchmove", stopBubble, { capture: true });
      window.tjsLenis?.start();
    };
  }, [zoomed]);

  return (
    <>
      <img src={src} alt={alt} className="tjs-modal-img-zoomable" onClick={() => setZoomed(true)} />
      {zoomed &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="tjs-modal-zoom-overlay"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
          >
            <button
              type="button"
              className="tjs-modal-close"
              aria-label="Close zoomed image"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(false);
              }}
            >
              <i className="ri-close-line"></i>
            </button>
            <img src={src} alt={alt} className="tjs-modal-zoom-img" onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body
        )}
    </>
  );
}
