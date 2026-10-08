const FORMS = [
  { label: "Industry Visit (IV) Form", desc: "Form to be filled before an industry visit.", file: "IVform.docx" },
  { label: "Industry Visit Form – TJSEC", desc: "TJSEC-specific industry visit form.", file: "IV-TJSEC.docx" },
  { label: "Industry Visit Form – Template", desc: "Blank template for industry visit requests.", file: "IV-Template.docx" },
  { label: "Long Term Internship Form", desc: "Form for long-term internship registration.", file: "TJSEC-Long Term Internship-Form.docx" },
  { label: "Internship Form (Short)", desc: "Form for short-term internship registration.", file: "Internship-Form-short.docx" },
  { label: "Placement Form", desc: "Form for placement registration.", file: "Placement.docx" },
  {
    label: "Skill Development Training & Campus Placement Willingness Form 2026",
    desc: "Willingness form for skill development training and campus placement.",
    file: "TJSEC-Skill Development Training & Campus Placement Willingness Form 2026.docx",
  },
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

          <div className="tjs-dept-grid-3" style={{ marginBottom: 32 }}>
            <div className="tjs-dept-card tjs-iv-step">
              <span className="tjs-iv-step-icon">
                <i className="ri-download-2-line"></i>
              </span>
              <div>
                <p className="tjs-iv-step-title">Step 1</p>
                <p className="tjs-iv-step-desc">Download the required forms</p>
              </div>
            </div>
            <div className="tjs-dept-card tjs-iv-step">
              <span className="tjs-iv-step-icon">
                <i className="ri-edit-2-line"></i>
              </span>
              <div>
                <p className="tjs-iv-step-title">Step 2</p>
                <p className="tjs-iv-step-desc">Fill and get necessary approvals</p>
              </div>
            </div>
            <div className="tjs-dept-card tjs-iv-step">
              <span className="tjs-iv-step-icon">
                <i className="ri-send-plane-2-line"></i>
              </span>
              <div>
                <p className="tjs-iv-step-title">Step 3</p>
                <p className="tjs-iv-step-desc">Submit to your department</p>
              </div>
            </div>
          </div>

          <div className="tjs-iv-grid">
            {FORMS.map((f) => (
              <a href={docUrl(f.file)} target="_blank" rel="noopener" className="tjs-iv-card" key={f.file}>
                <div className="tjs-iv-card-head">
                  <h4>{f.label}</h4>
                  <i className="ri-download-2-line"></i>
                </div>
                <p>{f.desc}</p>
              </a>
            ))}
          </div>

          <div className="tjs-iv-instructions">
            <h4>
              <i className="ri-error-warning-line"></i> Important Instructions
            </h4>
            <ul>
              <li>Fill in all details clearly</li>
              <li>Do not leave any field blank</li>
              <li>Obtain all required signatures before submission</li>
              <li>Submit before the deadline specified by your department</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
