"use client";

import { useEffect, useRef, useState } from "react";

const AUTO_SCROLL_INTERVAL = 5000;

// Department top-banner photos. With a single image it is a plain photo;
// arrows, dots and auto-advance only appear when there are two or more.
export default function DeptHeroSlider({ images }) {
  const [index, setIndex] = useState(0);
  const frameRef = useRef(null);
  const hasMany = images.length > 1;

  function go(direction) {
    setIndex((i) => (i + direction + images.length) % images.length);
  }

  // Auto-advance, pausing while the visitor hovers or touches the banner.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || images.length < 2) return;

    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    const id = setInterval(() => {
      if (!paused) setIndex((i) => (i + 1) % images.length);
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
  }, [images]);

  if (!images.length) return null;

  return (
    <div className="tjs-dept-hero-slider" ref={frameRef}>
      {images.map((img, i) => (
        <img
          key={img.src + i}
          src={img.src}
          alt={img.alt}
          className={"tjs-dept-hero-slide" + (i === index ? " active" : "")}
          aria-hidden={i === index ? undefined : true}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {hasMany && (
        <>
          <button type="button" className="tjs-dept-photo-slider-nav tjs-dept-photo-slider-prev" aria-label="Previous photo" onClick={() => go(-1)}>
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button type="button" className="tjs-dept-photo-slider-nav tjs-dept-photo-slider-next" aria-label="Next photo" onClick={() => go(1)}>
            <i className="ri-arrow-right-s-line"></i>
          </button>
          <div className="tjs-dept-photo-slider-dots">
            {images.map((img, i) => (
              <button
                type="button"
                key={img.src + i}
                className={"tjs-dept-photo-slider-dot" + (i === index ? " active" : "")}
                aria-label={`Show photo ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
