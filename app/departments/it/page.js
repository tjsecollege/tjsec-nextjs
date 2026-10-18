import DeptMegaNav from "../DeptMegaNav";
import EventSlider from "../EventSlider";
import YearGroupedVisits from "../YearGroupedVisits";
import LabAccordion from "../LabAccordion";

function img(file) {
  return "/assets/images/it/" + file;
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

function docUrl(file) {
  return "/assets/images/it/" + encodeURIComponent(file);
}

function regDocUrl(file) {
  return "/assets/images/Regulations-and-Curriculam/" + file.split("/").map(encodeURIComponent).join("/");
}

const REGULATION_DOCS = [
  { label: "IT 2026 Curriculum and Syllabus (UG)", href: docUrl("IT 2026 CURRICULUM AND SYLLABUS UG.docx") },
  { label: "IT 2026 Regulations (UG)", href: docUrl("IT 2026 REGULATIONS UG.docx") },
  { label: "IT 2025 Curriculum (UG)", href: regDocUrl("IT/curriculam/2025.pdf") },
  { label: "IT 2025 Regulations (UG)", href: regDocUrl("IT/Regulations/AU- REGULATIONS 2025.pdf") },
  { label: "IT 2021 Curriculum (UG)", href: regDocUrl("IT/curriculam/B.Tech.IT-2021.pdf") },
  { label: "IT 2021 Regulations (UG)", href: regDocUrl("IT/Regulations/UG Regulation 2021.pdf") },
];

function auImg(n) {
  return "/assets/images/Anna_University_Faculty_Images/image_" + n + "." + ([29, 31].includes(n) ? "png" : "jpeg");
}

const FACULTY = [
  { name: "Mrs. Agnes J", degree: "M.E.", designation: "Assistant Professor", auFin: "2614071984", aicteId: "1-11054732021", photo: auImg(7) },
  { name: "Mrs. Anu N", degree: "M.E.", designation: "Assistant Professor", auFin: "2649011996", aicteId: "1-10566026331", photo: auImg(8) },
  { name: "Mrs. Antony Juliet", degree: "Ph.D.", designation: "Assistant Professor", auFin: "2635751998", aicteId: "1-11516547061", photo: auImg(46) },
  { name: "Mr. Godwin Joseph Paul S", degree: "M.E.", designation: "Assistant Professor", auFin: "2683221987", aicteId: "1-2909950263", photo: auImg(29) },
  { name: "Mrs. Prianka M", degree: "M.E.", designation: "Assistant Professor", auFin: "2656581995", aicteId: "1-47692318315", photo: auImg(31) },
  { name: "Mrs. Vutchuru Vasantha", degree: "M.Tech.", designation: "Assistant Professor", auFin: "2675561989", aicteId: "1-3553424446", photo: auImg(9) },
];

const NON_TEACHING = [{ name: "V. Bharathi", designation: "IT Lab Instructor", photo: "/assets/images/it/V-BHARATHI.jpg" }];

const PEOS = [
  "Effectuating success in careers by exploring with the design, digital and computational analysis of engineering systems, experimentation and testing, smart manufacturing, technical services, and research.",
  "Amalgamating effectively with stakeholders to update and improve their core competencies and abilities to ethically compete in the ever-changing multicultural global enterprise.",
  "To encourage multi-disciplinary research and development to foster advanced technology, and to nurture innovation and entrepreneurship in order to compete successfully in the global economy.",
  "To globally share and apply technical knowledge to create new opportunities that proactively advances our society through team efforts and to solve various challenging technical, environmental and societal problems.",
  "To create world class engineers capable of practicing engineering ethically with a solid vision to become great leaders in academia, industries and society.",
];

const POS = [
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
];

const PSOS = [
  "To ensure graduates have proficiency in programming skills to design, develop and apply appropriate techniques, to solve complex engineering problems.",
  "Have knowledge to build, automate and manage business solutions using cutting edge technologies.",
  "Have excitement towards research in applied computer technologies.",
];

const LABS = [
  {
    name: "1. Computer Laboratory",
    label: "About the Laboratory",
    paragraphs: [
      "The Computer Laboratory of the Department of Information Technology is designed to provide students with hands-on experience in computer programming, software development, database management, networking, web technologies, and information systems.",
      "The laboratory supports practical learning in areas such as programming languages, data structures, database systems, web development, computer networks, operating systems, software engineering, and emerging information technologies. Through systematic laboratory exercises and projects, students develop essential skills in problem-solving, algorithm design, coding, system development, data management, and software testing.",
      "The laboratory bridges the gap between theoretical concepts and practical applications, enabling students to apply classroom knowledge to real-world computing problems.",
    ],
    imgs: [{ src: img("image_46.jpeg"), alt: "Computer Laboratory, Puduvoyal" }],
  },
  {
    name: "2. Communication Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The Communication Lab helps students strengthen their verbal, written, and interpersonal communication skills, which are essential for professional and technical environments.",
      "Students engage in listening, speaking, reading, and writing exercises using language lab software and multimedia tools to improve fluency, pronunciation, and workplace communication confidence.",
    ],
  },
  {
    name: "3. Skill Development Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The Skill Development Lab focuses on strengthening students' aptitude, logical reasoning, and employability skills required for placements and higher studies.",
      "It supports structured practice in quantitative aptitude, reasoning, verbal ability, and interview preparation, helping students build the competencies expected by recruiters and competitive examinations.",
    ],
  },
  {
    name: "4. Object Oriented Programming Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The Object Oriented Programming Lab enables students to design and implement solutions using object-oriented concepts such as classes, objects, inheritance, polymorphism, and encapsulation.",
      "Students gain hands-on experience in languages such as Java and C++, building a strong foundation for software design and application development.",
    ],
  },
  {
    name: "5. Full Stack Web Development Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The Full Stack Web Development Lab provides practical exposure to building complete web applications, covering front-end technologies, back-end frameworks, databases, and deployment.",
      "Students learn to design responsive user interfaces, develop server-side logic, and integrate databases to build end-to-end web solutions aligned with industry practices.",
    ],
  },
  {
    name: "6. Deep Learning and Vision Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The Deep Learning and Vision Lab introduces students to neural networks, deep learning architectures, and computer vision techniques used in modern AI applications.",
      "Students work with frameworks for image processing, object detection, and model training, developing the skills required for careers in artificial intelligence and machine learning.",
    ],
  },
  {
    name: "7. Computer Networks Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The Computer Networks Lab provides practical training in network design, configuration, protocols, and troubleshooting using networking tools and simulation software.",
      "Students gain hands-on experience with concepts such as IP addressing, routing, switching, and network security, preparing them for careers in networking and systems administration.",
    ],
  },
  {
    name: "8. Web Application Security Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The Web Application Security Lab focuses on identifying and addressing security vulnerabilities in web applications, including common threats such as SQL injection, cross-site scripting, and authentication flaws.",
      "Students learn secure coding practices, vulnerability assessment, and penetration testing fundamentals to build and maintain secure web systems.",
    ],
  },
  {
    name: "9. App Development Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The App Development Lab provides hands-on training in designing and building mobile applications for Android and cross-platform environments.",
      "Students learn UI/UX design principles, app architecture, and integration with back-end services to develop functional, user-friendly mobile applications.",
    ],
  },
  {
    name: "10. Embedded System and Internet of Things Lab",
    label: "About the Laboratory",
    paragraphs: [
      "The Embedded System and Internet of Things Lab enables students to design and build embedded systems and IoT solutions using microcontrollers, sensors, and communication modules.",
      "Students gain practical experience in interfacing hardware with software, data acquisition, and building connected smart devices for real-world applications.",
    ],
  },
];

