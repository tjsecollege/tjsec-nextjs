import DeptMegaNav from "../DeptMegaNav";
import PeopleCarousel from "../PeopleCarousel";
import DeptPhotoSlider from "../DeptPhotoSlider";
import EventAccordion from "../EventAccordion";
import EventSlider from "../EventSlider";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const TOPPERS = [
  { name: "Kaviyasri S", photo: "/assets/images/eee/image_103.jpeg" },
  { name: "Oviya R", photo: "/assets/images/eee/image_102.jpeg" },
  { name: "Sandhiya A S", photo: "/assets/images/eee/image_101.jpeg" },
  { name: "Kamesh G", photo: "/assets/images/eee/image_100.jpeg" },
  { name: "Hariniya S", photo: "/assets/images/eee/image_99.jpeg" },
  { name: "Anandh R", photo: "/assets/images/eee/image_97.jpeg" },
  { name: "Hemavathi R", photo: "/assets/images/eee/image_98.jpeg" },
];

const FACULTY = [
  { name: "Dr. J. Prakash", degree: "Ph.D" },
  { name: "Mrs. Shunmuga Sankari M", degree: "M.E" },
  { name: "Mr. Kamalkumar T", degree: "M.E" },
  { name: "Mr. Ganesh S", degree: "M.E" },
  { name: "Mrs. C. Anusha", degree: "M.E" },
  { name: "V. Geetha", degree: "M.E" },
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
    title: "PSO1. Foundation of Electrical Engineering",
    text: "Ability to understand the principles and working of electrical components, circuits, systems and control that form a part of power generation, transmission, distribution, utilization, conservation and energy saving. Students can assess the power management, auditing, crisis and energy saving aspects.",
  },
  {
    title: "PSO2. Foundation of Mathematical Concepts",
    text: "Ability to apply mathematical methodologies to solve problems related to electrical engineering using appropriate engineering tools and algorithms.",
  },
  {
    title: "PSO3. Computing and Research Ability",
    text: "Ability to use knowledge in various domains to identify research gaps and hence to provide solutions which lead to new ideas and innovations.",
  },
];

function bosDocUrl(file) {
  return "/assets/images/eee/bos/" + encodeURIComponent(file);
}

const REGULATIONS = [
  { label: "B.E – EEE Regulations (2025)", href: "#" },
  { label: "B.E – EEE Regulations (2021)", href: "#" },
];

const BOS_DOCS = [
  { label: "B.E – EEE Curriculum & Regulations (2025)", href: bosDocUrl("AU B.E. EEE 2025 .pdf") },
  { label: "Anna University Academic Regulations 2025 (UG)", href: bosDocUrl("AU- REGULATIONS 2025.pdf") },
  { label: "B.E – EEE Regulations (2021)", href: bosDocUrl("B.E. EEE R 2021.pdf") },
  { label: "Anna University UG Regulations 2021", href: bosDocUrl("UG Regulation 2021.pdf") },
];

function mouDocUrl(file) {
  return "/assets/images/eee/MOU/" + encodeURIComponent(file);
}

const MOU_DOCS = [
  { label: "Prolific Systems & Technologies", href: mouDocUrl("PROLIFIC.pdf") },
  { label: "Brayan", href: mouDocUrl("BRAYAN.pdf") },
  { label: "FIIT (28.10.2025)", href: mouDocUrl("FIIT 28-10-2025.pdf") },
  { label: "Majestic (22.09.2023)", href: mouDocUrl("MAJESTIC MOU 22.09.2023 SCAN COPY.pdf") },
  { label: "NTLS", href: mouDocUrl("NTLS MoU SCANNED COPY.pdf") },
  { label: "Retech (21.09.2023)", href: mouDocUrl("RETECH MOU 21.09.2023 SCAN COPY.pdf") },
  { label: "V V Electro Systems", href: mouDocUrl("VV ELECTRO SYSTEMS (MOU).pdf") },
  { label: "At least 5 MoUs with Industries (2025-2026)", href: mouDocUrl("ED 10. Atleast 5 MoUs with Industries 2025-2026.pdf") },
];

const CONSULTANCY = [
  { label: "5 KW Roof Top Solar PV Implementation", href: "/assets/images/eee/consultancy/5-KW-Roof-Top-Solar-PV-Implementation.pdf" },
  { label: "AI Based Automatic Irrigation System with Android Application", href: "/assets/images/eee/consultancy/AI-Based-Automatic-Irrigation-System-with-Android-Application.pdf" },
  { label: "Automatic Fault Detection and Location of Transmission Lines using IoT", href: "/assets/images/eee/consultancy/Automatic-fault-Detection-and-Location-of-Transmission-Lines-using-IOT.pdf" },
  { label: "Design and Fabrication of BLDC Motor Based Sewing Machine", href: "/assets/images/eee/consultancy/Design-and-Fabrication-of-BLDC-Motor-Based-Sewing-Machine.pdf" },
];

const LABS = [
  {
    name: "1. Electrical Machines Lab",
    paragraphs: [
      "The Electrical Machines Laboratory of the Department of Electrical and Electronics Engineering is designed to provide students with hands-on experience in the operation, testing, performance evaluation, and analysis of electrical machines.",
      "The laboratory supports the practical learning of DC machines, transformers, induction motors, synchronous machines, and special electrical machines. Through systematic experiments, students develop an understanding of machine characteristics, losses, efficiency, speed control, torque characteristics, voltage regulation, and operating performance.",
      "The laboratory bridges the gap between theoretical concepts and practical applications, enabling students to develop essential technical and experimental skills required for careers in electrical engineering and related industries.",
    ],
    imgs: [
      { src: "/assets/images/eee/image_109.jpeg", alt: "Electrical Machines Lab entrance" },
      { src: "/assets/images/eee/image_111.jpeg", alt: "Electrical Machines Lab interior" },
    ],
  },
  {
    name: "2. Power Electronics Lab",
    paragraphs: [
      "The Power Electronics Laboratory of the Department of Electrical and Electronics Engineering provides students with hands-on experience in the design, analysis, control and application of power electronic converters and semiconductor switching devices.",
      "The laboratory enables students to understand the practical operation of power semiconductor devices, controlled rectifiers, DC-DC converters, inverters, AC voltage controllers and cycloconverters. Students perform experiments to study output waveforms, triggering techniques, voltage and current control, efficiency and performance of power electronic circuits.",
      "The laboratory bridges theoretical concepts with practical applications in industrial drives, renewable energy systems, electric vehicles, battery systems and power conversion applications.",
    ],
    imgs: [{ src: "/assets/images/eee/image_108.jpeg", alt: "Students at the Power Electronics Lab" }],
  },
  {
    name: "3. Control and Instrumentation Laboratory",
    paragraphs: [
      "The Control and Instrumentation Laboratory of the Department of Electrical and Electronics Engineering provides students with practical knowledge in measurement, instrumentation, control systems, sensors, transducers and feedback control techniques.",
      "The laboratory enables students to understand the behaviour of dynamic systems and to experimentally study open-loop and closed-loop control systems, time response, frequency response, stability, controllers and industrial measurement systems. Students also gain hands-on experience with sensors, transducers and electronic instrumentation used in engineering applications.",
    ],
    imgs: [{ src: "/assets/images/eee/image_95.jpeg", alt: "Control and Instrumentation Laboratory entrance" }],
  },
  {
    name: "4. Power System Simulation Laboratory",
    paragraphs: [
      "The Power System Simulation Laboratory of the Department of Electrical and Electronics Engineering provides students with practical training in the modelling, analysis and simulation of electrical power systems using modern computational tools.",
      "The laboratory enables students to simulate and analyze power-flow studies, fault analysis, transmission-line performance, load-frequency control, economic operation and stability of power systems. Students develop the ability to model electrical networks and interpret simulation results for planning, operation and control of modern power systems.",
    ],
    imgs: [
      { src: "/assets/images/eee/image_96.jpeg", alt: "Power System Simulation Laboratory" },
      { src: "/assets/images/eee/image_107.jpeg", alt: "Power System Simulation Laboratory computers" },
    ],
  },
];

