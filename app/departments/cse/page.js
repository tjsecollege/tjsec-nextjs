import DeptMegaNav from "../DeptMegaNav";
import PeopleCarousel from "../PeopleCarousel";
import DeptPhotoSlider from "../DeptPhotoSlider";
import EventSlider from "../EventSlider";
import MouTabsViewer from "../MouTabsViewer";
import YearGroupedVisits from "../YearGroupedVisits";
import LabAccordion from "../LabAccordion";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

function img(file) {
  return "/assets/images/cse/" + file;
}

const TOPPERS = [];

const FACULTY = [];

const NON_TEACHING = [];

const POS = [
  "Engineering Knowledge: Apply math, science, and engineering fundamentals to complex problems.",
  "Problem Analysis: Identify and analyze complex problems using research and sustainability principles.",
  "Design Solutions: Design systems and processes considering health, safety, cost, culture, and environment.",
  "Investigations: Use experiments, modelling, and data analysis to reach valid conclusions.",
  "Engineering Tools: Apply modern tools for modelling and problem-solving, recognizing their limits.",
  "Society & Environment: Assess societal, legal, and environmental impacts of engineering solutions.",
  "Ethics: Commit to ethics, human values, diversity, and legal compliance.",
  "Teamwork: Work effectively as an individual and in multidisciplinary teams.",
  "Communication: Communicate clearly in reports, presentations, and documentation across diverse groups.",
  "Management & Finance: Apply management and economic principles in projects and teamwork.",
  "Lifelong Learning: Engage in continuous learning, adapt to new technologies, and think critically.",
];

const PSOS = [];

const BOS_DOCS = [];

const BOS_MEMBERS = [];

const NEWSLETTERS = [];

const MOU_DOCS = [];

const CONSULTANCY = [];

const LABS = [];

const INDUSTRIAL_VISITS = [
  {
    date: "02-04-2024",
    title: "BSNL Ltd. – Rajiv Gandhi Memorial Telecom Training Centre",
    desc: "II CSE students visited BSNL Ltd. (Rajiv Gandhi Memorial Telecom Training Centre), Chennai.",
    imgs: [
      { src: img("image_24.png"), alt: "Industrial Visit to BSNL Ltd., 02-04-2024" },
      { src: img("image_25.png"), alt: "Students and faculty at the BSNL Ltd. visit" },
    ],
  },
  {
    date: "10-03-2025",
    title: "Retech Laser Solution",
    desc: "Department of Computer Science and Engineering students went on an industrial visit to Retech Laser Solution.",
    imgs: [
      { src: img("image_26.jpeg"), alt: "Industrial Visit to Retech Laser Solution" },
      { src: img("image_27.jpeg"), alt: "Students at Retech Lasers, Kundrathur, Chennai" },
    ],
  },
  {
    date: "20-02-2024",
    title: "Aero Knotz Drones India Pvt. Ltd.",
    desc: "Students visited Aero Knotz Drones India Pvt. Ltd., Padur.",
    imgs: [{ src: img("image_28.jpeg"), alt: "Industrial Visit to Aero Knotz Drones India Pvt. Ltd." }],
  },
  {
    date: "22-08-2025",
    title: "Aero Knotz Drones India Pvt. Ltd. (Padur, Kelambakkam)",
    desc: "Second-year CSE students visited Aero Knotz Drones India Pvt. Ltd. (Padur, Kelambakkam) as part of their industrial exposure programme. The visit proved to be highly informative and enlightening, providing valuable insights into real-time industrial processes and operations.",
    imgs: [{ src: img("image_29.jpeg"), alt: "Second-year students at Aero Knotz Drones India Pvt. Ltd." }],
  },
];

