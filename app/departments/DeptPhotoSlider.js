"use client";

import { useState } from "react";

export default function DeptPhotoSlider({ images }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  function go(direction) {
    setIndex((i) => (i + direction + images.length) % images.length);
  }

  return (
    <div className="tjs-dept-photo-slider">
      <div className="tjs-dept-photo-slider-frame">
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
