"use client";

import { useEffect, useRef, useState } from "react";

function SimpleCard({ img, date, title, desc, onClick }) {
  return (
    <div className="tjs-slider-card" onClick={onClick} role="button" tabIndex={0}>
      {img ? (
        <img src={img} alt={title} className="tjs-slider-card-img" />
      ) : (
        <div className="tjs-slider-card-img-ph">Photo</div>
      )}
      <div className="tjs-slider-card-body">
        {date && (
          <div className="tjs-slider-card-meta">
            <span>
              <i className="ri-calendar-2-line"></i> {date}
            </span>
          </div>
        )}
        <h4 className="tjs-slider-card-title">{title}</h4>
        {desc && <p className="tjs-slider-card-desc">{desc}</p>}
        <button type="button" className="tjs-slider-card-readmore" onClick={onClick}>
          Read More <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}

function EventModal({ item, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.tjsLenis?.stop();
    // Belt-and-braces: Lenis listens for wheel/touchmove on window in the
    // bubble phase. Stopping propagation during the capture phase (which
    // always finishes before any bubble-phase listener runs) keeps those
    // events from ever reaching Lenis, so the page behind the modal can't
    // scroll — while our own modal's native overflow-y:auto keeps working,
    // since that's the browser's own scroll behaviour, not a JS listener.
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
  }, [onClose]);

  const hasMeta = item.category || item.date;
  const imgs = item.imgs && item.imgs.length > 0 ? item.imgs : item.img ? [item.img] : [];

  return (
    <div className="tjs-modal-overlay" onClick={onClose}>
      <div className="tjs-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="tjs-modal-close" aria-label="Close" onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>
        <div className="tjs-modal-scroll">
          {imgs.length > 0 ? (
            <div className="tjs-modal-img-wrap">
              <img src={imgs[imgIndex]} alt={item.title} className="tjs-modal-img" />
              {imgs.length > 1 && (
                <>
                  <button
                    type="button"
                    className="tjs-modal-img-nav tjs-modal-img-prev"
                    aria-label="Previous photo"
                    onClick={() => setImgIndex((i) => (i - 1 + imgs.length) % imgs.length)}
                  >
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <button
                    type="button"
                    className="tjs-modal-img-nav tjs-modal-img-next"
                    aria-label="Next photo"
                    onClick={() => setImgIndex((i) => (i + 1) % imgs.length)}
                  >
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                  <div className="tjs-modal-img-dots">
                    {imgs.map((src, i) => (
                      <button
                        type="button"
                        key={src}
                        className={"tjs-modal-img-dot" + (i === imgIndex ? " active" : "")}
                        aria-label={`Show photo ${i + 1}`}
                        onClick={() => setImgIndex(i)}
                      />
                    ))}
                  </div>
                </>
              )}
              {hasMeta && (
                <div className="tjs-modal-meta-float">
                  {item.category && (
                    <span>
                      <i className="ri-price-tag-3-line"></i> {item.category}
                    </span>
                  )}
                  {item.date && (
                    <span>
                      <i className="ri-calendar-2-line"></i> {item.date}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            hasMeta && (
              <div className="tjs-slider-card-meta tjs-modal-meta-noimg">
                {item.category && (
                  <span>
                    <i className="ri-price-tag-3-line"></i> {item.category}
                  </span>
                )}
                {item.date && (
                  <span>
                    <i className="ri-calendar-2-line"></i> {item.date}
                  </span>
                )}
              </div>
            )
          )}
        <div className="tjs-modal-body">
          <h3 className="tjs-modal-title">{item.title}</h3>
          {item.desc.split("\n\n").map((para, i) => (
            <p className="tjs-modal-desc" key={i}>{para}</p>
          ))}
          {item.category === "Hackathon" && item.person && (
            <p className="tjs-modal-person">
              <strong>Team Members:</strong> {item.person}
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default function EventSlider({ items }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function scroll(direction) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "0");
    const step = card ? card.getBoundingClientRect().width + gap : 340;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div className="tjs-slider-wrap">
      <button
        type="button"
        className="tjs-slider-nav"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <div className="tjs-slider-track" ref={trackRef}>
        {items.map((item, i) => (
          <SimpleCard key={item.title} {...item} onClick={() => setActiveIndex(i)} />
        ))}
      </div>
      <button
        type="button"
        className="tjs-slider-nav"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
      {activeIndex !== null && (
        <EventModal item={items[activeIndex]} onClose={() => setActiveIndex(null)} />
      )}
    </div>
  );
}
