import DeptMegaNav from "../DeptMegaNav";
import PeopleCarousel from "../PeopleCarousel";
import EventSlider from "../EventSlider";
import MouTabsViewer from "../MouTabsViewer";
import YearGroupedVisits from "../YearGroupedVisits";
import LabAccordion from "../LabAccordion";
import DeptPhotoSlider from "../DeptPhotoSlider";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const JPEG_IMAGES = new Set([20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35]);
function img(n) {
  return "/assets/images/mba/image_" + n + "." + (JPEG_IMAGES.has(n) ? "jpeg" : "png");
}

const TOPPERS = [];

const FACULTY = [
  { name: "Dr. N. Jayanthi", degree: "Ph.D." },
  { name: "Mrs. Sangeetha", degree: "MBA" },
  { name: "Ms. Gomathi", degree: "MBA" },
  { name: "Mr. Richard", degree: "MBA" },
];

const NON_TEACHING = [];

const ELECTIVES_OFFERED = [
  "Marketing Management",
  "Human Resources Management",
  "Finance Management",
  "Logistic and Supply Chain Management",
  "Business Analytics",
];

const PEOS = [
  "PEO1: Develop professional competence to become successful managers and entrepreneurs.",
  "PEO2: Handle diverse opportunities that arise due to changing environment.",
  "PEO3: Become problem solvers by acquiring the knowledge and thinking skills necessary on a continuous basis.",
  "PEO4: Work in teams and assume leadership roles during the career.",
  "PEO5: Be socially sensitive and ethically conscious citizens actively contributing to the country.",
];

const POS = [
  "PO1 – Management Knowledge: Demonstrate comprehensive knowledge and understanding of management principles, concepts, and practices in functional areas of business.",
  "PO2 – Business Environment Awareness: Analyze the impact of economic, social, technological, legal, and global factors on business organizations and decision-making.",
  "PO3 – Critical Thinking and Problem Solving: Apply analytical and critical thinking skills to identify, evaluate, and solve complex business and managerial problems.",
  "PO4 – Communication Skills: Communicate effectively through oral, written, and digital modes to achieve organizational and professional objectives.",
  "PO5 – Teamwork and Interpersonal Skills: Work collaboratively in diverse teams, demonstrating interpersonal effectiveness and the ability to achieve common goals.",
  "PO6 – Leadership and Managerial Competence: Exhibit leadership qualities, managerial capabilities, and decision-making skills required for organizational success.",
  "PO7 – Ethics and Social Responsibility: Integrate ethical values, corporate governance principles, and social responsibility in managerial decisions and professional practices.",
  "PO8 – Innovation and Entrepreneurship: Demonstrate entrepreneurial mindset, creativity, and innovation to identify opportunities and create sustainable business solutions.",
  "PO9 – Lifelong Learning and Professional Development: Engage in continuous learning, self-development, and adaptation to meet the challenges of a dynamic global business environment.",
];

const PSOS = [];

const BOS_DOCS = [];

const BOS_MEMBERS = [
  {
    position: "Board of Studies Chairman",
    members: [
      {
        name: "Dr. N. Jayanthi",
        role: "MBA, M.Com, M.Phil, SLET, Ph.D. — Associate Professor & Head, Department of Management Studies, T.J.S Engineering College, Chennai",
      },
    ],
  },
  {
    position: "Expert Nominated from Anna University",
    members: [{ name: "—", role: "Member" }],
  },
  {
    position: "Subject Expert 1 from Outside the Parent University",
    members: [
      {
        name: "Dr. J. Khaja Sheriff",
        role: "Professor & Head; Former Chairperson – School of Management Studies, University of Madras, Chennai – 600 005",
      },
    ],
  },
  {
    position: "Subject Expert 2 from Outside the Parent University",
    members: [
      {
        name: "Dr. A.R. Krishnan",
        role: "Professor, College of Management, SRM Institute of Science and Technology, Kattankulathur, Chennai, Tamil Nadu",
      },
    ],
  },
  {
    position: "Industry Representative",
    members: [
      {
        name: "Mr. S. Gunasekaran",
        role: "Group Manager – HR (IIM Trichy Alumni), HCL Technology",
      },
    ],
  },
  {
    position: "Alumnus",
    members: [
      {
        name: "Ms. Ashika",
        role: "Alumni (2024–26 Batch), Executive IR, L&T, Chennai",
      },
    ],
  },
];

