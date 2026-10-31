"use client";

import Link from "next/link";
import { useState } from "react";
import YearPdfTabs from "../../components/YearPdfTabs";
import AlbumGallery, { ZoomableGrid } from "../../components/AlbumGallery";

const CATEGORIES = [
  { id: "overview", label: "Overview" },
  { id: "outdoor", label: "Outdoor Games" },
  { id: "indoor", label: "Indoor Games" },
  { id: "fitness", label: "Fitness and Wellness" },
  { id: "events", label: "Sports Events" },
  { id: "achievements", label: "Achievements" },
  { id: "gallery", label: "Sports Gallery" },
  { id: "committee", label: "Sports Committee" },
];

function Pending({ text = "Content coming soon." }) {
  return <p className="tjs-dept-pending">{text}</p>;
}

function Html({ html }) {
  return <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: html }} />;
}

// youtube.com/watch?v=ID, youtu.be/ID, /shorts/ID, /embed/ID → embed URL
function youtubeEmbed(url) {
  const m = /(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([\w-]{11})/.exec(url || "");
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

function TextWithPhotos({ section }) {
  if (!section.html && !section.photos.length) return <Pending />;
  return (
    <>
      {section.html && <Html html={section.html} />}
      {section.photos.length > 0 && <ZoomableGrid photos={section.photos} fallbackAlt="Sports facility" />}
    </>
  );
}

// Sports Events: a row of category buttons (Annual Sports Day, Intra
// Tournaments…) above the selected category's year tabs.
function EventCategories({ categories }) {
  const [active, setActive] = useState(0);
  const category = categories[active];
  if (!category) return <Pending />;
  return (
    <>
      {categories.length > 1 && (
        <div className="tjs-sports-cats">
          {categories.map((c, i) => (
            <button
              key={c.name + i}
              type="button"
              className={"tjs-sports-cat" + (active === i ? " active" : "")}
              onClick={() => setActive(i)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
      {category.description && (
        <div
          className="tjs-dept-richtext tjs-sports-cat-desc"
          dangerouslySetInnerHTML={{ __html: category.description }}
        />
      )}
      {category.docs.length ? (
        <YearPdfTabs key={active} docs={category.docs} title={category.name} />
      ) : (
        !category.description && <Pending text="Documents will be added soon." />
      )}
    </>
  );
}

export default function SportsView({ sports, initialSection = "overview" }) {
  const [activeCat, setActiveCat] = useState(initialSection);
  const title = CATEGORIES.find((c) => c.id === activeCat).label;

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Campus Life</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Sports and Fitness</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Sports and Fitness
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
              <h3>{activeCat === "outdoor" ? "Outdoor Sports Facilities" : activeCat === "indoor" ? "Indoor Sports Facilities" : title}</h3>

              {activeCat === "overview" && (sports.overview ? <Html html={sports.overview} /> : <Pending />)}
              {activeCat === "outdoor" && <TextWithPhotos section={sports.outdoor} />}
              {activeCat === "indoor" && <TextWithPhotos section={sports.indoor} />}
              {activeCat === "fitness" && <TextWithPhotos section={sports.fitness} />}

              {activeCat === "events" && <EventCategories categories={sports.eventCategories} />}

              {activeCat === "achievements" && (
                <>
                  {sports.achievementsIntro && <Html html={sports.achievementsIntro} />}
                  {sports.achievements.length ? (
                    <YearPdfTabs docs={sports.achievements} title="Achievements" />
                  ) : (
                    <Pending text="Documents will be added soon." />
                  )}
                </>
              )}

              {activeCat === "gallery" && (
                <>
                  {sports.albums.length > 0 && <AlbumGallery albums={sports.albums} />}
                  {sports.videos.length > 0 && (
                    <>
                      <h4 className="tjs-sports-videos-title">Videos</h4>
                      <div className="tjs-sports-videos">
                        {sports.videos.map((v, i) => {
                          const embed = youtubeEmbed(v.youtube);
                          return (
                            <figure className="tjs-sports-video" key={v.title + i}>
                              {embed ? (
                                <iframe
                                  src={embed}
                                  title={v.title}
                                  loading="lazy"
                                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : v.file ? (
                                <video src={v.file} controls preload="metadata" />
                              ) : (
                                <a href={v.youtube} target="_blank" rel="noopener">
                                  Watch video
                                </a>
                              )}
                              <figcaption>{v.title}</figcaption>
                            </figure>
                          );
                        })}
                      </div>
                    </>
                  )}
                  {!sports.albums.length && !sports.videos.length && <Pending />}
                </>
              )}

              {activeCat === "committee" && (
                <>
                  {sports.committeeIntro && <p>{sports.committeeIntro}</p>}
                  {sports.committee.length ? (
                    <div className="tjs-dept-people-grid-full">
                      {sports.committee.map((m, i) => (
                        <div className="tjs-dept-people-card" key={m.name + i}>
                          <div className="tjs-dept-people-photo">
                            {m.photo ? <img src={m.photo} alt={m.name} /> : <span>Photo</span>}
                          </div>
                          <h4>{m.name}</h4>
                          {m.role && <p className="tjs-dept-people-role">{m.role}</p>}
                          {m.designation && <p className="tjs-dept-people-spec">{m.designation}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Pending />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