const INDUSTRIAL_VISITS = [
  {
    date: "04-08-2025",
    title: "RETECH, Selvanagar, Kancheepuram & Old Perungalathur (III Year)",
    desc: "Industrial visit to RETECH, Selvanagar, Kadaperi West, Chennai, with additional stops at Kancheepuram and Old Perungalathur, organised jointly by the Department of CSE (AI&ML) and Department of Information Technology.",
    imgs: [
      { src: img("image_40.jpeg"), alt: "Industrial Visit to RETECH, Selvanagar, Kadaperi West" },
      { src: img("image_41.jpeg"), alt: "Students at Kancheepuram during the Industrial Visit" },
      { src: img("image_42.jpeg"), alt: "Students at Old Perungalathur during the Industrial Visit" },
    ],
  },
  {
    date: "02-09-2025",
    title: "TANSAM, Tidel Park (AI&ML and IT)",
    desc: "The students of the IT and AI-ML departments went on an Industrial Visit to TANSAM, Tidel Park on 3rd February, coordinated by Mr. Natesh. Students learnt about the usage of Virtual Reality & Augmented Reality, the technical skills required to expertise in IoT, and the importance of AI in day-to-day life such as traffic control and AI integration, along with ML certifications and career opportunities.",
    imgs: [{ src: img("image_43.jpeg"), alt: "Industrial Visit to TANSAM, Tidel Park" }],
  },
  {
    date: "25-10-2025",
    title: "Lohmanradhri Towers, Egmore, Chennai",
    desc: "Industrial visit to Lohmanradhri Towers, 43 Pantheon Road, Egmore, Chennai, by the Department of Information Technology, including a session on “Cybersecurity: The Skills, Tools, and Career.”",
    imgs: [
      { src: img("image_32.jpeg"), alt: "Industrial Visit to Lohmanradhri Towers, Egmore" },
      { src: img("image_33.jpeg"), alt: "Session at Lohmanradhri Towers, Egmore" },
      { src: img("image_34.jpeg"), alt: "Cybersecurity session at Lohmanradhri Towers, Egmore" },
    ],
  },
  {
    date: "20-02-2026",
    title: "DIGIAURA VFX Academy, Guindy (AI&ML and IT)",
    desc: "Industrial visit to DigiAura, Guindy Industrial Estate, Chennai, by the Department of IT and AI-ML. Resource person explained the usage of VFX in Media and Cinema, the technical skills required for animation, and the importance of VFX in international films, along with certification and career opportunities.",
    imgs: [
      { src: img("image_44.jpeg"), alt: "DigiAura VFX Academy office, Guindy" },
      { src: img("image_36.jpeg"), alt: "Session at DigiAura VFX Academy" },
      { src: img("image_37.jpeg"), alt: "Students attending the DigiAura VFX Academy session" },
      { src: img("image_38.jpeg"), alt: "Group photo at DigiAura VFX Academy" },
    ],
  },
  {
    date: "21-08-2026",
    title: "SoftLogic Academy, Navalur",
    desc: "Industrial visit to SoftLogic Academy, Navalur, Chennai, by the Department of AI&ML and IT.",
    imgs: [{ src: img("image_35.jpeg"), alt: "Industrial Visit to SoftLogic Academy, Navalur" }],
  },
  {
    date: "23-07-2026",
    title: "DigiAura VFX Academy Pvt Ltd (II Year)",
    desc: "Industrial visit by the Department of Information Technology, Guindy Industrial Estate, Chennai.",
    imgs: [
      { src: img("image_39.jpeg"), alt: "Students departing for DigiAura VFX Academy visit" },
      { src: img("image_45.jpeg"), alt: "Students arriving at DigiAura VFX Academy" },
      { src: img("image_52.jpeg"), alt: "Session at DigiAura VFX Academy" },
    ],
  },
];