const INDUSTRIAL_VISITS = [
  {
    date: "27-02-2025",
    title: "Adani Port, Kattupalli",
    desc: "Industrial Visit for the students of the II, III year to visit the Adani Port, Kattupalli with the co-ordination of following faculties,",
    people: [
      { name: "Mrs. M. Shunmuga Sankari", role: "HOD/EEE" },
      { name: "Mr. T. Kamal Kumar", role: "AP/EEE" },
      { name: "Mr. M. Arjunkumar", role: "AP/EEE" },
      { name: "Mrs. C. Anusha", role: "AP/EEE" },
      { name: "Mr. B. Murali", role: "LI/EEE" },
      { name: "Mr. K. Shanmugaraj", role: "LI/EEE" },
    ],
    imgs: [
      { src: "/assets/images/eee/image_82.jpeg", alt: "Industrial Visit to Adani Port, Kattupalli" },
      { src: "/assets/images/eee/image_83.jpeg", alt: "Road safety session at Adani Port, Kattupalli" },
    ],
  },
  {
    date: "19-02-2025",
    title: "North Chennai Thermal Power Station Stage-I (NCTPS-1)",
    desc: "II Year & III Year Students went to Industrial Visit for “North Chennai Thermal Power Station Stage-I (NCTPS-1)” with the co-ordination of",
    people: [
      { name: "Mr. S. Ganesh", role: "AP/EEE" },
      { name: "Mrs. C. Anusha", role: "AP/EEE" },
      { name: "Mr. B. Murali", role: "LI/EEE" },
    ],
    imgs: [
      { src: "/assets/images/eee/image_78.jpeg", alt: "Group photo at NCTPS-1" },
      { src: "/assets/images/eee/image_79.jpeg", alt: "Students with safety helmets at NCTPS-1" },
      { src: "/assets/images/eee/image_80.jpeg", alt: "Students at the NCTPS-1 plant model" },
      { src: "/assets/images/eee/image_81.jpeg", alt: "Group photo at the North Chennai Thermal Power Station signboard" },
    ],
  },
  {
    date: "13-02-2026",
    title: "Globesci Technology, Korattur, Chennai",
    desc: "II & III Year students visited for career growth and future scope.",
    imgs: [{ src: "/assets/images/eee/image_85.jpeg", alt: "Industrial Visit to Globesci Technology, Korattur", wide: true }],
  },
  {
    date: "08-08-2025",
    title: "North Chennai Thermal Power Station Stage-II, Ennore",
    desc: "II, III and IV Year students.",
    imgs: [
      { src: "/assets/images/eee/image_86.jpeg", alt: "Group photo at NCTPS-2, Ennore" },
      { src: "/assets/images/eee/image_87.jpeg", alt: "Students at NCTPS-2, Ennore" },
      { src: "/assets/images/eee/image_93.jpeg", alt: "Group photo at the NCTPS-2 gate" },
    ],
  },
  {
    date: "12-09-2025",
    title: "BSNL",
    desc: "Our II & III Year students went to Industrial visit for BSNL with the coordination of Faculty members listed below:",
    people: [
      { name: "Mr. S. Ganesh", role: "AP-EEE" },
      { name: "Mrs. C. Anusha", role: "AP-EEE" },
    ],
    imgs: [
      { src: "/assets/images/eee/image_92.jpeg", alt: "Students at the RGM TTC Administrative Block, BSNL" },
      { src: "/assets/images/eee/image_88.jpeg", alt: "Session at BSNL" },
      { src: "/assets/images/eee/image_89.jpeg", alt: "Session at BSNL" },
      { src: "/assets/images/eee/image_90.jpeg", alt: "Students attending the BSNL session" },
      { src: "/assets/images/eee/image_91.jpeg", alt: "Students attending the BSNL session" },
      { src: "/assets/images/eee/image_113.jpeg", alt: "Resource person addressing students at BSNL" },
    ],
  },
  {
    date: "28-08-2026",
    title: "Voltech Manufacturing Company, Chennai",
    desc: "EEE Department students.",
    imgs: [
      { src: "/assets/images/eee/image_131.jpeg", alt: "Industrial Visit to Voltech Manufacturing Company" },
      { src: "/assets/images/eee/image_114.jpeg", alt: "Students boarding the bus for the Voltech Manufacturing Company visit" },
    ],
  },
  {
    date: "08-09-2026",
    title: "Approtech R&D Solutions Pvt. Ltd, Chennai",
    desc: "EEE Department students.",
    imgs: [
      { src: "/assets/images/eee/image_138.jpeg", alt: "Industrial Visit to Approtech R&D Solutions" },
      { src: "/assets/images/eee/image_139.jpeg", alt: "Session at Approtech R&D Solutions" },
    ],
  },
  {
    date: "28-08-2026",
    title: "Niile Technical Skill and Consulting Pvt Ltd, Chennai",
    desc: "EEE Department students.",
    imgs: [
      { src: "/assets/images/eee/image_137.jpeg", alt: "Industrial Visit to Niile Technical Skill and Consulting" },
      { src: "/assets/images/eee/image_140.jpeg", alt: "Group photo at Niile Technical Skill and Consulting" },
    ],
  },
];

