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

const COMMITTEE_MEMBERS = {
  antiragging: [
    { name: "Dr. J. Prakash", designation: "Principal", position: "Chairperson" },
    { name: "Mr. Ganesh", designation: "Gummidipoondi", position: "Representative" },
    { name: "Mr. Balaji", designation: "Tahsildar", position: "Enforcement" },
    { name: "Mr. A. Kabilan", designation: "Foundation", position: "NGO" },
    { name: "Mr. Vadivelan M", designation: "Lab Instructor", position: "Parent Representative" },
    { name: "Ms. Suriya L", designation: "Office Assistant", position: "Parent Representative" },
    { name: "Mr. M. Vidhuran Kumar", designation: "Assistant Professor", position: "Representative" },
    { name: "Mr. K. Richard", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. M. Rekha", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Mr. P. Prabhu", designation: "Librarian", position: "Non-Teaching Staff" },
    { name: "Mr. V. P. Govindharajulu", designation: "Dinathanthi / Malai Malar", position: "Local Media Representative" },
    { name: "Mohamme", designation: "AI&ML - Student", position: "Student Representative" },
    { name: "Ms. Samyuktha M R", designation: "CSE - Student", position: "Student Representative" },
    { name: "Ms. Bhavani R", designation: "AI&DS - Student", position: "Student Representative" },
    { name: "Mr. Akash V", designation: "EEE - Student", position: "Student Representative" },
    { name: "Ms. Lakshanya C S", designation: "Mech - Student", position: "Student Representative" },
  ],
  icc: [
    { name: "Ms. M. Shunmuga Sankari", designation: "Assistant Professor (SG)", position: "Presiding Officer" },
    { name: "Ms. P. Usha", designation: "Assistant Professor", position: "Volunteer - Abinayam" },
    { name: "Ms. J. Agnes", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Mr. A. Kabilan", designation: "Foundation", position: "NGO" },
    { name: "Ms. R. Durga Devi", designation: "Lab Demonstrator", position: "Non-Teaching Staff" },
    { name: "Mr. R. Magesh", designation: "Lab Instructor", position: "Non-Teaching Staff" },
    { name: "Ms. Kaviya Dharshini M", designation: "EEE - Student", position: "Student Representative" },
    { name: "Mr. Rithik Kumar U", designation: "CSE - Student", position: "Student Representative" },
    { name: "Ms. Abigail M", designation: "ECE - Student", position: "Student Representative" },
  ],
  scst: [
    { name: "Dr. J. Prakash", designation: "Principal", position: "Chairman" },
    { name: "Dr. S. VelMurugan", designation: "Professor", position: "Liaison Officer" },
    { name: "Dr. E. Sivakumar", designation: "Professor", position: "Representative" },
    { name: "Dr. M. Vijayaragavan", designation: "Associate Professor", position: "Faculty Representative" },
    { name: "Dr. J. P. Poornima", designation: "Assistant Professor", position: "Secretary" },
    { name: "Ms. P. Pavithra", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Mr. Murali Krishna S", designation: "Mech - Student", position: "Student Representative" },
    { name: "Ms. Keerthana B", designation: "IT - Student", position: "Student Representative" },
    { name: "Mr. Jagadish M", designation: "AI&DS - Student", position: "Student Representative" },
    { name: "Ms. Vijeesha P", designation: "EEE - Student", position: "Student Representative" },
    { name: "Mr. Ashwin A", designation: "ECE - Student", position: "Student Representative" },
  ],
  grievance: [
    { name: "Dr. P. Venkata Mohan Reddy", designation: "Professor", position: "Chairperson" },
    { name: "Dr. M. Sathya Priya", designation: "Associate Professor", position: "Representative" },
    { name: "Dr. R. Senthil Kumar", designation: "Associate Professor", position: "Representative" },
    { name: "Ms. Jayavani R", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. V. Pavithra", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Mr. S. RamKumar", designation: "Lab Instructor", position: "Non-Teaching Staff" },
    { name: "Ms. Charumathi K", designation: "EEE - Student", position: "Student Representative" },
    { name: "Mr. Kiranraj N C", designation: "Mech - Student", position: "Student Representative" },
    { name: "Mr. M. Gandhidhasan", designation: "IT - Student", position: "Sports Excellence" },
  ],
  discipline: [
    { name: "Dr. J. Prakash", designation: "Principal", position: "Chairman" },
    { name: "Dr. S. VelMurugan", designation: "Professor", position: "Faculty Representative" },
    { name: "Dr. E. Sivakumar", designation: "Professor", position: "Faculty Representative" },
    { name: "Dr. P. Subramanian", designation: "Associate Professor", position: "Faculty Representative" },
    { name: "Ms. M. Shunmuga Sankari", designation: "Assistant Professor (SG)", position: "Faculty Representative" },
    { name: "Mr. P. Senthil", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Dr. P. Venkata Mohan Reddy", designation: "Professor", position: "Faculty Representative" },
    { name: "Dr. C. Shalini", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Dr. N. Jayanthi", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Dr. S. Satheesh", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. K. E. Mohana Priya", designation: "Admin. Assistant", position: "Office Representative" },
    { name: "Mr. E. Rajesh", designation: "Physical Education Director", position: "Faculty Representative" },
    { name: "Mr. W. Wasim", designation: "Education", position: "Faculty Representative" },
  ],
  "flying-squad": [
    { name: "Dr. J. Prakash", designation: "Principal", position: "Head" },
    { name: "Dr. P. Venkata Mohan Reddy", designation: "Professor", position: "Faculty Representative" },
    { name: "Dr. S. VelMurugan", designation: "Professor", position: "Faculty Representative" },
    { name: "Ms. M. Shunmuga Sankari", designation: "Assistant Professor (SG)", position: "Faculty Representative" },
    { name: "Mr. M. Vinoth Kumar", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Dr. S. Satheesh", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Dr. K. R. Vivek", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. V. Pavithra", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Dr. C. Shalini", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Dr. S. Anitha", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. P. Pavithra", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. G. Gomathi", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. R. Durga Devi", designation: "Lab Demonstrator", position: "Non-Teaching Staff" },
    { name: "Ms. D. JayaPriya", designation: "Lab Demonstrator", position: "Non-Teaching Staff" },
    { name: "Mr. R. Magesh", designation: "Lab Instructor", position: "Non-Teaching Staff" },
    { name: "Mr. S. Dilli", designation: "Lab Instructor", position: "Non-Teaching Staff" },
    { name: "Mr. E. Rajesh", designation: "Physical Education Director", position: "Faculty Representative" },
    { name: "Mr. W. Wasim", designation: "Education", position: "Faculty Representative" },
  ],
  "women-empowerment": [
    { name: "Dr. J. Prakash", designation: "Principal", position: "Head" },
    { name: "Dr. C. Shalini", designation: "Assistant Professor", position: "Convenor" },
    { name: "Mr. A. Kabilan", designation: "Foundation", position: "NGO" },
    { name: "Ms. R. Jayavani", designation: "Assistant Professor", position: "Secretary" },
    { name: "Ms. P. Usha", designation: "Assistant Professor", position: "Volunteer - Abinayam" },
    { name: "Ms. Sarifa A", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. C. Anusha", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. G. Gomathi", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. R. Padmini", designation: "Assistant Professor", position: "Faculty Representative" },
    { name: "Ms. D. JayaPriya", designation: "Lab Demonstrator", position: "Non-Teaching Staff" },
    { name: "Ms. Mokshitha L", designation: "CSE - Student", position: "Student Representative" },
    { name: "Ms. Monika S", designation: "IT - Student", position: "Student Representative" },
    { name: "Ms. Mohana Priya B", designation: "AI&DS - Student", position: "Student Representative" },
    { name: "Ms. Sakthi Priya U", designation: "ECE - Student", position: "Student Representative" },
  ],
  "student-council": [
    { name: "Dr. J. Prakash", designation: "Principal", position: "Chairperson" },
    { name: "Dr. S. Satheesh", designation: "Assistant Professor", position: "Faculty Advisor" },
    { name: "Dr. S. Anitha", designation: "Assistant Professor", position: "Secretary" },
    { name: "Ms. M. Santhya", designation: "Assistant Professor", position: "Treasurer" },
    { name: "Ms. D. Priya", designation: "Assistant Professor", position: "Cultural Coordinator" },
    { name: "Dr. R. Senthil Kumar", designation: "Associate Professor", position: "Alumni Relations" },
    { name: "Ms. V. Geetha", designation: "Assistant Professor", position: "Welfare" },
    { name: "Mr. E. Rajesh", designation: "Physical Education Director", position: "Relations" },
    { name: "Ms. N. Anu", designation: "Assistant Professor", position: "Equality, Diversity and Inclusion" },
    { name: "Dr. M. Sathya Priya", designation: "Associate Professor", position: "Academic Affairs" },
    { name: "Mr. Harish Srinivas D", designation: "Student Representative", position: "Secretary - Boy" },
    { name: "Ms. H. Monika", designation: "Student Representative", position: "Secretary - Girl" },
  ],
  finance: [
    { name: "Dr. J. Prakash", designation: "Principal", position: "Chairman" },
    { name: "Dr. P. Subramanian", designation: "Associate Professor", position: "Governing Body Nominee" },
    { name: "Dr. R. Senthil Kumar", designation: "Associate Professor", position: "Senior Faculty Member" },
    { name: "Mr. S. Elumalai", designation: "Administrative Officer", position: "Finance Officer" },
  ],
};

function MembersTable({ members }) {
  return (
    <div className="tjs-dept-table-wrap">
      <table className="tjs-dept-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={m.name + i}>
              <td>{i + 1}</td>
              <td>{m.name}</td>
              <td>{m.designation}</td>
              <td>{m.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
                        <h4>Committee Members</h4>
                        <MembersTable members={COMMITTEE_MEMBERS.icc} />
                      </>
                    ) : COMMITTEE_MEMBERS[c.id] ? (
                      <MembersTable members={COMMITTEE_MEMBERS[c.id]} />
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
