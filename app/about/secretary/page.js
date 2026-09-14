export default function Secretary() {
  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>About</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Secretary</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Secretary
          </h2>

          <div className="tjs-trustee-grid">
            <div className="tjs-trustee-side">
              <div className="tjs-trustee-photo-card">
                <div className="tjs-trustee-photo" aria-hidden="true">
                  <span>Photo</span>
                </div>
              </div>
              <div className="tjs-trustee-name-card">
                <h3>Secretary</h3>
                <p className="tjs-trustee-org">T.J.S. Engineering College</p>
              </div>
            </div>

            <div className="tjs-trustee-message-card">
              <h3>Secretary&apos;s Message</h3>
              <p>
                At T.J.S. Engineering College, we are committed to creating an educational ecosystem that
                enables students to discover their abilities, strengthen their knowledge, and develop into
                confident professionals. We believe that meaningful education must go beyond classrooms by
                encouraging curiosity, creativity, discipline, and continuous learning.
              </p>
              <p>
                Our focus is to provide students with quality academic opportunities, modern learning
                practices, industry exposure, and a supportive campus environment. We encourage our students
                to embrace emerging technologies, pursue innovation, and develop the professional and
                interpersonal skills required to succeed in a competitive world.
              </p>
              <p>
                We remain committed to strengthening the institution through academic excellence, research,
                industry collaboration, and student development. Our goal is to nurture young minds who are
                not only technically capable but also guided by integrity, responsibility, and concern for
                society.
              </p>
              <p>
                I wish all our students success in their academic journey and encourage them to learn with
                purpose, dream with confidence, and contribute positively to society.
              </p>
              <p className="tjs-dept-hod-sign">
                <strong>Secretary</strong>
                <br />
                <em>T.J.S. Engineering College</em>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
