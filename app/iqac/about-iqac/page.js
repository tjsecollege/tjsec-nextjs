"use client";

import { useState } from "react";

const NAAC_GRADE_SHEET = [
  { label: "Cycle – I", url: "https://tjsec.in/wp-content/uploads/2025/10/NAAC-Grade_Sheet-Cycle-I.pdf" },
  { label: "Cycle – II", url: "https://tjsec.in/wp-content/uploads/2025/10/NAAC-Grade_Sheet-Cycle-II.pdf" },
];

const AQAR_DOCS = [
  { year: "2018-2019", url: "https://tjsec.in/wp-content/uploads/2024/02/AQAR-REPORT-2018-19.pdf" },
  { year: "2019-2020", url: "https://tjsec.in/wp-content/uploads/2022/03/AQAR-REPORT-2019-2020.pdf" },
  { year: "2020-2021", url: "https://tjsec.in/wp-content/uploads/2023/04/2020-2021-AQAR.pdf" },
  { year: "2021-2022", url: "https://tjsec.in/wp-content/uploads/2024/11/AQAR-2021-22.pdf" },
  { year: "2023-2024", url: "https://tjsec.in/wp-content/uploads/2025/03/AQAR-2023-24-REPORT.pdf" },
];

const ANNUAL_REPORTS = [
  { year: "2018-2019", url: "https://tjsec.in/wp-content/uploads/2024/11/2018-19-1.pdf" },
  { year: "2019-2020", url: "https://tjsec.in/wp-content/uploads/2024/11/2019-20-1.pdf" },
  { year: "2020-2021", url: "https://tjsec.in/wp-content/uploads/2024/11/2020-21-1.pdf" },
  { year: "2021-2022", url: "https://tjsec.in/wp-content/uploads/2024/11/2021-22-1.pdf" },
  { year: "2022-2023", url: "https://tjsec.in/wp-content/uploads/2024/11/2022-23-1.pdf" },
  { year: "2023-2024", url: "https://tjsec.in/wp-content/uploads/2025/01/Annual-Report-2023-24.pdf" },
];

const AISHE_DOCS = [
  { year: "2020-2021", url: "http://tjsec.in/wp-content/uploads/2022/04/C-16619-Certificate.pdf" },
  { year: "2021-2022", url: "https://tjsec.in/wp-content/uploads/2023/02/AISHE-2021-2022-CERTIFICATE.pdf" },
  { year: "2022-2023", url: "https://tjsec.in/wp-content/uploads/2024/03/AISHE-2023-certificateold.pdf" },
];

const MINUTES_DOCS = [
  { year: "2018-2019", url: "http://tjsec.in/wp-content/uploads/2024/10/IQAC-2018-2019.pdf" },
  { year: "2019-2020", url: "https://tjsec.in/wp-content/uploads/2024/10/IQAC-2019-2020.pdf" },
  { year: "2020-2021", url: "http://tjsec.in/wp-content/uploads/2024/10/IQAC-2020-2021.pdf" },
  { year: "2021-2022", url: "https://tjsec.in/wp-content/uploads/2024/10/IQAC-2021-2022.pdf" },
  { year: "2022-2023", url: "https://tjsec.in/wp-content/uploads/2024/10/IQAC-2022-2023.pdf" },
  { year: "2023-2024", url: "https://tjsec.in/wp-content/uploads/2025/01/IQAC-MINUTES-2023-24.pdf" },
];

const EXTERNAL_AUDIT_DOCS = [
  { year: "2018-2019", url: "https://tjsec.in/wp-content/uploads/2024/11/2018-19.pdf" },
  { year: "2019-2020", url: "https://tjsec.in/wp-content/uploads/2024/11/2019-20.pdf" },
  { year: "2020-2021", url: "https://tjsec.in/wp-content/uploads/2024/11/2020-21.pdf" },
  { year: "2021-2022", url: "https://tjsec.in/wp-content/uploads/2024/11/2021-22.pdf" },
  { year: "2022-2023", url: "https://tjsec.in/wp-content/uploads/2024/11/2022-23.pdf" },
];

