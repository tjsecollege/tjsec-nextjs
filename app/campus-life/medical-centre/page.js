import Link from "next/link";
import DeptPhotoSlider from "../../departments/DeptPhotoSlider";
import { getMedicalCentre } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Medical Centre
export default async function MedicalCentre() {
  const m = await getMedicalCentre();
  const title = m.pageTitle || "Medical Centre";

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Campus Life</h1>
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

          {m.photos.length > 0 ? (
            <div className="tjs-dept-media-row">
              <div className="tjs-dept-media-row-text">
                <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: m.intro }} />
              </div>
              <div className="tjs-dept-media-row-img">
                <DeptPhotoSlider images={m.photos} />
              </div>
            </div>
          ) : (
            m.intro && <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: m.intro }} />
          )}

          {m.facilities.length > 0 && (
            <>
              <h3 className="tjs-medical-heading">{m.facilitiesHeading || "Facilities Available"}</h3>
              <div className="tjs-medical-grid">
                {m.facilities.map((f, i) => (
                  <div className="tjs-medical-card" key={f.title + i}>
                    <span className="tjs-medical-icon">
                      <i className={f.icon}></i>
                    </span>
                    <div>
                      <h4>{f.title}</h4>
                      {f.description && <p>{f.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {m.objectives.length > 0 && (
            <>
              <h3 className="tjs-medical-heading">{m.objectivesHeading || "Objectives"}</h3>
              <ol className="tjs-medical-objectives">
                {m.objectives.map((text, i) => (
                  <li key={i}>
                    <span className="tjs-medical-num">{i + 1}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </>
          )}

          {!m.intro && !m.facilities.length && !m.objectives.length && (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
