"use client";

import { useState } from "react";

function formUrl(file) {
  return "/assets/images/iv_form/" + encodeURIComponent(file);
}

function recruiterLogo(file) {
  return "/assets/images/recruiters/" + file;
}

function infographic(file) {
  return "/assets/images/placement/" + file;
}

const MISSION = [
  "To provide effective career guidance, counselling, and employability training to students.",
  "To enhance students’ technical, communication, aptitude, and professional skills.",
  "To facilitate meaningful interaction with industries and create diverse career opportunities.",
  "To support students in securing internships, placements, and sustainable career pathways.",
  "To strengthen industry–institution collaboration in alignment with emerging workforce requirements.",
];

const CDC_FUNCTIONS = [
  { label: "Career Guidance & Counselling", desc: "Supporting students in identifying suitable career pathways and making informed career decisions." },
  { label: "Employability Skill Development", desc: "Conducting programmes to strengthen aptitude, communication, soft skills, technical skills, and professional competencies." },
  { label: "Training & Placement Support", desc: "Organizing placement-oriented training, recruitment drives, interviews, and related activities." },
  { label: "Industry Interaction", desc: "Facilitating industry visits, expert interactions, internships, guest sessions, and industry-oriented programmes." },
  { label: "Higher Education Guidance", desc: "Supporting students interested in higher studies, competitive examinations, and professional certifications." },
  { label: "Career Awareness", desc: "Creating awareness about emerging career opportunities, industry trends, and evolving skill requirements." },
  { label: "Recruiter Engagement", desc: "Establishing and maintaining professional relationships with organizations to facilitate diverse career opportunities." },
  { label: "Student Progress Support", desc: "Encouraging continuous improvement, professional development, leadership, teamwork, and career preparedness." },
];

const TRAINING_AREAS = [
  "Communication & Soft Skills Training",
  "Aptitude & Logical Reasoning Training",
  "Technical & Programming Skills",
  "Industry-Specific Training",
  "Higher Education & Competitive Examination Guidance",
  "Mock Tests, Group Discussions & Interview Preparation",
  "Placement Readiness Programmes",
];

const RECRUITMENT_STEPS = [
  "Companies are invited to participate in the campus recruitment process by the Placement & Training / Career Development Centre (CDC).",
  "Upon confirmation, the details of eligible final-year students who have opted for placements are shared with the company based on its recruitment requirements.",
  "A mutually convenient date is finalized for conducting the campus recruitment process.",
  "Following confirmation from the company, a Pre-Placement Talk (PPT) is organized to familiarize students with the organization, job roles, eligibility criteria, and recruitment process.",
  "The company conducts aptitude/technical tests and/or Group Discussions (GD) to assess and shortlist eligible and interested candidates.",
  "Shortlisted candidates participate in the interview process, including technical and/or HR rounds, as specified by the recruiting organization.",
  "The company announces the final selection results upon completion of the recruitment process.",
];

const HOSPITALITY = [
  { label: "Transportation", desc: "Pick-up and drop-off facilities to and from the railway station or airport can be arranged by the Placement Office upon request, provided the visiting representatives are accommodated at the Institute Guest House." },
  { label: "Accommodation & Meals", desc: "Accommodation and meals can be arranged at the Institute Guest House with prior intimation. The associated expenses will be borne by the college. If the company representatives prefer accommodation outside the campus, necessary arrangements can be facilitated upon request." },
  { label: "Recruitment Facilities", desc: "State-of-the-art facilities are available for conducting Pre-Placement Talks, Written Tests, Group Discussions, Technical Activities, and Personal Interviews." },
  { label: "Online Assessments", desc: "Companies wishing to conduct online assessments or tests for candidates can utilize the Computer Centre. The required arrangements will be made upon prior intimation." },
];

const POLICIES = [
  "Students with no current backlogs are eligible to register for campus placements. Students with backlogs should clear them before registration.",
  "Students should maintain a minimum of 80% attendance in CDC training programmes.",
  "Placement eligibility will be based on attendance, assessment performance, CGPA, and company-specific criteria.",
  "Campus placement registration is voluntary. Interested students must register through the prescribed process.",
  "Students should carefully check company details and apply only if they are genuinely interested.",
  "Once opted in, withdrawal from a placement process may lead to debarment from future drives.",
  "The CDC may revise eligibility criteria, including minimum CGPA, based on company requirements.",
  "Violation of CDC policies may result in restriction from placement drives and training programmes.",
  "For clarification regarding placement procedures and rules, students should contact the CDC or Department Placement Coordinator.",
];