const FDP_WORKSHOP_ITEMS = [
  {
    date: "23-09-2025",
    title: "Computer Laboratory Workshop, Puduvoyal",
    category: "Workshop",
    desc: "Students of the Department of Information Technology participated in a workshop held at the Main Building computer laboratory, Puduvoyal.",
    imgs: [
      { src: img("image_55.jpeg"), alt: "Workshop session in the computer laboratory, Puduvoyal" },
      { src: img("image_58.jpeg"), alt: "Workshop session, Puduvoyal" },
    ],
  },
  {
    date: "07-03-2026",
    title: "Understanding AI-ML & Career in AI-ML",
    category: "Guest Lecture",
    desc: "We are delighted to share that the Department of IT & AI-ML organized a Guest Lecture on “Understanding AI-ML & Career in AI-ML” on 7th March 2026 at the Seminar Hall.\n\nWe extend our sincere gratitude to the Management and the Principal for their constant support and encouragement in organizing such enriching academic events. A special thanks to Mrs. Divya A, Senior Software Engineer, Tekion India Pvt. Ltd., Chennai, for delivering an insightful and engaging session.\n\nThrough her lecture, students gained a clear understanding of the fundamentals of Artificial Intelligence and Machine Learning, along with practical insights into real-world applications. She elaborated on key concepts in AI-ML, industry expectations, and the essential technical and soft skills required to build a successful career in this domain. She also shared valuable knowledge about current industry trends, career opportunities, and the future scope of AI-driven technologies.\n\nThe session was highly informative and interactive, inspiring students to explore the vast potential of AI and ML. It encouraged them to enhance their skills and prepare themselves for emerging opportunities in the field of intelligent systems.",
    imgs: [{ src: "/assets/images/it/events/image_5.jpeg", alt: "Guest Lecture on Understanding AI-ML & Career in AI-ML" }],
  },
  {
    date: "09-03-2026",
    title: "AI & ML in Real-World Situations, and Python Essentials",
    category: "Workshop",
    desc: "It's our pleasure to express that students of IT and AI-ML departments participated enthusiastically in the workshop on 9th March 2026.\n\nWe would like to extend our gratitude to our management and principal of T.J.S. Engg College for supporting us. And a sincere thanks to Mr. Nirmal S and Mr. Dinesh for taking such an interactive and informative session. Through him students learnt about the usage of “AI&ML, and the usage of AI” in the real-world situations & about the importance of Python, and they explained briefly about the python libraries like NumPy, Pandas, Matplotlib, and also explained about how to create a chatbot like ChatGPT and ML & DL concepts and the career opportunities in this field.\n\nThe session was eye-opening to our students; this workshop truly opened a door for students to think of AI as a career choice & prompt engineering. Students expect more such beneficial workshops in future.",
    imgs: [{ src: img("image_59.jpeg"), alt: "Workshop on AI & ML in Real-World Situations and Python Essentials" }],
  },
  {
    date: "10-03-2026",
    title: "Importance of Algorithms in Data Preprocessing",
    category: "Workshop",
    desc: "We are delighted to share that the students of the IT and AI-ML departments attended an insightful workshop on 10th March 2026.\n\nWe extend our sincere gratitude to the management and the Principal of T.J.S. Engineering College for providing us with this valuable opportunity. And a sincere thanks to Dr. B. Ezhilavan & Mr. Nirmal for taking such an interactive and informative session. Through him students learnt about the importance of Algorithms and their major role in data preprocessing, and explained about various algorithms – KNN, K-means, A* Algorithm – and he explained about sensors, and they also explained about a major project “text to voice converter” and “voice to text converter”.\n\nThe CEO introduced an internship offer to the students by submitting a report; by this workshop our students learnt more about the usage and execution of AI tools. Thanks for organizing such an inspirational workshop. Students look forward to gaining internship experience in your prestigious organization.",
    imgs: [
      { src: "/assets/images/it/events/image_3.jpeg", alt: "Workshop on Importance of Algorithms in Data Preprocessing" },
      { src: "/assets/images/it/events/image_7.jpeg", alt: "Group photo at the close of the Algorithms workshop" },
    ],
  },
];

