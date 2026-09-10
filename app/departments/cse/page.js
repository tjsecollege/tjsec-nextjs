"use client";

import { useState } from "react";

const PROGRAMMES = {
  "B.E - CSE": {
    peos: [
      {
        title: "PEO1 – Professional Excellence",
        text: "Pursue successful careers and higher education by applying strong foundations in Computer Science, problem-solving, analytical thinking, and emerging technologies.",
      },
      {
        title: "PEO2 – Innovation, Research and Entrepreneurship",
        text: "Demonstrate innovation, entrepreneurial thinking, and a research-oriented mindset to develop sustainable solutions for real-world challenges through industry and interdisciplinary collaboration.",
      },
      {
        title: "PEO3 – Ethics, Leadership and Lifelong Learning",
        text: "Demonstrate professional ethics, teamwork, leadership, social responsibility, and lifelong learning to contribute effectively to society and advance technological progress at both national and global levels.",
      },
    ],
    pos: [
      { title: "PO1 – Engineering Knowledge", text: "Apply knowledge of mathematics, natural sciences, computing, engineering fundamentals, and specialized engineering concepts to develop effective solutions to complex engineering problems." },
      { title: "PO2 – Problem Analysis", text: "Identify, formulate, review relevant literature, and analyze complex engineering problems to arrive at well-supported conclusions while considering the principles of sustainable development." },
      { title: "PO3 – Design and Development of Solutions", text: "Design and develop innovative solutions, systems, components, and processes to address complex engineering problems while considering public health and safety, economic factors, culture, society, and environmental sustainability." },
      { title: "PO4 – Conduct Investigations of Complex Problems", text: "Conduct systematic investigations of complex engineering problems using research-based knowledge, including experimental design, modelling, analysis, and interpretation of data to arrive at valid and reliable conclusions." },
      { title: "PO5 – Engineering Tool Usage", text: "Select, create, and apply appropriate techniques, resources, and modern engineering and information technology tools, including modelling and prediction techniques, while recognizing their capabilities and limitations." },
      { title: "PO6 – The Engineer and the World", text: "Analyze and evaluate the societal and environmental impacts of engineering solutions with respect to sustainability, economy, health, safety, legal and regulatory requirements, culture, and the environment." },
      { title: "PO7 – Ethics", text: "Apply ethical principles and demonstrate professional ethics, human values, diversity, and inclusivity while complying with relevant national and international laws and professional standards." },
      { title: "PO8 – Individual and Collaborative Teamwork", text: "Function effectively as an individual and as a member or leader of diverse, multidisciplinary teams, contributing positively towards the achievement of common goals." },
      { title: "PO9 – Communication", text: "Communicate effectively and inclusively with the engineering community and society through clear reports, technical documentation, presentations, and other forms of professional communication, while considering cultural, linguistic, and learning differences." },
      { title: "PO10 – Project Management and Finance", text: "Apply engineering management principles, economic decision-making, and financial understanding to manage projects effectively and contribute efficiently as an individual, team member, or team leader in multidisciplinary environments." },
      { title: "PO11 – Lifelong Learning", text: "Recognize the importance of continuous learning and develop the ability to pursue independent and lifelong learning, adapt to emerging technologies, and apply critical thinking in response to technological and professional changes." },
    ],
    psos: [
      { title: "PSO1 – Computing Systems Design and Development", text: "Apply fundamental and advanced concepts of computing, algorithms, programming, and computational frameworks to design, develop, and implement innovative hardware and software solutions for real-world applications." },
      { title: "PSO2 – Emerging Technologies and Innovation", text: "Apply knowledge of advanced computing concepts and emerging technologies in Computer Science and Engineering to develop innovative, sustainable, and socially relevant solutions that address the evolving needs of industry and society." },
    ],
  },
  "M.E - CSE": {
    peos: [
      {
        title: "PEO1 – Professional and Career Excellence",
        text: "Apply advanced knowledge and technical skills in Computer Science and Engineering to pursue successful careers and excel in industry, higher education, entrepreneurship, and research.",
      },
      {
        title: "PEO2 – Innovation and Lifelong Learning",
        text: "Design and develop innovative, sustainable, and technology-driven solutions to complex computing challenges through critical thinking, creativity, continuous learning, and adaptability to emerging technologies.",
      },
      {
        title: "PEO3 – Leadership, Ethics and Social Responsibility",
        text: "Demonstrate leadership, professionalism, ethical values, teamwork, and effective communication to contribute responsibly to society and succeed in global and multidisciplinary environments.",
      },
    ],
    pos: [
      { title: "PO1 – Research and Problem Solving", text: "Independently conduct research, investigation, and development activities to analyze and address practical and complex problems using appropriate technical approaches." },
      { title: "PO2 – Technical Communication", text: "Prepare, document, and effectively present comprehensive technical reports, research findings, and project documentation using professional standards." },
      { title: "PO3 – Domain Expertise", text: "Demonstrate a strong level of expertise and mastery in the chosen area of specialization within Computer Science and Engineering and apply specialized knowledge to professional and research-oriented challenges." },
    ],
    psos: [
      { title: "PSO1 – Advanced Computing and Innovation", text: "Apply advanced computing knowledge, analytical skills, and design principles to develop innovative, sustainable, and technology-driven solutions to contemporary challenges in Computer Science and Engineering." },
      { title: "PSO2 – Interdisciplinary Research and Emerging Technologies", text: "Engage in interdisciplinary research and continuous learning to explore, adapt, and contribute to the advancement of emerging technologies in the field of computing." },
    ],
  },
};

