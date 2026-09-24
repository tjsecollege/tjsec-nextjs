"use client";

import { useState } from "react";
import DeptJumpNav from "../DeptJumpNav";

const FACULTY = [
  { name: "Dr. N. Jayanthi", qual: "MBA, M.Com, M.Phil, SLET, Ph.D", role: "Associate Professor & Head" },
  { name: "Mrs. Saisangeetha", qual: "–", role: "Faculty Member" },
  { name: "Mr. Murali", qual: "–", role: "Assistant Professor" },
  { name: "Mr. Richard", qual: "–", role: "Assistant Professor" },
  { name: "Ms. Gomathi", qual: "–", role: "Assistant Professor" },
];

const BOS_MEMBERS = [
  { name: "Dr. J. Prakash, M.E., Ph.D", role: "Principal, T.J.S Engineering College – Special Invitee" },
  { name: "Dr. N. Jayanthi, MBA, M.Com, M.Phil, SLET, Ph.D", role: "Associate Professor & Head, Dept. of Management Studies – Chairman" },
  { name: "Dr. J. Khaja Sheriff", role: "Professor & Head, Former Chairperson – School of Management Studies, University of Madras – Subject Expert" },
  { name: "Dr. A. R. Krishnan", role: "Professor, College of Management, SRM Institute of Science and Technology – Subject Expert" },
  { name: "Mr. S. Gunasekaran", role: "Group Manager – HR (IIM Trichy Alumni), HCL Technology – Industry Representative" },
  { name: "Ms. Ashika (2024-26 Batch)", role: "Executive IR, L&T, Chennai – Alumnus Member" },
];

const PEOS = [
  "Develop professional competence to become successful managers and entrepreneurs.",
  "Handle diverse opportunities that arise due to changing environment.",
  "Become problem solvers by acquiring the knowledge and thinking skills necessary on a continuous basis.",
  "Work in teams and assume leadership roles during the career.",
  "Be socially sensitive and ethically conscious citizens actively contributing to the country.",
];

const POS = [
  { title: "PO1: Management Knowledge", text: "Demonstrate comprehensive knowledge and understanding of management principles, concepts, and practices in functional areas of business." },
  { title: "PO2: Business Environment Awareness", text: "Analyze the impact of economic, social, technological, legal, and global factors on business organizations and decision-making." },
  { title: "PO3: Critical Thinking and Problem Solving", text: "Apply analytical and critical thinking skills to identify, evaluate, and solve complex business and managerial problems." },
  { title: "PO4: Communication Skills", text: "Communicate effectively through oral, written, and digital modes to achieve organizational and professional objectives." },
  { title: "PO5: Teamwork and Interpersonal Skills", text: "Work collaboratively in diverse teams, demonstrating interpersonal effectiveness and the ability to achieve common goals." },
  { title: "PO6: Leadership and Managerial Competence", text: "Exhibit leadership qualities, managerial capabilities, and decision-making skills required for organizational success." },
  { title: "PO7: Ethics and Social Responsibility", text: "Integrate ethical values, corporate governance principles, and social responsibility in managerial decisions and professional practices." },
  { title: "PO8: Innovation and Entrepreneurship", text: "Demonstrate entrepreneurial mindset, creativity, and innovation to identify opportunities and create sustainable business solutions." },
  { title: "PO9: Lifelong Learning and Professional Development", text: "Engage in continuous learning, self-development, and adaptation to meet the challenges of a dynamic global business environment." },
];

const PSOS = [
  { title: "PSO1: Functional Management Expertise", text: "Apply comprehensive knowledge of management principles, theories, and functional areas such as Marketing, Finance, Human Resource Management, Operations, and Business Analytics to address organizational challenges." },
  { title: "PSO2: Business Analysis and Decision Making", text: "Analyze business environments, organizational data, and managerial situations using analytical, critical-thinking, and decision-making skills to develop effective business solutions." },
  { title: "PSO3: Leadership, Innovation and Entrepreneurship", text: "Demonstrate leadership, teamwork, entrepreneurial thinking, creativity, and innovation to initiate and manage sustainable business opportunities and organizational initiatives." },
  { title: "PSO4: Ethical and Sustainable Management", text: "Integrate ethical values, corporate governance, social responsibility, and sustainability principles into managerial decisions and professional practices." },
  { title: "PSO5: Professional Communication and Continuous Learning", text: "Demonstrate effective oral, written, digital, and interpersonal communication skills and engage in continuous learning to adapt to emerging technologies and dynamic global business environments." },
];

