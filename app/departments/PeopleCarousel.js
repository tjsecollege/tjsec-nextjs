"use client";

import { useEffect, useRef, useState } from "react";

const AUTO_SCROLL_INTERVAL = 3000;

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

  function cardStep(el) {
    const card = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "0");
    return card ? card.getBoundingClientRect().width + gap : 220;
  }

  function scroll(direction) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * cardStep(el), behavior: "smooth" });
  }

  // Auto-advance the carousel so Academic Toppers etc. cycle on their own —
  // pauses on hover/touch, and loops back to the start once it hits the end.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || items.length < 2) return;

    let paused = false;

    function tick() {
      if (paused) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardStep(el), behavior: "smooth" });
      }
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
  }, [items]);

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
              <span className="tjs-dept-people-badge" aria-hidden="true">
                <i className="ri-award-fill"></i>
              </span>
            </div>
            <h4>{item.name}</h4>
            <p className="tjs-dept-people-role">{item.role || role}</p>
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