const FAQS = [
  { q: "Can I ask about the upcoming placement schedule?", a: "The CDC will announce the schedule. Students are requested to wait for official announcements." },
  { q: "What happens if I cheat or engage in malpractice?", a: "Cheating, copying, malpractice, or misbehavior may result in immediate removal from the training or placement process." },
  { q: "How many placement offers can I accept?", a: "Students can accept only one placement offer, as per CDC policy." },
  { q: "Who decides the eligibility criteria?", a: "The recruiting company decides the eligibility criteria. Students must meet the criteria specified by the company." },
  { q: "Can I round off my CGPA or percentage?", a: "No. Students must provide their exact CGPA and percentage. Rounding off is not permitted." },
  { q: "Can I withdraw after registering for a placement drive?", a: "Once registered, students are expected to complete the selection process. Withdrawal may affect participation in future placement drives." },
  { q: "Can I reject an offer after being selected?", a: "Once a student is selected and the result is officially announced, the offer cannot be declined as per CDC policy." },
  { q: "Who updates my CGPA in the PAT Portal?", a: "Students are responsible for entering their correct CGPA and submitting the required proof to the Department Placement Coordinator." },
  { q: "How are students shortlisted?", a: "Shortlisting is done by the recruiting company based on its selection criteria, which may include CGPA, skills, aptitude, technical performance, and interviews." },
  { q: "Is placement training attendance compulsory?", a: "Yes. Students should maintain a minimum of 80% attendance in placement training programmes to remain eligible for campus placements." },
  { q: "What if two companies conduct selection on the same day?", a: "Students should follow the instructions issued by the CDC regarding the placement schedule." },
  { q: "What documents should I submit after getting placed?", a: "Students must submit the required offer letter and other placement-related documents to their department and the CDC." },
  { q: "What is the dress code for placement drives?", a: "Students should wear formal, neat, and professional attire and maintain a well-groomed appearance." },
  { q: "How early should I report for a placement drive?", a: "Students should report at the venue at least 20 minutes before the scheduled time. Late arrival may result in disqualification." },
];

const DOWNLOAD_FORMS = [
  { label: "Willingness Form", desc: "Skill Development Training & Campus Placement Willingness Form 2026.", file: "TJSEC-Skill Development Training & Campus Placement Willingness Form 2026.docx" },
  { label: "Long Duration Internship Form", desc: "Form for long-term internship registration.", file: "TJSEC-Long Term Internship-Form.docx" },
  { label: "Short Duration Internship Form", desc: "Form for short-term internship registration.", file: "Internship-Form-short.docx" },
];

const RECRUITER_FILES = [
  "apptivo.jpg", "aspire.jpg", "delphi-tvs.jpg", "dikit.jpg", "face.jpg", "foxconn.jpg",
  "glow_logic.png", "grantley_edu.png", "hasmec.jpg", "ilm.jpg", "justdial.png", "kgis.jpg",
  "muthoot.jpg", "nice_education.jpg", "relaince.jpg", "sals.jpg", "tcs.jpg", "technohook.png",
];