const SEMESTERS = [
  {
    id: "I",
    total: "33 / 30",
    rows: [
      ["1", "26MB501", "Business Statistics for Decision Making", "PC", "3-1-0", "4"],
      ["2", "26MB502", "Management Concept and Organizational Behaviour", "PC", "4-0-0", "4"],
      ["3", "26MB503", "Business Economics and Decision Analysis", "PC", "4-0-0", "4"],
      ["4", "26MB504", "Managerial Accounting and Business Decision Making", "PC", "3-1-0", "4"],
      ["5", "26MB505", "Business Law and Corporate Governance", "PC", "4-0-0", "4"],
      ["6", "26MB506", "Digital Information and Knowledge Management", "PC", "4-0-0", "4"],
      ["7", "–", "Non Functional Elective", "ES(PE)", "3-0-0", "3"],
      ["8", "26MB701", "Business Communication and Corporate Etiquette", "LC", "0-0-4", "2"],
      ["9", "26ES501", "AI and Life Skill & Employability Skill, IBM Certification", "EES", "0-0-2", "1"],
    ],
  },
  {
    id: "II",
    total: "34 / 31",
    rows: [
      ["1", "26MB507", "Operations Research for Business Decisions", "PC", "3-1-0", "4"],
      ["2", "26MB508", "Research Methodology for Management", "PC", "4-0-0", "4"],
      ["3", "26MB509", "Financial Management and Analysis", "PC", "3-1-0", "4"],
      ["4", "26MB510", "Human Resource Management and Development", "PC", "4-0-0", "4"],
      ["5", "26MB511", "AI-Driven Business Analytics", "PC", "4-0-0", "4"],
      ["6", "26MB512", "Production and Service Operations", "PC", "4-0-0", "4"],
      ["7", "26MB513", "AI-Enabled Marketing and Consumer Insights", "PC", "4-0-0", "4"],
      ["8", "26ES502", "Financial Modeling using Excel and Power BI", "EES", "0-0-2", "1"],
      ["9", "26MB702", "Data Analysis and Business Modelling", "LC", "0-0-4", "2"],
    ],
  },
  {
    id: "III",
    total: "32 / 29",
    rows: [
      ["1", "26MB514", "Global Business Management", "PC", "4-0-0", "4"],
      ["2", "26MB515", "Strategic Planning and Decision Making", "PC", "4-0-0", "4"],
      ["3", "–", "Elective 1", "PE", "3-0-0", "3"],
      ["4", "–", "Elective 2", "PE", "3-0-0", "3"],
      ["5", "–", "Elective 3", "PE", "3-0-0", "3"],
      ["6", "–", "Elective 4", "PE", "3-0-0", "3"],
      ["7", "–", "Elective 5", "PE", "3-0-0", "3"],
      ["8", "–", "Elective 6", "PE", "3-0-0", "3"],
      ["9", "26ES503", "Corporate Employability Skills and Interview Preparation", "EES", "0-0-2", "1"],
      ["10", "26IN801", "Summer Internship", "EL", "0-0-4", "2"],
    ],
  },
  {
    id: "IV",
    total: "12",
    rows: [
      ["1", "26PW801", "Main Project", "EL", "0-0-4", "12"],
    ],
  },
];

const NON_FUNCTIONAL_ELECTIVES = [
  { code: "26MB601", title: "Entrepreneurship Development" },
  { code: "26MB602", title: "Event Management" },
];