const INTERNSHIPS = [
  { org: "CodSoft (Web Development)", date: "05-04-2024 to 05-05-2024", who: "Sarath Kumar S" },
  { org: "Octanet Services Pvt. Ltd. (Web Development)", date: "01-05-2024 to 01-06-2024", who: "Sarath Kumar S" },
  { org: "Cognifyz Technologies (Web Development)", date: "April 2024 to May 2024", who: "Sarath Kumar S" },
  { org: "Techveel (Real-Time Industrial Implant Training on IT)", date: "18-01-2024", who: "Ritik Sah" },
  { org: "Hyundai Mobis India Ltd. (Information Technology)", date: "08-07-2024 to 15-07-2024", who: "Rekha J" },
  {
    org: "Pantech e-Learning (Big Data Analytics – 20 days)",
    date: "01-04-2024 to 26-04-2024",
    who: "Rithvik Abinav K R, Aashish P, Abinaya S, Akilesh G, Aravind S, Arjun J, Arunkumar P, Baleeswaran K, Banupriya D, Bharadwaj K P, Chinnappa Vignesh, Divyabharathy G, Durgaprasad S, Harini Ramesh, Hemapriya C, Karthick M, Kevin Easter Raj A, Mohan Krishna K, Mukesh Varma P, Sandra Ranjith",
  },
];

const CONFERENCES = [];

const GUEST_LECTURES = [];

const FDPS_ATTENDED = [];

const WORKSHOPS = [];

const OTHER_DEPT_EVENTS = [
  {
    date: "29-10-2025",
    title: "National Level Technical Symposium – FALCON 2K25-26",
    desc: "The Department of Computer Science and Engineering organised a National Level Technical Symposium, FALCON 2K25-26.\n\nChief Guest: Dr. Michael Dinesh, Senior Manager – Software Development, Verizon India.",
    imgs: [
      { src: img("image_9.jpeg"), alt: "FALCON 2K25-26 symposium banner" },
      { src: img("image_10.jpeg"), alt: "Memento presentation to the chief guest at FALCON 2K25-26" },
      { src: img("image_11.jpeg"), alt: "Speaker addressing the gathering at FALCON 2K25-26" },
    ],
  },
];