const NEWSLETTERS = [];
const MOU_DOCS = [];
const CONSULTANCY = [];
const STUDENT_PROJECTS = [];
const LABS = [];

const INDUSTRIAL_VISITS = [
  {
    date: "04-09-2025",
    title: "Coca-Cola Manufacturing Plant, Chennai (Hindustan Coca-Cola Beverages)",
    desc: "The Department of MBA organized an Industrial Visit to the Coca-Cola manufacturing plant on 4th September 2025 for 70 MBA students, accompanied by 4 faculty members. Students gained practical exposure to manufacturing operations, supply chain management, quality control, production planning, logistics, and marketing practices.",
    imgs: [
      { src: img(49), alt: "Industrial Visit to Coca-Cola manufacturing plant, 04-09-2025" },
      { src: img(50), alt: "Coca-Cola visit, Vellavedu, 04-09-2025" },
      { src: img(51), alt: "Coca-Cola visit, Chennai-Nemam selfie wall" },
      { src: img(52), alt: "Coca-Cola visit, interior group photo" },
    ],
  },
  {
    date: "07-10-2025",
    title: "Lotte India",
    desc: "The Department of MBA organized an Industrial Visit to Lotte India on 7th October 2025 to provide students with practical exposure to the operations of the confectionery and FMCG industry — manufacturing, quality control, production planning, packaging, inventory management, and supply chain operations.",
    imgs: [{ src: img(53), alt: "Industrial Visit to Lotte India, 07-10-2025" }],
  },
  {
    date: "20-01-2026",
    title: "Chennai Port Harbour",
    desc: "The Department of MBA organized an Industrial Visit to Chennai Port Harbour on 20th January 2026 for 45 first-year MBA students, providing practical exposure to Logistics and Supply Chain Management — port operations, cargo handling, warehousing, customs clearance, container management, and multimodal transportation systems.",
    imgs: [
      { src: img(37), alt: "Industrial Visit to Chennai Port Harbour, 20-01-2026" },
      { src: img(36), alt: "Chennai Port Harbour visit, group photo" },
      { src: img(11), alt: "Chennai Port Harbour visit, students with faculty" },
    ],
  },
  {
    date: "23-02-2026",
    title: "Aavin Dairy Plant, Madhavaram",
    desc: "The Department of MBA organized an Industrial Visit to the Aavin Dairy Plant, Madhavaram, on 23rd February 2026 — milk procurement, quality testing, pasteurization, packaging, cold chain management, inventory control, and distribution processes.",
    imgs: [
      { src: img(63), alt: "Industrial Visit to Aavin Dairy Plant, Madhavaram, 23-02-2026" },
      { src: img(64), alt: "Aavin Dairy Plant, inside briefing" },
      { src: img(38), alt: "Aavin Dairy Plant, storage tanks" },
    ],
  },
  {
    date: "08-09-2026",
    title: "Parle G, Madhavaram",
    desc: "Industrial Visit to the Parle G plant, Madhavaram, on 8th September 2026.",
    imgs: [{ src: img(31), alt: "Industrial Visit to Parle G, Madhavaram, 08-09-2026" }],
  },
  {
    date: "15-09-2026",
    title: "Lucas TVS, Chennai",
    desc: "The Department of MBA hosted an exclusive Industrial Visit to Lucas TVS, Chennai, on 15th September 2026 for 2nd Year MBA students, offering hands-on exposure to world-class manufacturing, supply chain excellence, and operational strategies.",
    imgs: [
      { src: img(32), alt: "Industrial Visit to Lucas TVS, Chennai, 15-09-2026" },
      { src: img(33), alt: "Lucas TVS visit, in-plant briefing collage" },
    ],
  },
  {
    date: "17-09-2026",
    title: "Coca-Cola Bottling Plant, Nemam",
    desc: "Industrial Visit to the Coca-Cola Bottling Plant, Nemam, on 17th September 2026.",
    imgs: [{ src: img(30), alt: "Industrial Visit to Coca-Cola Bottling Plant, Nemam, 17-09-2026" }],
  },
];