const PE_STREAMS = [
  { name: "Financial Management", courses: ["Security Analysis and Portfolio Management", "Financial Markets", "Banking and Financial Services", "Financial Derivatives", "Fintech and Sustainability", "Behavioral Finance"] },
  { name: "Marketing Management", courses: ["Retail Marketing", "Consumer Behaviour and Neural Marketing", "Services Marketing", "Sales and Distribution Management", "Product and Brand Management", "Digital Marketing"] },
  { name: "Human Resource Management", courses: ["Knowledge Management and Innovation", "Industrial Relations and Labour Legislations", "Negotiation and Conflict Management", "Reward and Compensation Management", "International Human Resource Management", "Managing HR in Digital Age"] },
  { name: "Business Analytics and Systems", courses: ["Data Mining and Decision Science", "Deep Learning", "Social Media Web Analytics", "E-Business Management", "Enterprise Resource Planning", "Business Analytics using Python"] },
  { name: "AI & DS", courses: ["Advanced Machine Learning", "Deep Learning", "Natural Language Processing", "Generative AI for Business", "Business Intelligence", "Big Data Management and Security", "Analytics Toolkit for Decision Sciences", "Artificial Intelligence & Its Applications", "NLP with LLM", "Data Visualization", "Artificial Neural Networks", "Machine Learning and Predictive Modelling"] },
  { name: "Logistics and Supply Chain Management", courses: ["Supply Chain Concepts and Planning", "Sourcing and Supply Management", "Supply Chain Inventory Management", "Supply Chain Information System", "Warehouse Management", "Transportation and Distribution Management", "Reverse and Contract Logistics", "Air Cargo Management", "Containerization and Allied Business", "Exim Management", "Fundamentals of Shipping", "Port and Terminal Management"] },
];

const KEY_REGULATIONS = [
  {
    title: "Programme Duration & Structure",
    points: [
      "MBA (Full-Time) is a 2-year programme (minimum), maximum 4 years including any permitted break of study — 4 semesters, minimum 99–102 total credits.",
      "Each semester is normally 90 working days (minimum 65 working days).",
      "Summer Internship: up to 6 weeks (2 credits); Main Project: up to 16 weeks (12 credits).",
    ],
  },
  {
    title: "Attendance Criterion",
    points: [
      "Minimum 75% overall attendance required per semester to be eligible for end-semester exams.",
      "Candidates with 65–74% attendance may be permitted with a valid medical/sports certificate approved by the Head of the Institution.",
      "Below 65% attendance: not permitted to write end-semester exams; must repeat the incomplete semester.",
      "A student can avail a maximum of 2 weeks On-Duty Leave per year for internships, with prior HOD approval.",
    ],
  },
  {
    title: "Assessment Weightage",
    points: [
      "Lecture / Lecture-cum-Tutorial courses: 40% Internal Assessment (CAT) + 60% End Semester Examination.",
      "Internal Assessment: 20 marks Continuous Assessment Test + 20 marks from methods such as seminar presentation, assignment/case submission, GD participation, case discussion.",
      "Laboratory Course: 20 marks Internal + 60 marks End Semester Exam + 20 marks Viva-Voce.",
      "Final Project: Internal Assessment 20 marks (4 reviews) + End Semester 80 marks (Thesis 30, Viva-Voce 50 split between internal/external examiners).",
    ],
  },
  {
    title: "Grading System",
    points: [
      "O (91-100) = 10 grade points, A+ (81-90) = 9, A (71-80) = 8, B+ (61-70) = 7, B (50-60) = 6, RA (below 50) = 0 (Reappear).",
      "A pass requires a minimum of 50% overall (Continuous Assessment + End Semester combined) and minimum 50% in the End Semester Examination.",
    ],
  },
  {
    title: "Award of Degree",
    points: [
      "First Class with Distinction: all courses passed in first appearance within 2 years, CGPA ≥ 8.50, no attendance-related exam prevention.",
      "First Class: all courses passed within 2–3 years (including one authorised break), CGPA ≥ 6.50, no attendance-related exam prevention.",
      "Second Class: all courses passed within the maximum programme duration, not meeting the above criteria.",
      "One break of study permitted; withdrawal from end-semester exams permitted only once during the programme, for valid medical/family reasons.",
    ],
  },
];