const FACULTY_ACHIEVEMENTS = [
  {
    date: "25-02-2026",
    title: "J. Agnes – Wipro TalentNext Certification (Data Science with Python)",
    desc: "Ms. J. Agnes cleared the TalentNext certification assessment and is recognized as a mentor for project-based learning (PBL) in Data Science with Python under the Wipro Digital Skills Readiness Program.",
    imgs: [{ src: img("image_54.jpeg"), alt: "Wipro TalentNext certificate – J Agnes" }],
  },
  {
    date: "29-05-2026",
    title: "N. Anu – Wipro TalentNext Certification (Data Science with Python)",
    desc: "Ms. N. Anu cleared the TalentNext certification assessment and is recognized as a mentor for project-based learning (PBL) in Data Science with Python under the Wipro Digital Skills Readiness Program.",
    imgs: [{ src: img("image_60.png"), alt: "Wipro TalentNext certificate – Anu N" }],
  },
  {
    date: "02-01-2026",
    title: "Godwin Joseph Paul S – Microsoft Certified: Azure Administrator Associate",
    desc: "Mr. Godwin Joseph Paul S earned the Microsoft Certified: Azure Administrator Associate certification (Credential ID 82DAF8AE54537385, Certification Number 4F606B-FCNDC0), valid till 3rd January 2027.",
    imgs: [{ src: "/assets/images/it/Joseph_Paul_S.jpg", alt: "Microsoft Certified: Azure Administrator Associate – Godwin Joseph Paul S" }],
  },
  {
    date: "Jan – Apr 2026",
    title: "NPTEL Certification – Object Oriented System Development Using UML, Java and Patterns",
    desc: "Dr. R. Antony Juliet completed the NPTEL course “Object Oriented System Development Using UML, Java and Patterns” (IIT Kharagpur, 12-week course) with a consolidated score of 55%.",
    imgs: [
      { src: img("image_47.jpeg"), alt: "NPTEL certificate – R Antony Juliet" },
      { src: img("image_48.jpeg"), alt: "NPTEL-AICTE FDP certificate – R Antony Juliet" },
    ],
  },
];

const SYMPOSIUM_EVENTS = [
  {
    date: "17-09-2026",
    title: "Technical Symposium – “CRYPTON”",
    desc: "The Department of Information Technology and Artificial Intelligence & Machine Learning, T.J.S. Engineering College, successfully organized a National-Level Technical Symposium – “CRYPTON”, providing students with an exciting platform to showcase their technical knowledge, creativity, problem-solving abilities, and innovative ideas.\n\nTECHNICAL EVENTS\n1. Paper Presentation\n2. Web Forge\n3. Prompt War\n4. Tech Speech\n5. Code Quest\n\nNON-TECHNICAL EVENTS\n1. Treasure Hunt\n2. Free Fire\n3. Movie & Song Prediction\n4. Lyric Crush\n\nThe symposium witnessed enthusiastic participation from students and provided opportunities to explore emerging technologies, develop technical skills, and engage in healthy competition. The various events encouraged participants to demonstrate their expertise in Artificial Intelligence, Machine Learning, Information Technology, coding, web development, communication, and creative thinking.\n\nThe event was conducted with the support and guidance of the faculty members and student coordinators, making it a memorable and enriching experience for all participants.",
    imgs: [
      { src: "/assets/images/it/events/image_2.jpeg", alt: "Inauguration of the CRYPTON Technical Symposium" },
      { src: img("image_4.jpeg"), alt: "Prompt War event at CRYPTON" },
      { src: img("image_17.jpeg"), alt: "Paper Presentation event at CRYPTON" },
      { src: img("image_5.jpeg"), alt: "Technical event at CRYPTON" },
      { src: img("image_1.jpeg"), alt: "Tech Speech event at CRYPTON" },
    ],
  },
];