const INTERNSHIPS = [];
const CONFERENCES = [];

const GUEST_LECTURES = [
  {
    date: "15-08-2025",
    title: "SEBI Smart Investor Awareness Program",
    desc: "Conducted by Mr. Mohan Kumar, SEBI Trainer, as Chief Guest — fundamentals of financial planning, smart investment practices, investor rights and responsibilities, fraud prevention, and informed investment decisions. Certificates were issued to all participating students.",
    imgs: [
      { src: img(40), alt: "SEBI Smart Investor Awareness Program, certificate presentation" },
      { src: img(41), alt: "SEBI Smart Investor Awareness Program, group photo" },
    ],
  },
  {
    date: "15-10-2025",
    title: "Workshop II – “How Behaviour Defines Your Career”",
    desc: "Led by Ms. Nageshwari as Chief Guest — attitude, communication skills, professional behaviour, emotional intelligence, and interpersonal skills; included a basic mock interview with personalised feedback for all students.",
    imgs: [{ src: img(42), alt: "Workshop II – How Behaviour Defines Your Career, 15-10-2025" }],
  },
  {
    date: "22-01-2026",
    title: "Investor Education and Awareness Program for Girl Students",
    desc: "Organized in collaboration with Mirae Asset Investment Managers (India) Pvt. Ltd. and the Centre for Investment Education and Learning (CIEL). Resource person: Mr. Mohankumar Ramakrishnan, Ex-Banker, Financial Planner and SEBI SMART — fundamentals of investing, mutual funds, financial goal setting, risk management, digital investment platforms, and investor protection.",
    imgs: [
      { src: img(12), alt: "Investor Education and Awareness Program poster, 22-01-2026" },
      { src: img(13), alt: "Investor Education and Awareness Program, classroom session" },
      { src: img(14), alt: "Investor Education and Awareness Program, certificates" },
    ],
  },
];

const FDPS_ATTENDED = [];
const WORKSHOPS = [];
const OTHER_DEPT_EVENTS = [
  {
    date: "29-10-2025",
    title: "BIZINFI 2K25 – National Level Symposium",
    desc: "Organized by the MBA Department, attracting around 150 participants from different colleges across ten events — academic presentations, entrepreneurial ideas, artistic performances, and technical skills. Chief Guest: Mr. Sunny John Abraham, Global Network Architect Specialist, Canada.",
    imgs: [
      { src: img(44), alt: "BIZINFI 2K25 symposium, certificate presentation" },
      { src: img(45), alt: "BIZINFI 2K25 symposium, student group photo" },
      { src: img(55), alt: "BIZINFI 2K25 symposium collage" },
      { src: img(56), alt: "BIZINFI 2K25 symposium collage" },
      { src: img(57), alt: "BIZINFI 2K25 symposium group photo" },
      { src: img(68), alt: "BIZINFI 2K25 symposium group photo" },
      { src: img(69), alt: "BIZINFI 2K25 symposium certificates" },
      { src: img(70), alt: "BIZINFI 2K25 symposium certificate presentation" },
      { src: img(71), alt: "BIZINFI 2K25 symposium, Chief Guest Mr. Sunny John Abraham" },
    ],
  },
  {
    date: "30-09-2026",
    title: "BIZGENIX 2K26 Symposium",
    desc: "Organized by the Department of Management Studies. Chief Guest: Mr. Shankar, General Manager – HR, Herenknect India Pvt Ltd. Events included Business Quiz, Business Plan, IPL Auction, Debate, Brand Dectitive, 3D Art, Best Manager, Corporate Walk, and Adzap.",
    imgs: [
      { src: img(34), alt: "BIZGENIX 2K26 symposium poster" },
      { src: img(28), alt: "BIZGENIX 2K26 symposium, lamp lighting" },
      { src: img(29), alt: "BIZGENIX 2K26 symposium, group with certificates" },
      { src: img(27), alt: "BIZGENIX 2K26 symposium, award presentation" },
      { src: img(35), alt: "BIZGENIX 2K26 symposium, gift presentation" },
      { src: img(20), alt: "BIZGENIX 2K26 symposium, winners group photo" },
      { src: img(21), alt: "BIZGENIX 2K26 symposium, winners group photo" },
    ],
  },
];