const SEMINARS_EVENTS = [
  {
    date: "28-02-2024",
    title: "Seminar on “Computing Science in 2024” – National Science Day",
    desc: "Observed National Science Day with a seminar on “Computing Science in 2024”.\n\nResource Person: Mr. B. Jaya Narayana, District Secretary, Tamilnadu Science Forum, Thiruvallur District.",
    imgs: [
      { src: img("image_12.jpeg"), alt: "National Science Day seminar poster" },
      { src: img("image_2.jpeg"), alt: "National Science Day seminar session" },
      { src: img("image_4.jpeg"), alt: "Students attending the National Science Day seminar" },
      { src: img("image_8.jpeg"), alt: "Session on Tessy Thomas at the National Science Day seminar" },
    ],
  },
  {
    date: "19-04-2023",
    title: "5-Day Hands-on Workshop – Advanced Techniques for Smartphone Service and Troubleshooting",
    desc: "Jointly organised by the Departments of ECE, EEE and CSE in association with the Institution's Innovation Council.\n\nResource Person: Mr. B. Krishna Kumar, Managing Director, New Technology Mobile Servicing and Training Institute, Coimbatore.",
    imgs: [{ src: img("image_13.jpeg"), alt: "Workshop on Advanced Techniques for Smartphone Service and Troubleshooting" }],
  },
  {
    date: "05-04-2024",
    title: "Technical Workshop in “Data Warehousing” Tools",
    desc: "For III year CSE students.\n\nTrainer: Mr. Amudhan, Co-Founder, Vertex Advisors.",
    imgs: [{ src: img("image_14.jpeg"), alt: "Technical Workshop in Data Warehousing Tools" }],
  },
  {
    date: "05-04-2024",
    title: "One Day Technical Workshop – “Digital Scent Technology”",
    desc: "Organised by the Institution's Innovation Council, Centre for Entrepreneurship Development (Tamil Nadu), Centre For Innovation and Naan Mudhalvan.\n\nResource Person: Mr. Jagadeesh Kothandaraman, Founder, Vertex Advisors.",
    imgs: [{ src: img("image_15.jpeg"), alt: "Technical Workshop on Digital Scent Technology" }],
  },
  {
    date: "26-10-2024",
    title: "Technical Seminar – “Wireless Networks & Autonomous Ground Vehicle”",
    desc: "Resource Person: Dr. H. Riasudheen, TF, Department of IST, Anna University, Chennai.",
    imgs: [{ src: img("image_16.jpeg"), alt: "Technical seminar on Wireless Networks and Autonomous Ground Vehicle" }],
  },
  {
    date: "05-02-2025",
    title: "Guest Lecture – “From Concept to Completion: A Researcher's Perspective”",
    desc: "Organised by the Research & Development and IPR Cell.\n\nSpeaker: Dr. R. Karthikeyan, Professor, Department of Electronics and Communication Engineering, VMRF, Chennai.",
    imgs: [{ src: img("image_18.jpeg"), alt: "Guest lecture: From Concept to Completion – A Researcher's Perspective" }],
  },
  {
    date: "06-02-2025",
    title: "Guest Lecture – “Wearable Technology: Trends, Innovation & Future Directions”",
    desc: "Organised by the Research & Development and IPR Cell.\n\nSpeaker: Dr. D. Vijendra Babu, Assistant Professor (Sr. Grade II), SENSE, VIT Vellore.",
    imgs: [{ src: img("image_17.jpeg"), alt: "Guest lecture on Wearable Technology: Trends, Innovation & Future Directions" }],
  },
  {
    date: "13-02-2025",
    title: "Guest Lecture – “Professional Societies' Membership for Research Career”",
    desc: "Organised by the Research & Development and IPR Cell.\n\nSpeaker: Mr. Arun M, Chair, IEEE Young Professionals – Madras Section, Panimalar Engineering College, Chennai.",
    imgs: [{ src: img("image_20.jpeg"), alt: "Guest lecture on Professional Societies' Membership for Research Career" }],
  },
  {
    date: "05-03-2025",
    title: "Hands-on Training – “Mobile App Development”",
    desc: "Organised by the Research & Development and IPR Cell.\n\nTrainer: Ms. DurgaDevi D, Software Developer, FIIT Formacion Pvt. Ltd.",
    imgs: [{ src: img("image_21.jpeg"), alt: "Hands-on training on Mobile App Development" }],
  },
  {
    date: "08-04-2025",
    title: "16th Inauguration of VOICE – Association of the Department of CSE",
    desc: "The Inauguration of VOICE, the Association of the Department of Computer Science and Engineering, and induction of new office bearers was held on April 08, 2025.\n\nChief Guest: Mr. N. Harish Kumar, Managing Director, SAI Group of Companies. Dr. J. Prakash, Principal, TJSEC presided.",
    imgs: [{ src: img("image_22.jpeg"), alt: "16th inauguration of VOICE, Association of the Department of CSE" }],
  },
  {
    date: "20-08-2025",
    title: "Inauguration of “VOICE” – Association of the Department of CSE",
    desc: "The Inauguration of “VOICE”, the Association of the Department of Computer Science and Engineering, was held on August 20, 2025.",
    imgs: [{ src: img("image_23.jpeg"), alt: "Inauguration of VOICE, Association of the Department of CSE" }],
  },
];

const RECRUITERS = [];

const PLACED_STUDENTS = [];

