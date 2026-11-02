import Link from "next/link";
import { getIvForms } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → IV Forms
export default async function IVForms() {
  const iv = await getIvForms();
  const title = iv.pageTitle || "Industry Visit (IV) Forms";

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

          {iv.steps.length > 0 && (
            <div className="tjs-dept-grid-3" style={{ marginBottom: 32 }}>
              {iv.steps.map((s, i) => (
                <div className="tjs-dept-card tjs-iv-step" key={s.title + i}>
                  <span className="tjs-iv-step-icon">
                    <i className={s.icon}></i>
                  </span>
                  <div>
                    <p className="tjs-iv-step-title">{s.title}</p>
                    {s.description && <p className="tjs-iv-step-desc">{s.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {iv.forms.length ? (
            <div className="tjs-iv-grid">
              {iv.forms.map((f, i) => (
                <a href={f.url} target="_blank" rel="noopener" className="tjs-iv-card" key={f.url + i}>
                  <div className="tjs-iv-card-head">
                    <h4>{f.title}</h4>
                    <i className="ri-download-2-line"></i>
                  </div>
                  {f.description && <p>{f.description}</p>}
                </a>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Forms will be added soon.</p>
          )}

          {iv.instructions.length > 0 && (
            <div className="tjs-iv-instructions">
              <h4>
                <i className="ri-error-warning-line"></i> {iv.instructionsTitle || "Important Instructions"}
              </h4>
              <ul>
                {iv.instructions.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