const TEACHING_PRACTICES = [
  { name: "Case-Based Learning", desc: "Students analyse real business cases (e.g. Tata, Reliance, Infosys) to develop analytical thinking and decision-making skills." },
  { name: "Problem-Based Learning (PBL)", desc: "Teams investigate real business problems (e.g. why customers are shifting to digital banking) and propose solutions." },
  { name: "Experiential Learning", desc: "Learning through industrial visits, internships, field surveys, business simulations, live projects and management games." },
  { name: "Flipped Classroom", desc: "Students study concepts beforehand; class time is used for discussion and application (e.g. solving Break-Even Analysis problems)." },
  { name: "Business Simulation Games", desc: "Teams act as CEOs, deciding pricing, production, marketing spend and investment, evaluated on simulated results." },
  { name: "Role Play and Management Games", desc: "Students enact managerial situations such as job interviews or Management-vs-Union negotiations to build communication and negotiation skills." },
  { name: "Industry-Integrated Learning", desc: "Guest lectures, expert talks, industry mentoring and live consultancy projects bring practitioner insight into the classroom." },
  { name: "Live Business Projects", desc: "Students execute real studies (e.g. a customer satisfaction study) covering research design, data collection, analysis and recommendations." },
  { name: "Collaborative Learning", desc: "Group presentations, peer teaching and team case analysis, e.g. each group analysing and teaching one component of the marketing mix." },
  { name: "Peer Learning and Peer Teaching", desc: "Students explain concepts (e.g. Porter's Five Forces) to classmates to build communication and conceptual understanding." },
  { name: "Technology-Enabled Learning", desc: "LMS, digital quizzes, interactive PPTs, Excel/Power BI and business analytics tools integrated into regular teaching." },
  { name: "Data-Driven Decision-Making", desc: "Students analyse real customer/sales data to identify trends, profitable segments and retention rates using Excel, Power BI and analytics platforms." },
  { name: "Design Thinking", desc: "Empathise → Define → Ideate → Prototype → Test process applied to develop solutions such as a fintech product for student financial needs." },
  { name: "Entrepreneurship-Based Learning", desc: "Business-plan preparation, startup idea generation, pitching and prototype development — e.g. an eco-friendly startup business model." },
  { name: "Management Consultancy Projects", desc: "Students act as student consultants studying a real organisational problem (e.g. high employee turnover) and present a consultancy report." },
  { name: "Gamification", desc: "Business quizzes, leaderboards, case competitions and financial market games to increase participation." },
  { name: "Micro-Learning", desc: "Large topics divided into short focused modules, e.g. Financial Management taught via Capital Budgeting → NPV → IRR → Payback Period." },
  { name: "Reflective Learning", desc: "Students maintain a learning journal reflecting on what they learned, observed, found difficult, and how to apply it." },
  { name: "Social and Community-Based Learning", desc: "Students help local entrepreneurs with costing, pricing, digital marketing and financial planning, building social responsibility." },
  { name: "Continuous Formative Assessment", desc: "Assessment through case analysis, presentations, quizzes, group projects, viva and reflection journals rather than only end-semester exams." },
];

