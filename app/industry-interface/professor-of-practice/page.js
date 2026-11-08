import Link from "next/link";
import { getProfessorsOfPractice } from "@/lib/wordpress";

// "Mr. R. Kumar" -> "K" (titles and initials skipped), for people without a photo.
function initial(name) {
  const word = (name || "").split(/\s+/).find((w) => !/^(mr|mrs|ms|dr|prof)\.?$/i.test(w) && !/^[A-Z]\.?$/.test(w));
  return (word || name || "?")[0];
}

// Content is managed in WordPress: admin.tjsec.ac.in → Industry Interface → Professor of Practice
export default async function ProfessorOfPractice() {
  const { pageTitle, intro, professors } = await getProfessorsOfPractice();
  const title = pageTitle || "Professor of Practice";

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Industry Interface</h1>
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

          {intro && <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: intro }} />}

          {professors.length > 0 ? (
            <div className="tjs-gc-grid" style={intro ? { marginTop: 28 } : undefined}>
              {professors.map((p, i) => (
                <article className="tjs-gc-card" key={p.name + i}>
                  <div className="tjs-gc-photo">
                    {p.photo ? <img src={p.photo.src} alt={p.photo.alt} /> : <span aria-hidden="true">{initial(p.name)}</span>}
                  </div>
                  <h4>{p.name}</h4>
                  {p.designation && <p className="tjs-gc-designation">{p.designation}</p>}
                  {p.expertise && <p className="tjs-pop-expertise">{p.expertise}</p>}
                  {(p.department || p.period) && (
                    <span className="tjs-gc-position">{[p.department, p.period].filter(Boolean).join(" · ")}</span>
                  )}
                </article>
              ))}
            </div>
          ) : (
            !intro && <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
