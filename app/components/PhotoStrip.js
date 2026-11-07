"use client";

import { useEffect, useRef, useState } from "react";
import { ZoomOverlay } from "./AlbumGallery";

const AUTO_SCROLL_INTERVAL = 4000;

// Photos visible at once for the current screen width.
function perViewFor(width) {
  if (width >= 992) return 3;
  if (width >= 576) return 2;
  return 1;
}

// Full-width strip of photos under a page banner (3 at a time on desktop,
// 2 on tablets, 1 on phones) that slides one photo at a time, with dots,
// swipe and auto-advance (paused on hover/touch). Clicking a photo opens
// it in the zoom popup. photos: [{ url, alt }]
export default function PhotoStrip({ photos, fallbackAlt }) {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(null);
  const frameRef = useRef(null);
  const touchX = useRef(null);

  const visible = Math.min(perView, photos.length);
  const steps = photos.length - visible + 1; // positions the strip can stop at
  const current = Math.min(index, steps - 1);

  useEffect(() => {
    const update = () => setPerView(perViewFor(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-advance, pausing while the visitor hovers or touches the strip or the zoom popup is open.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || steps < 2 || zoomIndex !== null) return;
    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    const id = setInterval(() => {
      if (!paused) setIndex((i) => (Math.min(i, steps - 1) + 1) % steps);
    }, AUTO_SCROLL_INTERVAL);
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
  }, [steps, zoomIndex]);

  function go(direction) {
    setIndex((Math.min(index, steps - 1) + direction + steps) % steps);
  }

  if (!photos.length) return null;

  return (
    <section className="tjs-photo-strip" aria-label="Photo gallery">
      <div
        className="tjs-photo-strip-frame"
        ref={frameRef}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <div
          className="tjs-photo-strip-track"
          style={{ transform: `translateX(-${(current * 100) / visible}%)` }}
        >
          {photos.map((p, i) => (
            <button
              type="button"
              className="tjs-photo-strip-item"
              key={p.url + i}
              style={{ flexBasis: `${100 / visible}%` }}
              onClick={() => setZoomIndex(i)}
              aria-label="Open photo"
            >
              <img src={p.url} alt={p.alt || fallbackAlt} loading={i < 3 ? "eager" : "lazy"} />
              <span className="tjs-photo-strip-zoom" aria-hidden="true">
                <i className="ri-zoom-in-line"></i>
              </span>
            </button>
          ))}
        </div>
      </div>

      {steps > 1 && (
        <div className="tjs-photo-strip-dots">
          {Array.from({ length: steps }, (_, i) => (
            <button
              type="button"
              key={i}
              className={i === current ? "active" : ""}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}

      <ZoomOverlay photos={photos} index={zoomIndex} onChange={setZoomIndex} fallbackAlt={fallbackAlt} />
    </section>
  );
}