const SEMINARS_EVENTS = [
  {
    date: "23-02-2026",
    title: "Driverless Future – Deep Learning’s Path To Autonomous Mobility",
    desc: "We are overjoyed to share that our students of the IT and AI-ML departments attended a seminar on “Driverless Future: Deep Learning's Path To Autonomous Mobility” on 23rd February 2026.\n\nWe would like to extend our heartfelt gratitude to the Management and the Principal of T.J.S. Engineering College for their continuous support and encouragement in organizing such insightful academic events. A special thanks to Dr. S. Menaka for delivering an engaging and highly informative session. Through her seminar, students gained valuable insights into the role of Deep Learning in autonomous mobility and the future of driverless technology.\n\nShe elaborated on the core concepts behind self-driving vehicles, the importance of artificial intelligence in transportation, and the technical skills required to excel in this rapidly evolving field. She also highlighted emerging career opportunities and industry trends related to autonomous systems.\n\nThe session was truly eye-opening and inspired students to explore the vast possibilities in AI-driven mobility solutions and encouraged them to consider careers in autonomous technology and deep learning.",
    imgs: [{ src: "/assets/images/it/events/image_6.jpeg", alt: "Seminar on Driverless Future: Deep Learning's Path To Autonomous Mobility" }],
  },
  {
    date: "24-08-2026",
    title: "Inauguration of Nexora & Zorvix",
    desc: "It’s our pleasure to express that the students of the Department of AI&ML and IT participated enthusiastically in the inauguration of Nexora & Zorvix. The event was organized with the aim of encouraging students to explore their technical skills, creativity, innovation, and interest in emerging technologies.\n\nWe would like to extend our gratitude to our management and principal of T.J.S. Engineering College for their valuable support and encouragement in organizing this event. We also sincerely thank the faculty members and coordinators for their efforts in making the inauguration a successful and memorable occasion.\n\nThe inauguration session provided an excellent platform for students to understand the importance of innovation, technology, teamwork, and professional development. The event motivated students to actively participate in technical activities and encouraged them to develop their skills through practical learning and collaborative experiences.\n\nThe occasion was truly an inspiring experience for our students. The inauguration of Nexora & Zorvix opened new opportunities for students to showcase their talents, explore their interests, and enhance their technical knowledge. We look forward to organizing more such beneficial and innovative activities in the future.",
    imgs: [{ src: "/assets/images/it/events/image_1.png", alt: "Inauguration of Nexora & Zorvix" }],
  },
];

const STUDENTS_ACHIEVEMENTS = [
  {
    date: "September 2026",
    title: "Gold Medal, Silambam (Above 75 kg)",
    desc: "Our student, Mr. M. Gandhidhasan (B.Tech – IT), won the Gold Medal in Silambam (above 75 kg category) at the district-level competition in Thiruvallur for the “Chief Minister’s Trophy” in September 2026.",
    imgs: [{ src: img("image_50.png"), alt: "Mr. M. Gandhidhasan receiving the Silambam Gold Medal" }],
  },
];

const SIH_TEAMS = [
  {
    category: "Hackathon",
    team: "FIVEFORGE",
    members: "Harini M (Team Leader), Salini M, Kavitha R, Vignesh D, K Darshan, Balamurugan M",
    topic: "CivicSolve – AI-Powered Social Impact Platform",
    desc: "Team FIVEFORGE developed an AI-powered digital platform that connects citizens, students, universities, industries, NGOs, and government to collaboratively address real-world societal problems.\n\nThe platform uses AI to classify, prioritize, detect duplicate issues, and match problems with suitable student teams and industry partners, while enabling project tracking and impact analytics.",
    imgs: [{ src: img("image_18.jpeg"), alt: "Team FIVEFORGE at Smart India Hackathon" }],
  },
  {
    category: "Hackathon",
    team: "PrediX",
    members: "Laxmi Priya Mallick (Team Leader), Harini P, Sakthi K, Praveena Sri S, Anisha S A, Ragapreethi S",
    topic: "Predictive Analytics Framework for Cybercrime Complaints",
    desc: "Team PrediX developed a Predictive Analytics Framework for Cybercrime Complaints to forecast likely cash withdrawal locations in advance, enabling generation of actionable intelligence for timely and proactive cybercrime intervention.",
    imgs: [{ src: img("image_10.jpeg"), alt: "Team PrediX at Smart India Hackathon 2026" }],
  },
  {
    category: "Hackathon",
    team: "Tarot Club",
    members: "Shane Martin J (Team Leader), Rishikesh NK, Praveen P, Madesh J, Manisha G, Keerthana B",
    topic: "SatQuery AI – An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries",
    desc: "Team Tarot Club, under the theme Space Technology, developed SatQuery AI, an interactive vision-language assistant for multimodal remote sensing image analysis through text queries.",
    imgs: [{ src: img("image_12.jpeg"), alt: "Team Tarot Club at Smart India Hackathon 2026" }],
  },
];

