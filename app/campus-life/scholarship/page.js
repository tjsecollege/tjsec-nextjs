"use client";

import { useState } from "react";

const SCHEMES = [
  {
    title: "Post-Matric Scholarship for Students with Disabilities",
    desc: "To support students with disabilities to study further in order to prepare themselves to earn their livelihood and to find a dignified place for themselves in society, as they face several barriers — physical, financial, and psychological — in pursuing studies and living with dignity.",
    links: [
      { label: "Guidelines", href: "https://scholarships.gov.in/public/schemeGuidelines/DEPDGuidelines_1.pdf" },
      { label: "FAQ", href: "https://scholarships.gov.in/public/schemeGuidelines/DEPDFAQ.pdf" },
    ],
  },
  {
    title: "Financial Assistance for Education of the Wards of Beedi/Cine/IOMC/LSDM Workers – Post-Matric",
    desc: "Financial assistance for the education of the wards of Beedi, Iron Ore Mines, Manganese Ore & Chrome Ore Mines (IOMC), Limestone Mines, Dolomite Mines (LSDM), Mica Mines, and Cine workers — currently varying from Rs. 1,000 to Rs. 25,000 per student per annum. Benefits are transferred through the DBT system, and applications are invited and processed through the National Scholarship Portal.",
    links: [
      {
        label: "Guidelines",
        href: "https://scholarships.gov.in/public/schemeGuidelines/Labour_Ministry_Guidelines_of_scholarhsips%20schemes.pdf",
      },
    ],
  },
  {
    title: "Central Sector Scheme of Scholarships for College and University Students",
    desc: "To provide financial assistance to meritorious students from poor families to help meet part of their day-to-day expenses while pursuing higher studies.",
    links: [
      { label: "Guidelines", href: "https://scholarships.gov.in/public/schemeGuidelines/CSSS_GUIDLINES_06022024.pdf" },
      { label: "FAQ", href: "https://scholarships.gov.in/public/schemeGuidelines/FAQ_DOHE_CSSS.pdf" },
    ],
  },
  {
    title: "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles",
    desc: "Introduced from the academic year 2006-07 under the aegis of the National Defence Fund to encourage higher technical and professional education for the dependent wards and widows of Central Armed Police Forces & Assam Rifles (CAPFs & AR) personnel. From 2019-20, the scheme was extended to the dependent wards of States/UTs Police personnel martyred during terror/Naxal attacks.",
    links: [
      {
        label: "Guidelines",
        href: "https://scholarships.gov.in/public/schemeGuidelines/warb/PMSS_Guidelines_1197_3001-2023-24.pdf",
      },
    ],
  },
  {
    title: "Prime Minister's Scholarship Scheme for RPF/RPSF",
    desc: "Announced under the aegis of the National Defence Fund and introduced from the academic year 2008-09 for RPF, to encourage higher technical and professional education for the dependent wards of Ex/Serving RPF/RPSF personnel and widows (below the rank of Gazetted officer).",
    links: [{ label: "Guidelines", href: "https://scholarships.gov.in/public/schemeGuidelines/MORB_GL.pdf" }],
  },
  {
    title: "PRAGATI Scholarship Scheme for Girl Students Only",
    desc: "Implemented by AICTE to provide assistance for the advancement of girls pursuing technical education — an attempt to give young women the opportunity to further their education and prepare for a successful future by “Empowering Women through Technical Education.”",
    links: [
      { label: "Guidelines", href: "https://scholarships.gov.in/public/schemeGuidelines/AICTE/AICTE_2010_G.pdf" },
      { label: "FAQ", href: "https://scholarships.gov.in/public/schemeGuidelines/AICTE/AICTE_2010_F.pdf" },
    ],
  },
  {
    title: "SAKSHAM Scholarship Scheme for Specially Abled Students",
    desc: "An MHRD scheme implemented by AICTE to provide encouragement and support to specially-abled students to pursue technical education, giving them the opportunity to study further and prepare for a successful future through technical education and knowledge.",
    links: [
      { label: "Guidelines", href: "https://scholarships.gov.in/public/schemeGuidelines/AICTE/AICTE_2012_G.pdf" },
      { label: "FAQ", href: "https://scholarships.gov.in/public/schemeGuidelines/AICTE/AICTE_2012_F.pdf" },
    ],
  },
  {
    title: "AICTE SWANATH Scholarship Scheme",
    desc: "Implemented by AICTE to provide encouragement and support to orphans, wards of parents who died due to Covid-19, and wards of Armed Forces and Central Paramilitary Forces martyred in action (Shaheed) to pursue education in AICTE-approved institutions and courses.",
    links: [
      {
        label: "Guidelines",
        href: "https://www.aicte.gov.in/sites/default/files/stdc/AICTE%20SWANATH%20SCHEME%20GUIDELINES.pdf",
      },
    ],
  },
  {
    title: "Pudhumai Penn Scheme for Girl Students",
    links: [{ label: "Guidelines", href: "https://www.pudhumaipenn.tn.gov.in/" }],
  },
  {
    title: "Tamil Pudhalvan",
    links: [
      {
        label: "Scheme Details",
        href: "http://tnsocialwelfare.tn.gov.in/en/specilisationswoman-welfare/tamil-pudhalvan",
      },
    ],
  },
];

export default function Scholarship() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Campus Life</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Scholarship</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Scholarship
          </h2>

          <div className="tjs-scholarship-cta">
            <a
              className="tjs-scholarship-cta-btn tjs-scholarship-cta-blue"
              href="https://scholarships.gov.in/"
              target="_blank"
              rel="noopener"
            >
              Visit &ndash; National Scholarship Portal <i className="ri-external-link-line"></i>
            </a>
          </div>

          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            List of Scholarship
          </h2>

          <div className="tjs-committee-list tjs-scholarship-accordion">
            {SCHEMES.map((s, i) => (
              <div className="tjs-committee-item" key={s.title}>
                <button
                  type="button"
                  className={"tjs-committee-toggle" + (openIndex === i ? " active" : "")}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <span>{s.title}</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                {openIndex === i && (
                  <div className="tjs-committee-body">
                    {s.desc && <p>{s.desc}</p>}
                    <div>
                      {s.links.map((l) => (
                        <a
                          className={
                            "tjs-scholarship-link-btn " +
                            (l.label === "FAQ" ? "tjs-scholarship-link-faq" : "tjs-scholarship-link-guidelines")
                          }
                          href={l.href}
                          target="_blank"
                          rel="noopener"
                          key={l.href}
                        >
                          {l.label} <i className="ri-external-link-line"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
