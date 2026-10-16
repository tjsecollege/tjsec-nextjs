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

function auImg(n) {
  const ext = [27, 3].includes(n) ? "png" : [20].includes(n) ? "jpg" : [19].includes(n) ? "JPG" : "jpeg";
  return "/assets/images/Anna_University_Faculty_Images/image_" + n + "." + ext;
}

const TOPPERS = [];

const FACULTY = [
  { name: "Mr. Shanmugasundaram M", degree: "M.E.", designation: "Associate Professor", auFin: "2630351966", aicteId: "1-9316211161", photo: auImg(75) },
  { name: "Mr. Aravind G", degree: "M.E.", designation: "Assistant Professor", auFin: "2666061991", aicteId: "1-11046098781", photo: auImg(23) },
  { name: "Mr. Dhinakaran V", degree: "M.E.", designation: "Assistant Professor", auFin: "2691311985", aicteId: "1-2191116597", photo: auImg(19) },
  { name: "Mr. Harikrishnan T R", degree: "M.E.", designation: "Assistant Professor", auFin: "2626991993", aicteId: "1-44718951584", photo: auImg(62) },
  { name: "Mr. Jaikumar", degree: "M.E.", designation: "Assistant Professor", auFin: "2697361996", aicteId: "1-43915662341", photo: auImg(20) },
  { name: "Mr. Natarajan V", degree: "M.E.", designation: "Assistant Professor", auFin: "2638241989", aicteId: "1-43395308205", photo: auImg(21) },
  { name: "Ms. Pavithra V", degree: "M.E.", designation: "Assistant Professor", auFin: "2684031998", aicteId: "1-11054474111", photo: auImg(66) },
  { name: "Mr. Prashanth R", degree: "M.E.", designation: "Assistant Professor", auFin: "2616661994", aicteId: "1-44724229754", photo: auImg(60) },
  { name: "Mrs. Saraswathi J B", degree: "M.E.", designation: "Assistant Professor", auFin: "2665751993", aicteId: "1-43960524581", photo: auImg(27) },
  { name: "Mrs. Sarifa A", degree: "M.E.", designation: "Assistant Professor", auFin: "2676181996", aicteId: "1-45304353182", photo: auImg(85) },
  { name: "Mrs. Sasikala J", degree: "M.E.", designation: "Assistant Professor", auFin: "2663831999", aicteId: "1-45827425882", photo: auImg(1) },
  { name: "Mr. Satheesh P S", degree: "M.E.", designation: "Assistant Professor", auFin: "2630461989", aicteId: "1-4667116247", photo: auImg(61) },
  { name: "Mr. Thyagarajan K", degree: "M.E.", designation: "Assistant Professor", auFin: "2618681998", aicteId: "1-43757785457", photo: auImg(54) },
  { name: "Mrs. Uma R", degree: "M.E.", designation: "Assistant Professor", auFin: "2667151985", aicteId: "1-757178750", photo: auImg(3) },
  { name: "Mrs. Abirami P", degree: "M.E.", designation: "Assistant Professor", auFin: "2685611985", aicteId: "1-9511932153", photo: auImg(50) },
];

const NON_TEACHING = [];

const PEOS = [
  "Effectuating success in careers by exploring with the design, digital and computational analysis of engineering systems, experimentation and testing, smart manufacturing, technical services, and research.",
  "Amalgamating effectively with stakeholders to update and improve their core competencies and abilities to ethically compete in the ever-changing multicultural global enterprise.",
  "To encourage multi-disciplinary research and development to foster advanced technology, and to nurture innovation and entrepreneurship in order to compete successfully in the global economy.",
  "To globally share and apply technical knowledge to create new opportunities that proactively advances our society through team efforts and to solve various challenging technical, environmental and societal problems.",
  "To create world class computer science engineers capable of practicing engineering ethically with a solid vision to become great leaders in academia, industries and society.",
];

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

const PSOS = [
  {
    title: "PSO1",
    text: "To analyze, design and develop computing solutions by applying foundational concepts of Computer Science and Engineering.",
  },
  {
    title: "PSO2",
    text: "To apply software engineering principles and practices for developing quality software for scientific and business applications.",
  },
  {
    title: "PSO3",
    text: "To adapt to emerging Information and Communication Technologies (ICT) to innovate ideas and solutions to existing/novel problems.",
  },
];