const INTERNSHIPS = [
  {
    org: "Hyperlynx Infotech, Chennai",
    date: "08-06-2026 to 22-06-2026",
    who: "Applied Data Science Interns: K. Gurujaganath (Student Performance Analysis System), Sowbarniga T (Library Management System), Keerthana R (Car Sales Analysis), K Gill Christ (Employee Salary Prediction)",
  },
  {
    org: "Hatak R Non-Lethal Security Solutions (AWS Cloud Computing, via SSB Training & Placements)",
    date: "10-06-2026 to 10-07-2026",
    who: "Charulatha R",
  },
  {
    org: "Wiztech Automation Solutions, Anna Nagar",
    date: "04-06-2026 to 04-07-2026",
    who: "Rudhramoorthy N (Data Analytics)",
  },
];

const RECRUITERS = [
  { name: "TCS", logo: img("image_13.png") },
  { name: "Infosys", logo: img("image_14.png") },
  { name: "Wipro", logo: img("image_15.jpeg") },
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

export default function ITDepartment() {
  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">Department</span>
          <h1>Information Technology</h1>
          <p>
            Established in the academic year 2024-2028 with an initial intake of 60 students, the Department of
            Information Technology offers a four-year B.Tech degree programme focused on practical learning,
            industry exposure and innovation-driven education.
          </p>
        </div>
        <div className="tjs-dept-hero-image">
          <img src="/assets/images/campus/computer-lab-01.jpg" alt="Information Technology laboratory at T.J.S Engineering College" />
        </div>
      </section>

      <div className="tjs-dept-page">
        <DeptMegaNav categories={MENU} />

        <section id="about" className="tjs-dept-section">
          <h2>About us</h2>
          <p>
            The Department of Information Technology was established in the academic year 2024–2028 with an
            initial intake of 60 students. The department offers a four-year B.Tech degree program in Information
            Technology.
          </p>
          <p>
            The department is committed to delivering quality technical education in the field of Information
            Technology. It focuses on developing technically competent, ethically strong, and socially responsible
            professionals who are capable of meeting the challenges of the rapidly evolving IT industry.
          </p>
          <p>
            The mission of the Department of Information Technology is to provide value-based education, enhance
            employability skills, encourage innovation, and nurture entrepreneurial abilities among students
            through effective teaching-learning methodologies. The department continuously upgrades its curriculum
            and infrastructure to align with global industry standards.
          </p>

          <h3>Why IT?</h3>
          <p>
            The Department of Information Technology emphasizes practical learning, industry exposure, and
            innovation-driven education. IT plays a vital role in every sector including healthcare, banking,
            education, e-commerce, cybersecurity, and artificial intelligence.
          </p>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Career Prospects</h3>
              <ul>
                <li>Excellent job opportunities in IT companies and multinational corporations.</li>
                <li>High demand for IT professionals globally.</li>
                <li>Opportunities in software development, cybersecurity, data science, cloud computing, and networking.</li>
                <li>Scope for research and higher studies in India and abroad.</li>
              </ul>
            </div>
            <div className="tjs-dept-card">
              <h3>Scope for Innovation</h3>
              <ul>
                <li>Artificial Intelligence</li>
                <li>Machine Learning</li>
                <li>Data Analytics</li>
                <li>Internet of Things (IoT)</li>
                <li>Blockchain</li>
                <li>Cloud Computing</li>
              </ul>
            </div>
          </div>
          <p>
            <strong>Consistent Growth:</strong> Information Technology is one of the fastest-growing sectors
            worldwide, with the demand for skilled IT professionals continuing to increase every year.
            <br />
            <strong>Global Opportunities:</strong> IT graduates can work in multinational companies across the
            globe, building successful international careers.
          </p>

          <h3>Centre of Excellence &amp; Value Added Programmes</h3>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3 style={{ marginTop: 0 }}>Centre of Excellence</h3>
              <p style={{ marginBottom: 0 }}>HCL</p>
            </div>
            <div className="tjs-dept-card">
              <h3 style={{ marginTop: 0 }}>Value Added Programmes</h3>
              <ul style={{ marginBottom: 0 }}>
                <li>Artificial Intelligence and Machine Learning</li>
                <li>Cyber Security</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision and Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p style={{ marginBottom: 0 }}>
                To achieve global recognition through research, innovation, and excellence in quality education,
                empowering Information Technology students to become competent professionals and solution
                providers for modern societal and technological challenges.
              </p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <ul style={{ marginBottom: 0 }}>
                <li>To provide quality education that builds strong technical and analytical skills in students.</li>
                <li>To encourage innovation, creativity, and continuous learning for solving real-world IT challenges.</li>
                <li>To shape students into responsible, ethical, and globally competent IT Professionals.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="hod" className="tjs-dept-section">
          <h2>HOD&apos;s Desk</h2>
          <div className="tjs-dept-hod">
            <div className="tjs-dept-hod-photo" aria-hidden="true">
              Photo
            </div>
            <div className="tjs-dept-hod-message">
              <h3>Welcome to the Department of Information Technology</h3>
              <p>
                It is my great pleasure to welcome you to the Department of Information Technology at T.J.S.
                Engineering College.
              </p>
              <p>
                Information Technology has become an essential part of modern life, transforming the way we
                communicate, learn, work, conduct business, and solve real-world challenges. With the rapid growth
                of Artificial Intelligence, Machine Learning, Data Analytics, Cloud Computing, Cybersecurity, Web
                Technologies, Mobile Applications, Internet of Things, and Digital Transformation, the IT field
                continues to create exciting opportunities for innovation and professional growth.
              </p>
              <p>
                At the Department of Information Technology, we are dedicated to creating a student-centric,
                innovative, and industry-oriented learning environment. Our goal is to equip students with strong
                technical foundations, problem-solving abilities, and practical knowledge that enable them to adapt
                confidently to the constantly changing technological landscape.
              </p>
              <p>
                Our committed faculty members provide continuous guidance and mentorship to help students achieve
                their academic and career aspirations. Through practical laboratory sessions, coding practices,
                technical workshops, seminars, internships, industrial visits, project-based learning, hackathons,
                expert lectures, and skill-development activities, students are given opportunities to apply their
                knowledge and develop solutions to real-world problems.
              </p>
              <p>
                We believe that technology education should go beyond textbooks and examinations. Students are
                encouraged to develop logical thinking, creativity, communication skills, teamwork, leadership
                qualities, ethical awareness, and a spirit of innovation.
              </p>
              <p>
                The department continuously encourages students to explore emerging technologies, participate in
                technical competitions, undertake innovative projects, pursue research, and develop entrepreneurial
                skills.
              </p>
              <p className="tjs-dept-hod-quote">
                &ldquo;Our commitment is to nurture a generation of skilled, innovative, adaptable, and socially
                responsible IT professionals who are ready to meet the challenges of the digital era. Learn. Create.
                Innovate. Transform.&rdquo;
              </p>
              <p className="tjs-dept-hod-sign">
                Dr. C. Shalini
                <br />
                Head of the Department, Department of Information Technology
              </p>
            </div>
          </div>
        </section>

        <section id="magazine" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Magazine</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="faculty" className="tjs-dept-section">
          <h2>Faculty</h2>
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
        </section>

        <section id="staff" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Non-Teaching</h2>
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
        </section>

        <section id="programmes" className="tjs-dept-section">
          <h2>Programme Offered</h2>
          <div className="tjs-dept-tabs">
            <button type="button" className="tjs-dept-tab active">B.Tech – Information Technology</button>
          </div>

          <h3>Program Educational Objectives (PEOs)</h3>
          <div className="tjs-dept-peo-list">
            {PEOS.map((peo, i) => (
              <div className="tjs-dept-peo" key={i}><p>PEO{i + 1}. {peo}</p></div>
            ))}
          </div>

          <h3>Program Outcomes (POs)</h3>
          <div className="tjs-dept-peo-list">
            {POS.map((po) => (
              <div className="tjs-dept-peo" key={po.title}>
                <h4>{po.title}</h4>
                <p>{po.text}</p>
              </div>
            ))}
          </div>

          <h3>Program Specific Outcomes (PSOs)</h3>
          <div className="tjs-dept-peo-list">
            {PSOS.map((pso, i) => (
              <div className="tjs-dept-peo" key={i}><p>PSO{i + 1}. {pso}</p></div>
            ))}
          </div>
        </section>

        <section id="bos" className="tjs-dept-section tjs-dept-section-alt">
          <h2>BOS</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="curriculum" className="tjs-dept-section">
          <h2>Regulation &amp; Curriculum</h2>
          <LinkList items={REGULATION_DOCS} />
        </section>

        <section id="mou" className="tjs-dept-section tjs-dept-section-alt">
          <h2>MOU&apos;s</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="consultancy" className="tjs-dept-section">
          <h2>Area of Consultancy</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="industry-visits" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Industry Visits</h2>
          <YearGroupedVisits items={INDUSTRIAL_VISITS} title="Industry Visits" />
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
        </section>

        <section id="publication" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Publication</h2>

          <div className="tjs-pub-list">
            {[
              {
                title: "Advanced hybrid attention-based deep learning network with heuristic algorithm for adaptive CT and PET image fusion in lung cancer detection",
                by: "Shalini Chowdary",
                year: "2024",
                journal: "Medical Engineering & Physics",
                impactFactor: "2.5",
                citations: "52",
                link: "https://scholar.google.com/scholar?oi=bibs&cluster=18051348610961890072&btnI=1&hl=en",
              },
              {
                title: "An Improved Archimedes Optimization-aided Multi-scale Deep Learning Segmentation with dilated ensemble CNN classification for detecting lung cancer using CT images",
                by: "Shalini Chowdary",
                year: "2025",
                journal: "Network: Computation in Neural Systems",
                impactFactor: "7.5",
                citations: "5*",
                link: "https://scholar.google.com/scholar?oi=bibs&cluster=7814968460803286478&btnI=1&hl=en",
              },
              {
                title: "Exploitation of Spectrum White Spaces by Using Energy Based Primary Transmitter Detection Approach for Cognitive Radio Networks",
                by: "Shalini Chowdary",
                year: "2025",
                journal: "Power Energy and Secure Smart Technologies",
                impactFactor: null,
                citations: null,
                link: "https://scholar.google.com/scholar?oi=bibs&cluster=1278709396236894687&btnI=1&hl=en",
              },
            ].map((p) => (
              <a href={p.link} target="_blank" rel="noopener" className="tjs-pub-card" key={p.title}>
                <div className="tjs-pub-icon">
                  <i className="ri-file-text-line"></i>
                </div>
                <div className="tjs-pub-content">
                  <h4 className="tjs-pub-title">
                    {p.title} <i className="ri-external-link-line"></i>
                  </h4>
                  <p className="tjs-pub-meta">
                    <strong>{p.by}</strong> &middot; {p.journal}, {p.year}
                  </p>
                  {(p.impactFactor || p.citations) && (
                    <div className="tjs-pub-badges">
                      {p.impactFactor && <span className="tjs-pub-badge">Impact Factor {p.impactFactor}</span>}
                      {p.citations && <span className="tjs-pub-badge tjs-pub-badge-alt">Citation {p.citations}</span>}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
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
          <LabAccordion items={LABS} />

          <h3>Department Library</h3>
          <div className="tjs-dept-media-row">
            <div className="tjs-dept-media-row-text">
              <ul className="tjs-dept-bullets">
                <li>
                  The Department of Information Technology has a dedicated library facility with a wide collection
                  of textbooks, reference books, and technical resources.
                </li>
                <li>It supports students in strengthening their academic knowledge and technical skills.</li>
                <li>
                  The library provides resources covering programming, networking, databases, artificial
                  intelligence, and emerging technologies.
                </li>
                <li>
                  Students can utilize these resources for assignments, projects, examinations, and research
                  activities.
                </li>
                <li>
                  It promotes a culture of self-learning, continuous knowledge development, and academic
                  excellence.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="conferences" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Conference</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="fdp-workshop" className="tjs-dept-section">
          <h2>Guest Lecturer, FDP &amp; Workshop</h2>
          <EventSlider
            items={FDP_WORKSHOP_ITEMS.map((e) => ({
              title: e.title,
              date: e.date,
              category: e.category,
              img: e.imgs?.[0]?.src,
              imgs: e.imgs?.map((i) => i.src),
              desc: e.desc,
            }))}
          />
        </section>

        <section id="value-added-course" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Value Added Course</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="symposium" className="tjs-dept-section">
          <h2>Symposium</h2>
          <YearGroupedVisits items={SYMPOSIUM_EVENTS} title="Symposium" />
        </section>

        <section id="seminars" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Seminars &amp; Activities</h2>
          <YearGroupedVisits items={SEMINARS_EVENTS} title="Seminars & Activities" />
        </section>

        <section id="recruiters" className="tjs-dept-section">
          <h2>Major Recruiters</h2>
          <div className="tjs-dept-photo-grid">
            {RECRUITERS.map((r) => (
              <img key={r.name} src={r.logo} alt={r.name} title={r.name} className="tjs-dept-logo-real" />
            ))}
          </div>
        </section>

        <section id="placed-students" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Placed Students</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="faculty-achievements" className="tjs-dept-section">
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

        <section id="students-achievements" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Students Achievements</h2>
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
        </section>

        <section id="co-curricular" className="tjs-dept-section">
          <h2>Co-Curricular</h2>
          <EventSlider
            items={SIH_TEAMS.map((t) => ({
              title: t.team + " – " + t.topic,
              img: t.imgs?.[0]?.src,
              imgs: t.imgs?.map((i) => i.src),
              date: null,
              category: t.category,
              person: t.members,
              desc: t.desc,
            }))}
          />
        </section>

        <section id="extra-curricular" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Extra-Curricular</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="gallery" className="tjs-dept-section">
          <h2>Gallery</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="alumni" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Alumni Interactions</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="distinguished-alumni" className="tjs-dept-section">
          <h2>Distinguished Alumni</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="entrepreneurship" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Entrepreneurship</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>
      </div>
    </>
  );
}