const SYLLABUS_UG = [
  "B.E. Computer Science and Engineering",
  "B.E. Electrical and Electronics Engineering",
  "B.E. Electronics and Communication Engineering",
  "B.Tech. Artificial Intelligence and Data Science",
  "B.E. Mechanical Engineering",
  "B.E. Information Technology",
];

const SYLLABUS_PG = ["M.E. Computer Science and Engineering", "M.E. VLSI & Design", "M.B.A"];

const TRAININGS = [{ program: "Python", contact: "To be updated" }];

// Faculty/staff details (name, grade, specialization, email) are pending —
// add entries here as they are provided, in the same shape.
const FACULTY = [];
const NON_TEACHING_STAFF = [];

const INTERNSHIPS = [
  { company: "SAP", year: 2024, students: 30 },
  { company: "IIT Srirangam", year: 2023, students: 55 },
  { company: "IITDM", year: 2022, students: 28 },
  { company: "IIT Madras", year: 2022, students: 19 },
  { company: "eSilicon", year: 2021, students: 17 },
  { company: "Kaar", year: 2023, students: 15 },
  { company: "ELGI", year: 2024, students: 10 },
  { company: "IIT Guwahati", year: 2022, students: 7 },
  { company: "IIT Palakkad", year: 2021, students: 7 },
  { company: "Vyoma Systems", year: 2021, students: 2 },
];

