"use client";

import { useEffect, useRef, useState } from "react";

const AUTO_SCROLL_INTERVAL = 7000;

// "R. Yogeshwari" -> "Y" (initials and titles skipped), for people without a photo.
function initial(name) {
  const word = (name || "").split(/\s+/).find((w) => !/^(mr|mrs|ms|dr|prof)\.?$/i.test(w) && !/^[A-Z]\.?$/.test(w));
  return (word || name || "?")[0];
}

function paragraphs(text) {
  return (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// One testimonial at a time, fading to the next every few seconds (paused on
// hover / touch), with ‹ › arrows and dots. All slides share one grid cell,
// so the box keeps the height of the longest one instead of jumping.
// variant "home": the home page's blue testimonial box (the quote is one
// paragraph, clamped in CSS so every slide is the same height);
// variant "page": white cards on the Alumni page (full text).
// footer: optional content shown at the right end of the arrows / dots row.
// items: [{ name, details, message, photo: { url, alt } | null }]
export default function TestimonialSlider({ items, variant = "page", footer = null }) {
  const [index, setIndex] = useState(0);
  const boxRef = useRef(null);
  const pausedRef = useRef(false);
  const trackRef = useRef(null);
  const count = items.length;
  const home = variant === "home";

  // Pause while the pointer is over the box or a finger is on it.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const pause = () => (pausedRef.current = true);
    const resume = () => (pausedRef.current = false);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  // Restarts on every slide change, so a slide picked with the arrows or dots
  // gets its full time before the next one.
  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % count);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(id);
  }, [count, index]);

  // Alumni page: the card grows / shrinks (animated in CSS) to the testimonial
  // shown, so a short one has no empty space. The home page keeps the height of
  // the longest one, so the page below it never moves.
  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (home || !slide) return;
    const observer = new ResizeObserver(() => {
      track.style.height = slide.offsetHeight + "px";
    });
    observer.observe(slide);
    return () => observer.disconnect();
  }, [home, index]);

  if (!count) return null;
  const go = (step) => setIndex((i) => (i + step + count) % count);

  return (
    <div className={"tjs-tslider " + (home ? "is-home" : "is-page")} ref={boxRef}>
      <div className="tjs-tslider-track" ref={trackRef}>
        {items.map((t, i) => (
          <figure className={"tjs-tslider-slide" + (i === index ? " active" : "")} key={t.name + i} aria-hidden={i !== index}>
            {home ? (
              <blockquote className="tjs-ht-text">{paragraphs(t.message).join(" ")}</blockquote>
            ) : (
              <>
                <i className="ri-double-quotes-l tjs-tslider-quote" aria-hidden="true"></i>
                <blockquote className="tjs-tslider-text">
                  {paragraphs(t.message).map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </blockquote>
              </>
            )}
            <figcaption className={home ? "tjs-ht-person" : "tjs-tslider-person"}>
              {t.photo?.url ? (
                <span className={home ? "tjs-ht-photo" : "tjs-tslider-photo"}>
                  <img loading="lazy" src={t.photo.url} alt={t.photo.alt || t.name} />
                </span>
              ) : (
                <span className="tjs-tslider-initial" aria-hidden="true">
                  {initial(t.name)}
                </span>
              )}
              <span className={home ? "tjs-ht-who" : "tjs-tslider-who"}>
                <strong className={home ? "tjs-ht-name" : "tjs-tslider-name"}>{t.name}</strong>
                {t.details && <span className={home ? "tjs-ht-details" : "tjs-tslider-details"}>{t.details}</span>}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {(count > 1 || footer) && (
        <div className="tjs-tslider-controls">
          {count > 1 && (
            <>
              <button type="button" className="tjs-tslider-arrow" aria-label="Previous testimonial" onClick={() => go(-1)}>
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <div className="tjs-tslider-dots">
                {items.map((t, i) => (
                  <button
                    type="button"
                    key={t.name + i}
                    className={i === index ? "active" : ""}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button type="button" className="tjs-tslider-arrow" aria-label="Next testimonial" onClick={() => go(1)}>
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </>
          )}
          {footer && <div className="tjs-tslider-footer">{footer}</div>}
        </div>
      )}
    </div>
  );
}
