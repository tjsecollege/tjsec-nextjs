import Link from "next/link";
function Html({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

const PENDING = <p className="tjs-dept-pending">Content coming soon.</p>;

export default function AboutTrusteeView({ crumbLabel, pageTitle, messageTitle, trustee }) {
  const t = trustee || {};

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>About</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{crumbLabel}</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {pageTitle}
          </h2>

          <div className="tjs-trustee-grid">
            <div className="tjs-trustee-side">
              <div className="tjs-trustee-photo-card">
                <div className="tjs-trustee-photo">
                  {t.photo?.url ? <img loading="lazy" src={t.photo.url} alt={t.photo.alt || t.name} /> : <span>Photo</span>}
                </div>
              </div>
              <div className="tjs-trustee-name-card">
                <h3>{t.name}</h3>
                {t.qualification && <p className="tjs-trustee-qualification">{t.qualification}</p>}
                {t.role && <p className="tjs-trustee-role">{t.role}</p>}
                {t.org && <p className="tjs-trustee-org">{t.org}</p>}
              </div>
            </div>

            <div className="tjs-trustee-message-card">
              <h3>{messageTitle}</h3>
              {t.message ? <Html html={t.message} /> : PENDING}
              {t.quote_text && (
                <div className="tjs-trustee-quote">
                  <p>&ldquo;{t.quote_text}&rdquo;</p>
                  {t.quote_author && <span>&mdash; {t.quote_author}</span>}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
