import { getAboutPage } from "@/lib/wordpress";

function Html({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

const PENDING = <p className="tjs-dept-pending">Content coming soon.</p>;

// Content is managed in WordPress: admin.tjsec.ac.in → About → About T.J.S
export default async function About() {
  const d = await getAboutPage("about-tjs");

  return (
    <>
      <section
        className="tjs-about-hero"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <div className="tjs-about-hero-content">
          <span className="tjs-about-hero-label">
            <i className="ri-graduation-cap-line"></i> About the Institute
          </span>
          <h1>Empowering young minds to engineer a better tomorrow.</h1>
          <p>
            T.J.S. Engineering College is committed to quality technical education, innovation, and
            holistic development &mdash; nurturing competent professionals ready to meet the needs of
            industry and society.
          </p>
        </div>
      </section>

      <div className="tjs-dept-page">
        <section id="about" className="tjs-dept-section">
          <h2>About</h2>
          {d?.about ? <Html html={d.about} /> : PENDING}
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision &amp; Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              {d?.vision ? <Html html={d.vision} /> : PENDING}
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              {d?.mission ? <Html html={d.mission} /> : PENDING}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