const SEMINARS_EVENTS = [
  {
    date: "27-09-2025",
    title: "Inauguration Ceremony – Academic Year",
    desc: "Chief Guest: Dr. Palavesan Murugan, Corporate Professional, Ashok Leyland. Badges were presented to 10 student office bearers, followed by a keynote address on corporate trends, industry expectations, leadership qualities, and professional ethics.",
    imgs: [
      { src: img(43), alt: "Inauguration Ceremony, 27-09-2025, main stage group photo" },
      { src: img(47), alt: "Inauguration Ceremony, stage group" },
      { src: img(48), alt: "Inauguration Ceremony, stage group" },
      { src: img(46), alt: "Inauguration Ceremony, shawl presentation" },
      { src: img(39), alt: "Inauguration Ceremony, badge presentation" },
      { src: img(54), alt: "Inauguration Ceremony, student office bearers" },
    ],
  },
  {
    date: "23-09-2026",
    title: "Inauguration of Club Activities",
    desc: "Chief Guest: Mr. Amit Kumar Singh, HOD, RKTK HR Department.",
    imgs: [
      { src: img(23), alt: "Inauguration of Club Activities poster, 23-09-2026" },
      { src: img(24), alt: "Inauguration of Club Activities, group photo" },
    ],
  },
  {
    date: "24-09-2026",
    title: "Inauguration of Association of Management Studies",
    desc: "Marked with the BIZGENIX 2K association activities, including BGMI and Free Fire E-Sports.",
    imgs: [{ src: img(22), alt: "Inauguration of Association of Management Studies poster, 24-09-2026" }],
  },
];

const RECRUITERS = [];
const PLACED_STUDENTS = [];

const FACULTY_ACHIEVEMENTS = [
  {
    date: "21-09-2026 to 26-09-2026",
    title: "Six-Day Online National FDP – Research and Publication Ethics in Management",
    desc: "Dr. N. Jayanthi, Associate Professor & Head, Department of MBA, participated in this FDP conducted by the Department of MBA, St. Joseph College of Engineering, Sriperumbudur, Chennai.",
    imgs: [{ src: img(74), alt: "FDP certificate of participation, Dr. N. Jayanthi" }],
  },
  {
    date: "15-05-2026",
    title: "Chief Guest – S2S HR Forum",
    desc: "Dr. N. Jayanthi served as Chief Guest at the S2S Human Resource & Charitable Trust forum.",
    imgs: [{ src: img(19), alt: "Dr. N. Jayanthi as Chief Guest, S2S HR Forum, 15-05-2026" }],
  },
];

const CO_CURRICULAR = [
  {
    date: "30-01-2026",
    title: "Inter-Collegiate Cultural Fest 2026",
    desc: "Brought together students from 20 Arts and Science colleges with 430 participants — classical, fusion, western, and folk dance, singing, and mime. Chief Guest: Dr. T. Diwagar, Physiotherapist. Winners were honoured with trophies, medals, and certificates.",
    imgs: [
      { src: img(58), alt: "Cultural Fest 2026, dance performance" },
      { src: img(72), alt: "Cultural Fest 2026, event poster" },
      { src: img(73), alt: "Cultural Fest 2026, classical dance" },
      { src: img(59), alt: "Cultural Fest 2026, singing performance" },
      { src: img(60), alt: "Cultural Fest 2026, mime performance" },
      { src: img(61), alt: "Cultural Fest 2026, dance performance" },
      { src: img(62), alt: "Cultural Fest 2026, singing performance" },
      { src: img(65), alt: "Cultural Fest 2026, award presentation" },
      { src: img(66), alt: "Cultural Fest 2026, award presentation" },
      { src: img(67), alt: "Cultural Fest 2026, award presentation" },
    ],
  },
];