const FDPS_ATTENDED = [
  {
    date: "27.01.2025 – 01.02.2025",
    title: "The Future of Smart Mobility – Integrating AI and IoT in Electric Vehicle Ecosystems",
    org: "ATAL, Sree Sakthi Engineering College",
    by: "Mrs. M. Shunmuga Sankari (HOD), Mr. T. Kamalkumar",
    imgs: [
      { src: "/assets/images/eee/image_135.png", alt: "ATAL FDP certificate – T. Kamalkumar" },
      { src: "/assets/images/eee/image_136.png", alt: "ATAL FDP certificate – M. Shunmuga Sankari" },
    ],
  },
  {
    date: "17.02.2025 – 22.02.2025",
    title: "Impact of Urban Greenspaces in Alleviating Micro-Climate Change Using Geospatial Techniques",
    org: "ATAL, Sri Ramakrishna Engineering College",
    by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Mrs. C. Anusha",
    imgs: [
      { src: "/assets/images/eee/image_134.png", alt: "ATAL FDP certificate – Anusha C" },
      { src: "/assets/images/eee/image_142.png", alt: "ATAL FDP certificate – T. Kamalkumar" },
      { src: "/assets/images/eee/image_146.png", alt: "ATAL FDP certificate – M. Shunmuga Sankari" },
    ],
  },
  {
    date: "10.02.2025 – 16.02.2025",
    title: "E-Vehicle Fundamentals / EV Technology for EEE",
    org: "Naan Mudhalvan (University College of Villupuram / Anna University, Guindy)",
    by: "Mr. M. Arjunkumar, Mr. S. Ganesh",
    imgs: [
      { src: "/assets/images/eee/image_147.jpeg", alt: "Naan Mudhalvan training session" },
      { src: "/assets/images/eee/image_150.jpeg", alt: "Naan Mudhalvan training session at Anna University" },
      { src: "/assets/images/eee/image_148.jpeg", alt: "Faculty at the E-Vehicle Fundamentals programme, Viluppuram" },
      { src: "/assets/images/eee/image_144.png", alt: "Faculty at Anna University for the Naan Mudhalvan programme" },
      { src: "/assets/images/eee/image_143.png", alt: "Faculty at the E-Vehicle Fundamentals programme, Viluppuram" },
      { src: "/assets/images/eee/image_149.png", alt: "Faculty at Anna University for the Naan Mudhalvan programme" },
    ],
  },
  {
    date: "25.02.2026",
    title: "Generative AI for Teaching",
    org: "Dept. of ECE, T.J.S. Engineering College",
    by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Mr. S. Ganesh, Mrs. C. Anusha",
    imgs: [
      { src: "/assets/images/eee/image_133.png", alt: "Generative AI for Teaching certificate – Ganesh S" },
      { src: "/assets/images/eee/image_141.png", alt: "Generative AI for Teaching certificate – Anusha C" },
      { src: "/assets/images/eee/image_145.png", alt: "Generative AI for Teaching certificate – Shunmuga Sankari M" },
    ],
  },
  {
    date: "03.11.2025 – 08.11.2025",
    title: "The Evolving Landscape in Teaching and Research: AI and Data Approaches",
    org: "ATAL Academy & Nehru Institute of Technology",
    by: "Mr. S. Ganesh",
    imgs: [{ src: "/assets/images/eee/image_132.png", alt: "ATAL Academy FDP certificate – Ganesh S" }],
  },
  {
    date: "08.11.2025",
    title: "Market Ka Eklavya",
    org: "NSDL Technology, Trust & Reach",
    by: "Mrs. M. Shunmuga Sankari",
    imgs: [{ src: "/assets/images/eee/image_121.png", alt: "Market Ka Eklavya certificate – Shunmuga Sankari M" }],
  },
  {
    date: "18.11.2025",
    title: "Sustainable Computing and Green IT Solutions",
    org: "Nehru Institute of Technology, Coimbatore",
    by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Mr. S. Ganesh, Mrs. C. Anusha, Mr. M. Arjunkumar",
    imgs: [
      { src: "/assets/images/eee/image_116.png", alt: "Sustainable Computing FDP certificate – Ganesh S" },
      { src: "/assets/images/eee/image_117.png", alt: "Sustainable Computing FDP certificate – Arjunkumar" },
      { src: "/assets/images/eee/image_118.png", alt: "Sustainable Computing FDP certificate – Shunmuga Sankari M" },
      { src: "/assets/images/eee/image_119.png", alt: "Sustainable Computing FDP certificate – Anusha C" },
      { src: "/assets/images/eee/image_120.png", alt: "Sustainable Computing FDP certificate – Kamalkumar T" },
    ],
  },
  {
    date: "12.12.2025",
    title: "Quantum Computing: Basic and Applications",
    org: "Nehru Institute of Technology, Coimbatore",
    by: "Mr. T. Kamalkumar",
    imgs: [{ src: "/assets/images/eee/image_115.png", alt: "Quantum Computing FDP certificate – Kamalkumar T" }],
  },
  {
    date: "15.12.2025 – 20.12.2025",
    title: "Electric Vehicles – Breakthroughs and Challenges",
    org: "AMS College of Engineering",
    by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Mr. S. Ganesh",
    imgs: [
      { src: "/assets/images/eee/image_122.png", alt: "AMS College FDP certificate – Shunmuga Sankari M" },
      { src: "/assets/images/eee/image_123.png", alt: "AMS College FDP certificate – Kamalkumar T" },
      { src: "/assets/images/eee/image_124.png", alt: "AMS College FDP certificate – Ganesh S" },
    ],
  },
  {
    date: "Jul – Oct 2025",
    title: "Introduction to Machine Learning",
    org: "NPTEL – AICTE",
    by: "Mrs. M. Shunmuga Sankari",
    imgs: [{ src: "/assets/images/eee/image_130.png", alt: "NPTEL-AICTE certificate – Introduction to Machine Learning" }],
  },
  {
    date: "Jul – Oct 2025",
    title: "Power Electronics Applications in Power Systems",
    org: "NPTEL, IIT Guwahati",
    by: "Mrs. M. Shunmuga Sankari",
    imgs: [{ src: "/assets/images/eee/image_127.png", alt: "NPTEL certificate – Power Electronics Applications in Power Systems" }],
  },
  {
    date: "Jul – Oct 2025",
    title: "Machine Learning and Deep Learning – Fundamentals and Applications",
    org: "NPTEL, IIT Guwahati (Elite)",
    by: "Mrs. M. Shunmuga Sankari",
    imgs: [{ src: "/assets/images/eee/image_128.png", alt: "NPTEL Elite certificate – Machine Learning and Deep Learning" }],
  },
  {
    date: "Jul – Oct 2025",
    title: "Machine Learning for Core Engineering Disciplines",
    org: "NPTEL, IISc Bangalore (Elite)",
    by: "Mrs. M. Shunmuga Sankari",
    imgs: [{ src: "/assets/images/eee/image_129.png", alt: "NPTEL Elite certificate – Machine Learning for Core Engineering Disciplines" }],
  },
  {
    date: "26.01.2026",
    title: "Block Chain in Logistics",
    org: "GRT Institute of Engineering and Technology, Tiruttani",
    by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar",
    imgs: [
      { src: "/assets/images/eee/image_125.png", alt: "GRT FDP certificate – Kamalkumar T" },
      { src: "/assets/images/eee/image_126.png", alt: "GRT FDP certificate – Shunmuga Sankari M" },
    ],
  },
];

const GUEST_LECTURES = [
  {
    date: "28-01-2026",
    title: "IoT – Fundamentals and Applications",
    desc: "Handled by Ms. Nandhini, FIIT Formacion Pvt Ltd, at the EEE Seminar Hall, in association with FIIT Formacion Pvt Ltd.",
    imgs: [
      { src: "/assets/images/eee/image_35.jpeg", alt: "Guest Lecture on IoT – Fundamentals and Applications" },
      { src: "/assets/images/eee/image_36.jpeg", alt: "Ms. Nandhini delivering the guest lecture on IoT" },
      { src: "/assets/images/eee/image_33.jpeg", alt: "Students attending the guest lecture on IoT" },
      { src: "/assets/images/eee/image_34.jpeg", alt: "Resource person presenting on IoT networking" },
    ],
  },
  {
    date: "21-02-2026",
    title: "Why Engineering is the Best Choice for Diploma Students",
    desc: "Career guidance program by Mr. Sujeeth Vishnu, Chief Business Development Executive, OPC Pvt Ltd, coordinated by Mrs. M. Shunmuga Sankari and Mr. T. Kamalkumar.",
    imgs: [{ src: "/assets/images/eee/image_31.jpeg", alt: "Guest lecture: Why Engineering is the Best Choice for Diploma Students" }],
  },
];

const WORKSHOPS = [
  {
    date: "30-07-2025 to 31-07-2025",
    title: "Generation Incoming: Vehicle Operates with Three Fuels",
    desc: "Two-day hands-on workshop conducted by Mr. V. Sujeeth Vishnu, NTLS Consultancy OPC Pvt Ltd, for II, III & IV Year students at the Seminar Hall.",
    imgs: [
      { src: "/assets/images/eee/image_21.png", alt: "Workshop participation certificate – Hemaraj R" },
      { src: "/assets/images/eee/image_28.png", alt: "Workshop participation certificate – Aravind T" },
      { src: "/assets/images/eee/image_29.png", alt: "Workshop participation certificate – M. Lokesh" },
      { src: "/assets/images/eee/image_30.png", alt: "Workshop participation certificate – Kishore B" },
    ],
  },
  { date: "29-10-2024", title: "Industrial Training Workshop", desc: "Presented by Axis Global Institute of Industrial Training, attended by II, III & IV Year students." },
];

const CONFERENCES = [
  { date: "13-03-2026", title: "International Conference (Online)", desc: "IV Year students attended at SKP Engineering College, Thiruvannamalai." },
  {
    date: "04-03-2026",
    title: "2nd International Conference on AI, Cybersecurity and Emerging Technologies (ICACET-IHAE 2026)",
    desc: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Oviya R and R. Samuel presented a paper titled “Smart Dual-Battery EV Charging System with Thermal Management and Energy Recovery” at S.K.P. Engineering College, Tiruvannamalai.",
    imgs: [
      { src: "/assets/images/eee/image_27.png", alt: "ICACET-IHAE 2026 certificate – M. Shunmuga Sankari" },
      { src: "/assets/images/eee/image_39.png", alt: "ICACET-IHAE 2026 certificate – T. Kamalkumar" },
      { src: "/assets/images/eee/image_76.png", alt: "ICACET-IHAE 2026 certificate – Oviya R" },
      { src: "/assets/images/eee/image_77.png", alt: "ICACET-IHAE 2026 certificate – R. Samuel" },
    ],
  },
  {
    date: "25-03-2026",
    title: "National Conference – Best Paper Award",
    desc: "III Year students presented “Solar Integrated Power Management System for Electric Two Wheeler” at Prathyusha Engineering College and won the Best Paper Award. Presented by T. Kamalkumar, L. Dhanasekar, A. Anbumuthu, M. Lokesh, G. Kamesh.",
    imgs: [
      { src: "/assets/images/eee/image_26.png", alt: "Best Paper Award certificate" },
      { src: "/assets/images/eee/image_22.png", alt: "Certificate of Participation – L. Dhanasekar" },
      { src: "/assets/images/eee/image_23.png", alt: "Certificate of Participation – A. Anbumuthu" },
      { src: "/assets/images/eee/image_24.png", alt: "Certificate of Participation – M. Lokesh" },
      { src: "/assets/images/eee/image_25.png", alt: "Certificate of Participation – G. Kamesh" },
    ],
  },
];

