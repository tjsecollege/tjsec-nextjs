"use client";

import { useEffect, useRef, useState } from "react";

export default function PeopleCarousel({ items, role }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function updateScrollState() {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items]);

  function scroll(direction) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "0");
    const step = card ? card.getBoundingClientRect().width + gap : 220;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div className="tjs-people-carousel-wrap">
      <button
        type="button"
        className="tjs-slider-nav tjs-slider-nav-prev"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <div className="tjs-people-carousel-track" ref={trackRef}>
        {items.map((item) => (
          <div className="tjs-dept-people-card" key={item.name}>
            <div className="tjs-dept-people-photo">
              {item.photo ? <img src={item.photo} alt={item.name} /> : <span>Photo</span>}
            </div>
            <h4>{item.name}</h4>
            <p className="tjs-dept-people-role">{role}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="tjs-slider-nav tjs-slider-nav-next"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
}