const FACULTY_ACHIEVEMENTS = [
  {
    date: "10-02-2025",
    title: "Naan Mudhalvan Massive Upskilling FDP – Artificial Intelligence",
    desc: "Faculty members Mr. Vijayan, Mr. Shantha Kumar, Mrs. Agnes and Mrs. Vinothini attended the Naan Mudhalvan Massive Upskilling Faculty Development Programme, coordinated with Anna University – Centre for Faculty & Professional Development. They participated in the course “NM-4th Sem FDP 2025 – Artificial Intelligence” from February 10, 2025, to February 16, 2025, at Mohamed Sathak A.J. Engineering College.",
    imgs: [{ src: img("image_36.jpeg"), alt: "Faculty at the Naan Mudhalvan Massive Upskilling FDP on Artificial Intelligence" }],
  },
  {
    date: "25-02-2026",
    title: "J Agnes – WIPRO TalentNext Certification (Data Science with Python)",
    desc: "WIPRO Digital Skills Readiness Programme – recognised as a mentor for project-based learning (PBL) in Data Science with Python.",
    imgs: [{ src: img("image_30.png"), alt: "J Agnes – WIPRO TalentNext certificate, Data Science with Python" }],
  },
  {
    date: "25-02-2026",
    title: "M Shanmugasundaram – WIPRO TalentNext Certification (Data Science with Python)",
    desc: "WIPRO Digital Skills Readiness Programme – recognised as a mentor for project-based learning (PBL) in Data Science with Python.",
    imgs: [{ src: img("image_32.png"), alt: "M Shanmugasundaram – WIPRO TalentNext certificate, Data Science with Python" }],
  },
  {
    date: "29-05-2026",
    title: "Pavithra V – WIPRO TalentNext Certification (Data Science with Python)",
    desc: "WIPRO Digital Skills Readiness Programme – recognised as a mentor for project-based learning (PBL) in Data Science with Python.",
    imgs: [{ src: img("image_33.jpg"), alt: "Pavithra V – WIPRO TalentNext certificate, Data Science with Python" }],
  },
  {
    date: "30-03-2026",
    title: "Rekha M – WIPRO TalentNext Certification (Data Science with Python)",
    desc: "WIPRO Digital Skills Readiness Programme – recognised as a mentor for project-based learning (PBL) in Data Science with Python.",
    imgs: [{ src: img("image_34.jpg"), alt: "Rekha M – WIPRO TalentNext certificate, Data Science with Python" }],
  },
  {
    date: "12-06-2026",
    title: "R Antony Juliet – WIPRO TalentNext Certification (Database Solutions Expert)",
    desc: "WIPRO Digital Skills Readiness Programme – recognised as a mentor for project-based learning (PBL) in Database Solutions Expert.",
    imgs: [{ src: img("image_31.png"), alt: "R Antony Juliet – WIPRO TalentNext certificate, Database Solutions Expert" }],
  },
  {
    date: "29-05-2026",
    title: "P Subramanian – WIPRO TalentNext Certification (Database Solutions Expert)",
    desc: "WIPRO Digital Skills Readiness Programme – recognised as a mentor for project-based learning (PBL) in Database Solutions Expert.",
    imgs: [{ src: img("image_35.png"), alt: "P Subramanian – WIPRO TalentNext certificate, Database Solutions Expert" }],
  },
];

const STUDENTS_ACHIEVEMENTS = [
  {
    date: "28-10-2024",
    title: "Carbon Zero Challenge 4.0 – IIT Madras",
    desc: "CSE students participated in the International Project Expo “Carbon Zero Challenge 4.0” conducted by IIT Madras.",
    imgs: [{ src: img("image_37.jpeg"), alt: "CSE students at Carbon Zero Challenge 4.0, IIT Madras" }],
  },
  {
    date: "09-11-2024",
    title: "Technical Training Program – Kipi.AI",
    desc: "CSE students attended a one-day technical training programme in Datawarehouse — Snowflake Software Working with Artificial Intelligence, conducted by Kipi.AI.",
    imgs: [{ src: img("image_38.jpeg"), alt: "CSE students at the Kipi.AI technical training programme" }],
  },
  {
    date: "16-11-2024",
    title: "National Workshop – “Elevate Entrepreneurial Mindset”, MIT Campus",
    desc: "TJSEC CSE students attended the “Elevate Entrepreneurial Mindset” National Workshop conducted by the Anna University Student Entrepreneur Club as part of TRIGGER'24, organised by the Association of Computer Technologists, Department of Computer Technology, MIT Campus, Anna University, Chennai, on November 15-16, 2024.\n\nParticipants: Monesh T N, Ritik Sah, Sarath Kumar S.",
    imgs: [{ src: img("image_39.jpeg"), alt: "CSE students at the National Workshop, MIT Campus, Anna University" }],
  },
  {
    date: "13-09-2024",
    title: "Professional Development Programme on Cloud Computing – NITTR, Chennai",
    desc: "Ms. Kaviya Sivakumar and Ms. Hemamalini Raghu completed a training course in “Cloud Computing” from the National Institute of Technical Teachers Training and Research (NITTR), Chennai.",
    imgs: [{ src: img("image_40.jpeg"), alt: "NITTR Cloud Computing certificates – Kaviya Sivakumar and Hemamalini Raghu" }],
  },
  {
    date: "08-03-2025",
    title: "Paper Presentation – Savetha University",
    desc: "Students of the Department of Computer Science and Engineering presented a paper at Savetha University.",
    imgs: [{ src: img("image_41.jpeg"), alt: "CSE students presenting a paper at Savetha University" }],
  },
  {
    date: "12-02-2025",
    title: "Five-Day Bootcamp on Cybersecurity: Attacks in the AI Era",
    desc: "Students attended a five-day bootcamp on Cybersecurity: Attacks in the AI Era at Anna University, sponsored by Information Security Education & Awareness (ISEA) Phase III, from February 12 to February 16, 2025.",
    imgs: [{ src: img("image_42.jpeg"), alt: "CSE students at the Cybersecurity bootcamp, Anna University" }],
  },
  {
    date: "28-02-2025",
    title: "Tech Events – SRM University",
    desc: "Students of the Department of Computer Science and Engineering participated in Tech Events at SRM University, showcasing their skills and enthusiasm for technology.",
    imgs: [{ src: img("image_43.jpeg"), alt: "CSE students at Tech Events, SRM University" }],
  },
];