const SEMINARS_EVENTS = [
  { date: "06-10-2025", title: "Seminar on Data Science", desc: "II, III & IV Year students attended, conducted by Lokesh Kumar." },
  {
    date: "29-01-2026",
    title: "IIC Seminar – Introduction and Application of AI",
    desc: "Conducted by Ms. P. Pavithra, AP-AIDS, for II & III Year EEE students, under MIC Driven Activity – Atmanirbhar Bharat: HEI Pre-Summit Engagements towards IndiaAI Impact Summit 2026.",
    imgs: [{ src: "/assets/images/eee/image_32.jpeg", alt: "IIC Seminar – Introduction and Application of AI" }],
  },
  {
    date: "09-08-2025",
    title: "Special Corporate Session on Interview Readiness",
    desc: "III & IV Year students attended, conducted by Mr. Sarath Chandar Sukumar, General Manager – HR, Vaken Technologies.",
    imgs: [{ src: "/assets/images/eee/image_19.jpeg", alt: "Special Corporate Session on Interview Readiness" }],
  },
  {
    date: "09-03-2026",
    title: "IIC Meeting – Sabka Sath Sabka Vikas",
    desc: "II & III Year students attended the online MIC Driven Activity.",
    imgs: [{ src: "/assets/images/eee/image_94.jpeg", alt: "Students attending the IIC online meeting", wide: true }],
  },
];

const EVENTS_ORGANISED = {
  title: "Six Days Faculty Development Program – “Electrical Technology: Recent Trends and Innovations”",
  desc: "Organised by the Department of Electrical and Electronics Engineering, 02-02-2026 to 07-02-2026 (online mode).",
  imgs: [
    { src: "/assets/images/eee/image_6.jpeg", alt: "Day 1 – Dr. J. Prakash on Advanced Techniques in Solar Photovoltaic Systems" },
    { src: "/assets/images/eee/image_8.jpeg", alt: "Day 3 – Dr. Amos Edinakaran on ANSYS Maxwell and Induction Motor Design" },
    { src: "/assets/images/eee/image_3.jpeg", alt: "Day 4 – Dr. Mohamed Abbas S on Internet of Things and its Applications" },
    { src: "/assets/images/eee/image_2.jpeg", alt: "Day 5 – Dr. P. Selvaraj on Renewable Energy, Smart Grids and Vehicle-to-Grid Integration" },
    { src: "/assets/images/eee/image_4.jpeg", alt: "Day 6 – Dr. P. Raja on DC Micro-Grid and Protection" },
  ],
  days: [
    { date: "02-02-2026", topic: "Advanced Techniques in Solar Photovoltaic Systems", speaker: "Dr. J. Prakash, Principal, T.J.S. Engineering College" },
    { date: "03-02-2026", topic: "Power to the People – Smart Grid – Your Own Electricity Market", speaker: "Dr. J. Balamurugan, Assistant Executive Engineer, TANGEDCO" },
    { date: "04-02-2026", topic: "Introduction to ANSYS Maxwell and Optimal Design of a Squirrel-Cage Induction Motor", speaker: "Dr. Amos Edinakaran, Vel Tech Rangarajan Dr. Sagunthala R&D Institute" },
    { date: "05-02-2026", topic: "Internet of Things and its Applications", speaker: "Dr. Mohamed Abbas S, HOD, PERI Institute of Technology" },
    { date: "06-02-2026", topic: "Renewable Energy, Smart Grids, Energy Storage and Vehicle-to-Grid Integration", speaker: "Dr. P. Selvaraj, Dr. M.G.R. Educational and Research Institute" },
    { date: "07-02-2026", topic: "An Overview on DC Micro-Grid and Protection", speaker: "Dr. P. Raja, National Institute of Technology, Trichy" },
  ],
};

const OTHER_DEPT_EVENTS = [
  {
    date: "28-10-2025",
    title: "Symposium – GNISTA 2K25",
    desc: "16th National Level Technical Symposium organised by the Association of Electrical and Electronics Engineering, chief guest Dr. V. S. Sriraja Balaguru (Assistant Executive Engineer, IT, TNEB).",
    imgs: [{ src: "/assets/images/eee/image_5.jpeg", alt: "Symposium – GNISTA 2K25", wide: true }],
  },
];

const ALUMNI_INTERACTIONS = [
  { date: "26-02-2025", title: "Thirukumaran P & Akash D", desc: "Thirukumaran P (Senior Engineer, Alstom Transport India Pvt Ltd) and Akash D (Business – Foods and Beverages) interacted with II year students." },
  {
    date: "13-08-2025",
    title: "Karthick B",
    desc: "Alumnus from Sharekhan Company Limited, Chetpat, interacted with II Year students on career growth and future scope.",
    imgs: [
      { src: "/assets/images/eee/image_14.jpeg", alt: "Karthick B interacting with students" },
      { src: "/assets/images/eee/image_15.jpeg", alt: "Alumni interaction session with Karthick B" },
    ],
  },
  {
    date: "14-11-2025",
    title: "Saikrishnan Radhakrishnan (Batch 2021)",
    desc: "Working at Tata Consultancy Services, met with II and III Year students.",
    imgs: [
      { src: "/assets/images/eee/image_12.jpeg", alt: "Saikrishnan Radhakrishnan interacting with students" },
      { src: "/assets/images/eee/image_13.jpeg", alt: "Alumni interaction session with Saikrishnan Radhakrishnan" },
    ],
  },
  { date: "02-02-2026", title: "Mr. B. Udhayakumaran (Batch 2025)", desc: "Interacted with II year students." },
];

const FACULTY_ACHIEVEMENTS = [
  {
    date: "31-01-2025",
    title: "Trainer Certification – Grade B",
    desc: "Mrs. Shunmuga Sankari M cleared the assessment as a Trainer (Trainer ID TR176420) for the Qualification Pack of Hydrogen Plant Technician (Installation, Commissioning and Maintenance), NSQF Level 4.",
    imgs: [{ src: "/assets/images/eee/image_20.png", alt: "Trainer Certification – Grade B, Shunmuga Sankari M" }],
  },
];

const CO_CURRICULAR = [
  {
    date: "28-02-2025",
    title: "Inventec Project Expo – 1st Prize",
    desc: "Kamesh G and Perarasu K (II year) won 1st Prize at the Inventec Project Expo organised by Gojan School of Business and Technology, Redhills.",
    imgs: [
      { src: "/assets/images/eee/image_38.jpeg", alt: "Kamesh G and Perarasu K receiving the Inventec Project Expo award" },
      { src: "/assets/images/eee/image_75.jpeg", alt: "Award presentation at Gojan School of Business and Technology" },
    ],
  },
  {
    date: "04-03-2026",
    title: "Techuyugam 2026 – Project Expo",
    desc: "II & III Year students won cash prizes and rewards at Veltech Multitech Engineering College, Avadi.",
    imgs: [{ src: "/assets/images/eee/image_65.jpeg", alt: "Techuyugam 2026 – Project Expo, Veltech Multitech Engineering College", wide: true }],
  },
  {
    date: "13-03-2026",
    title: "Xempler 2026 Symposium",
    desc: "II & III Year students attended at Velammal Engineering College.",
    imgs: [{ src: "/assets/images/eee/image_64.png", alt: "Xempler 2026 Symposium certificate – A. Angumuthu" }],
  },
  { date: "14-03-2026", title: "Technoverse Hackathon 2026", desc: "III year students participated at St. Joseph’s College of Engineering & Technology." },
  {
    date: "18-03-2026",
    title: "Ideathon",
    desc: "III Year students went to St. Peter’s Engineering College.",
    imgs: [{ src: "/assets/images/eee/image_62.png", alt: "St. Peter's Ideathon certificate – Hinduja V" }],
  },
];

