export default function TheDirector() {
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
          <span>The Director</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            The Director
          </h2>

          <div className="tjs-trustee-grid">
            <div className="tjs-trustee-side">
              <div className="tjs-trustee-photo-card">
                <div className="tjs-trustee-photo">
                  <img src="/assets/images/directorphotos/A.Kabilan.jpg" alt="Shri. A. Kabilan" />
                </div>
              </div>
              <div className="tjs-trustee-name-card">
                <h3>Shri. A. Kabilan BA, BL.,</h3>
                <p className="tjs-trustee-role">Director</p>
                <p className="tjs-trustee-org">T.J.S. Engineering College, Chennai</p>
              </div>
            </div>

            <div className="tjs-trustee-message-card">
              <h3>Director&apos;s Message</h3>
              <p>
                T.J.S.EC has envisioned a new kind of academic institution&mdash;one that could put it,
                &ldquo;serve the times and the nation&apos;s needs.&rdquo; Our efforts for innovating
                curriculum, percolating research culture, supporting our innovative student teams, and
                upgrading our infrastructure with a vision and commitment to move further on the pathways
                of excellence perhaps what made T.J.S.EC climb to be a top-class institution in the region.
                It must be highly satisfying that our stakeholders namely, the Industry, Government, and
                the people in the community have acknowledged their recognition of the spirit of excellence
                of our institution as it is truly reflected in our endeavor to provide value-based
                education.
              </p>
              <p>
                I am sure our achievements will make every one of us proud. Our alumni here in India and
                abroad will feel proud of our achievements and this must invigorate our minds and soul to
                commit to even higher levels of achievements in the ensuing years.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
