export default function About() {
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
          <p>
            T.J.S. Engineering College is committed to empowering young minds through quality technical
            education, innovation, and holistic development. The institution provides a vibrant learning
            environment that encourages academic excellence, industry exposure, research, creativity, and
            ethical values across various engineering disciplines.
          </p>
          <p>
            T.J.S. Engineering College strives to impart knowledge and skills that prepare students to meet
            the evolving needs of industry and society. With dedicated faculty, modern infrastructure, and
            a student-centric approach, the institution aims to nurture competent professionals, responsible
            citizens, and future leaders who can contribute meaningfully to the development of the nation.
          </p>
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision &amp; Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p>
                To nurture empowered, ethical, and future-ready professionals through excellence in
                education, innovation, and technology for the betterment of society.
              </p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <ul>
                <li>
                  To provide holistic and industry-oriented education that develops technical knowledge,
                  professional skills, and employability.
                </li>
                <li>To foster innovation, research, creativity, and lifelong learning among students and faculty.</li>
                <li>
                  To develop socially responsible professionals with strong ethical values and a commitment
                  to serving society.
                </li>
                <li>To promote industry interaction and emerging technologies to prepare students for evolving global challenges.</li>
                <li>
                  To create an inclusive and supportive learning environment that enables every student to
                  achieve their full potential.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