const CO_CURRICULAR = [];

const EXTRA_CURRICULAR = [];

const ALUMNI_INTERACTIONS = [
  {
    date: "18-08-2026",
    title: "Alumni Interaction – Department of CSE",
    desc: "The Department of Computer Science and Engineering organised an Alumni Interaction session for students.",
    imgs: [
      { src: img("image_69.jpeg"), alt: "Alumni Interaction session, Department of CSE" },
      { src: img("image_68.jpeg"), alt: "Students attending the Alumni Interaction session" },
    ],
  },
];

const DISTINGUISHED_ALUMNI = [];

const MENU = [
  {
    label: "About",
    children: [
      { href: "#about", label: "About us" },
      { href: "#vision-mission", label: "Vision and Mission" },
      { href: "#hod", label: "HOD's Desk" },
      { href: "#magazine", label: "Magazine" },
    ],
  },
  {
    label: "People",
    children: [
      { href: "#faculty", label: "Faculty" },
      { href: "#staff", label: "Non-Teaching" },
    ],
  },
  {
    label: "Academics",
    children: [
      { href: "#programmes", label: "Programme Offered" },
      { href: "#bos", label: "BOS" },
      { href: "#curriculum", label: "Curriculum & Syllabi" },
    ],
  },
  {
    label: "Industry Interface",
    children: [
      { href: "#mou", label: "MOU's" },
      { href: "#consultancy", label: "Area of Consultancy" },
      { href: "#industry-visits", label: "Industry Visits" },
      { href: "#internships", label: "Internship" },
    ],
  },
  {
    label: "Research",
    children: [
      { href: "#publication", label: "Publication" },
      { href: "#patent", label: "Patent" },
      { href: "#books-chapters", label: "Books & Chapters" },
    ],
  },
  {
    label: "Facilities",
    children: [{ href: "#facilities", label: "Department Laboratories" }],
  },
  {
    label: "Events",
    children: [
      { href: "#conferences", label: "Conference" },
      { href: "#fdp-workshop", label: "Guest Lecturer, FDP & Workshop" },
      { href: "#value-added-course", label: "Value Added Course" },
      { href: "#symposium", label: "Symposium" },
      { href: "#seminars", label: "Seminars & Activities" },
    ],
  },
  {
    label: "Placements",
    children: [
      { href: "#recruiters", label: "Major Recruiters" },
      { href: "#placed-students", label: "Placed Students" },
    ],
  },
  {
    label: "Achievements",
    children: [
      { href: "#faculty-achievements", label: "Faculty Achievements" },
      { href: "#students-achievements", label: "Students Achievements" },
      { href: "#co-curricular", label: "Co-Curricular" },
      { href: "#extra-curricular", label: "Extra-Curricular" },
    ],
  },
  {
    label: "Others",
    children: [
      { href: "#gallery", label: "Gallery" },
      { href: "#alumni", label: "Alumni Interactions" },
      { href: "#distinguished-alumni", label: "Distinguished Alumni" },
      { href: "#entrepreneurship", label: "Entrepreneurship" },
    ],
  },
];

