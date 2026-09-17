"use client";

import { useRef, useState } from "react";

const AICTE_DOCS = [
  { year: "2026-27", file: "EOA Report 2026-2027.pdf" },
  { year: "2025-26", file: "EOA Report 2025-2026.PDF" },
  { year: "2024-25", file: "EOA Report 2024-2025.PDF" },
  { year: "2023-24", file: "AICTE APPROVAL EOA-Report 2023-2024.PDF" },
  { year: "2022-23", file: "AICTE APPROVAL EOA REPORT 2022-2023.PDF" },
  { year: "2021-22", file: "AICTE APPROVAL EOA Report  2021-2022.PDF" },
  { year: "2020-21", file: "AICTE APPROVAL EOA_Report_2020-21.PDF" },
  { year: "2019-20", file: "AICTE APRROVAL EOA Report 2019-2020.pdf" },
  { year: "2018-19", file: "AICTE APRROVAL EOA Report 2018-2019.PDF" },
  { year: "2017-18", file: "AICTE APRROVAL EOA Report 2017-2018.PDF" },
  { year: "2016-17", file: "AICTE APRROVAL EOA Report 2016-2017.PDF" },
  { year: "2015-16", file: "AICTE APRROVAL EOA Report 2015-2016.PDF" },
  { year: "2014-15", file: "AICTE APRROVAL EOA Report  2014-2015.PDF" },
  { year: "2013-14", file: "AICTE APRROVAL EOA Report  2013-2014.PDF" },
  { year: "2012-13", file: "AICTE APRROVAL EOA Report  2012-2013.PDF" },
  { year: "2011-12", file: "AICTE APRROVAL EOA Report  2011-2012.PDF" },
  { year: "2010-11", file: "Extension of Approval- 2010.pdf" },
  { year: "2009-10", file: "AICTE APPROVAL EOA REPORT 2009-2010.pdf" },
];

const ANNA_UNIV_DOCS = [
  { year: "2025-26", file: "2025-2026 ANNA UNIVERSITY AFFILIATION ORDER.pdf" },
  { year: "2024-25", file: "2024-2025 ANNA UNIVERSITY AFFILIATION ORDER.pdf" },
  { year: "2023-24", file: "2023-2024  ANNA UNIVERSITY AFFILIATION ORDER.pdf" },
  { year: "2022-23", file: "2022-2023 Anna University Affiliation.pdf" },
  { year: "2021-22", file: "2021-2022 Anna University Approval.pdf" },
  { year: "2020-21", file: "2020-2021  ANNA UNIVERSITY AFFILIATION.pdf" },
  { year: "2019-20", file: "2019-2020 Anna university approval 2019-2020.pdf" },
  { year: "2018-19", file: "2018 - 2019 Anna university approval 2018-2019.pdf" },
  { year: "2017-18", file: "2017 - 2018 Anna university approval 2017-2018.pdf" },
  { year: "2016-17", file: "2016-2017 Anna univ 2016-2017.pdf" },
  { year: "2015-16", file: "2015-2016 ANNA UNIVERSITY AFFILATION 2015-16.pdf" },
  { year: "2014-15", file: "2014 - 2015 Anna university approval 2014-2015.pdf" },
  { year: "2013-14", file: "2013 -2014 Anna university approval 2013-2014.pdf" },
  { year: "2012-13", file: "2012-2013 Anna university approval 2012-2013.pdf" },
  { year: "2011-12", file: "2011-2012 Anna Tech - 2011-2012 Approval Copy.pdf" },
  { year: "2010-11", file: "2010-2011 Anna University Affiliation 2010-2011.pdf" },
  { year: "2009-10", file: "2009-2010 ANNA UNIVERSITY APPROVAL.pdf" },
];

const UGC_DOCS = [
  { year: "Autonomous Approval (2025-2035)", file: "Anna University Autonomous approval letter 2025-2035.pdf" },
  { year: "UGC Certificate", file: "Autonomous certificate for UGC - T.J.S. Engineering College (1).pdf" },
];

const CATEGORIES = [
  { id: "aicte", label: "AICTE", title: "AICTE – Extension of Approval (EoA)", folder: "aicteapprovalcopy", docs: AICTE_DOCS },
  { id: "anna", label: "Anna University", title: "Anna University Affiliation Order", folder: "annauniversityaffiliationorder", docs: ANNA_UNIV_DOCS },
  { id: "ugc", label: "UGC", title: "Autonomous Status – UGC", folder: "autonomousapprovalugc", docs: UGC_DOCS },
];

function docUrl(folder, file) {
  return "/assets/pdf/" + folder + "/" + encodeURIComponent(file);
}

export default function ApprovalAffiliation() {
  const [activeCat, setActiveCat] = useState("aicte");
  const [activeYear, setActiveYear] = useState(AICTE_DOCS[0].year);
  const yearTabsRef = useRef(null);

  const category = CATEGORIES.find((c) => c.id === activeCat);
  const activeDoc = category.docs.find((d) => d.year === activeYear);

  function selectCategory(cat) {
    setActiveCat(cat.id);
    setActiveYear(cat.docs[0] ? cat.docs[0].year : null);
  }

  function scrollYearTabs(direction) {
    if (yearTabsRef.current) {
      yearTabsRef.current.scrollBy({ left: direction * 240, behavior: "smooth" });
    }
  }

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
          <span>Approval &amp; Affiliation</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Approval &amp; Affiliations
          </h2>

          <div className="tjs-approvals-layout">
            <aside className="tjs-approvals-sidebar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={"tjs-approvals-cat" + (activeCat === cat.id ? " active" : "")}
                  onClick={() => selectCategory(cat)}
                >
                  {cat.label}
                </button>
              ))}
            </aside>

            <div className="tjs-approvals-panel">
              <h3>{category.title}</h3>

              {category.docs.length > 0 ? (
                <>
                  <div className="tjs-approvals-year-tabs-row">
                    <button
                      type="button"
                      className="tjs-approvals-year-nav"
                      aria-label="Scroll years left"
                      onClick={() => scrollYearTabs(-1)}
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <div className="tjs-approvals-year-tabs" ref={yearTabsRef}>
                      {category.docs.map((doc) => (
                        <button
                          key={doc.year}
                          type="button"
                          className={"tjs-approvals-year" + (activeYear === doc.year ? " active" : "")}
                          onClick={() => setActiveYear(doc.year)}
                        >
                          {doc.year}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="tjs-approvals-year-nav"
                      aria-label="Scroll years right"
                      onClick={() => scrollYearTabs(1)}
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </div>

                  {activeDoc && (
                    <div className="tjs-approvals-viewer">
                      <iframe
                        key={activeDoc.file}
                        src={docUrl(category.folder, activeDoc.file)}
                        title={category.title + " " + activeDoc.year}
                      />
                    </div>
                  )}
                </>
              ) : (
                <p className="tjs-dept-pending">Documents will be added soon.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
