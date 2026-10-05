const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const FORMS = [
  { label: "Industry Visit (IV) Form", file: "IVform.docx" },
  { label: "Industry Visit Form – TJSEC", file: "IV-TJSEC.docx" },
  { label: "Industry Visit Form – Template", file: "IV-Template.docx" },
  { label: "Long Term Internship Form", file: "TJSEC-Long Term Internship-Form.docx" },
  { label: "Internship Form (Short)", file: "Internship-Form-short.docx" },
  { label: "Placement Form", file: "Placement.docx" },
  { label: "Skill Development Training & Campus Placement Willingness Form 2026", file: "TJSEC-Skill Development Training & Campus Placement Willingness Form 2026.docx" },
];

function docUrl(file) {
  return "/assets/images/iv_form/" + encodeURIComponent(file);
}

export default function IVForms() {
  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Industry Interface</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Industry Visit (IV) Forms</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Industry Visit (IV) Forms
          </h2>

          <div className="tjs-dept-link-list">
            {FORMS.map((f) => (
              <a href={docUrl(f.file)} target="_blank" rel="noopener" key={f.file}>
                <span>{f.label}</span>
                <span className="tjs-dept-link-arrow">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