const EXTRA_CURRICULAR = [
  {
    date: "14-02-2025",
    title: "Blood Donation Camp",
    desc: "Mitsuba India Pvt. Ltd. conducted a blood donation camp at T.J.S. Arts & Science College; Lingeshwaran N, Perarasu K and Vijayakumar V donated blood.",
    imgs: [
      { src: "/assets/images/eee/image_66.jpeg", alt: "Blood Donation Camp certificate presentation" },
      { src: "/assets/images/eee/image_67.jpeg", alt: "Students at the Blood Donation Camp" },
      { src: "/assets/images/eee/image_68.jpeg", alt: "Student donating blood at the camp" },
    ],
  },
  {
    date: "14-11-2025",
    title: "Blood Donation Camp – Rela Hospital",
    desc: "Three II year students donated blood at the camp conducted at T.J.S. Arts & Science College, Peruvoyal.",
    imgs: [
      { src: "/assets/images/eee/image_59.png", alt: "Rela Hospital blood donation certificate – M. Karan" },
      { src: "/assets/images/eee/image_60.png", alt: "Rela Hospital blood donation certificate" },
      { src: "/assets/images/eee/image_61.png", alt: "Rela Hospital blood donation certificate – Kishore B" },
    ],
  },
];

const RECRUITERS = [
  { name: "HT", logo: "/assets/images/eee/image_47.jpeg" },
  { name: "NISSI Energy Integrated", logo: "/assets/images/eee/image_49.jpeg" },
  { name: "Michelin", logo: "/assets/images/eee/image_48.png" },
  { name: "Emerald", logo: "/assets/images/eee/image_40.jpeg" },
  { name: "Wipro", logo: "/assets/images/eee/image_55.jpeg" },
  { name: "Caplin Steriles", logo: "/assets/images/eee/image_54.png" },
  { name: "Thinksynq", logo: "/assets/images/eee/image_53.jpeg" },
  { name: "Mitsuba India", logo: "/assets/images/eee/image_51.png" },
  { name: "Infosys", logo: "/assets/images/eee/image_1.png" },
  { name: "TCS", logo: "/assets/images/eee/image_50.png" },
  { name: "Sakura", logo: "/assets/images/eee/image_52.jpeg" },
];

const INTERNSHIPS = [
  { org: "Prolific Systems & Technologies Pvt. Ltd.", date: "27-01-2025 to 10-02-2025", who: "II Year students (21 nos.)" },
  {
    org: "V V Electro Systems, Gummidipoondi",
    date: "06-02-2025 to 20-02-2025",
    who: "III Year students: Hemaraj R, Logendheran R, Sanjay U, Surya Prakash T, Avinash K, Gopiraj M, Sakthivel V, Samuel R, Santhosh M, Kaviya Sri S, Nageshwari R, Sandhiya A S, Kalaiselvi P, Oviya R",
    imgs: [
      { src: "/assets/images/eee/image_45.jpeg", alt: "Interns at V V Electro Systems, Gummidipoondi" },
      { src: "/assets/images/eee/image_46.jpeg", alt: "Hands-on training at V V Electro Systems" },
      { src: "/assets/images/eee/image_56.jpeg", alt: "Students soldering circuits at V V Electro Systems" },
      { src: "/assets/images/eee/image_57.jpeg", alt: "Practical session at V V Electro Systems" },
      { src: "/assets/images/eee/image_58.jpeg", alt: "Practical session at V V Electro Systems" },
      { src: "/assets/images/eee/image_69.jpeg", alt: "Students working on a PCB at V V Electro Systems" },
      { src: "/assets/images/eee/image_70.jpeg", alt: "Interns discussing components at V V Electro Systems" },
      { src: "/assets/images/eee/image_71.jpeg", alt: "Interns at V V Electro Systems" },
      { src: "/assets/images/eee/image_72.jpeg", alt: "Interns at V V Electro Systems" },
    ],
  },
  { org: "Mitsuba India Pvt Ltd", date: "02-03-2026 to 31-03-2026", who: "II & III Year students" },
  {
    org: "IIT Madras",
    date: "12-02-2025 to 11-04-2025",
    who: "IV Year students: Vayuluru Mouli, Udhayakumaran B",
    imgs: [
      { src: "/assets/images/eee/image_43.png", alt: "Bonafide certificate – B. Udhayakumaran, IIT Madras internship" },
      { src: "/assets/images/eee/image_44.png", alt: "Bonafide certificate – Vayuluru Mouli, IIT Madras internship" },
    ],
  },
  {
    org: "Jana Engineering Industries, Gummidipoondi",
    date: "16-09-2025 (15 days)",
    who: "Kamesh G (II Year)",
    imgs: [{ src: "/assets/images/eee/image_42.png", alt: "Bonafide certificate – Kamesh G, Jana Engineering Industries internship" }],
  },
  {
    org: "NCTPS-III, Ennore",
    date: "16-09-2025",
    who: "III Year students: Angumuthu A, Deenakumar D, Dhanasekar L, Kamalesh T, Lingeshwaran N, Perarasu K, Madhavan N, Deepanjal M, Ezhilvani E, Hariniya S, Hemavathi R, Hinduja V, Lavanya G, Poornima K",
  },
  {
    org: "TANGEDCO, Pulicat",
    date: "26-12-2025 (15 days)",
    who: "II Year students: Sabari Manikandan K, Kishore B, Edwin Paul M, Karan M, Yokesh S, Jayaprakash D, Anandh R, Tharun D, Parthian P",
  },
];

const PATENTS = [
  { date: "18-10-2024", topic: "Optimizing EV Charging Station Operations Using IoT, Cloud Computing & Machine Learning for Eco-friendly Transportation", by: "Mrs. M. Shunmuga Sankari (HOD), Mr. T. Kamalkumar, Mr. M. Arjunkumar, Mr. S. Ganesh" },
  { date: "2022-2023", topic: "Electric Power Distribution Employing Ensemble Machine Learning Based Cyber Physical System (202241006399)", by: "Dr. J. Prakash, Principal" },
  { date: "2022-2023", topic: "CNN Based Blood Cancer Detection and Diagnosis Method (202241013641)", by: "M. Shunmuga Sankari" },
  { date: "2022-2023", topic: "Realtime Agricultural Field Monitoring System Using IoT (202241027406)", by: "Ms. Shunmuga Sankari M, Mr. T. Kamalkumar, Mr. Prakash A" },
  { date: "2022-2023", topic: "AI Based Smart Agriculture System Using Embedded IoT (202241072729)", by: "Ms. Shunmuga Sankari M, Mr. T. Kamalkumar" },
  { date: "2025-2023", topic: "AI-Driven Deep Learning Model for Predictive Healthcare Diagnostics (202521025273)", by: "Mr. T. Kamalkumar" },
];

const PUBLICATIONS = [
  {
    title: "DABPR: A Large-Scale Internet of Things-Based Data Aggregation Back Pressure Routing for Disaster Management",
    by: "Dr. J. Prakash",
    link: "https://link.springer.com/article/10.1007/s11276-019-02122-3",
  },
  {
    title: "Design of PSO-Fuzzy MPPT Controller for Photovoltaic Application",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1007/978-81-322-2119-7_130",
  },
  {
    title: "Cuckoo Search Assisted Fuzzy Logic Algorithm for Smart WSN Routing System",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1504/IJAHUC.2022.123532",
  },
  {
    title: "Design of Coordinated Control Scheme for Hybrid Resonant Boost Converter and Multi Level Inverter",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.17485/ijst/2016/v9i11/89389",
  },
  {
    title: "Design of Soft Switching Interleaved Boost Converter for Photovoltaic Application",
    by: "Dr. J. Prakash",
    link: "https://www.researchgate.net/publication/282069245_Design_of_Soft_Switching_Interleaved_Boost_Converter_for_Photovoltaic_Application",
  },
  {
    title: "MPPT in Partially Shaded PV System with the Use of WODE Technique",
    by: "Dr. J. Prakash",
    link: "https://www.researchgate.net/publication/297679592_Fuzzy_Logic_Controller_for_Partial_Shaded_Photovoltaic_Array_Fed_Modular_Multilevel_Converter",
  },
  {
    title: "An Investigation of Various Actuation Mechanisms in Robot Arm",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1177/0020294019866854",
  },
  {
    title: "Design and Development of Solar Photovoltaic System Using Single-Phase MLI",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1007/978-981-15-2256-7_58",
  },
  {
    title: "Performance Analysis and Simulation of Five Level and Seven Level Single Phase Multilevel Inverters",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1049/cp.2012.2227",
  },
  {
    title: "Sinusoidal Output Voltage H-Bridge Multilevel Inverters",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1049/cp.2012.2224",
  },
  {
    title: "Reward-Based Residential Wireless Sensor Optimization Approach for Appliance Monitoring",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1007/s00500-020-05525-z",
  },
  {
    title: "Design of Polarization Splitter Using Elliptically Dual Core–Cladding Photonic Crystal Fiber",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1016/j.rinp.2019.102279",
  },
  {
    title: "A Novel Technique for Common Mode-Voltage Elimination and DC-Link Balancing in Three-Level Inverter",
    by: "Dr. J. Prakash",
    link: "https://www.praiseworthyprize.org/latest_issues/IREMOS-latest/IREMOS_vol_5_n_2.html",
  },
  {
    title: "Retraction Note: Reward-Based Residential Wireless Sensor Optimization Approach for Appliance Monitoring",
    by: "Dr. J. Prakash",
    link: "https://doi.org/10.1007/s00500-024-10229-9",
  },
  {
    title: "Topology and Performance Analysis of Cascadable Nine Level Inverter by Packed U-Cell Inverter and Using Multi-Mode Synchronized PWM Schemes",
    by: "Dr. J. Prakash",
    link: "https://eurekamag.com/research/105/008/105008685.php",
  },
  {
    title: "Polymers Based Material as a Safety Suit for High Power Utilities Working",
    by: "Dr. J. Prakash",
    link: "https://www.researchgate.net/publication/350942260_Polymers_Based_Material_as_A_Safety_Suit_for_High_Power_Utilities_Working",
  },
  {
    title: "Design and Development of Control Scheme for Solar PV System Using Single Phase Multilevel Inverter",
    by: "Dr. J. Prakash",
    link: "https://eurekamag.com/research/103/808/103808228.php",
  },
];