function LinkList({ items }) {
  if (!items.length) return <p className="tjs-dept-pending">Content coming soon.</p>;
  return (
    <div className="tjs-dept-link-list">
      {items.map((item) => (
        <a href={item.href} target="_blank" rel="noopener" key={item.label}>
          <span>{item.label}</span>
          <span className="tjs-dept-link-arrow">
            <ArrowIcon />
          </span>
        </a>
      ))}
    </div>
  );
}

export default function CSEDepartment() {
  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">Department</span>
          <h1>Computer Science and Engineering</h1>
          <p>
            The Department of Computer Science and Engineering imparts quality education and develops competent
            professionals through a strong academic foundation combined with practical, hands-on exposure.
          </p>
        </div>
        <div className="tjs-dept-hero-image">
          <img src="/assets/images/campus/computer-lab-01.jpg" alt="Computer Science and Engineering classroom at T.J.S Engineering College" />
        </div>
      </section>

      <div className="tjs-dept-page">
        <DeptMegaNav categories={MENU} />

        {TOPPERS.length > 0 && (
          <div className="tjs-dept-toppers-top">
            <h3>Academic Toppers</h3>
            <PeopleCarousel items={TOPPERS} />
          </div>
        )}

        <section id="about" className="tjs-dept-section">
          <h2>About us</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision and Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p className="tjs-dept-pending">Content coming soon.</p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <p className="tjs-dept-pending">Content coming soon.</p>
            </div>
          </div>
        </section>

        <section id="hod" className="tjs-dept-section">
          <h2>HOD&apos;s Desk</h2>
          <div className="tjs-dept-hod">
            <div className="tjs-dept-hod-photo">
              <span>Photo</span>
            </div>
            <div className="tjs-dept-hod-message">
              <p className="tjs-dept-pending">Content coming soon.</p>
            </div>
          </div>
        </section>

        <section id="magazine" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Magazine</h2>
          <LinkList items={NEWSLETTERS} />
        </section>

        <section id="faculty" className="tjs-dept-section">
          <h2>Faculty</h2>
          <h3>Faculty (Staff Details for NBA, A.Y. 2026-27)</h3>
          {FACULTY.length > 0 ? (
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name of the Faculty</th>
                    <th>Highest Degree</th>
                  </tr>
                </thead>
                <tbody>
                  {FACULTY.map((f, i) => (
                    <tr key={f.name}>
                      <td>{i + 1}</td>
                      <td>{f.name}</td>
                      <td>{f.degree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="staff" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Non-Teaching</h2>
          {NON_TEACHING.length > 0 ? (
            <div className="tjs-dept-people-grid">
              {NON_TEACHING.map((s) => (
                <div className="tjs-dept-people-card" key={s.name}>
                  <div className="tjs-dept-people-photo">
                    {s.photo ? <img src={s.photo} alt={s.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{s.name}</h4>
                  <p className="tjs-dept-people-role">{s.designation}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="programmes" className="tjs-dept-section">
          <h2>Programme Offered</h2>
          <div className="tjs-dept-tabs">
            <button type="button" className="tjs-dept-tab active">B.E – CSE</button>
          </div>

          <h3>Program Educational Objectives (PEOs)</h3>
          <p className="tjs-dept-pending">Content coming soon.</p>

          <h3>Program Outcomes (POs)</h3>
          <div className="tjs-dept-peo-list">
            {POS.map((po, i) => (
              <div className="tjs-dept-peo" key={i}><p>{i + 1}. {po}</p></div>
            ))}
          </div>

          <h3>Program Specific Outcomes (PSOs)</h3>
          {PSOS.length > 0 ? (
            <div className="tjs-dept-peo-list">
              {PSOS.map((pso) => (
                <div className="tjs-dept-peo" key={pso.title}>
                  <h4>{pso.title}</h4>
                  <p>{pso.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="bos" className="tjs-dept-section tjs-dept-section-alt">
          <h2>BOS</h2>
          <h3>Board of Studies Composition</h3>
          {BOS_MEMBERS.length > 0 ? (
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Position in Board of Studies</th>
                    <th>Name of the Members</th>
                  </tr>
                </thead>
                <tbody>
                  {BOS_MEMBERS.map((group) =>
                    group.members.map((m, i) => (
                      <tr key={m.name}>
                        {i === 0 && <td rowSpan={group.members.length}>{group.position}</td>}
                        <td>
                          <strong>{m.name}</strong>
                          <br />
                          {m.role}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="curriculum" className="tjs-dept-section">
          <h2>Regulation &amp; Curriculum</h2>
          <LinkList items={BOS_DOCS} />
        </section>

        <section id="mou" className="tjs-dept-section tjs-dept-section-alt">
          <h2>MOU&apos;s</h2>
          {MOU_DOCS.length > 0 ? <MouTabsViewer items={MOU_DOCS} /> : <p className="tjs-dept-pending">Content coming soon.</p>}
        </section>

        <section id="consultancy" className="tjs-dept-section">
          <h2>Area of Consultancy</h2>
          <LinkList items={CONSULTANCY} />
        </section>

        <section id="industry-visits" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Industry Visits</h2>
          {INDUSTRIAL_VISITS.length > 0 ? (
            <YearGroupedVisits items={INDUSTRIAL_VISITS} title="Industry Visits" />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="internships" className="tjs-dept-section">
          <h2>Internship</h2>
          {INTERNSHIPS.length > 0 ? (
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Organisation</th>
                    <th>Duration</th>
                    <th>Students</th>
                  </tr>
                </thead>
                <tbody>
                  {INTERNSHIPS.map((row) => (
                    <tr key={row.org}>
                      <td>{row.org}</td>
                      <td>{row.date}</td>
                      <td>{row.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="publication" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Publication</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="patent" className="tjs-dept-section">
          <h2>Patent</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="books-chapters" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Books &amp; Chapters</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="facilities" className="tjs-dept-section">
          <h2>Department Laboratories</h2>
          {LABS.length > 0 ? <LabAccordion items={LABS} /> : <p className="tjs-dept-pending">Content coming soon.</p>}
        </section>

        <section id="conferences" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Conference</h2>
          {CONFERENCES.length > 0 ? (
            <EventSlider
              items={CONFERENCES.map((c) => ({
                title: c.title,
                date: c.date,
                category: "Conference",
                img: c.imgs?.[0]?.src,
                imgs: c.imgs?.map((i) => i.src),
                desc: c.desc,
              }))}
            />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="fdp-workshop" className="tjs-dept-section">
          <h2>Guest Lecturer, FDP &amp; Workshop</h2>
          {GUEST_LECTURES.length + FDPS_ATTENDED.length + WORKSHOPS.length > 0 ? (
            <EventSlider
              items={[
                ...GUEST_LECTURES.map((g) => ({
                  title: g.title,
                  date: g.date,
                  category: "Guest Lecture",
                  img: g.imgs?.[0]?.src,
                  imgs: g.imgs?.map((i) => i.src),
                  desc: g.desc,
                })),
                ...FDPS_ATTENDED.map((f) => ({
                  title: f.title,
                  date: f.date,
                  category: "FDP Attended",
                  img: f.imgs?.[0]?.src,
                  imgs: f.imgs?.map((i) => i.src),
                  desc: f.org + "\n\nAttended by: " + f.by,
                })),
                ...WORKSHOPS.map((w) => ({
                  title: w.title,
                  date: w.date,
                  category: "Workshop",
                  img: w.imgs?.[0]?.src,
                  imgs: w.imgs?.map((i) => i.src),
                  desc: w.desc,
                })),
              ]}
            />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="value-added-course" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Value Added Course</h2>

          <div className="tjs-dept-media-row">
            <div className="tjs-dept-media-row-text">
              <h3>Introduction to Data Science</h3>
              <p>
                The Department of Computer Science and Engineering conducted a Five-Day Value Added Course
                (CSEVAC2203) on &ldquo;Introduction to Data Science&rdquo; for III year students.
              </p>
              <div className="tjs-dept-card">
                <h3>Course Details</h3>
                <ul>
                  <li><strong>Date:</strong> 19.05.2022 to 23.05.2022</li>
                  <li>
                    <strong>Resource Persons:</strong>
                    <ul className="tjs-dept-person-list">
                      <li>Mr. Suresh, CEO, Hipex Tech</li>
                      <li>Mr. Rajesh, Senior Engineer/RIG Tech Lab Pvt Ltd</li>
                      <li>Mr. Sathish, CEO, Netwrap Solution</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <p className="tjs-dept-pending">Content for other Value Added Courses will be added soon.</p>
            </div>
            <div className="tjs-dept-media-row-img">
              <DeptPhotoSlider images={[{ src: img("image_7.jpeg"), alt: "Introduction to Data Science value added course" }]} />
            </div>
          </div>
        </section>

        <section id="symposium" className="tjs-dept-section">
          <h2>Symposium</h2>
          {OTHER_DEPT_EVENTS.length > 0 ? (
            <YearGroupedVisits items={OTHER_DEPT_EVENTS} title="Symposium" />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="seminars" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Seminars &amp; Activities</h2>
          {SEMINARS_EVENTS.length > 0 ? (
            <YearGroupedVisits items={SEMINARS_EVENTS} title="Seminars & Activities" />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="recruiters" className="tjs-dept-section">
          <h2>Major Recruiters</h2>
          {RECRUITERS.length > 0 ? (
            <div className="tjs-dept-photo-grid">
              {RECRUITERS.map((r) => (
                <img key={r.name} src={r.logo} alt={r.name} title={r.name} className="tjs-dept-logo-real" />
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="placed-students" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Placed Students</h2>
          {PLACED_STUDENTS.length > 0 ? (
            <PeopleCarousel
              items={PLACED_STUDENTS.map((s) => ({
                name: s.name,
                photo: s.photo,
                role: s.company,
                spec: s.date + " · " + s.ctc,
                email: s.email,
              }))}
            />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="faculty-achievements" className="tjs-dept-section">
          <h2>Faculty Achievements</h2>
          {FACULTY_ACHIEVEMENTS.length > 0 ? (
            <EventSlider
              items={FACULTY_ACHIEVEMENTS.map((a) => ({
                title: a.title,
                date: a.date,
                category: "Faculty Achievement",
                img: a.imgs?.[0]?.src,
                imgs: a.imgs?.map((i) => i.src),
                desc: a.desc,
              }))}
            />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="students-achievements" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Students Achievements</h2>
          {STUDENTS_ACHIEVEMENTS.length > 0 ? (
            <EventSlider
              items={STUDENTS_ACHIEVEMENTS.map((a) => ({
                title: a.title,
                date: a.date,
                category: "Students Achievement",
                img: a.imgs?.[0]?.src,
                imgs: a.imgs?.map((i) => i.src),
                desc: a.desc,
              }))}
            />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="co-curricular" className="tjs-dept-section">
          <h2>Co-Curricular</h2>
          {CO_CURRICULAR.length > 0 ? (
            <EventSlider
              items={CO_CURRICULAR.map((a) => ({
                title: a.title,
                date: a.date,
                category: "Co-Curricular",
                img: a.imgs?.[0]?.src,
                imgs: a.imgs?.map((i) => i.src),
                desc: a.desc,
              }))}
            />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="extra-curricular" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Extra-Curricular</h2>
          {EXTRA_CURRICULAR.length > 0 ? (
            <EventSlider
              items={EXTRA_CURRICULAR.map((a) => ({
                title: a.title,
                date: a.date,
                category: "Extra-Curricular",
                img: a.imgs?.[0]?.src,
                imgs: a.imgs?.map((i) => i.src),
                desc: a.desc,
              }))}
            />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="gallery" className="tjs-dept-section">
          <h2>Gallery</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="alumni" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Alumni Interactions</h2>
          {ALUMNI_INTERACTIONS.length > 0 ? (
            <YearGroupedVisits items={ALUMNI_INTERACTIONS} title="Alumni Interactions" />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="distinguished-alumni" className="tjs-dept-section">
          <h2>Distinguished Alumni</h2>
          {DISTINGUISHED_ALUMNI.length > 0 ? (
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Alumni Name</th>
                    <th>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {DISTINGUISHED_ALUMNI.map((a) => (
                    <tr key={a.name}>
                      <td>{a.name}</td>
                      <td>{a.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="entrepreneurship" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Entrepreneurship</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

      </div>
    </>
  );
}