function regDocUrl(file) {
  return "/assets/images/Regulations-and-Curriculam/" + file.split("/").map(encodeURIComponent).join("/");
}

const BOS_DOCS = [
  { label: "Anna University Regulations 2025 (UG)", href: regDocUrl("CSE/Regulations/ACADEMIC REGULATIONS 2025-AIDS.pdf") },
  { label: "Anna University Regulations 2021 (UG)", href: regDocUrl("CSE/Regulations/Undergraduate Programme - Academic Regulations 2021 -AIDS.pdf") },
  { label: "B.E. CSE Curriculum and Regulations (2025)", href: regDocUrl("CSE/curriculam/BE CSE-2025.pdf") },
  { label: "B.E. CSE Curriculum and Regulations (2021)", href: regDocUrl("CSE/curriculam/B.E.CSE-2021.pdf") },
];

const BOS_MEMBERS = [
  {
    position: "Chairman",
    members: [
      { name: "Prof. M. Shanmugasundaram", role: "Head of Department, Department of Computer Science and Engineering, T.J.S. Engineering College" },
    ],
  },
  {
    position: "Anna University Nominee",
    members: [
      { name: "Dr. S. Muthurajkumar", role: "Associate Professor, Department of Computer Technology, MIT Campus, Anna University, Chennai" },
      { name: "Dr. M. Thenmozhi", role: "Associate Professor, Department of Computer Science and Engineering, Puducherry Technological University, Puducherry" },
    ],
  },
  {
    position: "Subject Expert from outside the Parent University",
    members: [
      { name: "Prof. Masilamani V", role: "Professor, Department of Computer Science and Engineering, Indian Institute of Information Technology Design and Manufacturing, Kancheepuram" },
      { name: "Dr. Kamalakannan J", role: "Associate Professor Senior, School of Computer Science Engineering and Information Systems, Vellore Institute of Technology, Vellore" },
    ],
  },
  {
    position: "Industry Nominee",
    members: [{ name: "Mr. Sengathiron T S", role: "IT Consultant and Technology Advisor, CBW Bank, USA" }],
  },
  {
    position: "Alumnus",
    members: [{ name: "Mr. P. Ashish", role: "Subject Matter Expert, HCL-GUVI, IITM Research Park, Chennai" }],
  },
];

const NEWSLETTERS = [];

const MOU_DOCS = [];

const MOU_PARTNERS = [
  "Vivaan Technologies",
  "IT Expert Training",
  "Elysium Academy",
  "Geetham Software Private Ltd",
  "Pantech e-Learning",
];

const CONSULTANCY = [];

