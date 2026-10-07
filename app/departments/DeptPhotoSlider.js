"use client";

import { useEffect, useRef, useState } from "react";

const AUTO_SCROLL_INTERVAL = 3000;

export default function DeptPhotoSlider({ images }) {
  const [index, setIndex] = useState(0);
  const frameRef = useRef(null);

  function go(direction) {
    setIndex((i) => (i + direction + images.length) % images.length);
  }

  // Auto-advance so the slider cycles on its own — pauses on hover/touch.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !images || images.length < 2) return;

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
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="tjs-dept-photo-slider">
      <div className="tjs-dept-photo-slider-frame" ref={frameRef}>
        <img src={images[index].src} alt={images[index].alt} />
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
    </div>
  );
}
