"use client";

import { useEffect, useRef, useState } from "react";

const AUTO_SCROLL_INTERVAL = 3000;

export default function DeptPhotoSlider({ images }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const frameRef = useRef(null);

  function go(direction) {
    setIndex((i) => (i + direction + images.length) % images.length);
  }

  // Auto-advance so the slider cycles on its own — pauses on hover/touch/zoom.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !images || images.length < 2 || zoomed) return;

    let paused = false;
    function tick() {
      if (!paused) setIndex((i) => (i + 1) % images.length);
    }
    function pause() {
      paused = true;
    }
    function resume() {
      paused = false;
    }

    const id = setInterval(tick, AUTO_SCROLL_INTERVAL);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      clearInterval(id);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [images, zoomed]);

  // Lock page scroll and support Escape-to-close while zoomed.
  useEffect(() => {
    if (!zoomed) return;
    function onKey(e) {
      if (e.key === "Escape") setZoomed(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.tjsLenis?.stop();
    function stopBubble(e) {
      e.stopPropagation();
    }
    document.addEventListener("wheel", stopBubble, { capture: true, passive: true });
    document.addEventListener("touchmove", stopBubble, { capture: true, passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("wheel", stopBubble, { capture: true });
      document.removeEventListener("touchmove", stopBubble, { capture: true });
      window.tjsLenis?.start();
    };
  }, [zoomed]);

  if (!images || images.length === 0) return null;

  return (
    <div className="tjs-dept-photo-slider">
      <div className="tjs-dept-photo-slider-frame" ref={frameRef}>
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="tjs-modal-img-zoomable"
          onClick={() => setZoomed(true)}
        />
        <button type="button" className="tjs-modal-zoom-btn" aria-label="Zoom image" onClick={() => setZoomed(true)}>
          <i className="ri-zoom-in-line"></i>
        </button>
        {images.length > 1 && (
          <>
            <button type="button" className="tjs-dept-photo-slider-nav tjs-dept-photo-slider-prev" aria-label="Previous photo" onClick={() => go(-1)}>
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button type="button" className="tjs-dept-photo-slider-nav tjs-dept-photo-slider-next" aria-label="Next photo" onClick={() => go(1)}>
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="tjs-dept-photo-slider-dots">
          {images.map((img, i) => (
            <button
              type="button"
              key={img.src}
              className={"tjs-dept-photo-slider-dot" + (i === index ? " active" : "")}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}

      {zoomed && (
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
          {images.length > 1 && (
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
            src={images[index].src}
            alt={images[index].alt}
            className="tjs-modal-zoom-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