const FEEDBACK_FORMS = [
  { label: "Students Feedback Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSdM0ctP0YngIiKHXweBnbBbrVnGlz6POQyASgPOiofxMf4tig/viewform" },
  { label: "Alumni Feedback Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSe9WenIygFB-EkgM9-TC4fMmpp9MqGSqVYWOXJNJfWi7qxaAw/viewform" },
  { label: "Teachers Feedback Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSe7XUBI476BffmxnhnzKHvds22YIsoaKMSVnA_gfvBKuZVgQQ/viewform" },
  { label: "Employers Feedback Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSc2MxAeN1ZIYoXpebO8wBOpzDnbPB85N1RQ1aXmvE1Lx0sDJA/viewform" },
];

const COMPOSITION_GROUPS = [
  { no: 1, criteria: "Management Representative", members: [{ name: "Mr. A. Kabilan", designation: "Director – T.J.S Group of Institutions" }] },
  { no: 2, criteria: "Chairperson – Head of the Institution", members: [{ name: "Dr. J. Prakash", designation: "Principal" }] },
  { no: 3, criteria: "Academic Advisor", members: [{ name: "Dr. P. Parthiban", designation: "Associate Professor – NIT Trichy" }] },
  { no: 4, criteria: "Management Nominee", members: [{ name: "Mr. S. Elumalai", designation: "Administrative Officer" }] },
  { no: 5, criteria: "IQAC Coordinator", members: [{ name: "Dr. E. Sivakumar", designation: "Professor & Head – MECH" }] },
  {
    no: 6,
    criteria: "Faculty Members",
    members: [
      { name: "Dr. S. Velmurugan", designation: "HOD / ECE" },
      { name: "Dr. M. SathyaPriya", designation: "Associate Professor – ECE" },
      { name: "Dr. S. Arjunan", designation: "Professor & Head – S&H" },
      { name: "Mrs. M. Shunmuga Sankari", designation: "Associate Professor & Head – EEE" },
      { name: "Dr. R. Senthil Kumar", designation: "Associate Professor – S&H" },
      { name: "Mrs. C. Agnes", designation: "Assistant Professor – CSE" },
      { name: "Mr. M. Prakash", designation: "Assistant Professor – MECH" },
      { name: "Mrs. C. Shalini", designation: "Assistant Professor – ECE" },
    ],
  },
  { no: 7, criteria: "Nominee from the Alumni", members: [{ name: "Mr. S. Nigamanandha Sharma", designation: "Senior Analyst – Capgemini" }] },
  { no: 8, criteria: "Nominee from Local Society", members: [{ name: "Mr. P. Ravikumar", designation: "Director – Redfine HR" }] },
  { no: 9, criteria: "Nominee from Student", members: [{ name: "Mr. Bharath Kumar", designation: "IV Yr – MECH" }] },
  { no: 10, criteria: "Nominee from Employer", members: [{ name: "Mr. M.R. Ramesh", designation: "Asst. General Manager, Western Thomson (India) Limited" }] },
  { no: 11, criteria: "Nominee from Industrialist", members: [{ name: "Dr. N. Subramani", designation: "Managing Director, Malathi Engineering" }] },
  { no: 12, criteria: "Nominee from Parent", members: [{ name: "Dr. Mohammed Abdul Saleem", designation: "Quality Analyst – Cameo" }] },
];

function LinkList({ items, keyField, urlField, iconClass }) {
  return (
    <div className="tjs-dept-link-list">
      {items.map((item) => (
        <a href={item[urlField]} target="_blank" rel="noopener" key={item[keyField]}>
          <span>{item[keyField]}</span>
          <span className="tjs-dept-link-arrow">
            <i className={iconClass || "ri-file-pdf-2-line"}></i>
          </span>
        </a>
      ))}
    </div>
  );
}