const LABS = [
  {
    name: "Data Science Laboratory",
    label: "About the Laboratory",
    paragraphs: [
      "The Data Science Laboratory in the Department of Computer Science and Engineering is a dedicated facility designed to give students hands-on exposure to the complete data science workflow — from data collection and cleaning to analysis, visualization, and machine learning model deployment.",
      "The lab is equipped with high-performance workstations to support computationally intensive tasks such as large-scale data processing and model training. The facility also provides access to GPU-enabled systems for deep learning and neural network experimentation, along with high-speed internet connectivity for cloud-based computing and collaborative research.",
      "The lab supports practical sessions in data science, machine learning and artificial intelligence; mini-projects and capstone projects involving real-world datasets; faculty-guided research in predictive analytics, natural language processing and computer vision; preparation for hackathons, data science competitions and certification programs; and workshops and guest lectures by industry experts on emerging data science trends.",
    ],
  },
  {
    name: "Full Stack Development Laboratory",
    label: "About the Laboratory",
    paragraphs: [
      "The Full Stack Development Laboratory is designed to give students comprehensive, hands-on experience in building end-to-end web and application solutions — covering both front-end and back-end development along with database integration and deployment.",
      "The lab houses workstations configured with adequate processing power and memory to support modern development environments, local servers, and containerized applications. High-speed internet connectivity enables students to work with cloud platforms, version control systems, and collaborative development tools in real time.",
      "Students gain practical exposure to a complete full-stack technology ecosystem, including front-end technologies (HTML5, CSS3, JavaScript, React.js, Angular), back-end frameworks (Node.js, Express.js, Django, Spring Boot), databases (MySQL, MongoDB, PostgreSQL), version control (Git, GitHub/GitLab), API development and testing (Postman, REST/GraphQL APIs), deployment and DevOps tools (Docker, Jenkins, AWS/Azure/Heroku), and IDEs (VS Code, IntelliJ IDEA).",
      "The lab facilitates practical sessions for full-stack and web technology courses, mini-projects and capstone projects involving complete client-server applications, training on the MERN/MEAN stack and other modern frameworks, hackathons and coding bootcamps, and workshops on DevOps practices, cloud deployment and agile development methodologies.",
    ],
  },
  {
    name: "Operating Systems Laboratory",
    label: "About the Laboratory",
    paragraphs: [
      "The Operating Systems Laboratory offers students practical exposure to the core concepts of operating systems, including process management, memory management, file systems, and system-level programming.",
      "The lab is equipped with systems capable of running multiple operating environments through virtualization, allowing students to safely experiment with system-level configurations, kernel operations, and OS installations without affecting the host system.",
      "Students work with operating systems (Linux — Ubuntu/Fedora/CentOS, Windows Server), virtualization platforms (VirtualBox, VMware), shell and system programming (Bash scripting, C programming for system calls), process and memory management simulation tools, and file system and scheduling algorithm simulators.",
      "The lab facilitates practical sessions for the Operating Systems course covering process scheduling, deadlock handling, memory allocation and file management algorithms; system programming exercises involving system calls, inter-process communication and shell scripting; simulation-based experiments reinforcing CPU scheduling algorithms and page replacement techniques; and mini-projects involving OS-level problem solving and Linux administration basics.",
    ],
  },
  {
    name: "Programming Languages Laboratory",
    label: "About the Laboratory",
    paragraphs: [
      "The Programming Languages Laboratory provides students with a strong foundation in computational thinking and problem-solving through hands-on practice across multiple programming paradigms and languages.",
      "The lab is equipped with systems configured with the latest compilers, interpreters, and integrated development environments, ensuring a smooth and efficient coding experience for students at every level, from beginners to advanced learners.",
      "The lab supports programming and practice in procedural languages (C, C++), object-oriented programming (Java, C++, Python), scripting languages (Python, Shell scripting), and compilers/IDEs (GCC, Turbo C++, Eclipse, Code::Blocks, PyCharm, NetBeans).",
      "The lab supports practical sessions for courses in C programming, Data Structures, Object-Oriented Programming and Python; coding practice and problem-solving exercises; preparation for competitive programming contests and coding assessments; and foundational projects that build toward advanced coursework in data structures, algorithms and software development.",
    ],
  },
];