export default function CSEDepartment() {
  const [track, setTrack] = useState("B.E - CSE");
  const active = PROGRAMMES[track];

  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">Undergraduate &amp; Postgraduate Programme</span>
          <h1>Computer Science and Engineering</h1>
          <p>
            Established in 2009&ndash;2010, the Department of Computer Science and Engineering trains
            skilled, innovative, and industry-ready computing professionals through modern labs,
            practical learning, and industry-oriented training.
          </p>
        </div>
        <div className="tjs-dept-hero-image">
          <img
            src="/assets/images/campus/computer-lab-01.jpg"
            alt="Computer Science and Engineering lab at T.J.S Engineering College"
          />
        </div>
      </section>

    <div className="tjs-dept-page">
      <nav className="tjs-dept-jump">
        <a href="#about">About</a>
        <a href="#hod">HOD&apos;s Desk</a>
        <a href="#people">Faculty &amp; Staff</a>
        <a href="#programmes">Programmes Offered</a>
        <a href="#regulations">Regulations</a>
        <a href="#curriculum">Curriculum &amp; Syllabi</a>
        <a href="#industry">Industry Interface</a>
        <a href="#research">Research</a>
        <a href="#facilities">Facilities</a>
      </nav>

      <section id="about" className="tjs-dept-section">
        <h2>About the Department</h2>
        <p>
          Established in 2009&ndash;2010, the Department of Computer Science and Engineering at T.J.S. Engineering College is
          committed to developing skilled, innovative, and industry-ready computing professionals.
        </p>
        <p>
          The department offers <strong>B.E. Computer Science and Engineering</strong> and{" "}
          <strong>M.E. Computer Science and Engineering</strong> programmes, supported by experienced faculty, modern
          infrastructure, practical learning, and industry-oriented training.
        </p>
        <p>
          Our academic approach focuses on strengthening technical knowledge, problem-solving abilities, innovation,
          research, entrepreneurship, and professional skills. Students are encouraged to explore emerging technologies
          and apply their knowledge to real-world challenges.
        </p>

        <div className="tjs-dept-grid-2">
          <div className="tjs-dept-card">
            <h3>Vision</h3>
            <p>
              To nurture technically proficient, innovative, ethical, and socially responsible computing professionals
              who can contribute effectively to industry, research, and society.
            </p>
          </div>
          <div className="tjs-dept-card">
            <h3>Mission</h3>
            <ul>
              <li>To provide quality education with strong technical and practical knowledge.</li>
              <li>To develop problem-solving, analytical, communication, and professional skills.</li>
              <li>To encourage innovation, research, entrepreneurship, and lifelong learning.</li>
              <li>To provide opportunities for industry interaction, projects, internships, and practical exposure.</li>
              <li>To prepare students for successful careers, higher studies, and global opportunities.</li>
            </ul>
          </div>
        </div>

        <p>
          The department continuously strives to create a vibrant learning environment where students can transform
          their ideas into innovative solutions and become confident professionals ready to meet the challenges of the
          evolving technology landscape.
        </p>
      </section>

      <section id="hod" className="tjs-dept-section tjs-dept-section-alt">
        <h2>HOD&apos;s Desk</h2>
        <div className="tjs-dept-hod">
          <div className="tjs-dept-hod-photo" aria-hidden="true">
            Photo
          </div>
          <div className="tjs-dept-hod-message">
            <h3>Welcome to the Department of Computer Science and Engineering</h3>
            <p>It gives me immense pleasure to welcome you to the Department of Computer Science and Engineering at T.J.S. Engineering College.</p>
            <p>
              Computer Science and Engineering is more than a discipline&mdash;it is a driving force behind the
              transformation of our world. From Artificial Intelligence and Data Science to Cloud Computing,
              Cybersecurity, Internet of Things, and emerging digital technologies, computing continues to create new
              possibilities and redefine the way we live, work, and innovate.
            </p>
            <p>
              At our department, we are committed to creating an inspiring, inclusive, and technology-driven learning
              environment where students are encouraged to think beyond conventional boundaries. Our academic
              programmes are designed to build strong fundamentals while providing meaningful exposure to practical
              applications, emerging technologies, research, innovation, and industry practices.
            </p>
            <p>
              Our experienced faculty members play an important role in mentoring students and guiding them towards
              academic and professional excellence. Through hands-on laboratory learning, technical workshops,
              internships, industrial visits, expert interactions, coding activities, hackathons, projects, and
              research initiatives, we provide students with opportunities to transform their ideas into practical
              solutions.
            </p>
            <p>
              We strongly believe that a successful engineer requires more than technical knowledge. Creativity,
              critical thinking, communication, teamwork, ethical responsibility, leadership, and a commitment to
              lifelong learning are equally essential. Therefore, we strive to nurture confident and responsible
              graduates who are prepared to contribute meaningfully to industry, research, entrepreneurship, and
              society.
            </p>
            <p>
              I warmly invite you to explore the opportunities offered by the Department of Computer Science and
              Engineering, T.J.S. Engineering College, and become part of a vibrant community committed to learning,
              innovation, excellence, and transformation.
            </p>
            <p className="tjs-dept-hod-quote">&ldquo;Think Beyond. Innovate Today. Shape Tomorrow.&rdquo;</p>
            <p className="tjs-dept-hod-sign">
              Head of the Department
              <br />
              Department of Computer Science and Engineering
              <br />
              T.J.S. Engineering College
            </p>
          </div>
        </div>
      </section>

      <section id="people" className="tjs-dept-section">
        <h2>Faculty &amp; Staff</h2>
        <h3>Faculty</h3>
        {FACULTY.length ? (
          <div className="tjs-dept-people-grid">
            {FACULTY.map((person) => (
              <div className="tjs-dept-people-card" key={person.name}>
                <div className="tjs-dept-people-photo">
                  {person.photo ? <img src={person.photo} alt={person.name} /> : <span>Photo</span>}
                </div>
                <h4>{person.name}</h4>
                <p className="tjs-dept-people-role">{person.grade}</p>
                <p className="tjs-dept-people-spec">{person.specialization}</p>
                {person.email ? (
                  <a href={"mailto:" + person.email} className="tjs-dept-people-email">
                    {person.email}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="tjs-dept-pending">Faculty details (name, grade, specialization, email) will be updated soon.</p>
        )}

        <h3>Non-Teaching Staff</h3>
        {NON_TEACHING_STAFF.length ? (
          <div className="tjs-dept-people-grid">
            {NON_TEACHING_STAFF.map((person) => (
              <div className="tjs-dept-people-card" key={person.name}>
                <div className="tjs-dept-people-photo">
                  {person.photo ? <img src={person.photo} alt={person.name} /> : <span>Photo</span>}
                </div>
                <h4>{person.name}</h4>
                <p className="tjs-dept-people-role">{person.designation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="tjs-dept-pending">Non-teaching staff details will be updated soon.</p>
        )}
      </section>

      <section id="programmes" className="tjs-dept-section tjs-dept-section-alt">
        <h2>Programmes Offered</h2>
        <div className="tjs-dept-tabs">
          {Object.keys(PROGRAMMES).map((key) => (
            <button
              key={key}
              type="button"
              className={"tjs-dept-tab" + (track === key ? " active" : "")}
              onClick={() => setTrack(key)}
            >
              {key}
            </button>
          ))}
        </div>

        <h3>Programme Educational Objectives (PEOs)</h3>
        <p>Graduates of the Department of Computer Science and Engineering are expected to:</p>
        <div className="tjs-dept-peo-list">
          {active.peos.map((item) => (
            <div className="tjs-dept-peo" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <h3>Programme Outcomes (POs)</h3>
        <p>Graduates of the Department of Computer Science and Engineering will be able to:</p>
        <div className="tjs-dept-peo-list">
          {active.pos.map((item) => (
            <div className="tjs-dept-peo" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <h3>Programme Specific Outcomes (PSOs)</h3>
        <p>Graduates of the Department of Computer Science and Engineering will be able to:</p>
        <div className="tjs-dept-peo-list">
          {active.psos.map((item) => (
            <div className="tjs-dept-peo" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="regulations" className="tjs-dept-section">
        <h2>Regulations</h2>
        <h3>UG Regulations</h3>
        <div className="tjs-dept-link-list">
          <a href="#">B.E. and B.Tech. Regulations (2025) &rarr;</a>
        </div>
        <h3>PG Regulations</h3>
        <div className="tjs-dept-link-list">
          <a href="#">M.E. Regulations (2025) &rarr;</a>
          <a href="#">M.B.A. Regulations (2025) &rarr;</a>
        </div>
      </section>

      <section id="curriculum" className="tjs-dept-section tjs-dept-section-alt">
        <h2>Curriculum &amp; Syllabi</h2>
        <h3>Undergraduate</h3>
        <div className="tjs-dept-link-list">
          {SYLLABUS_UG.map((item) => (
            <a href="#" key={item}>
              {item} &rarr;
            </a>
          ))}
        </div>
        <h3>Postgraduate</h3>
        <div className="tjs-dept-link-list">
          {SYLLABUS_PG.map((item) => (
            <a href="#" key={item}>
              {item} &rarr;
            </a>
          ))}
        </div>
      </section>

      <section id="industry" className="tjs-dept-section">
        <h2>Industry Interface</h2>
        <h3>Areas of Industrial Training</h3>
        <p>The following training programs can be organised either on campus or onsite:</p>
        <div className="tjs-dept-table-wrap">
          <table className="tjs-dept-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Training Program</th>
                <th>Contact Details</th>
              </tr>
            </thead>
            <tbody>
              {TRAININGS.map((row, i) => (
                <tr key={row.program}>
                  <td>{i + 1}</td>
                  <td>{row.program}</td>
                  <td>{row.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Internships and In-plant Trainings</h3>
        <div className="tjs-dept-table-wrap">
          <table className="tjs-dept-table">
            <thead>
              <tr>
                <th>Company / Institute</th>
                <th>Academic Year</th>
                <th>No. of Students</th>
              </tr>
            </thead>
            <tbody>
              {INTERNSHIPS.map((row) => (
                <tr key={row.company}>
                  <td>{row.company}</td>
                  <td>{row.year}</td>
                  <td>{row.students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="research" className="tjs-dept-section tjs-dept-section-alt">
        <h2>Research</h2>
        <div className="tjs-dept-grid-3">
          <div className="tjs-dept-card">
            <h3>Areas of Research</h3>
            <p className="tjs-dept-pending">Content to be updated.</p>
          </div>
          <div className="tjs-dept-card">
            <h3>Funded Projects</h3>
            <p className="tjs-dept-pending">Content to be updated.</p>
          </div>
          <div className="tjs-dept-card">
            <h3>Seed Money for Research</h3>
            <p className="tjs-dept-pending">Content to be updated.</p>
          </div>
        </div>
      </section>

      <section id="facilities" className="tjs-dept-section">
        <h2>Facilities</h2>
        <h3>Academic Laboratories</h3>
        <ul className="tjs-dept-bullets">
          <li>Computer Centre</li>
          <li>Mobile and App Development Lab</li>
          <li>Cloud Lab</li>
        </ul>
        <h3>Centres of Competency</h3>
        <ul className="tjs-dept-bullets">
          <li>WIPRO &ndash; details to be updated</li>
        </ul>
      </section>
    </div>
    </>
  );
}