const CATEGORIES = [
  { id: "about", label: "About IQAC" },
  { id: "naac", label: "NAAC Grade Sheet" },
  { id: "qaf", label: "Quality Assurance Framework" },
  { id: "composition", label: "IQAC Composition" },
  { id: "practices", label: "Best Practices" },
  { id: "distinctiveness", label: "Distinctiveness" },
  { id: "aqar", label: "AQAR" },
  { id: "annual", label: "Annual Reports" },
  { id: "aishe", label: "AISHE" },
  { id: "minutes", label: "Minutes of Meeting & ATR" },
  { id: "audit", label: "External Audit Reports" },
  { id: "syllabus", label: "Design & Review of Syllabus" },
  { id: "contact", label: "Contact Us" },
];

export default function AboutIQAC() {
  const [activeCat, setActiveCat] = useState("about");

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>IQAC</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>About IQAC</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Internal Quality Assurance Cell
          </h2>

          <div className="tjs-approvals-layout">
            <aside className="tjs-approvals-sidebar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={"tjs-approvals-cat" + (activeCat === cat.id ? " active" : "")}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </aside>

            <div className="tjs-approvals-panel">
              {activeCat === "about" && (
                <div className="tjs-committee-body">
                  <h4>About IQAC</h4>
                  <p>
                    Quality Sustenance and Quality Enhancement of education in institutions is one of the
                    major challenges of higher education. In order to institutionalize the process of
                    quality enhancement, the Internal Quality Assurance Cell (IQAC) was established in 2015
                    at our institute.
                  </p>
                  <p>
                    IQAC is established to review and develop a system of conscious, regular and catalytic
                    action to improve the teaching learning process, the evaluation procedure and the
                    quality improvement of students and faculty. Internal auditing of the Institute, faculty
                    and staff members is regularly done by the IQAC for continuous improvement.
                  </p>

                  <h4>Vision</h4>
                  <p>
                    To build a quality culture as the prime concern by institutionalizing and internalizing
                    all the initiatives taken with internal and external support.
                  </p>

                  <h4>Mission</h4>
                  <ul>
                    <li>Conducting regular assessments of teaching, learning, research, and extension activities.</li>
                    <li>Creating a supportive infrastructure environment conducive to quality teaching and learning.</li>
                    <li>Facilitating faculty development to embrace knowledge and technology for collaborative teaching and learning processes.</li>
                    <li>Collaborating with various stakeholders for the evaluation, promotion, and sustainability of quality standards.</li>
                    <li>Encouraging to organize a greater number of Seminars, Conferences, and Workshops.</li>
                    <li>Implementing a structured feedback mechanism from students, alumnae, parents, and other stakeholders.</li>
                  </ul>

                  <h4>Objectives</h4>
                  <p>The broadly defined objectives of IQAC include (but are not limited to):</p>
                  <ul>
                    <li>To develop a system for conscious, consistent, and catalytic action to improve the academic and administrative performance of the institution.</li>
                    <li>To create a good quality culture.</li>
                    <li>To channelize the efforts and measures of the institution towards academic excellence.</li>
                    <li>To become a potential vehicle for ushering in quality by working out intervention strategies to remove deficiencies and enhance quality.</li>
                  </ul>

                  <h4>Strategies</h4>
                  <p>In order to ensure quality sustenance and enhancement, IQAC shall evolve mechanisms and procedures for:</p>
                  <ul>
                    <li>Ensuring timely, efficient and progressive performance of academic, administrative and financial tasks.</li>
                    <li>The relevance and quality of academic and research programs.</li>
                    <li>Equitable access to and affordability of academic programs to suit various sections of the society.</li>
                    <li>Optimization and integration of modern methods of teaching and learning.</li>
                    <li>The credibility of evaluation procedures.</li>
                    <li>Ensuring the adequacy and functioning of the support structure and services.</li>
                    <li>Research sharing and networking with other institutions in India and abroad.</li>
                  </ul>

                  <h4>Functions</h4>
                  <p>The primary functions of the IQAC include (but are not limited to):</p>
                  <ul>
                    <li>Development and application of quality benchmarks/parameters for the various academic and administrative activities of the institution.</li>
                    <li>Dissemination of information on the various quality parameters of higher education.</li>
                    <li>Organization of workshops, seminars on quality-related themes and promotion of quality circles.</li>
                    <li>Documentation of the various programs/activities leading to quality improvement.</li>
                    <li>Acting as a nodal agency of the institution for quality-related activities.</li>
                    <li>Preparation of the Annual Quality Assurance Report (AQAR) to be submitted to NAAC based on the quality parameters.</li>
                  </ul>

                  <h4>Benefits</h4>
                  <p>IQAC will facilitate/contribute:</p>
                  <ul>
                    <li>To a heightened level of clarity and focus in institutional functioning towards quality enhancement and facilitate internalization of the quality culture.</li>
                    <li>To the enhancement and integration among the various activities of the institution and institutionalize many good practices.</li>
                    <li>To provide a sound basis for decision making to improve institutional functioning.</li>
                    <li>To act as an improvement agent in the institution.</li>
                    <li>To improve internal communication.</li>
                  </ul>

                  <img
                    src="/assets/images/iqac_1.jpg"
                    alt="IQAC Quality Assurance Framework: Planning, Evaluate, Analyze, Improve"
                    className="tjs-iqac-diagram"
                  />
                </div>
              )}

              {activeCat === "naac" && (
                <div className="tjs-committee-body">
                  <h4>NAAC Grade Sheet</h4>
                  <LinkList items={NAAC_GRADE_SHEET} keyField="label" urlField="url" />
                </div>
              )}

              {activeCat === "qaf" && (
                <div className="tjs-committee-body">
                  <h4>Quality Assurance Framework</h4>
                  <p>
                    Quality assurance involves all activities in the institute that are necessary for
                    fulfilling the purposes of sustaining high quality education and educational services.
                    It aims at:
                  </p>
                  <ul>
                    <li>Ensuring continuous enhancement of the quality education.</li>
                    <li>Maintaining consistency and effectiveness in quality assurance activities.</li>
                    <li>Promoting the culture of quality assurance system.</li>
                  </ul>

                  <h4>Objectives of IQAC</h4>
                  <p>The institute Quality Assurance System is established to:</p>
                  <ul>
                    <li>Set quality performance indicators in domains of teaching, research and administration pertaining to departments/programs and other units of the institution.</li>
                    <li>Develop benchmarks for quality performance indicators.</li>
                    <li>
                      Develop strategies to evaluate quality performance indicators &ndash; evolve and
                      implement self-evaluation proforma for faculty members and executives, stakeholders&apos;
                      feedback assessment, and facilitate periodic academic and administrative audit.
                    </li>
                    <li>Develop strategies to improve quality in alignment with the institute&apos;s mission and vision, the strategic plan and the academic development plan of the institute.</li>
                  </ul>

                  <h4>Elements of the Framework</h4>
                  <ul>
                    <li>Quality Assurance Policy and the mechanism for continuous review of the Quality Assurance Systems.</li>
                    <li>Guidelines for various academic processes.</li>
                    <li>Collection of feedback information for monitoring the operation of various academic processes.</li>
                    <li>Follow-up actions, continuous improvement of the academic quality.</li>
                  </ul>

                  <h4>Quality Assurance Committee</h4>
                  <p>
                    The Quality Assurance Office (QAO) is established to provide administration support to
                    the Quality Assurance Committee (QAC) of the College. The QAC is established to:
                  </p>
                  <ul>
                    <li>Promote quality assurance and foster a culture of quality assurance.</li>
                    <li>Advise on policies and procedures for approval, monitoring and review of programmes.</li>
                    <li>Audit the effectiveness and operation of the quality assurance system so as to maintain quality and to overview the quality and standards of all programmes.</li>
                  </ul>

                  <h4>Guiding Principles</h4>
                  <ul>
                    <li>Involvement of stakeholders to evaluate the set quality performance indicators.</li>
                    <li>Feedback collection, analysis and dissemination of relevant information citing concerns where improvement measures should be taken.</li>
                    <li>To facilitate accreditation and review processes through involving external agencies.</li>
                  </ul>

                  <h4>Broad Functions of IQAC</h4>
                  <ul>
                    <li>Review of Institutional and Departmental Vision and Mission.</li>
                    <li>Contribute to preparation of SAR, especially information related to institutional and finance.</li>
                    <li>Develop faculty self-appraisal questionnaire and student feedback questionnaire.</li>
                    <li>Assess faculty performance annually.</li>
                    <li>Develop a description of the process with questionnaires and tools required for continuous assessment.</li>
                    <li>Decide frequency of assessment of POs &ndash; internal and external.</li>
                    <li>Assessment and revision of PEOs.</li>
                    <li>Prepare and finalize the PEOs and POs/PSOs, align them with the Mission and write the process of development of PEOs and POs.</li>
                    <li>Take corrective actions and additional inputs for meeting POs/PSOs.</li>
                    <li>Obtain COs from respective faculty for concerned PO along with their alignment with PO, Bloom&apos;s Taxonomy and target of expected achievements.</li>
                    <li>Conduct assessment of placement record for ensuring PEOs attainment or revision if required.</li>
                    <li>Conduct assessment of curriculum and resources available to meet the developed PEOs and POs, decide additional courses/contents, professional/open electives to bridge the gaps, and inform shortfalls in resources to the Institutional Core Committee.</li>
                    <li>Supervise the COs and their alignment to POs, question banks, assignments, tests, quiz activities, and Bloom&apos;s Taxonomy, ensuring targets set by faculty are realistic.</li>
                    <li>Develop common Performance Indicators for respective courses aligned to the PO.</li>
                    <li>Conduct Semester End Examination (SEE) analysis of results and achievement of POs/PSOs for all departments.</li>
                    <li>Analyze student examination (SEE/CIE) question papers for respective courses aligned to the PO and analyze the average achievement of performance.</li>
                    <li>Hold discussions with concerned faculty on shortfalls for the achievement of pre-set targets.</li>
                    <li>Prepare and conduct indirect assessment and prepare reports.</li>
                    <li>Prepare annual report of success/failures on various parameters.</li>
                    <li>Monitor progress periodically and collect recommendations for improvements.</li>
                    <li>Maintain and update the website.</li>
                  </ul>
                </div>
              )}

              {activeCat === "composition" && (
                <div className="tjs-committee-body">
                  <h4>Composition of Internal Quality Assurance Cell</h4>
                  <div className="tjs-dept-table-wrap">
                    <table className="tjs-dept-table">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Composition Criteria (NAAC)</th>
                          <th>Name</th>
                          <th>Designation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COMPOSITION_GROUPS.map((group) =>
                          group.members.map((member, i) => (
                            <tr key={group.no + "-" + i}>
                              {i === 0 && <td rowSpan={group.members.length}>{group.no}</td>}
                              {i === 0 && <td rowSpan={group.members.length}>{group.criteria}</td>}
                              <td>
                                <strong>{member.name}</strong>
                              </td>
                              <td>{member.designation}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeCat === "practices" && (
                <div className="tjs-committee-body">
                  <h4>Best Practice I &ndash; Skill Enhancement Training</h4>
                  <p>
                    <strong>Objective:</strong> To enhance career skill sets of students; make them competent
                    and employable in multinational industries; and help them understand employer
                    expectations in the recruitment process through proper training.
                  </p>
                  <p>
                    <strong>The Context:</strong> TJSEC believes academic education forms the foundation of a
                    student&apos;s learning journey and that skills enhancement is equally important in
                    exposing their full potential. The skill enhancement training, designed by the placement
                    cell, identifies above-average students as advanced learners and initiates them into
                    programmes that cultivate career development, employability, problem-solving ability,
                    self-confidence, and life skills.
                  </p>
                  <p>
                    <strong>The Practice:</strong> The institution offers career development programmes to
                    advanced learners, appointing trainers to cover Presentation Skills, Interpersonal
                    Skills, Personal Grooming, Logical Reasoning, Verbal Reasoning, Situational Conversation,
                    Team Building, Group Discussion, and Planning and Goal Setting.
                  </p>
                  <p>
                    <strong>Evidence of Success:</strong> Growth in placements after these initiatives; 75% of
                    qualified students placed successfully; improved average salary packages; and a rise in
                    the number of companies visiting for campus placement.
                  </p>
                  <p>
                    <strong>Problems Encountered:</strong> Students need to stay highly focused to attend
                    enhancement training; more e-resources, books and e-journals are needed for better
                    learning and research; and more advanced experimental-based learning would further
                    enhance specialization.
                  </p>

                  <h4>Best Practice II &ndash; Remedial Measures for Slow Learners</h4>
                  <p>
                    <strong>Objective:</strong> To overcome challenges in accomplishing academic success,
                    foster an optimistic and comprehensive learning environment, and enhance the academic
                    performance of slow learners.
                  </p>
                  <p>
                    <strong>The Context:</strong> TJSEC is committed to improving the academic performance of
                    enrolled students. Faculty identify slow learners based on performance in previous
                    examinations, continuous monitoring, and willingness to learn, and adopt remedial
                    measures to eliminate their weaknesses or deficiencies.
                  </p>
                  <p>
                    <strong>The Practice:</strong> Each department prepares a remedial timetable; slow learners
                    receive additional study material and are encouraged to solve previous university exam
                    papers. Concept clarification, bilingual explanations, discussions, problem-solving
                    activities, slip tests, and first/last-hour tests are followed in every department.
                  </p>
                  <p>
                    <strong>Evidence of Success:</strong> Enhanced performance in internal assessments and
                    end-semester exams; reduced exam-time preparation burden; increased classroom
                    interaction; and improved self-confidence among students.
                  </p>
                  <p>
                    <strong>Problems Encountered:</strong> Slow learners struggle to concentrate for long
                    periods, to remember lessons, and to grasp concepts due to language barriers; the Anna
                    University-prescribed span per semester is short to cover the syllabus.
                  </p>
                </div>
              )}

              {activeCat === "distinctiveness" && (
                <div className="tjs-committee-body">
                  <h4>Institutional Distinctiveness</h4>
                  <ul>
                    <li>
                      T.J.S Engineering College stands over an area of 11.2 acres in Kavarapettai near
                      Chennai (NH5). It was established in the year 2009, by a unit of the T.J. Sivananda
                      Mudaliar Educational Trust, with a passion to serve young minds with quality education,
                      blending traditional values, modern facilities and professional ethics.
                    </li>
                    <li>
                      One of the distinctive traits of the institute is the support it renders to slow
                      learners, particularly from rural areas, to access progressive ambitions in the path of
                      Engineering.
                    </li>
                    <li>
                      Students are identified and screened at the higher secondary level and categorized into
                      slow learners and advanced learners, with faculty providing guidance as per specific
                      requirements through our programmes.
                    </li>
                    <li>
                      The college also provides holistic teacher training programmes for school teachers not
                      aware of updated practices and methodologies in education.
                    </li>
                    <li>
                      <strong>Student Progression Facilities</strong> &ndash; seminars, conferences, sports and
                      cultural programmes, with rewards such as trophies, prizes, certificates and
                      scholarships; supported by the Psychological Counselling Cell, NSS, EDC, and Placement
                      and Career Guidance Cell.
                    </li>
                    <li>
                      <strong>Induction Programme</strong> &ndash; an Orientation Programme welcoming
                      first-year students with a bird&apos;s-eye view of engineering scopes and career
                      prospects.
                    </li>
                    <li>
                      <strong>Faculty Development Programme</strong> &ndash; ICT-based teaching methods,
                      capability development, and soft-skills workshops; over 10 development programmes have
                      been conducted for more than 500 school teachers.
                    </li>
                    <li>
                      <strong>Career Development Programme</strong> &ndash; reaching more than 150 schools in
                      and around Chennai and Tiruvallur districts, enlightening over 15,000 students on
                      meaningful career and education pathways.
                    </li>
                    <li>
                      <strong>Science Project Expo</strong> &ndash; encourages higher secondary students to
                      showcase unique science-related discoveries, with cash prizes and certificates.
                    </li>
                    <li>
                      <strong>Communication Development Programme</strong> &ndash; trains students in public
                      speaking and its impact on career and profession.
                    </li>
                    <li>
                      <strong>Life Skill Education, Inter/Intra Personal Skills &amp; Self-Development</strong>{" "}
                      &ndash; motivational and soft-skills programmes to build confidence, assertiveness, and
                      the ability to navigate personal and professional relationships.
                    </li>
                    <li>
                      <strong>Yoga and Meditation</strong> &ndash; part of the students&apos; Physical
                      Education programme, supporting mental health and overall well-being.
                    </li>
                  </ul>
                </div>
              )}

              {activeCat === "aqar" && (
                <div className="tjs-committee-body">
                  <h4>Annual Quality Assurance Report (AQAR)</h4>
                  <LinkList items={AQAR_DOCS} keyField="year" urlField="url" />
                </div>
              )}

              {activeCat === "annual" && (
                <div className="tjs-committee-body">
                  <h4>Annual Reports</h4>
                  <LinkList items={ANNUAL_REPORTS} keyField="year" urlField="url" />
                </div>
              )}

              {activeCat === "aishe" && (
                <div className="tjs-committee-body">
                  <h4>AISHE Certificates</h4>
                  <LinkList items={AISHE_DOCS} keyField="year" urlField="url" />
                </div>
              )}

              {activeCat === "minutes" && (
                <div className="tjs-committee-body">
                  <h4>Minutes of Meeting &amp; Action Taken Reports</h4>
                  <LinkList items={MINUTES_DOCS} keyField="year" urlField="url" />
                </div>
              )}

              {activeCat === "audit" && (
                <div className="tjs-committee-body">
                  <h4>External Audit Reports</h4>
                  <LinkList items={EXTERNAL_AUDIT_DOCS} keyField="year" urlField="url" />
                </div>
              )}

              {activeCat === "syllabus" && (
                <div className="tjs-committee-body">
                  <h4>Design and Review of Syllabus</h4>
                  <p className="tjs-dept-pending">Content will be updated soon.</p>

                  <h4>Feedback Forms</h4>
                  <LinkList items={FEEDBACK_FORMS} keyField="label" urlField="url" iconClass="ri-external-link-line" />

                  <h4>Feedback Report</h4>
                  <p className="tjs-dept-pending">Report will be added soon.</p>
                </div>
              )}

              {activeCat === "contact" && (
                <div className="tjs-iqac-contact-card">
                  <img src="/assets/images/sivakumar-150x150.jpeg" alt="Dr. E. Sivakumar" />
                  <div>
                    <h4>Dr. E. Sivakumar</h4>
                    <p className="tjs-trustee-role">IQAC Coordinator</p>
                    <p>
                      Phone: <a href="tel:+918778420491">8778420491</a>
                      <br />
                      Email: <a href="mailto:iqac@tjsec.in">iqac@tjsec.in</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
