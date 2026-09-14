"use client";

import { useState } from "react";

const COMMITTEES = [
  { id: "antiragging", name: "Antiragging Committee" },
  { id: "icc", name: "Internal Committee (ICC)" },
  { id: "scst", name: "SC/ST Committee" },
  { id: "grievance", name: "Student Grievance Redressal Committee" },
  { id: "discipline", name: "Discipline and Welfare Committee" },
  { id: "flying-squad", name: "Campus Monitoring and Flying Squad" },
  { id: "women-empowerment", name: "Women Empowerment Cell" },
  { id: "student-council", name: "Student Council" },
  { id: "finance", name: "Finance Committee" },
];

const ICC_UGC_RESPONSIBILITIES = [
  "Creating awareness among students, faculty, staff, and other members of the institution about the Internal Complaints Committee (ICC) and its functions.",
  "Taking proactive measures to prevent all forms of sexual harassment and discrimination on campus.",
  "Ensuring that complaints of sexual harassment are addressed promptly, fairly, confidentially, and in accordance with applicable regulations.",
  "Treating sexual harassment by employees as misconduct under the applicable service rules and taking appropriate action.",
  "Treating sexual harassment by students as a violation of institutional disciplinary rules and taking appropriate action.",
  "Providing appropriate mechanisms to protect students, research scholars, faculty, and staff from harassment and discrimination.",
  "Promoting awareness of ethical conduct, gender sensitivity, dignity, equality, and mutual respect throughout the institution.",
];

const POSH_OBJECTIVES = [
  "Promoting awareness about the provisions of the PoSH Act, 2013.",
  "Creating a campus environment free from sexual harassment and discrimination.",
  "Sensitizing students, faculty, and staff about gender equality, dignity, and respectful behaviour.",
  "Providing appropriate mechanisms for reporting and addressing complaints.",
  "Ensuring that complaints are handled with sensitivity, confidentiality, fairness, and within the prescribed time frame.",
  "Conducting awareness programmes, sensitization sessions, and campaigns on gender-related issues and institutional codes of conduct.",
  "Promoting gender harmony and mutual respect among students and employees.",
  "Encouraging a culture where prevention, awareness, and responsible conduct are given priority.",
];

export default function Committees() {
  const [open, setOpen] = useState("icc");

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
          <span>Committees</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Institutional Committees
          </h2>

          <div className="tjs-committee-list">
            {COMMITTEES.map((c, i) => (
              <div className="tjs-committee-item" key={c.id}>
                <button
                  type="button"
                  className={"tjs-committee-toggle" + (open === c.id ? " active" : "")}
                  onClick={() => setOpen(open === c.id ? null : c.id)}
                >
                  <span>
                    {i + 1}. {c.name}
                  </span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>

                {open === c.id && (
                  <div className="tjs-committee-body">
                    {c.id === "icc" ? (
                      <>
                        <h4>ICC &ndash; In Brief</h4>
                        <p>
                          A safe and respectful workplace is a fundamental right of every woman. The
                          Constitutional principles of equality, non-discrimination, and personal liberty are
                          reflected in Articles 14, 15, and 21 of the Constitution of India.
                        </p>
                        <p>
                          The Sexual Harassment of Women at Workplace (Prevention, Prohibition and
                          Redressal) Act, 2013 (PoSH Act) was enacted to provide protection against sexual
                          harassment of women at the workplace and to ensure a safe, secure, and dignified
                          working environment.
                        </p>
                        <p>The Act emphasizes three key responsibilities:</p>
                        <ul>
                          <li>
                            <strong>Prohibition</strong> &ndash; Prohibit sexual harassment at the workplace.
                          </li>
                          <li>
                            <strong>Prevention</strong> &ndash; Take proactive measures to prevent incidents
                            of sexual harassment.
                          </li>
                          <li>
                            <strong>Redressal</strong> &ndash; Provide an effective and confidential
                            mechanism for addressing complaints.
                          </li>
                        </ul>
                        <p>
                          The Supreme Court of India has recognized sexual harassment as a violation of a
                          woman&apos;s fundamental rights to equality and dignity. It has also placed an
                          obligation on institutions and persons in positions of responsibility to ensure a
                          safe and respectful environment.
                        </p>
                        <p>
                          The PoSH Act, 2013, along with the Sexual Harassment of Women at Workplace
                          (Prevention, Prohibition and Redressal) Rules, 2013, provides a legal framework for
                          the prevention and redressal of complaints of sexual harassment.
                        </p>
                        <p>
                          Educational institutions and workplaces are required to establish an appropriate
                          mechanism for receiving and addressing complaints of sexual harassment. The
                          Internal Complaints Committee (ICC) plays an important role in ensuring that
                          complaints are handled in a fair, confidential, and time-bound manner.
                        </p>
                        <p>
                          The ICC at T.J.S. Engineering College is committed to promoting a safe, inclusive,
                          respectful, and harassment-free environment for women and to creating awareness
                          about their rights and responsibilities.
                        </p>

                        <h4>UGC Guidelines on ICC</h4>
                        <p>
                          Higher Educational Institutions (HEIs) are expected to take proactive measures to
                          prevent and address sexual harassment and to ensure a safe and inclusive campus
                          environment. The key responsibilities include:
                        </p>
                        <ul>
                          {ICC_UGC_RESPONSIBILITIES.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <p>
                          The objective is to create an educational environment where every individual can
                          learn, work, and participate without fear, discrimination, harassment, or
                          intimidation.
                        </p>

                        <h4>PoSH Cell &ndash; Anna University</h4>
                        <p>
                          The PoSH Cell is committed to creating a safe, inclusive, and respectful
                          environment for students, faculty, and staff. It focuses on creating awareness
                          about gender equality, preventing discrimination and sexual harassment, and
                          ensuring appropriate redressal of complaints.
                        </p>
                        <p>The major objectives include:</p>
                        <ul>
                          {POSH_OBJECTIVES.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>

                        <h4>Our Commitment</h4>
                        <p>
                          Creating a safe campus is a shared responsibility. Prevention of sexual harassment
                          requires awareness, respect, sensitivity, and responsible behaviour from every
                          member of the institution.
                        </p>
                        <p>
                          <strong>Prevention is the first step towards building a safe, inclusive, and dignified campus for everyone.</strong>
                        </p>
                        <p className="tjs-dept-pending">Committee members will be added soon.</p>
                      </>
                    ) : (
                      <p className="tjs-dept-pending">Committee members will be added soon.</p>
                    )}
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