const DISTINGUISHED_ALUMNI = [
  { name: "Mr. Sivakumar", role: "Software Engineer, TCS" },
  { name: "Mr. Naresh Kumar", role: "Software Engineer, TCS" },
  { name: "Mr. Sathish Kumar", role: "Sr. Electrical Engineer, Gummidipoondi" },
  { name: "Mr. Gaddam Sathish", role: "Sr. System Admin, Aquarelle India" },
  { name: "Thirukumaran P", role: "Senior Engineer, Alstom Transport India Private Limited Company" },
];

const MENU = [
  {
    label: "About",
    children: [
      { href: "#about", label: "About us" },
      { href: "#advisory", label: "Department Advisory Committee" },
      { href: "#vision-mission", label: "Vision and Mission" },
      { href: "#hod", label: "HOD's Desk" },
      { href: "#magazine", label: "Magazine" },
    ],
  },
  {
    label: "People",
    children: [
      { href: "#faculty", label: "Faculty" },
      { href: "#staff", label: "Staff" },
    ],
  },
  {
    label: "Academics",
    children: [
      { href: "#programmes", label: "Programme Offered" },
      { href: "#bos", label: "BOS" },
      { href: "#curriculum", label: "Curriculum & Syllabus" },
    ],
  },
  {
    label: "Industry Interface",
    children: [
      { href: "#mou", label: "MOU's" },
      { href: "#consultancy", label: "Area of Consultancy" },
      { href: "#industry-visits", label: "Industry Visits" },
    ],
  },
  {
    label: "Research",
    children: [
      { href: "#research", label: "Area of Research" },
      { href: "#seed-money", label: "Seed Money for Research" },
    ],
  },
  {
    label: "Facilities",
    children: [{ href: "#facilities", label: "Academic Laboratories" }],
  },
  {
    label: "Events",
    children: [
      { href: "#conferences", label: "Conference" },
      { href: "#fdp-workshop", label: "Guest Lecturer, FDP & Workshop" },
      { href: "#value-added-course", label: "Value Added Course" },
      { href: "#symposium", label: "Symposium" },
    ],
  },
  {
    label: "Placements",
    children: [{ href: "#recruiters", label: "Major Recruiters" }],
  },
  {
    label: "Achievements",
    children: [
      { href: "#faculty-achievements", label: "Faculty Achievements" },
      { href: "#co-curricular", label: "Co-Curricular" },
      { href: "#extra-curricular", label: "Extra-Curricular" },
    ],
  },
  {
    label: "Others",
    children: [
      { href: "#internships", label: "Internship" },
      { href: "#students-achievements", label: "Students Achievements" },
      { href: "#gallery", label: "Gallery" },
      { href: "#alumni", label: "Alumni Interactions" },
      { href: "#distinguished-alumni", label: "Distinguished Alumni" },
      { href: "#entrepreneurship", label: "Entrepreneurship" },
      { href: "#seminars", label: "Seminars & Activities" },
    ],
  },
];

