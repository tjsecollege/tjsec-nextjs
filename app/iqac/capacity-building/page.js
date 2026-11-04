import Link from "next/link";
import ZoomableImage from "../../departments/ZoomableImage";
import { getCapacityBuilding } from "@/lib/wordpress";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2022-09-12" -> "12 Sep 2022"
function formatDate(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  return m ? `${m[3]} ${MONTHS[m[2] - 1]} ${m[1]}` : ymd;
}

// Content is managed in WordPress: admin.tjsec.ac.in → IQAC → Capacity Building
export default async function CapacityBuilding() {
  const { pageTitle, intro, groups } = await getCapacityBuilding();
  const title = pageTitle || "Capacity Building and Skill Enhancement";

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>IQAC</h1>
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

          {intro && <p className="tjs-cb-intro">{intro}</p>}

          {groups.map((group, i) => (
            <div className="tjs-cb-group" key={group.heading + i}>
              <div className="tjs-cb-group-head">
                <h3>{group.heading}</h3>
                {group.programs.length > 0 && (
                  <span className="tjs-cb-count">
                    {group.programs.length} {group.programs.length === 1 ? "Program" : "Programs"}
                  </span>
                )}
              </div>
              {group.description && <p className="tjs-cb-group-desc">{group.description}</p>}

              <div className="tjs-cb-grid">
                {group.programs.map((p, j) => (
                  <article className="tjs-cb-card" key={p.title + j}>
                    {p.photo ? (
                      // The blurred copy of the photo (::before) fills the frame,
                      // so photos of any shape line up without being cropped.
                      <div className="tjs-cb-photo" style={{ "--cb-photo": `url("${p.photo.url}")` }}>
                        <ZoomableImage src={p.photo.url} alt={p.photo.alt} />
                        <span className="tjs-cb-zoom" aria-hidden="true">
                          <i className="ri-zoom-in-line"></i>
                        </span>
                      </div>
                    ) : (
                      <div className="tjs-cb-photo tjs-cb-photo-empty" aria-hidden="true">
                        <i className="ri-presentation-line"></i>
                      </div>
                    )}
                    <div className="tjs-cb-body">
                      <h4 className="tjs-cb-title">{p.title}</h4>
                      {p.person && (
                        <p className="tjs-cb-person">
                          <i className="ri-user-voice-line"></i>
                          <span>{p.person}</span>
                        </p>
                      )}
                      {p.date && (
                        <p className="tjs-cb-date">
                          <i className="ri-calendar-2-line"></i> {formatDate(p.date)}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}

          {!intro && !groups.length && <p className="tjs-dept-pending">Content coming soon.</p>}
        </section>
      </div>
    </>
  );
}
