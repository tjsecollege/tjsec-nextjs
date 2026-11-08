import Link from "next/link";
import DeptPhotoSlider from "../departments/DeptPhotoSlider";

// Simple info page: introduction with an optional photo slider, highlight
// cards and a free-text section — the same look as the Medical Centre page.
// Used by the Campus Life facility pages and Industry Interface → About.
// page: see getInfoPage() in lib/wordpress.js.
export default function InfoPage({ bannerTitle, page: f, fallbackTitle }) {
  const title = f.pageTitle || fallbackTitle;
  const isEmpty = !f.intro && !f.photos.length && !f.highlights.length && !f.more;

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>{bannerTitle}</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {title}
          </h2>

          {f.photos.length > 0 ? (
            <div className="tjs-dept-media-row">
              <div className="tjs-dept-media-row-text">
                <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: f.intro }} />
              </div>
              <div className="tjs-dept-media-row-img">
                <DeptPhotoSlider images={f.photos} />
              </div>
            </div>
          ) : (
            f.intro && <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: f.intro }} />
          )}

          {f.highlights.length > 0 && (
            <>
              {f.highlightsHeading && <h3 className="tjs-medical-heading">{f.highlightsHeading}</h3>}
              <div className="tjs-medical-grid">
                {f.highlights.map((h, i) => (
                  <div className="tjs-medical-card" key={h.title + i}>
                    <span className="tjs-medical-icon">
                      <i className={h.icon}></i>
                    </span>
                    <div>
                      <h4>{h.title}</h4>
                      {h.description && <p>{h.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {f.more && (
            <>
              {f.moreHeading && <h3 className="tjs-medical-heading">{f.moreHeading}</h3>}
              <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: f.more }} />
            </>
          )}

          {isEmpty && <p className="tjs-dept-pending">Content coming soon.</p>}
        </section>
      </div>
    </>
  );
}