const INTERNSHIPS = [
  { name: "Abirami S", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Quality Management" },
  { name: "Abiramy R", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Customer Satisfaction" },
  { name: "Abisheik V R", duration: "4 Weeks", company: "Pennar Industries Limited", title: "A Study on Production Process Efficiency Analysis" },
  { name: "Angel D", duration: "4 Weeks", company: "Mahindra MM Motors", title: "A Study on Employee Welfare" },
  { name: "Aravind Kumar R", duration: "4 Weeks", company: "Top Freshers", title: "A Study of Job Satisfaction" },
  { name: "Arun R", duration: "4 Weeks", company: "Wheels India Limited", title: "A Study on Job Satisfaction" },
  { name: "Ashika A", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Data Analysis in Production Control and Production Planning" },
  { name: "Balaji S", duration: "4 Weeks", company: "Truliv Pvt Ltd", title: "A Study on Training and Development in Truliv Pvt. Ltd." },
  { name: "Dhayanithi S", duration: "4 Weeks", company: "Aee Kay Components Pvt Ltd, Sri City", title: "A Study on Impact of Technology on Operation Management" },
  { name: "Ganesh M G", duration: "4 Weeks", company: "Omni Auto Limited", title: "A Study on Enhancing Supply Chain Efficiency Using Predictive Analysis" },
  { name: "Gokul T", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Brand Experience and Product Efficiency" },
  { name: "Gowthami L", duration: "4 Weeks", company: "DLK Software Pvt Ltd, Chennai", title: "A Study on Work Life Balance" },
  { name: "Ilavarasi B", duration: "4 Weeks", company: "Chennai Petroleum Corporation Limited (Manali)", title: "A Study on Financial Performance Analysis" },
  { name: "Lokesh K U", duration: "4 Weeks", company: "Panasonic Appliances India Co Ltd", title: "A Study on Issues Faced by Freight Forwarders at Panasonic" },
  { name: "Manoharan V", duration: "4 Weeks", company: "Lehry Industries Pvt Ltd", title: "A Study on Company Internship Training" },
  { name: "Mohan C R", duration: "4 Weeks", company: "Pennar Industries Limited", title: "A Study on Capital Structure and its Impact on Profitability" },
  { name: "Monika N", duration: "4 Weeks", company: "Bafna Pharmaceutical Limited", title: "A Study on Work Life Balance Employees" },
  { name: "Muthukumaran V", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Issues Faced by Freight Forwarders at Panasonic" },
  { name: "Nandhini SK", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Warehouse Management" },
  { name: "Nandhu P", duration: "4 Weeks", company: "HL Mando Anand India Private Limited", title: "A Study on Inventory Management" },
  { name: "Narmatha B", duration: "4 Weeks", company: "Livewire (Anna Nagar)", title: "A Study on Retail Sales Analysis Using SQL" },
  { name: "Pooja R", duration: "4 Weeks", company: "Wheels India Limited", title: "A Study on Safety and Health in Workplace" },
  { name: "Pradeep Kumar B", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Logistics Management" },
  { name: "Rajkumar S", duration: "4 Weeks", company: "V Cargo Movers", title: "A Study on Issues Faced by Freight Forwarders" },
  { name: "Ramya S", duration: "4 Weeks", company: "DLK Software Pvt Ltd, Chennai", title: "A Study on Employee Compensation" },
  { name: "Rubashree B", duration: "4 Weeks", company: "Chennai Petroleum Corporation Limited (Manali)", title: "A Study on Budget and Budgetary Control" },
  { name: "Sandhiya R", duration: "4 Weeks", company: "Pennar Industries Limited", title: "A Study on Supply Chain Management Using BBA Tools" },
  { name: "Saranya C", duration: "4 Weeks", company: "Ready Brick Company", title: "A Study on Working Capital Management in a Manufacturing Company" },
  { name: "Sharumathi S", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Inventory Management" },
  { name: "Siva Shankar R", duration: "4 Weeks", company: "Panasonic Appliances India Company Limited", title: "A Study on Inventory Management" },
  { name: "Sridevi A", duration: "4 Weeks", company: "Chennai Petroleum Corporation Limited (Manali)", title: "A Study on Inventory Management" },
  { name: "Sujitha P", duration: "4 Weeks", company: "Panasonic Appliances India Co Ltd", title: "A Study on Quality Tools and Techniques" },
  { name: "Swapna MD", duration: "4 Weeks", company: "Chennai Petroleum Corporation Limited (Manali)", title: "A Study on Working Capital Management" },
  { name: "Swathi S", duration: "4 Weeks", company: "Steel Authority of India Limited", title: "A Study on the Effectiveness of Material Handling" },
  { name: "Swetha D", duration: "4 Weeks", company: "Chennai Petroleum Corporation Limited (Manali)", title: "A Study on Corporate Social Responsibility and its Role in Financial Performance" },
  { name: "Thamizharasi M", duration: "4 Weeks", company: "Michelin India Private Limited", title: "A Study on Digital HR in Manufacturing" },
  { name: "Tharunshakthi S", duration: "4 Weeks", company: "Panasonic Appliances India Co Ltd", title: "A Study on Optimizing Delivery Routes and Logistics Cost in Appliances Distribution" },
  { name: "Udhaya Bharathi S", duration: "4 Weeks", company: "Panasonic Appliances India Co Ltd", title: "A Study on Brand Experience and Product Efficiency" },
  { name: "Vignesh V", duration: "4 Weeks", company: "Godrej Jersey Creamline Dairy Products Limited", title: "A Study on Employees Performance Appraisal and Management" },
  { name: "Vikash P", duration: "4 Weeks", company: "Panasonic Appliances India Co Ltd", title: "A Study on Key Attributes of Marketing Strategies in Online Business" },
];

function AccordionSection({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="tjs-committee-list">
      {items.map((item, i) => (
        <div className="tjs-committee-item" key={item.title}>
          <button
            type="button"
            className={"tjs-committee-toggle" + (open === i ? " active" : "")}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span>{item.title}</span>
            <i className="ri-arrow-down-s-line"></i>
          </button>
          {open === i && (
            <div className="tjs-committee-body">
              <ul>
                {item.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MBADepartment() {
  const [activeSem, setActiveSem] = useState("I");
  const semester = SEMESTERS.find((s) => s.id === activeSem);

  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">Department</span>
          <h1>Master of Business Administration</h1>
          <p>
            The Department of Management Studies offers a two-year, full-time MBA programme under the Choice
            Based Credit System, nurturing ethical, competent management professionals with a global perspective.
          </p>
        </div>
        <div className="tjs-dept-hero-image">
          <img src="/assets/images/campus/smart-classroom-01.jpg" alt="Department of Management Studies at T.J.S Engineering College" />
        </div>
      </section>

      <div className="tjs-dept-page">
        <DeptJumpNav
          items={[
            { href: "#about", label: "About" },
            { href: "#bos", label: "Board of Studies" },
            { href: "#people", label: "Faculty & Staff" },
            { href: "#programmes", label: "Programmes Offered" },
            { href: "#curriculum", label: "Curriculum" },
            { href: "#regulations", label: "Regulations" },
            { href: "#teaching", label: "Teaching Practices" },
            { href: "#internship", label: "Internship" },
          ]}
        />

        <section id="about" className="tjs-dept-section">
          <h2>About the Department</h2>
          <p>
            The Department of Management Studies at T.J.S. Engineering College, an Autonomous Institution
            affiliated to Anna University, Chennai, offers the Master of Business Administration (MBA) programme
            under the Choice Based Credit System (CBCS), applicable to students admitted from the Academic Year
            2026-2027.
          </p>

          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p style={{ marginBottom: 0 }}>
                To become a premier department in management education by nurturing innovative, ethical, and
                competent management professionals with global perspective and social responsibility.
              </p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <ul style={{ marginBottom: 0 }}>
                <li>To impart quality management education through effective teaching-learning practices and continuous academic excellence.</li>
                <li>To develop leadership, entrepreneurial, communication, analytical, and problem-solving skills among students for professional success.</li>
                <li>To bridge the gap between academia and industry through industrial interaction, internships, practical exposure, and skill development initiatives.</li>
                <li>To promote research, innovation, lifelong learning, and global perspectives to prepare students for the dynamic business environment.</li>
                <li>To inculcate ethical values, professionalism, social responsibility, and commitment towards sustainable development among future managers.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="bos" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Board of Studies</h2>
          <p>
            Meeting No. 01 &middot; 28.08.2026 &middot; Board Room, T.J.S Engineering College
          </p>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role / Position</th>
                </tr>
              </thead>
              <tbody>
                {BOS_MEMBERS.map((m) => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td>{m.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="people" className="tjs-dept-section">
          <h2>Faculty &amp; Staff</h2>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {FACULTY.map((f, i) => (
                  <tr key={f.name}>
                    <td>{i + 1}</td>
                    <td>{f.name}</td>
                    <td>{f.qual}</td>
                    <td>{f.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="programmes" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Programmes Offered</h2>
          <div className="tjs-dept-tabs">
            <button type="button" className="tjs-dept-tab active">M.B.A – Master of Business Administration</button>
          </div>

          <h3>Programme Educational Objectives (PEOs)</h3>
          <div className="tjs-dept-peo-list">
            {PEOS.map((peo, i) => (
              <div className="tjs-dept-peo" key={i}><p>PEO{i + 1}. {peo}</p></div>
            ))}
          </div>

          <h3>Programme Outcomes (POs)</h3>
          <div className="tjs-dept-peo-list">
            {POS.map((po) => (
              <div className="tjs-dept-peo" key={po.title}>
                <h4>{po.title}</h4>
                <p>{po.text}</p>
              </div>
            ))}
          </div>

          <h3>Programme Specific Outcomes (PSOs)</h3>
          <div className="tjs-dept-peo-list">
            {PSOS.map((pso) => (
              <div className="tjs-dept-peo" key={pso.title}>
                <h4>{pso.title}</h4>
                <p>{pso.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="curriculum" className="tjs-dept-section">
          <h2>Curriculum – Regulations 2026 (CBCS)</h2>
          <p>Choice Based Credit System curriculum for MBA, applicable to students admitted in Academic Year 2026-2027.</p>

          <div className="tjs-dept-tabs">
            {SEMESTERS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={"tjs-dept-tab" + (activeSem === s.id ? " active" : "")}
                onClick={() => setActiveSem(s.id)}
              >
                Semester {s.id}
              </button>
            ))}
          </div>

          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>L-T-P</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {semester.rows.map((row) => (
                  <tr key={row[0] + row[2]}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} style={{ textAlign: "right", fontWeight: 700 }}>TOTAL CREDITS</td>
                  <td style={{ fontWeight: 700 }}>{semester.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Non-Functional Electives</h3>
          <ul className="tjs-dept-bullets">
            {NON_FUNCTIONAL_ELECTIVES.map((e) => (
              <li key={e.code}>{e.code} – {e.title}</li>
            ))}
          </ul>

          <h3>Programme Elective Courses – Specialisation Streams</h3>
          <p>Students may choose electives from two functional specialisations (three subjects each) in Semester III.</p>
          <div className="tjs-dept-grid-2">
            {PE_STREAMS.map((s) => (
              <div className="tjs-dept-card" key={s.name}>
                <h3 style={{ marginTop: 0 }}>{s.name}</h3>
                <ul style={{ marginBottom: 0 }}>
                  {s.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="regulations" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Academic Regulations – Key Points</h2>
          <p>
            T.J.S. Engineering College MBA Regulations govern the two-year, full-time MBA programme. Key
            provisions are summarised below.
          </p>
          <AccordionSection items={KEY_REGULATIONS} />
        </section>

        <section id="teaching" className="tjs-dept-section">
          <h2>Innovative Teaching &amp; Learning Practices</h2>
          <div className="tjs-dept-grid-2">
            {TEACHING_PRACTICES.map((t) => (
              <div className="tjs-dept-card" key={t.name}>
                <h3 style={{ marginTop: 0 }}>{t.name}</h3>
                <p style={{ marginBottom: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="internship" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Internship</h2>
          <h3>Summer Internship – Academic Year 2025-26</h3>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Duration</th>
                  <th>Company Name</th>
                  <th>Project Title</th>
                </tr>
              </thead>
              <tbody>
                {INTERNSHIPS.map((s, i) => (
                  <tr key={s.name}>
                    <td>{i + 1}</td>
                    <td>{s.name}</td>
                    <td>{s.duration}</td>
                    <td>{s.company}</td>
                    <td>{s.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
