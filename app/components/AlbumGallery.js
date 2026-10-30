"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Shared by the Alumni and Sports and Fitness galleries.
// albums: [{ title, photos: [{ url, alt }] }]

function list(value) {
  return Array.isArray(value) ? value : [];
}

// One tab per album (e.g. Alumni Meet / Alumni Talks); a single album shows no tabs.
export default function AlbumGallery({ albums }) {
  const [active, setActive] = useState(0);
  const album = albums[active] || albums[0];
  return (
    <>
      {albums.length > 1 && (
        <div className="tjs-approvals-year-tabs-row">
          <div className="tjs-approvals-year-tabs">
            {albums.map((a, i) => (
              <button
                key={a.title + i}
                type="button"
                className={"tjs-approvals-year" + (a === album ? " active" : "")}
                onClick={() => setActive(i)}
              >
                {a.title}
              </button>
            ))}
          </div>
        </div>
      )}
      <ZoomableGrid key={active} photos={list(album.photos)} fallbackAlt={album.title} />
    </>
  );
}

// Photo grid where clicking a photo opens it full-screen, with prev/next
// arrows (and ← → / Esc keys) to move through the album.
export function ZoomableGrid({ photos, fallbackAlt }) {
  const [zoomIndex, setZoomIndex] = useState(null);
  const isOpen = zoomIndex !== null;

  function go(direction) {
    setZoomIndex((i) => (i + direction + photos.length) % photos.length);
  }

  // Keyboard controls + lock page scroll while open (same as the site's other zoom popups).
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setZoomIndex(null);
      if (e.key === "ArrowLeft") setZoomIndex((i) => (i - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setZoomIndex((i) => (i + 1) % photos.length);
    }
    function stopBubble(e) {
      e.stopPropagation();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.tjsLenis?.stop();
    document.body.classList.add("tjs-zoom-open"); // hides the floating Admissions / chatbot buttons
    document.addEventListener("wheel", stopBubble, { capture: true, passive: true });
    document.addEventListener("touchmove", stopBubble, { capture: true, passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("wheel", stopBubble, { capture: true });
      document.removeEventListener("touchmove", stopBubble, { capture: true });
      window.tjsLenis?.start();
      document.body.classList.remove("tjs-zoom-open");
    };
  }, [isOpen, photos.length]);

  const current = isOpen ? photos[zoomIndex] : null;

  return (
    <>
      <div className="tjs-dept-event-imgs">
        {photos.map((img, i) => (
          <img
            key={img.url}
            src={img.url}
            alt={img.alt || fallbackAlt}
            className="tjs-modal-img-zoomable"
            onClick={() => setZoomIndex(i)}
          />
        ))}
      </div>

      {/* Portal to <body> so no other image on the page can paint above the overlay (Chromium layering quirk). */}
      {current &&
        createPortal(
        <div className="tjs-modal-zoom-overlay" onClick={() => setZoomIndex(null)}>
          <button
            type="button"
            className="tjs-modal-close"
            aria-label="Close zoomed image"
            onClick={(e) => {
              e.stopPropagation();
              setZoomIndex(null);
            }}
          >
            <i className="ri-close-line"></i>
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="tjs-modal-img-nav tjs-modal-img-prev"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button
                type="button"
                className="tjs-modal-img-nav tjs-modal-img-next"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </>
          )}
          <img
            src={current.url}
            alt={current.alt || fallbackAlt}
            className="tjs-modal-zoom-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
          document.body
        )}
    </>
  );
}