const EXTRA_CURRICULAR = [
  {
    date: "Sports",
    title: "Chess – First Prize (Vignesh J, MBA I Year)",
    desc: "First prize in Chess, won by Vignesh J, MBA I Year.",
    imgs: [{ src: img(10), alt: "Vignesh J, MBA I Year, Chess First Prize" }],
  },
  {
    date: "Sports",
    title: "Badminton – First Prize",
    desc: "First prize in Badminton, won by Sethu P, Naveen N, and Subash B.",
    imgs: [{ src: img(8), alt: "First Prize Badminton — Sethu P, Naveen N, Subash B" }],
  },
  {
    date: "Sports",
    title: "Volleyball – First Prize (MBA I Year)",
    desc: "First prize in Volleyball, MBA I Year team: Sethu P, Naveen N, Subash B, Vignesh J, Deepadharshan M, Yabesh B, Karthikeyan D L, Anala Magesh, Eliyavan E.",
    imgs: [
      { src: img(1), alt: "MBA I Year Volleyball team, First Prize" },
      { src: img(3), alt: "MBA I Year Volleyball team, First Prize" },
      { src: img(9), alt: "MBA I Year Volleyball team" },
    ],
  },
  {
    date: "Sports",
    title: "Carrom – Second Place",
    desc: "Second place in Carrom, won by Sandhiya P and Madhupreetha K.",
    imgs: [{ src: img(2), alt: "Sandhiya P, Madhupreetha K — Carrom Second Place" }],
  },
];

const ALUMNI_INTERACTIONS = [];
const DISTINGUISHED_ALUMNI = [];

const ENTREPRENEURSHIP_EVENTS = [
  {
    date: "10-02-2026",
    title: "Resource Person – “How to Become a Successful Entrepreneur”",
    desc: "Dr. N. Jayanthi served as Resource Person at Dr. MGR-Janaki College of Arts & Science for Women, Department of Commerce (Corporate Secretaryship), Shift-II, in association with the Entrepreneurial Development Cell.",
    imgs: [
      { src: img(7), alt: "Dr. MGR-Janaki College workshop poster, 10.2.2026" },
      { src: img(17), alt: "Dr. MGR-Janaki College workshop, felicitation" },
      { src: img(18), alt: "Dr. MGR-Janaki College workshop, classroom session" },
    ],
  },
  {
    date: "18-02-2026",
    title: "Resource Person – “Successful Entrepreneur Starts Up Small Business”",
    desc: "Dr. N. Jayanthi served as Resource Person at Thiruthangal Nadar College of Arts and Science, organised by the Entrepreneurship Development Cell (TNC-EDC).",
    imgs: [
      { src: img(6), alt: "Thiruthangal Nadar College workshop poster & schedule, 18/2/2026" },
      { src: img(4), alt: "Thiruthangal Nadar College workshop, memento presentation" },
      { src: img(5), alt: "Thiruthangal Nadar College workshop, audience" },
    ],
  },
];

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

function eventSliderItems(items, category) {
  return items.map((e) => ({
    title: e.title,
    date: e.date,
    category,
    img: e.imgs?.[0]?.src,
    imgs: e.imgs?.map((i) => i.src),
    desc: e.desc,
  }));
}