function recruiterName(file) {
  const base = file.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

const RECRUITER_LOGOS = RECRUITER_FILES.map((file) => ({ name: recruiterName(file), logo: recruiterLogo(file) }));

const CATEGORIES = [
  { id: "vision", label: "Vision and Mission" },
  { id: "what-we-do", label: "What We Do" },
  { id: "policies", label: "Policies" },
  { id: "faq", label: "FAQ" },
  { id: "downloads", label: "Downloads" },
  { id: "syllabi", label: "Syllabi" },
  { id: "statistics", label: "Statistics" },
  { id: "recruiters", label: "Our Recruiters" },
  { id: "higher-education", label: "Higher Education" },
  { id: "testimonials", label: "Testimonials" },
  { id: "cdc-team", label: "CDC Team" },
  { id: "facilities", label: "Facilities" },
  { id: "contact", label: "Contact Us" },
];

function Pending() {
  return <p className="tjs-dept-pending">Content coming soon.</p>;
}

export default function Placements() {
  const [activeCat, setActiveCat] = useState("vision");
  const [recruiterTab, setRecruiterTab] = useState("major");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Placements</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Placements</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Career Development Centre (CDC)
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
              {activeCat === "vision" && (
                <>
                  <h3>Vision</h3>
                  <p>
                    To empower students with the skills, confidence, and professional competencies required to
                    achieve successful careers and contribute meaningfully to industry and society.
                  </p>
                  <h3>Mission</h3>
                  <ul className="tjs-dept-bullets">
                    {MISSION.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </>
              )}

              {activeCat === "what-we-do" && (
                <>
                  <img
                    src={infographic("image_6.png")}
                    alt="Career Development Centre overview"
                    className="tjs-cdc-infographic"
                  />
                  <h3>Career Development Centre (CDC)</h3>
                  <p>
                    The Career Development Centre (CDC) is a dedicated student-support facility that facilitates
                    career planning, employability enhancement, higher education guidance, and placement
                    opportunities. The CDC works towards developing students&apos; professional competencies and
                    preparing them to meet the evolving requirements of industry and society.
                  </p>
                  <p>
                    <strong>Objective:</strong> To bridge the gap between academic learning and professional
                    requirements by providing structured career development activities that enhance students&apos;
                    employability, career readiness, and professional growth.
                  </p>

                  <h3>Key Functions of CDC</h3>
                  <ul className="tjs-dept-bullets">
                    {CDC_FUNCTIONS.map((f) => (
                      <li key={f.label}>
                        <strong>{f.label}</strong> &ndash; {f.desc}
                      </li>
                    ))}
                  </ul>

                  <hr className="tjs-ivy-divider" />

                  <h3>Training & Placement Calendar</h3>
                  <p>
                    The CDC Training & Placement Calendar provides an overview of the planned training, career
                    development, and placement activities for students. The calendar is subject to change based on
                    academic schedules, industry requirements, recruitment activities, and other institutional
                    commitments. Students are advised to regularly check for updates and follow the latest schedule
                    communicated by the CDC.
                  </p>
                  <img src={infographic("image_5.png")} alt="CDC Training & Placement Calendar" className="tjs-cdc-infographic" />

                  <hr className="tjs-ivy-divider" />

                  <h3>Training Offered</h3>
                  <p>
                    The CDC provides structured training programmes to enhance students&apos; employability and
                    prepare them for professional careers, focusing on technical, aptitude, communication, soft
                    skills, and professional competencies.
                  </p>
                  <ul className="tjs-dept-bullets">
                    {TRAINING_AREAS.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <img src={infographic("image_4.png")} alt="Training offered by the Career Development Centre" className="tjs-cdc-infographic" />

                  <hr className="tjs-ivy-divider" />

                  <h3>Placement Process</h3>
                  <p>
                    The CDC facilitates a structured placement process to support students in achieving their career
                    aspirations, providing guidance, training, industry exposure, and placement opportunities.
                    Students are expected to actively participate in placement activities and follow the procedures
                    communicated by the CDC.
                  </p>
                  <img src={infographic("image_3.png")} alt="CDC placement process" className="tjs-cdc-infographic" />

                  <hr className="tjs-ivy-divider" />

                  <h3>Recruitment Process</h3>
                  <ul className="tjs-dept-bullets">
                    {RECRUITMENT_STEPS.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <img src={infographic("image_2.png")} alt="Campus recruitment process" className="tjs-cdc-infographic" />

                  <hr className="tjs-ivy-divider" />

                  <h3>Hospitality &ndash; Facilities & Support for Recruiters</h3>
                  <ul className="tjs-dept-bullets">
                    {HOSPITALITY.map((h) => (
                      <li key={h.label}>
                        <strong>{h.label}:</strong> {h.desc}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {activeCat === "policies" && (
                <>
                  <h3>CDC Placement Policies</h3>
                  <ul className="tjs-dept-bullets">
                    {POLICIES.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </>
              )}

              {activeCat === "faq" && (
                <>
                  <h3>Frequently Asked Questions</h3>
                  <div className="tjs-committee-list">
                    {FAQS.map((f, i) => (
                      <div className="tjs-committee-item" key={f.q}>
                        <button
                          type="button"
                          className={"tjs-committee-toggle" + (openFaq === i ? " active" : "")}
                          onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                        >
                          <span>{f.q}</span>
                          <i className="ri-arrow-down-s-line"></i>
                        </button>
                        {openFaq === i && (
                          <div className="tjs-committee-body">
                            <p>{f.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeCat === "downloads" && (
                <>
                  <h3>Downloads</h3>
                  <div className="tjs-iv-grid">
                    {DOWNLOAD_FORMS.map((f) => (
                      <a href={formUrl(f.file)} target="_blank" rel="noopener" className="tjs-iv-card" key={f.file}>
                        <div className="tjs-iv-card-head">
                          <h4>{f.label}</h4>
                          <i className="ri-download-2-line"></i>
                        </div>
                        <p>{f.desc}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {activeCat === "syllabi" && (
                <>
                  <h3>Syllabi</h3>
                  <p>Syllabus and curriculum details are maintained on the Regulation &amp; Curriculum page.</p>
                  <a href="/regulation-and-curriculum" className="tjs-iv-card" style={{ maxWidth: 420 }}>
                    <div className="tjs-iv-card-head">
                      <h4>View Regulation &amp; Curriculum</h4>
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </a>
                </>
              )}

              {activeCat === "statistics" && (
                <>
                  <h3>Statistics</h3>
                  <Pending />
                </>
              )}

              {activeCat === "recruiters" && (
                <>
                  <h3>Our Recruiters</h3>
                  <div className="tjs-approvals-year-tabs-row" style={{ border: "none", paddingBottom: 0 }}>
                    <div className="tjs-approvals-year-tabs" style={{ overflow: "visible", flex: "0 0 auto" }}>
                      <button
                        type="button"
                        className={"tjs-approvals-year" + (recruiterTab === "major" ? " active" : "")}
                        onClick={() => setRecruiterTab("major")}
                      >
                        Major Recruiters
                      </button>
                      <button
                        type="button"
                        className={"tjs-approvals-year" + (recruiterTab === "ay2526" ? " active" : "")}
                        onClick={() => setRecruiterTab("ay2526")}
                      >
                        Recruiters (AY 2025-26)
                      </button>
                    </div>
                  </div>

                  {recruiterTab === "major" ? (
                    <div className="tjs-dept-photo-grid" style={{ marginTop: 20 }}>
                      {RECRUITER_LOGOS.map((r) => (
                        <img key={r.logo} src={r.logo} alt={r.name} title={r.name} className="tjs-dept-logo-real" />
                      ))}
                    </div>
                  ) : (
                    <div style={{ marginTop: 20 }}>
                      <Pending />
                    </div>
                  )}
                </>
              )}

              {activeCat === "higher-education" && (
                <>
                  <h3>Higher Education</h3>
                  <Pending />
                </>
              )}

              {activeCat === "testimonials" && (
                <>
                  <h3>Testimonials</h3>
                  <Pending />
                </>
              )}

              {activeCat === "cdc-team" && (
                <>
                  <h3>CDC Team</h3>
                  <Pending />
                </>
              )}

              {activeCat === "facilities" && (
                <>
                  <h3>Facilities</h3>
                  <p>
                    The CDC is well equipped with the necessary infrastructure and facilities to efficiently
                    coordinate and support the placement process at every stage, providing a professional and
                    student-friendly environment for interviews, group discussions, pre-placement talks, aptitude
                    tests, and other selection processes.
                  </p>
                  <ul className="tjs-dept-bullets">
                    <li>
                      <strong>Well-Furnished Interview & Group Discussion Rooms</strong> &ndash; Dedicated and
                      comfortable spaces for interviews, group discussions, and recruitment activities.
                    </li>
                    <li>
                      <strong>Fully Computerized and Interconnected Office</strong> &ndash; Modern office
                      infrastructure with reliable computer systems and communication facilities for efficient
                      coordination.
                    </li>
                    <li>
                      <strong>Student CDC Volunteers</strong> &ndash; Trained student volunteers assist recruiters
                      and students throughout the recruitment process and during company visits.
                    </li>
                    <li>
                      <strong>Video Conferencing Facilities</strong> &ndash; High-quality facilities to support
                      virtual interviews, meetings, pre-placement talks, and online recruitment activities.
                    </li>
                    <li>
                      <strong>Students&apos; Waiting Hall</strong> &ndash; A dedicated and comfortable waiting area
                      for students participating in placement activities.
                    </li>
                    <li>
                      <strong>Placement Coordination Facilities</strong> &ndash; Dedicated arrangements to
                      coordinate company visits, student registrations, interview schedules, and selection
                      procedures efficiently.
                    </li>
                    <li>
                      <strong>Recruiter Support Facilities</strong> &ndash; Necessary arrangements and assistance
                      are provided to visiting recruiters to ensure a smooth and well-organized recruitment
                      experience.
                    </li>
                  </ul>
                </>
              )}

              {activeCat === "contact" && (
                <>
                  <h3>Contact Us</h3>
                  <Pending />
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