const INDUSTRIAL_VISITS = [
  {
    date: "02-04-2024",
    title: "BSNL Ltd. – Rajiv Gandhi Memorial Telecom Training Centre",
    desc: "II CSE students visited BSNL Ltd. (Rajiv Gandhi Memorial Telecom Training Centre), Chennai.",
    imgs: [{ src: img("image_24.png"), alt: "Industrial Visit to BSNL Ltd., 02-04-2024" }],
  },
  {
    date: "06-11-2024",
    title: "BSNL – Rajiv Gandhi Memorial Telecom Training Centre",
    desc: "CSE students visited BSNL, Rajiv Gandhi Memorial Telecom Training Centre.",
    imgs: [{ src: img("image_25.png"), alt: "Industrial Visit to BSNL, Rajiv Gandhi Memorial Telecom Training Centre, 06-11-2024" }],
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
  { org: "Techveel (Real-Time Industrial Implant Training on IT)", date: "11-01-2024 to 18-01-2024", who: "Monesh T M, Somiya P B, Ritik Sah, Sarath Kumar S" },
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
    title: "Webinar – “Introduction to Google Colab and PyTorch”",
    desc: "Organised by the Department of Computer Science and Engineering.",
    imgs: [{ src: img("image_19.jpeg"), alt: "Webinar on Introduction to Google Colab and PyTorch" }],
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

const FDP_ATTENDED = [
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Emerging Trends in Advanced Materials, Smart Fabrication Techniques, and Precision Metrology", faculty: "Dr. P. Subramanian", date: "18-08-2025 to 23-08-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Cutting Edge Advances in Artificial Intelligence and Data Science", faculty: "Dr. P. Subramanian", date: "15-09-2025 to 20-09-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Role and Impact of Artificial Intelligence in Data Analytics", faculty: "Dr. P. Subramanian", date: "22-09-2025 to 27-09-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Explainable AI (XAI): A Deep Dive into AI Transparency and Interpretability", faculty: "Dr. P. Subramanian", date: "06-10-2025 to 11-10-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Integrating IoV and MaaS for Future Urban Mobility: A Smart and Sustainable Transportation Framework", faculty: "Dr. P. Subramanian", date: "13-10-2025 to 18-10-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Machine Learning in Robotics: Shaping the Future of Digital Advancements", faculty: "Dr. P. Subramanian", date: "20-10-2025 to 25-10-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Artificial Intelligence: Concepts, Tools, and Emerging Applications", faculty: "Dr. P. Subramanian", date: "27-10-2025 to 01-11-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Innovations in Space and Defense: Integrating Artificial Intelligence, Cybersecurity, Advanced Materials, and Energy Solutions", faculty: "Dr. P. Subramanian", date: "03-11-2025 to 08-11-2025" },
  { desc: "Recent Trends and Future Directions in AI for Medical Imaging", faculty: "Dr. P. Subramanian", date: "10-11-2025 to 15-11-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Generative AI Fluency", faculty: "Dr. P. Subramanian", date: "17-11-2025 to 22-11-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Empowering Autonomous Intelligence through Agentic AI and Goal-Based Systems", faculty: "Dr. P. Subramanian", date: "24-11-2025 to 29-11-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Securing the Future: Cyber-Physical Systems and Cybersecurity in the Digital Age", faculty: "Dr. P. Subramanian", date: "08-12-2025 to 13-12-2025" },
  { desc: "AICTE Training And Learning (ATAL) Academy FDP on Next-Gen AI for Fog and Edge Computing: Building Intelligent, Decentralized IoT Networks", faculty: "Dr. P. Subramanian", date: "15-12-2025 to 20-12-2025" },
  { desc: "NPTEL – AICTE FDP on Cybersecurity and Privacy", faculty: "Dr. P. Subramanian", date: "July – Oct 2025" },
  { desc: "NPTEL – AICTE FDP on Ethical Hacking", faculty: "Dr. P. Subramanian", date: "July – Oct 2025" },
  { desc: "NPTEL – AICTE FDP on Practical Cybersecurity for Cybersecurity Practitioner", faculty: "Dr. P. Subramanian", date: "July – Oct 2025" },
  { desc: "NPTEL – AICTE FDP on Python for Data Science", faculty: "Dr. P. Subramanian", date: "July – Aug 2025" },
];

const FACULTY_JOURNAL_PUBLICATIONS = [
  {
    details: "RNN-PSO: a tuned neural network with optimisation algorithm for keratoconus classification, International Journal of Computer Applications in Technology, Vol 76, No 3-4, October 2025, ISSN (print): 0952-8091 • ISSN (online): 1741-5047 — Dr. P. Subramanian",
    impact: "0.6",
  },
];

const VALUE_ADDED_COURSES = [
  { name: "Transfer Learning Frameworks", date: "August 8-12, 2022", persons: "Mr. Arumugam (Senior Project Head, Thelema Infotech, Chennai); Mr. Vinod (Data Analyst, Jambore Solutions, Chennai); Dr. Kanchana (Professor, Mahendra Engineering College for Women)" },
  { name: "Introduction to Sensor Technology", date: "October 10-14, 2022", persons: "Mr. Arun (Senior Project Head, Karyoun Innovation Pvt Ltd); Mr. Rajesh (Senior Engineer, Geetham Software Private Limited); Dr. V. Srividhya (Associate Professor, Annai Mira College of Engineering and Technology)" },
  { name: "DOTNET Programming", date: "October 24-28, 2022", persons: "Mr. M. Narayanan (Senior Director, Dell Technologies); Mr. P. Nagarajan (Founder & CEO, Resileo Labs LLP); Mr. M. Shanmugasundaram (Senior Data Consultant, Tasker Inc.)" },
  { name: "Basics of Virtualisation", date: "October 26-30, 2021", persons: "Mr. Arumugam (Senior Project Head, Thelema Infotech, Chennai); Mr. Vinod (Data Analyst, Jambore Solutions, Chennai); Dr. Kanchana (Professor, Mahendra Engineering College for Women)" },
  { name: "Machine Learning", date: "December 08-12, 2021", persons: "Mr. M. Narayanan (Senior Director, Dell Technologies); Mr. P. Nagarajan (Founder & CEO, Resileo Labs LLP); Ms. P. Subha (ENTRUST Software and Services)" },
  { name: "Introduction to Data Science", date: "May 19-22, 2022", persons: "Mr. Suresh (CEO, Nipex Tech); Mr. Rajesh (Senior Engineer, Big Tech Labs Pvt Ltd); Mr. Sathish (CEO, Netwrap Solutions)" },
  { name: "Fundamentals of IT and Hardware", date: "March 08-12, 2021", persons: "Mr. Arumugam (Senior Project Head, Thelema Infotech, Chennai); Mr. Vinod (Data Analyst, Jambore Solutions, Chennai); Ms. P. Subha (ENTRUST Software and Services)" },
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
    desc: "TJSEC CSE students attended the “Elevate Entrepreneurial Mindset” National Workshop conducted by the Anna University Student Entrepreneur Club as part of TRIGGER'24, organised by the Association of Computer Technologists, Department of Computer Technology, MIT Campus, Anna University, Chennai, on November 15-16, 2024.\n\nParticipants: Monesh T M, Ritik Sah, Sarath Kumar S.",
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
          <p>
            The Department of Computer Science and Engineering, T.J.S. Engineering College was established in 2009
            to shape skilled, ethical, and innovative computing professionals for a fast-changing technological
            world. The curriculum blends strong theoretical foundations with hands-on practice. Students begin with
            core areas such as programming, data structures, algorithms, operating systems, databases, and networks,
            then progress to Artificial Intelligence, Machine Learning, Data Science, Cloud Computing, Cyber
            Security, and the Internet of Things. Outcome-based education and industry-aligned electives keep
            learning relevant.
          </p>
          <p>
            Supported by qualified faculty, modern laboratories, and a vibrant learning environment, students are
            encouraged to take up projects, internships, hackathons, and research from the early semesters.
            Collaborations with industry, professional bodies such as CSI and IEEE, and a dedicated training and
            placement programme prepare graduates for successful careers, higher studies, and entrepreneurship.
          </p>
          <p>
            We aim to develop not just capable engineers, but responsible professionals committed to lifelong
            learning, ethical practice, and meaningful contribution to society through technology. Our graduates
            leave equipped with the knowledge, skills, and values to lead in the digital era.
          </p>
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision and Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p>
                To create knowledge pool in the field of computer science and Engineering to empower the students to
                meet the challenges of the society.
              </p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <ul>
                <li>Prepare the students with strong fundamental concepts, analytical capabilities, programming and problem-solving skills.</li>
                <li>Bringing an Eco-System to provide new cutting-edge technologies required to meet the challenges.</li>
                <li>Imparting necessary skills to become continuous learners in the field of Computer Science and Engineering.</li>
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
              <h3>Welcome to the Department of Computer Science and Engineering</h3>
              <p>Welcome to the Department of Computer Science and Engineering.</p>
              <p>
                In today&apos;s technology-driven world, the field of Computer Science and Engineering plays a vital
                role in shaping our future. As the Head of the CSE Department, it is my pleasure to welcome you to
                our dynamic and innovative department.
              </p>
              <p>
                The Department of Computer Science and Engineering is committed to excellence in education,
                research, and practical application. Our goal is to equip students with a strong foundation in core
                computer science principles, cutting-edge technologies, and problem-solving skills — enabling them to
                become proficient, versatile professionals ready to lead in fields such as Artificial Intelligence,
                Machine Learning, Cloud Computing, and Cybersecurity.
              </p>
              <p>
                Our distinguished faculty members are experts in their respective domains, with a passion for both
                teaching and research. They bring a wealth of industry experience and academic expertise into the
                classroom, creating an engaging and intellectually stimulating learning environment. Through their
                mentorship, students are encouraged to think critically, explore emerging technologies, and push the
                boundaries of innovation.
              </p>
              <p>
                In addition to academic pursuits, we believe strongly in holistic development. The department offers
                a variety of co-curricular activities, workshops, and seminars to enhance students&apos; interpersonal
                skills, teamwork, and leadership qualities. We actively encourage participation in hackathons,
                coding competitions, and entrepreneurship initiatives, fostering a spirit of innovation and
                creativity.
              </p>
              <p>
                Our department is well-equipped with state-of-the-art laboratories and software resources, giving
                students access to the latest tools and technologies for hands-on learning and cutting-edge research.
                We promote a culture of collaboration, encouraging students and faculty alike to engage in
                interdisciplinary projects and explore diverse areas of research.
              </p>
              <p>
                Our alumni go on to serve in leading technology organizations and research institutions across the
                globe — a testament to the strong foundation this department provides.
              </p>
              <p>
                Our goal is to nurture an environment where curiosity is encouraged, collaboration is valued, and
                every student is empowered to achieve their fullest potential — academically, professionally, and
                personally.
              </p>
              <p>I warmly welcome you to be part of this journey of learning, innovation, and growth.</p>
              <p className="tjs-dept-hod-sign">
                Dr. P. Subramanian
                <br />
                Head of Department
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
          {FACULTY.length > 0 ? (
            <div className="tjs-dept-people-grid-full">
              {FACULTY.map((f) => (
                <div className="tjs-dept-people-card" key={f.name}>
                  <div className="tjs-dept-people-photo">
                    {f.photo ? <img src={f.photo} alt={f.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{f.name}</h4>
                  <p className="tjs-dept-people-role">{f.designation}</p>
                  <p className="tjs-dept-people-spec">
                    AICTE ID: {f.aicteId || "—"}
                    <br />
                    AU-FIN: {f.auFin || "—"}
                  </p>
                </div>
              ))}
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
          <div className="tjs-dept-peo-list">
            {PEOS.map((peo, i) => (
              <div className="tjs-dept-peo" key={i}><p>{i + 1}. {peo}</p></div>
            ))}
          </div>

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
          <p>
            The Department of Computer Science and Engineering has signed Memoranda of Understanding with
            industries, training organisations and research institutions to bridge the gap between classroom
            learning and professional practice. These partnerships give our students and faculty direct access to
            current technologies, industry expertise and real-world problems.
          </p>
          <p>Through these MoUs, the department offers:</p>
          <ul>
            <li>Internships, industrial visits and in-plant training for students</li>
            <li>Value-added courses and certification programmes in emerging technologies</li>
            <li>Guest lectures, workshops and hackathons led by industry experts</li>
            <li>Industry-supported student projects and joint research</li>
            <li>Faculty development programmes and industrial exposure for staff</li>
            <li>Placement assistance and pre-placement training</li>
          </ul>
          <p>
            These collaborations help our students graduate with practical skills, professional exposure and the
            confidence to meet industry expectations. The department continues to build new partnerships in areas
            such as artificial intelligence, data science, cloud computing, cyber security and full-stack
            development.
          </p>
          <h3>MoU Partners</h3>
          <ul className="tjs-dept-bullets">
            {MOU_PARTNERS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {MOU_DOCS.length > 0 && <MouTabsViewer items={MOU_DOCS} />}
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

          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name of the Course</th>
                  <th>Date(s)</th>
                  <th>Resource Persons</th>
                </tr>
              </thead>
              <tbody>
                {VALUE_ADDED_COURSES.map((c, i) => (
                  <tr key={c.name}>
                    <td>{i + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.date}</td>
                    <td>{c.persons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tjs-dept-media-row" style={{ marginTop: 24 }}>
            <div className="tjs-dept-media-row-text">
              <h4>Machine Learning (December 08-12, 2021)</h4>
              <h4>Introduction to Data Science (May 19-22, 2022)</h4>
            </div>
            <div className="tjs-dept-media-row-img">
              <DeptPhotoSlider
                images={[
                  { src: img("image_6.jpeg"), alt: "Value Added Course on Machine Learning" },
                  { src: img("image_7.jpeg"), alt: "Value Added Course on Introduction to Data Science" },
                ]}
              />
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
              }))}
            />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>

        <section id="faculty-achievements" className="tjs-dept-section">
          <h2>Faculty Achievements</h2>
          <p>
            Faculty of the Department of Computer Science and Engineering have completed the WIPRO Certified Faculty
            course and have been recognised as Mentors for Project Based Learning.
          </p>
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

          <h3>FDP Attended</h3>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Description of the FDP Attended</th>
                  <th>Faculty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {FDP_ATTENDED.map((f, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{f.desc}</td>
                    <td>{f.faculty}</td>
                    <td>{f.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Faculty Journal Publications</h3>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Publication Details</th>
                  <th>Impact Factor</th>
                </tr>
              </thead>
              <tbody>
                {FACULTY_JOURNAL_PUBLICATIONS.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{p.details}</td>
                    <td>{p.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
