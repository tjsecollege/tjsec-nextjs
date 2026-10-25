"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CATEGORIES = [
  { id: "about", label: "About us" },
  { id: "office-bearers", label: "Office Bearers" },
  { id: "alumni-meet", label: "Alumni Meet" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "registration", label: "Alumni New-Registration Forms" },
  { id: "contact", label: "Contact us" },
];

function list(value) {
  return Array.isArray(value) ? value : [];
}

// "2019-02-25" -> "25.02.2019"
function formatDate(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd || "");
  return m ? `${m[3]}.${m[2]}.${m[1]}` : ymd || "";
}

function Pending({ text = "Content coming soon." }) {
  return <p className="tjs-dept-pending">{text}</p>;
}

function Html({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// One tab per album (e.g. Alumni Meet / Alumni Talks); a single album shows no tabs.
function AlbumGallery({ albums }) {
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
function ZoomableGrid({ photos, fallbackAlt }) {
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

export default function AlumniView({ alumni }) {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const bearers = list(alumni.office_bearers);
  const meets = list(alumni.meets);
  const albums = list(alumni.gallery_albums).filter((a) => list(a.photos).length);
  const testimonials = list(alumni.testimonials);
  const links = list(alumni.registration_links).filter((l) => l.url);

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Alumni</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Alumni</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {alumni.page_title || "Alumni Association"}
          </h2>

          <div className="tjs-approvals-layout">
            <aside className="tjs-approvals-sidebar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={"tjs-approvals-cat" + (activeCat === cat.id ? " active" : "")}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </aside>

            <div className="tjs-approvals-panel">
              {activeCat === "about" && (
                <div className="tjs-committee-body">
                  <h4>About us</h4>
                  {alumni.about ? <Html html={alumni.about} /> : <Pending />}
                </div>
              )}

              {activeCat === "office-bearers" && (
                <div className="tjs-committee-body">
                  <h4>{alumni.office_bearers_heading || "Office Bearers"}</h4>
                  {alumni.office_bearers_intro && <p>{alumni.office_bearers_intro}</p>}
                  {bearers.length ? (
                    <div className="tjs-dept-table-wrap">
                      <table className="tjs-dept-table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Position</th>
                            <th>Responsibilities</th>
                            <th>Name</th>
                            <th>Residential Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bearers.map((m, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{m.position}</td>
                              <td>{m.responsibility}</td>
                              <td>
                                <strong>{m.name}</strong>
                              </td>
                              <td>{m.address}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <Pending />
                  )}
                </div>
              )}

              {activeCat === "alumni-meet" && (
                <div className="tjs-committee-body">
                  <h4>Alumni Meet</h4>
                  {meets.length ? (
                    <div className="tjs-dept-table-wrap">
                      <table className="tjs-dept-table">
                        <thead>
                          <tr>
                            <th>Name of the Program</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {meets.map((m, i) => (
                            <tr key={i}>
                              <td>{m.program}</td>
                              <td>{formatDate(m.date)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <Pending />
                  )}
                </div>
              )}

              {activeCat === "gallery" && (
                <div className="tjs-committee-body">
                  <h4>Gallery</h4>
                  {albums.length ? (
                    <AlbumGallery albums={albums} />
                  ) : (
                    <Pending text="Alumni Meet & Alumni Talks photos coming soon." />
                  )}
                </div>
              )}

              {activeCat === "testimonials" && (
                <div className="tjs-committee-body">
                  <h4>Testimonials</h4>
                  {testimonials.length ? (
                    testimonials.map((t, i) => (
                      <div className="tjs-dept-card" key={t.name + i} style={i > 0 ? { marginTop: 16 } : undefined}>
                        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                          {t.photo?.url && (
                            <img
                              src={t.photo.url}
                              alt={t.photo.alt || t.name}
                              style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                            />
                          )}
                          <div>
                            {(t.message || "")
                              .split(/\n\s*\n/)
                              .filter(Boolean)
                              .map((para, j) => (
                                <p key={j}>
                                  <em>{para}</em>
                                </p>
                              ))}
                            <p style={{ marginBottom: 0 }}>
                              <strong>{t.name}</strong>
                              {t.details && <> &ndash; {t.details}</>}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Pending text="Content will be given later." />
                  )}
                </div>
              )}

              {activeCat === "registration" && (
                <div className="tjs-committee-body">
                  <h4>Alumni New-Registration Forms</h4>
                  {alumni.registration_intro && <p>{alumni.registration_intro}</p>}
                  {links.length ? (
                    <div className="tjs-dept-link-list">
                      {links.map((l, i) => (
                        <a href={l.url} target="_blank" rel="noopener" key={i}>
                          <span>{l.label}</span>
                          <span className="tjs-dept-link-arrow">
                            <i className="ri-arrow-right-line"></i>
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <Pending />
                  )}
                </div>
              )}

              {activeCat === "contact" && (
                <div className="tjs-committee-body">
                  <h4>Contact us</h4>
                  {alumni.contact ? <Html html={alumni.contact} /> : <Pending />}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