function LinkList({ items }) {
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

export default function EEEDepartment() {
  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">Department</span>
          <h1>Electrical and Electronics Engineering</h1>
          <p>
            Established in 2009, the Department of Electrical and Electronics Engineering imparts quality education
            and develops competent professionals through a strong academic foundation combined with practical,
            hands-on exposure.
          </p>
        </div>
        <div className="tjs-dept-hero-image">
          <img src="/assets/images/campus/smart-classroom-01.jpg" alt="Electrical and Electronics Engineering classroom at T.J.S Engineering College" />
        </div>
      </section>

      <div className="tjs-dept-page">
        <DeptMegaNav categories={MENU} />

        <section id="about" className="tjs-dept-section">
          <h2>About us</h2>
          <p>
            The Department of Electrical and Electronics Engineering (EEE) was established in the year 2009 with the
            objective of imparting quality education and developing competent professionals in the field of
            electrical and electronics engineering. The department offers a strong academic foundation combined with
            practical exposure, enabling students to understand both fundamental concepts and emerging technologies
            in the discipline.
          </p>
          <p>
            The department is supported by qualified and experienced faculty members with expertise in areas such as
            Power Systems, Electrical Machines, Power Electronics, Control Systems, Renewable Energy, Electrical
            Drives, Embedded Systems, and Industrial Automation. Faculty members actively engage in teaching,
            research, technical activities, and mentoring students to support their academic and professional
            growth.
          </p>
          <p>
            The department has well-equipped laboratories that provide students with hands-on experience and
            practical understanding of electrical and electronic systems. The laboratory facilities support areas
            including Electrical Machines, Power Systems, Power Electronics, Control and Instrumentation,
            Measurements and Instrumentation, Electrical Circuits, Digital and Analog Electronics, Microprocessors
            and Microcontrollers, Renewable Energy Systems, Embedded Systems, and Industrial Automation.
          </p>
          <p>
            The department places considerable emphasis on experiential learning through laboratory work, mini
            projects, major projects, technical seminars, workshops, industrial visits, internships, and technical
            competitions. Students are encouraged to apply their theoretical knowledge to real-world engineering
            problems and develop skills in problem-solving, teamwork, innovation, and communication.
          </p>
          <p>
            Industry interaction and professional exposure form an important part of the department&apos;s academic
            activities. Through industrial visits, expert lectures, training programmes, internships, and
            collaborative initiatives, students are provided opportunities to understand current industrial
            practices and emerging technological trends. The department also encourages students and faculty members
            to participate in research, innovation, consultancy, and technical development activities.
          </p>
          <p>
            The Department of EEE is committed to continuously improving its academic environment and providing
            students with opportunities to develop into technically competent, innovative, and socially responsible
            engineers. Through quality teaching, practical learning, research orientation, and industry interaction,
            the department strives to prepare its graduates for successful careers in core electrical and
            electronics industries, emerging technology sectors, higher education, research, and entrepreneurship.
          </p>
        </section>

        <section id="advisory" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Department Advisory Committee</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="vision-mission" className="tjs-dept-section">
          <h2>Vision and Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p>
                To create competent electrical and electronics engineers, innovators, researchers and entrepreneurs by
                learning the fundamentals and current cutting-edge technologies for the betterment of society.
              </p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <ul>
                <li>Produce highly qualified engineers with a strong foundation in Electrical and Electronics Engineering to provide real time solutions through emerging technologies.</li>
                <li>Enable students with good communication skills and problem solving ability.</li>
                <li>Develop proficiency and ability to function in multi-disciplinary teams.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="hod" className="tjs-dept-section tjs-dept-section-alt">
          <h2>HOD&apos;s Desk</h2>
          <div className="tjs-dept-hod">
            <div className="tjs-dept-hod-photo" aria-hidden="true">
              Photo
            </div>
            <div className="tjs-dept-hod-message">
              <h3>Welcome to the Department of Electrical and Electronics Engineering</h3>
              <p>Welcome to the Department of Electrical and Electronics Engineering at T.J.S. Engineering College.</p>
              <p>
                It is my privilege to lead a department committed to academic excellence, technical competency,
                innovation, and the holistic development of aspiring electrical and electronics engineers.
                Established in 2009, the Department of Electrical and Electronics Engineering has been dedicated to
                providing quality technical education and creating opportunities for students to transform their
                knowledge into meaningful engineering solutions.
              </p>
              <p>
                Electrical and Electronics Engineering is a dynamic discipline that forms the foundation of several
                modern technologies, including power systems, renewable energy, electrical drives, automation,
                control systems, embedded systems, and smart technologies. Our department strives to equip students
                with the knowledge and practical skills necessary to understand these rapidly evolving technologies
                and address real-world engineering challenges.
              </p>

              <h4>Academic Excellence</h4>
              <p>
                The department provides a strong foundation in fundamental and advanced areas of Electrical and
                Electronics Engineering through effective classroom teaching, laboratory-based learning, project
                work, seminars, workshops, and technical activities. Our academic practices encourage students to
                develop analytical thinking, problem-solving abilities, creativity, and a continuous-learning
                mindset.
              </p>

              <h4>Practical Learning and Innovation</h4>
              <p>
                We strongly believe that engineering education extends beyond the classroom. Our well-equipped
                laboratories and practical learning environment enable students to gain hands-on experience and
                understand the application of engineering concepts. Students are encouraged to undertake innovative
                projects and participate in technical events, competitions, workshops, and other experiential
                learning activities.
              </p>

              <h4>Research and Development</h4>
              <p>
                Research and innovation are important components of the department&apos;s academic environment.
                Faculty members and students are encouraged to explore emerging areas of Electrical and Electronics
                Engineering and develop solutions to contemporary technological and societal challenges. The
                department promotes project-based learning, technical research, innovation, and knowledge sharing.
              </p>

              <h4>Industry Interaction</h4>
              <p>
                The department recognizes the importance of strong interaction between academia and industry.
                Industrial visits, expert lectures, internships, training programmes, workshops, and project-based
                activities provide students with exposure to industrial practices and emerging technologies. Such
                initiatives help students understand professional requirements and prepare themselves for successful
                careers.
              </p>

              <h4>Student Development</h4>
              <p>
                At T.J.S. Engineering College, we focus on developing students as technically competent and
                responsible professionals. Students are encouraged to participate in technical associations,
                seminars, workshops, conferences, project activities, co-curricular programmes, and extracurricular
                activities. These opportunities help them strengthen their communication, teamwork, leadership,
                creativity, and professional skills.
              </p>

              <h4>Faculty</h4>
              <p>
                Our faculty members are committed to providing quality education and mentoring students throughout
                their academic journey. With diverse areas of expertise, the faculty encourage students to explore
                new ideas, develop technical competencies, and pursue their academic and professional aspirations.
                Continuous learning and professional development are encouraged among faculty members to keep pace
                with advancements in technology.
              </p>

              <h4>Infrastructure and Laboratories</h4>
              <p>
                The department provides students with access to laboratories and learning resources that support
                both theoretical and practical education. The facilities enable students to gain hands-on experience
                in electrical machines, power systems, power electronics, control systems, measurements and
                instrumentation, electronics, microprocessors and microcontrollers, renewable energy, embedded
                systems, and other relevant areas.
              </p>

              <h4>Our Commitment</h4>
              <p>
                The Department of Electrical and Electronics Engineering is committed to creating an environment
                where students can learn, explore, innovate, and grow. Our goal is to nurture graduates who possess
                strong technical knowledge, professional competence, ethical values, and a sense of responsibility
                towards society.
              </p>
              <p>
                I warmly welcome aspiring engineers to the Department of Electrical and Electronics Engineering at
                T.J.S. Engineering College and invite them to be part of a learning community that encourages
                curiosity, innovation, collaboration, and continuous growth.
              </p>

              <p className="tjs-dept-hod-quote">
                &ldquo;With best wishes for a successful and rewarding engineering journey.&rdquo;
              </p>
              <p className="tjs-dept-hod-sign">
                Mrs. M. Shunmuga Sankari
                <br />
                HOD, Department of Electrical and Electronics Engineering
              </p>
            </div>
          </div>
        </section>

        <section id="magazine" className="tjs-dept-section">
          <h2>Magazine</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="faculty" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Faculty</h2>
          <h3>Faculty (Staff Details for NBA, A.Y. 2026-27)</h3>
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

        <section id="staff" className="tjs-dept-section">
          <h2>Staff</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="programmes" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Programme Offered</h2>
          <div className="tjs-dept-tabs">
            <button type="button" className="tjs-dept-tab active">B.E – EEE</button>
          </div>

          <h3>Program Educational Objectives (PEOs)</h3>
          <div className="tjs-dept-peo-list">
            <div className="tjs-dept-peo"><p>1. Find employment in core Electrical and Electronics Engineering and service sectors.</p></div>
            <div className="tjs-dept-peo"><p>2. Get elevated to technical lead position and lead the organization competitively.</p></div>
            <div className="tjs-dept-peo"><p>3. Enter into higher studies leading to post-graduate and research degrees; become a consultant and provide solutions to the practical problems of core organizations.</p></div>
            <div className="tjs-dept-peo"><p>4. Become an entrepreneur and be part of electrical and electronics product and service industries.</p></div>
          </div>

          <h3>Program Outcomes (POs)</h3>
          <div className="tjs-dept-peo-list">
            {POS.map((po, i) => (
              <div className="tjs-dept-peo" key={i}><p>{i + 1}. {po}</p></div>
            ))}
          </div>

          <h3>Program Specific Outcomes (PSOs)</h3>
          <div className="tjs-dept-peo-list">
            {PSOS.map((pso) => (
              <div className="tjs-dept-peo" key={pso.title}>
                <h4>{pso.title}</h4>
                <p>{pso.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="bos" className="tjs-dept-section">
          <h2>BOS</h2>
          <p>
            The Board of Studies reviewed and approved the curriculum and regulations listed below for the
            Department of Electrical and Electronics Engineering.
          </p>
          <LinkList items={BOS_DOCS} />
        </section>

        <section id="curriculum" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Curriculum &amp; Syllabus</h2>
          <LinkList items={REGULATIONS} />
        </section>

        <section id="mou" className="tjs-dept-section">
          <h2>MOU&apos;s</h2>
          <h3>Professional Societies</h3>
          <p>Mr. Kamalkumar T – Membership in IAENG (International Association of Engineers).</p>

          <h3>Centre of Excellence</h3>
          <div className="tjs-dept-card">
            <h4 style={{ marginTop: 0, color: "var(--rs-theme-blue)" }}>Prolific Systems &amp; Technologies Pvt Ltd</h4>
            <p style={{ marginBottom: 0 }}>
              No.151/34, 3rd Floor, Sri Ranga Complex, Mambalam High Road, T.Nagar, Chennai-17
              <br />
              Phone: 044 28144061 / 28144064
            </p>
          </div>

          <h3>MoU</h3>
          <p>
            The Department of Electrical and Electronics Engineering actively collaborates with leading industries
            to bridge the gap between academia and real-world applications. These MoUs enable internships,
            consultancy, faculty development, and cutting-edge research.
          </p>
          <LinkList items={MOU_DOCS} />
        </section>

        <section id="consultancy" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Area of Consultancy</h2>
          <LinkList items={CONSULTANCY} />
        </section>

        <section id="industry-visits" className="tjs-dept-section">
          <h2>Industry Visits</h2>
          <EventAccordion items={INDUSTRIAL_VISITS} />
        </section>

        <section id="research" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Area of Research</h2>
          <div className="tjs-dept-grid-3">
            <div className="tjs-dept-card">
              <h3>Books Chapters</h3>
              <p style={{ marginBottom: 0 }}>4</p>
            </div>
            <div className="tjs-dept-card">
              <h3>Supervisor &amp; Scholars</h3>
              <p style={{ marginBottom: 0 }}>2 (Guided)</p>
            </div>
            <div className="tjs-dept-card">
              <h3>Consultancies</h3>
              <p style={{ marginBottom: 0 }}>4</p>
            </div>
          </div>

          <h3>Patents Registered</h3>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Topic</th>
                  <th>Published By</th>
                </tr>
              </thead>
              <tbody>
                {PATENTS.map((p) => (
                  <tr key={p.topic}>
                    <td>{p.date}</td>
                    <td>{p.topic}</td>
                    <td>{p.by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Publications (19 Journals)</h3>
          <div className="tjs-pub-list">
            {PUBLICATIONS.map((p) => (
              <a href={p.link} target="_blank" rel="noopener" className="tjs-pub-card" key={p.title}>
                <div className="tjs-pub-icon">
                  <i className="ri-file-text-line"></i>
                </div>
                <div className="tjs-pub-content">
                  <h4 className="tjs-pub-title">
                    {p.title} <i className="ri-external-link-line"></i>
                  </h4>
                  <p className="tjs-pub-meta">
                    <strong>{p.by}</strong>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="seed-money" className="tjs-dept-section">
          <h2>Seed Money for Research</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="facilities" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Facilities &amp; Laboratories</h2>

          <h3>Department Library</h3>
          <div className="tjs-dept-media-row">
            <div className="tjs-dept-media-row-text">
              <p>
                The Department Library of the Department of Electrical and Electronics Engineering (EEE) serves as a
                valuable academic resource centre that supports teaching, learning, research, and professional
                development. The library provides access to a wide range of textbooks, reference books, journals, and
                learning resources related to Electrical and Electronics Engineering.
              </p>
              <p>
                The library is designed to enhance students&apos; technical knowledge, encourage self-learning, and
                support faculty members in their academic and research activities. It provides a conducive environment
                for reading, knowledge sharing, and continuous learning.
              </p>
              <p>
                The Department Library is committed to promoting academic excellence, encouraging lifelong learning,
                and supporting the overall growth of students and faculty members in the field of Electrical and
                Electronics Engineering.
              </p>
            </div>
            <div className="tjs-dept-media-row-img">
              <DeptPhotoSlider
                images={[
                  { src: "/assets/images/eee/image_106.jpeg", alt: "Students reading in the Department Library" },
                  { src: "/assets/images/eee/image_112.jpeg", alt: "Department Library book cabinets" },
                ]}
              />
            </div>
          </div>

          {LABS.map((lab) => (
            <div key={lab.name}>
              <h3>{lab.name}</h3>
              <div className="tjs-dept-media-row">
                <div className="tjs-dept-media-row-text">
                  {lab.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="tjs-dept-media-row-img">
                  <DeptPhotoSlider images={lab.imgs} />
                </div>
              </div>
            </div>
          ))}

          <h3>Innovative Teaching &amp; Learning Practices</h3>
          <ul className="tjs-dept-bullets">
            <li>Smart classroom – Interactive digital teaching using smart boards, projectors and multimedia.</li>
          </ul>
          <div className="tjs-dept-photo-grid">
            <img src="/assets/images/eee/image_94.jpeg" alt="Smart classroom session" className="tjs-dept-photo-real" />
          </div>
        </section>

        <section id="conferences" className="tjs-dept-section">
          <h2>Conference</h2>
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
        </section>

        <section id="fdp-workshop" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Guest Lecturer, FDP &amp; Workshop</h2>
          <EventSlider
            items={[
              {
                title: EVENTS_ORGANISED.title,
                date: "02-02-2026 to 07-02-2026",
                category: "FDP Organised",
                img: EVENTS_ORGANISED.imgs[0]?.src,
                imgs: EVENTS_ORGANISED.imgs.map((i) => i.src),
                desc:
                  EVENTS_ORGANISED.desc +
                  "\n\n" +
                  EVENTS_ORGANISED.days.map((d) => `${d.date}: ${d.topic} — ${d.speaker}`).join("\n\n"),
              },
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
        </section>

        <section id="value-added-course" className="tjs-dept-section">
          <h2>Value Added Course</h2>

          <div className="tjs-dept-media-row">
            <div className="tjs-dept-media-row-text">
              <h3>Embedded System with IoT</h3>
              <p>
                The Department of Electrical and Electronics Engineering (EEE) organized a Value Added Course on
                &ldquo;Embedded System with IoT&rdquo; in association with Pantech Solutions. The course was
                conducted to provide students with practical exposure to embedded systems and Internet of Things
                (IoT) technologies and to enhance their technical and application-oriented skills.
              </p>

              <div className="tjs-dept-card">
                <h3>Course Details</h3>
                <ul>
                  <li>
                    <strong>Department:</strong> Electrical and Electronics Engineering (EEE)
                  </li>
                  <li>
                    <strong>Course:</strong> Embedded System with IoT
                  </li>
                  <li>
                    <strong>Organized By:</strong> Department of Electrical and Electronics Engineering
                  </li>
                  <li>
                    <strong>In Association With:</strong> Pantech Solutions
                  </li>
                  <li>
                    <strong>Participants:</strong> II, III and IV Year EEE Students
                  </li>
                  <li>
                    <strong>Date:</strong> 21.09.2026 to 26.09.2026
                  </li>
                  <li>
                    <strong>Time:</strong> 9:00 AM to 3:15 PM
                  </li>
                  <li>
                    <strong>Speakers/Trainers:</strong>
                    <ul className="tjs-dept-person-list">
                      <li>Mr. S. Sathish</li>
                      <li>Mr. Y. Sandeep Kumar</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tjs-dept-media-row-img">
              <DeptPhotoSlider
                images={[
                  { src: "/assets/images/eee/Symposium1.jpg", alt: "Embedded System with IoT symposium" },
                  { src: "/assets/images/eee/Symposium2.jpg", alt: "Embedded System with IoT symposium" },
                ]}
              />
            </div>
          </div>
        </section>

        <section id="symposium" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Symposium</h2>
          <EventAccordion items={OTHER_DEPT_EVENTS} />
        </section>

        <section id="recruiters" className="tjs-dept-section">
          <h2>Major Recruiters</h2>
          <div className="tjs-dept-photo-grid">
            {RECRUITERS.map((r) => (
              <img key={r.name} src={r.logo} alt={r.name} title={r.name} className="tjs-dept-logo-real" />
            ))}
          </div>
        </section>

        <section id="faculty-achievements" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Faculty Achievements</h2>
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
        </section>

        <section id="co-curricular" className="tjs-dept-section">
          <h2>Co-Curricular</h2>
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
        </section>

        <section id="extra-curricular" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Extra-Curricular</h2>
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
        </section>

        <section id="internships" className="tjs-dept-section">
          <h2>Internship</h2>
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

          {INTERNSHIPS.filter((row) => row.imgs).map((row) => (
            <div className="tjs-dept-intern-photos" key={row.org}>
              <h4 className="tjs-dept-intern-org">{row.org}</h4>
              <div className="tjs-dept-event-imgs">
                {row.imgs.map((img) => (
                  <img key={img.src} src={img.src} alt={img.alt} className={img.wide ? "tjs-dept-event-img-wide" : ""} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section id="students-achievements" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Students Achievements</h2>
          <h3>Academic Toppers</h3>
          <PeopleCarousel items={TOPPERS} />
        </section>

        <section id="gallery" className="tjs-dept-section">
          <h2>Gallery</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="alumni" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Alumni Interactions</h2>
          <EventAccordion items={ALUMNI_INTERACTIONS} />
        </section>

        <section id="distinguished-alumni" className="tjs-dept-section">
          <h2>Distinguished Alumni</h2>
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
        </section>

        <section id="entrepreneurship" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Entrepreneurship</h2>
          <div className="tjs-dept-card">
            <h4 style={{ marginTop: 0, color: "var(--rs-theme-blue)" }}>Mr. Shyam Sundar (2021 Batch)</h4>
            <p style={{ marginBottom: 0 }}>
              Managing Director, Sri Vinayaka Auto Tech &amp; TVS Okinawa Auto Tech
              <br />
              GNT Road, Sullurupeta, Nellore – 524121
              <br />
              Phone: 9941024469
            </p>
          </div>
        </section>

        <section id="seminars" className="tjs-dept-section">
          <h2>Seminars &amp; Activities</h2>
          <EventAccordion items={SEMINARS_EVENTS} />
        </section>
      </div>
    </>
  );
}