export default function MBADepartment() {
  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">Department</span>
          <h1>Master of Business Administration</h1>
          <p>
            The Department of Management Science at T.J.S Engineering College is committed to developing future
            business leaders, innovative entrepreneurs, and competent management professionals through a strong
            academic foundation combined with practical, hands-on exposure.
          </p>
        </div>
        <div className="tjs-dept-hero-image">
          <img src="/assets/images/campus/smart-classroom-01.jpg" alt="Department of Management Studies at T.J.S Engineering College" />
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
          <p>
            The Department of Management Science at T.J.S Engineering College is committed to developing future
            business leaders, innovative entrepreneurs, and competent management professionals. The department aims
            to provide quality management education by integrating academic knowledge with practical business
            applications. Our MBA programme focuses on key areas such as Human Resource Management, Marketing,
            Finance, Operations, Business Analytics, and Entrepreneurship. Through a well-structured curriculum,
            experienced faculty members, and student-centred teaching methods, we strive to create a strong
            foundation in managerial concepts, analytical thinking, decision-making, and leadership skills.
          </p>
          <p>
            The department emphasizes holistic student development through industry interactions, industrial
            visits, management symposiums, workshops, guest lectures, internships, research activities, and skill
            development programmes. We encourage students to develop communication skills, teamwork, ethical values,
            creativity, and problem-solving abilities to meet the evolving demands of the corporate world. By
            fostering industry–academia collaboration and promoting continuous learning, the Department of
            Management Science aims to prepare graduates who are professionally competent, socially responsible, and
            capable of contributing effectively to organizational growth and society.
          </p>
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision and Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p>
                To become a premier department in management education by nurturing innovative, ethical, and
                competent management professionals with global perspective and social responsibility.
              </p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <ul>
                <li>M1: To impart quality management education through effective teaching-learning practices and continuous academic excellence.</li>
                <li>M2: To develop leadership, entrepreneurial, communication, analytical, and problem-solving skills among students for professional success.</li>
                <li>M3: To bridge the gap between academia and industry through industrial interaction, internships, practical exposure, and skill development initiatives.</li>
                <li>M4: To promote research, innovation, lifelong learning, and global perspectives to prepare students for the dynamic business environment.</li>
                <li>M5: To inculcate ethical values, professionalism, social responsibility, and commitment towards sustainable development among future managers.</li>
              </ul>
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
              <p>Welcome to the Department of Management Science at T.J.S Engineering College!</p>
              <p>
                It gives me immense pleasure to welcome you to our MBA programme, where we are committed to
                nurturing future leaders, innovative entrepreneurs, and responsible management professionals. In
                today&apos;s rapidly changing business environment, management education goes beyond classroom
                learning. It requires critical thinking, effective communication, analytical skills, ethical
                decision-making, and the ability to adapt to emerging technologies and global business challenges.
              </p>
              <p>
                As the Head of the Department, my vision is to create a dynamic and student-centred learning
                environment that integrates academic excellence with practical business knowledge. Our department
                strives to bridge the gap between academic learning and industry expectations through industry
                interactions, expert lectures, industrial visits, internships, workshops, management symposiums,
                research activities, and value-added courses. We encourage our students to explore their potential,
                develop innovative ideas, strengthen their leadership qualities, and gain the confidence to take on
                managerial responsibilities.
              </p>
              <p>
                Our experienced faculty members play a vital role in guiding students towards academic achievement,
                professional competence, and personal growth. We focus on developing industry-relevant skills in
                areas such as Human Resource Management, Marketing, Finance, Operations, Business Analytics, and
                Entrepreneurship. We also encourage students to acquire digital skills and practical knowledge
                through certification programmes and technology-enabled learning.
              </p>
              <p>
                I strongly believe that every student has unique talents and the potential to succeed. Therefore, we
                encourage active participation in academic activities, teamwork, presentations, case study
                discussions, and management events to enhance managerial and interpersonal skills. We also emphasize
                discipline, integrity, teamwork, social responsibility, and lifelong learning as essential qualities
                for professional success.
              </p>
              <p>
                My commitment, along with the support of our dedicated faculty members, is to empower every student
                to become a confident, competent, and socially responsible management professional. Together, we
                aspire to build a department that promotes excellence, innovation, research, and strong
                industry–academia relationships.
              </p>
              <p>
                I invite our students, parents, alumni, and industry partners to join us in this journey of learning,
                growth, and achievement. Let us work together to transform knowledge into action and aspirations
                into accomplishments.
              </p>
              <p>With best wishes for a successful and rewarding learning journey!</p>
              <p className="tjs-dept-hod-sign">
                Dr. N. Jayanthi
                <br />
                Head of the Department
              </p>
            </div>
          </div>
        </section>

        <section id="magazine" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Magazine</h2>
          <LinkList items={NEWSLETTERS} />
        </section>

        <section id="faculty" className="tjs-dept-section">
          <h2>Faculty</h2>
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
        </section>

        <section id="staff" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Non-Teaching</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="programmes" className="tjs-dept-section">
          <h2>Programme Offered</h2>
          <div className="tjs-dept-tabs">
            <button type="button" className="tjs-dept-tab active">M.B.A &ndash; Master of Business Administration</button>
          </div>

          <h3>Electives Offered</h3>
          <ul>
            {ELECTIVES_OFFERED.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>

          <h3>Program Educational Objectives (PEOs)</h3>
          <div className="tjs-dept-peo-list">
            {PEOS.map((peo) => (
              <div className="tjs-dept-peo" key={peo}>
                <p>{peo}</p>
              </div>
            ))}
          </div>

          <h3>Program Outcomes (POs)</h3>
          <div className="tjs-dept-peo-list">
            {POS.map((po) => (
              <div className="tjs-dept-peo" key={po}>
                <p>{po}</p>
              </div>
            ))}
          </div>

          <h3>Program Specific Outcomes (PSOs)</h3>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="bos" className="tjs-dept-section tjs-dept-section-alt">
          <h2>BOS</h2>
          <h3>Board of Studies Composition</h3>
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
                    <tr key={group.position + m.name}>
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
        </section>

        <section id="curriculum" className="tjs-dept-section">
          <h2>Curriculum &amp; Syllabi</h2>
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
          <YearGroupedVisits items={INDUSTRIAL_VISITS} title="Industry Visits" />
        </section>

        <section id="internships" className="tjs-dept-section">
          <h2>Internship</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
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
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="fdp-workshop" className="tjs-dept-section">
          <h2>Guest Lecturer, FDP &amp; Workshop</h2>
          <EventSlider items={eventSliderItems(GUEST_LECTURES, "Guest Lecture / Workshop")} />
        </section>

        <section id="value-added-course" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Value Added Course</h2>

          <div className="tjs-dept-media-row">
            <div className="tjs-dept-media-row-text">
              <h3>Power BI</h3>
              <p>
                The Department of Management Studies organized a Value Added Course on &ldquo;Power BI&rdquo; for
                First Year MBA students. Students received hands-on training in data importing, data transformation,
                dashboard creation, report generation, data modeling, and visualization techniques to support
                business decision-making.
              </p>

              <div className="tjs-dept-card">
                <h3>Course Details</h3>
                <ul>
                  <li>
                    <strong>Department:</strong> Management Studies (MBA)
                  </li>
                  <li>
                    <strong>Course:</strong> Power BI
                  </li>
                  <li>
                    <strong>Organized By:</strong> Department of Management Studies
                  </li>
                  <li>
                    <strong>Participants:</strong> First Year MBA Students
                  </li>
                  <li>
                    <strong>Date:</strong> 16.04.2026 to 22.04.2026
                  </li>
                  <li>
                    <strong>Trainer:</strong> Mr. Vijay Anand
                  </li>
                </ul>
              </div>
            </div>

            <div className="tjs-dept-media-row-img">
              <DeptPhotoSlider
                images={[
                  { src: img(15), alt: "Power BI Value Added Course, group photo" },
                  { src: img(16), alt: "Power BI Value Added Course, training session" },
                ]}
              />
            </div>
          </div>
        </section>

        <section id="symposium" className="tjs-dept-section">
          <h2>Symposium</h2>
          <EventSlider items={eventSliderItems(OTHER_DEPT_EVENTS, "Symposium")} />
        </section>

        <section id="seminars" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Seminars &amp; Activities</h2>
          <EventSlider items={eventSliderItems(SEMINARS_EVENTS, "Seminars & Activities")} />
        </section>

        <section id="recruiters" className="tjs-dept-section">
          <h2>Major Recruiters</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="placed-students" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Placed Students</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="faculty-achievements" className="tjs-dept-section">
          <h2>Faculty Achievements</h2>
          <EventSlider items={eventSliderItems(FACULTY_ACHIEVEMENTS, "Faculty Achievement")} />
        </section>

        <section id="students-achievements" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Students Achievements</h2>
          <LinkList items={STUDENT_PROJECTS} />
        </section>

        <section id="co-curricular" className="tjs-dept-section">
          <h2>Co-Curricular</h2>
          <EventSlider items={eventSliderItems(CO_CURRICULAR, "Co-Curricular")} />
        </section>

        <section id="extra-curricular" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Extra-Curricular</h2>
          <EventSlider items={eventSliderItems(EXTRA_CURRICULAR, "Sports")} />
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
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="entrepreneurship" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Entrepreneurship</h2>
          <EventSlider items={eventSliderItems(ENTREPRENEURSHIP_EVENTS, "Entrepreneurship")} />
        </section>
      </div>
    </>
  );
}
