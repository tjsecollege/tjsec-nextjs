export default function Directors() {
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
          <span>Directors</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Directors
          </h2>

          <div className="tjs-trustee-grid">
            <div className="tjs-trustee-side">
              <div className="tjs-trustee-photo-card">
                <div className="tjs-trustee-photo" aria-hidden="true">
                  <span>Photo</span>
                </div>
              </div>
              <div className="tjs-trustee-name-card">
                <h3>Directors</h3>
                <p className="tjs-trustee-org">T.J.S. Engineering College</p>
              </div>
            </div>

            <div className="tjs-trustee-message-card">
              <h3>Directors&apos; Message</h3>
              <p>
                At T.J.S. Engineering College, we believe that every student has the potential to achieve
                excellence when provided with the right knowledge, guidance, and opportunities. Our
                commitment is to build an academic environment that encourages students to learn, innovate,
                explore, and grow with confidence.
              </p>
              <p>
                We continuously strive to strengthen teaching and learning through modern technologies,
                industry interaction, research, skill development, and experiential education. Along with
                technical competence, we place equal importance on discipline, leadership, teamwork, ethical
                values, and social responsibility.
              </p>
              <p>
                Our endeavour is to prepare students to meet the demands of a rapidly evolving professional
                world and to become capable individuals who can create meaningful impact in society.
              </p>
              <p>
                With the dedicated efforts of our faculty, staff, students, and stakeholders, we look forward
                to taking T.J.S. Engineering College towards greater academic excellence and continued
                growth.
              </p>
              <p className="tjs-dept-hod-sign">
                <strong>Directors</strong>
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
