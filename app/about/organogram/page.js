export default function Organogram() {
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
          <span>Organogram</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Organogram
          </h2>

          <div className="tjs-organogram-card">
            <img src="/assets/images/about/organogram.png" alt="T.J.S. Engineering College Organogram" />
          </div>
        </section>
      </div>
    </>
  );
}
