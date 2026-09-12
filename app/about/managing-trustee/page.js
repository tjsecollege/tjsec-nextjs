export default function ManagingTrustee() {
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
          <span>Managing Trustee</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Managing Trustee
          </h2>

          <div className="tjs-trustee-grid">
            <div className="tjs-trustee-side">
              <div className="tjs-trustee-photo-card">
                <div className="tjs-trustee-photo" aria-hidden="true">
                  <span>Photo</span>
                </div>
              </div>
              <div className="tjs-trustee-name-card">
                <h3>Shri T. J. Govindarajan</h3>
                <p className="tjs-trustee-role">Chairman &amp; Managing Trustee</p>
                <p className="tjs-trustee-org">T.J.Sivananda Mudaliar Educational Trust</p>
              </div>
            </div>

            <div className="tjs-trustee-message-card">
              <h3>Trustee&apos;s Message</h3>
              <p>
                Education is the foundation for creating a progressive and responsible society. At T.J.S.
                Engineering College, we are dedicated to providing our students with an enriching educational
                experience that combines academic excellence with practical knowledge, innovation, and
                strong human values.
              </p>
              <p>
                Our endeavour is to create an environment where students are encouraged to think
                independently, explore new ideas, develop their talents, and face the challenges of a
                dynamic world with confidence. We believe that true education should develop not only
                competent professionals but also compassionate, ethical, and responsible citizens.
              </p>
              <p>
                With the collective efforts of our faculty, staff, students, alumni, and industry partners,
                we continue to strengthen our academic standards and create opportunities for learning,
                research, innovation, and professional growth.
              </p>
              <p>
                I am confident that T.J.S. Engineering College will continue to inspire young minds and
                contribute to building a skilled, innovative, and responsible generation for the future.
              </p>
              <div className="tjs-trustee-quote">
                <p>&ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;</p>
                <span>&mdash; Nelson Mandela</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
