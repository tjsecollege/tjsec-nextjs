export default function Principal() {
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
          <span>Principal</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Principal
          </h2>

          <div className="tjs-trustee-grid">
            <div className="tjs-trustee-side">
              <div className="tjs-trustee-photo-card">
                <div className="tjs-trustee-photo">
                  <img src="/assets/images/principal.jpg" alt="Dr. J. Prakash, Principal" />
                </div>
              </div>
              <div className="tjs-trustee-name-card">
                <h3>Dr. J. Prakash</h3>
                <p className="tjs-trustee-qualification">M.E., Ph.D., MISTE., MIE.,</p>
                <p className="tjs-trustee-role">Principal</p>
                <p className="tjs-trustee-org">T.J.S. Engineering College</p>
              </div>
            </div>

            <div className="tjs-trustee-message-card">
              <h3>Principal&apos;s Message</h3>
              <p>
                Welcome to T.J.S. Engineering College, where education is envisioned as a journey of
                knowledge, innovation, and personal growth. Our endeavour is to provide students with a
                strong academic foundation while nurturing the skills, confidence, creativity, and values
                needed to succeed in a rapidly changing world.
              </p>
              <p>
                We encourage our students to learn beyond the classroom through practical experiences,
                industry interaction, research, innovation, teamwork, and participation in co-curricular and
                extracurricular activities. Our dedicated faculty members continuously strive to create an
                engaging and student-centred learning environment.
              </p>
              <p>
                As an autonomous institution, we are committed to continuously enhancing the quality of
                education and preparing our graduates to meet emerging technological and professional
                challenges. Along with technical competence, we aim to develop responsible individuals who
                demonstrate integrity, leadership, and concern for society.
              </p>
              <p>
                I invite every student to make the most of the opportunities available at T.J.S. Engineering
                College, pursue excellence with determination, and become a confident professional ready to
                contribute to the nation and the world.
              </p>
              <p className="tjs-dept-hod-sign">
                <strong>Dr. J. Prakash, M.E., Ph.D., MISTE., MIE.,</strong>
                <br />
                <em>Principal</em>
                <br />
                T.J.S. Engineering College
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
