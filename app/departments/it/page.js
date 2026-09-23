"use client";

import { useEffect, useRef, useState } from "react";

const FACULTY = [
  { name: "J. Agnes", qual: "B.Tech (IT), M.E (CSE), (Ph.D)", role: "Assistant Professor", email: "agnes.pravin@gmail.com" },
  { name: "N. Anu", qual: "B.Tech (IT), M.E (CSE)", role: "Assistant Professor", email: "anusimon1111@gmail.com" },
  { name: "R. Antony Juliet", qual: "B.Tech (IT), M.E (CSE), (Ph.D)", role: "Assistant Professor", email: "antonyjuliet2021@gmail.com" },
];

const PEOS = [
  "Effectuating success in careers by exploring with the design, digital and computational analysis of engineering systems, experimentation and testing, smart manufacturing, technical services, and research.",
  "Amalgamating effectively with stakeholders to update and improve their core competencies and abilities to ethically compete in the ever-changing multicultural global enterprise.",
  "To encourage multi-disciplinary research and development to foster advanced technology, and to nurture innovation and entrepreneurship in order to compete successfully in the global economy.",
  "To globally share and apply technical knowledge to create new opportunities that proactively advances our society through team efforts and to solve various challenging technical, environmental and societal problems.",
  "To create world class engineers capable of practicing engineering ethically with a solid vision to become great leaders in academia, industries and society.",
];

const POS = [
  { title: "1. Engineering Knowledge", text: "Apply math, science, and engineering fundamentals to complex problems." },
  { title: "2. Problem Analysis", text: "Identify and analyze complex problems using research and sustainability principles." },
  { title: "3. Design Solutions", text: "Design systems and processes considering health, safety, cost, culture, and environment." },
  { title: "4. Investigations", text: "Use experiments, modelling, and data analysis to reach valid conclusions." },
  { title: "5. Engineering Tools", text: "Apply modern tools for modelling and problem-solving, recognizing their limits." },
  { title: "6. Society & Environment", text: "Assess societal, legal, and environmental impacts of engineering solutions." },
  { title: "7. Ethics", text: "Commit to ethics, human values, diversity, and legal compliance." },
  { title: "8. Teamwork", text: "Work effectively as an individual and in multidisciplinary teams." },
  { title: "9. Communication", text: "Communicate clearly in reports, presentations, and documentation across diverse groups." },
  { title: "10. Management & Finance", text: "Apply management and economic principles in projects and teamwork." },
  { title: "11. Lifelong Learning", text: "Engage in continuous learning, adapt to new technologies, and think critically." },
];

const PSOS = [
  "To ensure graduates have proficiency in programming skills to design, develop and apply appropriate techniques, to solve complex engineering problems.",
  "Have knowledge to build, automate and manage business solutions using cutting edge technologies.",
  "Have excitement towards research in applied computer technologies.",
];

const SEMESTERS = [
  {
    id: "I",
    total: "27 / 20",
    rows: [
      ["1", "26EN101", "Professional English", "T", "2-0-0", "2", "HS"],
      ["2", "26TA101", "Heritage of Tamils", "T", "1-0-0", "1", "HS"],
      ["3", "26MA101", "Matrices and Calculus", "T", "3-1-0", "4", "BS"],
      ["4", "26PH201", "Engineering Physics", "LIT", "2-0-2", "3", "BS"],
      ["5", "26CY201", "Engineering Chemistry", "LIT", "2-0-2", "3", "BS"],
      ["6", "26CS201", "Fundamentals of Programming in C", "LIT", "3-0-2", "4", "ES"],
      ["7", "26EN301", "Life Skills for Engineers", "L", "0-0-2", "1", "HS"],
      ["8", "26ME301", "Makerspace", "L", "0-0-4", "2", "ES"],
      ["9", "–", "Physical Education-I", "–", "0-0-1", "–", "–"],
      ["10", "–", "NCC/NSS/NSO/YRC", "–", "–", "–", "–"],
    ],
  },
  {
    id: "II",
    total: "28 / 22",
    rows: [
      ["1", "26TA102", "Tamils and Technology", "T", "1-0-0", "1", "HS"],
      ["2", "26MA102", "Transforms and its Applications", "T", "3-1-0", "4", "BS"],
      ["3", "26PH104", "Physics for Information Science", "T", "3-0-0", "3", "BS"],
      ["4", "26EE201", "Basic Electrical and Electronics Engineering", "LIT", "3-0-2", "4", "ES"],
      ["5", "26CS202", "Problem Solving using Python Programming", "LIT", "3-0-2", "4", "ES"],
      ["6", "26EC202", "Digital Logic Design", "LIT", "3-0-2", "4", "ES"],
      ["7", "26EN302", "English Essentials", "L", "0-0-2", "1", "HS"],
      ["8", "26SD301", "Employability Enhancement Skills-I", "L", "0-0-2", "1", "EE"],
      ["9", "–", "Physical Education-II", "–", "0-0-1", "–", "–"],
    ],
  },
  {
    id: "III",
    total: "31 / 25",
    rows: [
      ["1", "26MA104", "Discrete Mathematics", "T", "3-1-0", "4", "BS"],
      ["2", "26IT101", "Computer Architecture and Organisation", "T", "3-0-0", "3", "PC"],
      ["3", "26CS204", "Operating Systems", "LIT", "3-0-2", "4", "PC"],
      ["4", "26CS205", "Object Oriented Programming", "LIT", "3-0-2", "4", "PC"],
      ["5", "26CS206", "Data Structures and Algorithms", "LIT", "3-0-2", "4", "PC"],
      ["6", "26AL202", "Artificial Intelligence and Machine Learning", "LIT", "3-0-2", "4", "PC"],
      ["7", "26EN303", "English Communication Skills Laboratory-I", "L", "0-0-2", "1", "HS"],
      ["8", "26SD302", "Employability Enhancement Skills-II", "L", "0-0-2", "1", "EE"],
    ],
  },
  {
    id: "IV",
    total: "32 / 25",
    rows: [
      ["1", "26MA106", "Probability and Statistics", "T", "3-1-0", "4", "BS"],
      ["2", "26IT201", "Automata and Compiler Design", "LIT", "3-0-2", "4", "PC"],
      ["3", "26IT204", "Computer Networks", "LIT", "3-0-2", "4", "PC"],
      ["4", "26AD201", "Fundamentals of Data Science", "LIT", "3-0-2", "4", "PC"],
      ["5", "26CS209", "Java Programming", "LIT", "3-0-2", "4", "PC"],
      ["6", "26IT205", "Database Systems and Security", "LIT", "2-0-2", "3", "PC"],
      ["7", "26EN304", "English Communication Skills Laboratory-II", "L", "0-0-2", "1", "HS"],
      ["8", "26SD303", "Employability Enhancement Skills-III", "L", "0-0-2", "1", "EE"],
    ],
  },
  {
    id: "V",
    total: "21",
    rows: [
      ["1", "26CS101", "Object Oriented Software Engineering", "T", "3-0-0", "3", "PC"],
      ["2", "–", "Open Elective-I", "T", "3-0-0", "3", "OE"],
      ["3", "–", "Professional Elective-I", "T/LIT", "–", "3", "PE"],
      ["4", "–", "Professional Elective-II", "T/LIT", "–", "3", "PE"],
      ["5", "26IT206", "Embedded Programming", "LIT", "3-0-2", "4", "PC"],
      ["6", "26IT207", "Web Technologies", "LIT", "3-0-2", "4", "PC"],
      ["7", "26SD304", "Employability Enhancement Skills-IV", "L", "0-0-2", "1", "EE"],
      ["8", "–", "Mandatory Course-I", "T", "2-0-0", "–", "MC"],
    ],
    note: "Honours: Capstone Design Project-Level I (6 cr.) or Honours Elective I & II. Minor: Minor Elective-I & II.",
  },
  {
    id: "VI",
    total: "22",
    rows: [
      ["1", "26CY101", "Climate Change and Environmental Sustainability", "T", "2-0-0", "2", "HS"],
      ["2", "–", "Open Elective-II", "T", "3-0-0", "3", "OE"],
      ["3", "–", "Professional Elective-III", "T/LIT", "–", "3", "PE"],
      ["4", "–", "Professional Elective-IV", "T/LIT", "–", "3", "PE"],
      ["5", "26CS214", "Full Stack Development", "LIT", "3-0-2", "4", "PC"],
      ["6", "26IT208", "Principles of Communication Systems", "LIT", "3-0-2", "4", "PC"],
      ["7", "26SD305", "Employability Enhancement Skills-V", "L", "0-0-2", "1", "EE"],
      ["8", "26PW401", "Engineering Design Project", "L", "0-0-4", "2", "EE"],
      ["9", "–", "Mandatory Course-II", "T", "2-0-0", "–", "MC"],
    ],
    note: "Honours: Capstone Design Project-Level II (6 cr.) or Honours Elective III & IV. Minor: Minor Elective-III & IV.",
  },
  {
    id: "VII",
    total: "21",
    rows: [
      ["1", "26EN102", "Human Values and Ethics", "T", "3-0-0", "3", "HS"],
      ["2", "–", "Open Elective-III", "T", "3-0-0", "3", "OE"],
      ["3", "–", "Professional Elective-V", "T/LIT", "–", "3", "PE"],
      ["4", "–", "Professional Elective-VI", "T/LIT", "–", "3", "PE"],
      ["5", "26CS213", "Cloud Computing and Internet of Things", "LIT", "3-0-2", "4", "PC"],
      ["6", "26IT223", "Mobile and Pervasive Computing", "LIT", "3-0-2", "4", "PC"],
      ["7", "26IN401", "Internship", "–", "–", "1", "EE"],
    ],
    note: "Honours: Capstone Design Project-Level III (6 cr.) or Honours Elective V & VI. Minor: Minor Elective-V & VI.",
  },
  {
    id: "VIII",
    total: "16 / 8",
    rows: [
      ["1", "26PW402", "Project Work / Project Work-cum-Internship", "L", "0-0-16", "8", "EE"],
    ],
  },
];

const VERTICALS = [
  { name: "Vertical 1 – Artificial Intelligence and Machine Learning", courses: ["Knowledge Engineering", "Soft Computing", "Generative AI and Agentic AI", "Introduction to Natural Language Processing", "Introduction to Large Language Models", "Forward Deployed Engineering"] },
  { name: "Vertical 2 – Data Science", courses: ["Exploratory Data Analysis", "Recommender Systems", "Data Warehousing", "Big Data Analysis", "Business Analytics", "Computer Vision and Image Processing"] },
  { name: "Vertical 3 – Cybersecurity", courses: ["Modern Cryptography", "Social Network Security", "Network Security", "Security and Privacy in Cloud", "Ethical Hacking", "Cryptocurrency and Blockchain Technologies"] },
  { name: "Vertical 4 – IT Infrastructure and Enterprise Systems", courses: ["IT Infrastructure Architecture", "Data Center Design and Operations", "Server Administration and Automation", "Storage Systems and Disaster Recovery", "Enterprise IT Governance and Management", "Enterprise System Integration"] },
  { name: "Vertical 5 – Creative Media Technologies", courses: ["Multimedia and Animation", "Video Creation and Editing", "3D Printing and Design", "Augmented Reality and Virtual Reality", "Artificial Intelligence and Visual Effects", "Digital Marketing"] },
  { name: "Vertical 6 – Full Stack Development", courses: ["UI and UX Design", "NextGen Web Development", "App Development", "Cloud Native Development", "Software Testing and Automation", "Open Source Technologies"] },
];

const MINOR_VERTICALS = [
  { name: "Vertical 1 – Fintech and Blockchain", courses: ["Financial Management", "Fundamentals of Investment", "Banking Financial Services and Insurance", "Blockchain and its Applications", "Introduction to Fintech", "Fintech Personal Finance and Payments"] },
  { name: "Vertical 2 – Entrepreneurship", courses: ["Engineering Entrepreneurship and IPR", "Team Building and Leadership Management for Business", "Creativity & Innovation in Entrepreneurship", "Principles of Marketing Management for Business", "Human Resource Management for Entrepreneurs", "Financing New Business Ventures"] },
  { name: "Vertical 3 – Public Administration", courses: ["Principles of Public Administration", "Constitution of India", "Public Personnel Administration", "Administrative Theories", "Indian Administrative System", "Public Policy Administration"] },
  { name: "Vertical 4 – Business Data Analytics", courses: ["Statistics for Management", "Datamining for Business Intelligence", "Human Resource Analytics", "Marketing and Social Media Web Analytics", "Operation and Supply Chain Analytics", "Financial Analytics"] },
  { name: "Vertical 5 – Sustainable Development", courses: ["Sustainable Infrastructure Development", "Sustainable Agriculture and Environmental Management", "Sustainable Bio Materials", "Materials for Energy Sustainability", "Energy Efficiency for Sustainable Development", "Integrated Energy Planning for Sustainable Development"] },
];

const CREDIT_DIST = [
  ["HS", "4", "2", "1", "1", "–", "2", "3", "–", "13"],
  ["BS", "10", "7", "4", "4", "–", "–", "–", "–", "25"],
  ["ES", "6", "12", "–", "–", "–", "–", "–", "–", "18"],
  ["PC", "–", "–", "19", "19", "11", "8", "8", "–", "65"],
  ["PE", "–", "–", "–", "–", "6", "6", "6", "–", "18"],
  ["OE", "–", "–", "–", "–", "3", "3", "3", "–", "9"],
  ["EE", "–", "1", "1", "1", "1", "3", "1", "8", "16"],
  ["MC", "–", "–", "–", "–", "x", "x", "–", "–", "0"],
];

const KEY_REGULATIONS = [
  {
    title: "Programme Duration & Attendance",
    points: [
      "B.Tech. Information Technology is a 4-year (8-semester) programme under TJSEC-AR-2026-UG, applicable from Academic Year 2026-2027.",
      "Minimum overall attendance required to appear for End Semester Examinations: 80% (70% considered only with an approved Medical Certificate).",
      "Maximum credit registration limit per semester: 36 credits.",
    ],
  },
  {
    title: "Assessment Weightage",
    points: [
      "Theory (T) courses: 40% Continuous Assessment + 60% End Semester Examination.",
      "Laboratory Integrated with Theory (LIT) courses: 50% Continuous Assessment + 50% End Semester Examination.",
      "Laboratory (L) courses: 60% Continuous Assessment + 40% End Semester Examination.",
      "Project Work: 60% Continuous Assessment + 40% End Semester Examination.",
      "Mini Project / Mandatory / Value Added / Internship courses: 100% Continuous Assessment, no End Semester Examination.",
    ],
  },
  {
    title: "Passing Criteria",
    points: [
      "Theory / LIT / Laboratory courses: minimum 45% in the End Semester Examination and minimum 50% aggregate.",
      "Project Work / Internship-cum-Project: minimum 45% in the End Semester component and minimum 50% aggregate.",
      "Internship / Industrial Training, Mini Project, Life Skills, Employability Enhancement, Value Added and Mandatory Courses: minimum 50% in Continuous Assessment.",
    ],
  },
  {
    title: "Grading (Absolute Grading System)",
    points: [
      "S (91-100) = 10 grade points, A+ (81-90) = 9, A (71-80) = 8, B+ (66-70) = 7, B (61-65) = 6.5, C+ (56-60) = 6, C (50-55) = 5, U (<50) = 0.",
    ],
  },
  {
    title: "Degree Classification",
    points: [
      "First Class with Distinction (Honours): all courses — including additional Honours courses — passed in the first appearance, CGPA ≥ 8.50, never prevented from an end semester exam.",
      "First Class with Distinction: all courses passed in the first appearance, CGPA ≥ 8.50.",
      "First Class: all courses passed within the prescribed duration, CGPA ≥ 6.50, never prevented from an exam.",
      "Second Class: all courses passed within the prescribed duration, CGPA below 6.50 (or with a prevention).",
    ],
  },
  {
    title: "Honours & Minor Degree",
    points: [
      "Eligibility: minimum CGPA of 7.0 (Semesters III & IV combined) with no history of arrears, from Semester V onwards.",
      "Honours: either a Capstone Design Project (18 credits, Semesters V–VII, in a 4–6-member multidisciplinary team) or 6 additional Elective courses (18 credits). Honours is conferred only if CGPA ≥ 8.50 on completion.",
      "Minor Degree: 6 courses (18 credits) from one Minor Elective vertical, from Semester V onwards; grades count towards CGPA.",
      "A student may opt for either Honours or Minor, not both.",
    ],
  },
];

const INDUSTRIAL_VISITS = [
  {
    title: "TANSAM, TIDEL Park (III Year)",
    desc: "Industrial visit to TANSAM, TIDEL Park, Rajiv Gandhi IT Expressway, Tharamani, Chennai on 3rd February, organised jointly by the Department of CSE (AI&ML) and Department of Information Technology. Resource person Mr. Natesh explained the usage of Virtual Reality & Augmented Reality, the technical skills required for IoT, and the importance of AI in day-to-day life such as traffic control and AI integration, along with ML certification and career opportunities.",
    imgs: [{ src: "/assets/images/it/it_web_pg/image_10.jpg", alt: "Industrial Visit to TANSAM, TIDEL Park", wide: true }],
  },
  {
    title: "DIGIAURA, Ekkattuthangal",
    desc: "Industrial visit to DigiAura, Ekkattuthangal, on 20th February 2026, by the Department of IT and AI-ML. Resource person Mr. Stalin explained the usage of VFX in Media and Cinema, the technical skills required for animation, and the importance of VFX in international films such as Avatar, the Marvel universe and blockbuster Kollywood films, and provided a brochure on certifications and career opportunities.",
    imgs: [{ src: "/assets/images/it/it_web_pg/image_12.jpg", alt: "Industrial Visit to DigiAura, Ekkattuthangal", wide: true }],
  },
  {
    title: "RETECH",
    desc: "Industrial visit to RETECH, Selvanagar, Kadaperi West, Chennai, by the Department of CSE (AI&ML) and Department of Information Technology.",
    imgs: [{ src: "/assets/images/it/it_web_pg/image_9.jpg", alt: "Industrial Visit to RETECH" }],
  },
  {
    title: "SoftLogic Academy, Navalur",
    desc: "Industrial visit to SoftLogic Academy, Navalur, Chennai, by the Department of AI&ML and IT.",
    imgs: [{ src: "/assets/images/it/it_web_pg/image_11.png", alt: "Industrial Visit to SoftLogic Academy, Navalur", wide: true }],
  },
  {
    title: "DigiAura VFX Academy Pvt Ltd (II Year)",
    desc: "Industrial visit by the Department of Information Technology, 23-07-2026, Guindy Industrial Estate, Chennai.",
    imgs: [
      { src: "/assets/images/it/it_web_pg/image_13.jpg", alt: "Students departing for DigiAura VFX Academy visit" },
      { src: "/assets/images/it/it_web_pg/image_6.jpeg", alt: "Students arriving at DigiAura VFX Academy" },
      { src: "/assets/images/it/it_web_pg/image_8.jpg", alt: "Session at DigiAura VFX Academy on Introduction to Film Making Pipeline" },
    ],
  },
];

const EVENTS = [
  {
    date: "23-02-2026",
    category: "Seminar",
    person: "Dr. S. Menaka",
    title: "Driverless Future – Deep Learning’s Path To Autonomous Mobility",
    desc: "We are overjoyed to share that our students of the IT and AI-ML departments attended a seminar on “Driverless Future: Deep Learning’s Path To Autonomous Mobility” on 23rd February 2026.\n\nWe would like to extend our heartfelt gratitude to the Management and the Principal of T.J.S. Engineering College for their continuous support and encouragement in organizing such insightful academic events. A special thanks to Dr. S. Menaka for delivering an engaging and highly informative session. Through her seminar, students gained valuable insights into the role of Deep Learning in autonomous mobility and the future of driverless technology.\n\nShe elaborated on the core concepts behind self-driving vehicles, the importance of artificial intelligence in transportation, and the technical skills required to excel in this rapidly evolving field. She also highlighted emerging career opportunities and industry trends related to autonomous systems.\n\nThe session was truly eye-opening and inspired students to explore the vast possibilities in AI-driven mobility solutions, and encouraged them to consider careers in autonomous technology and deep learning.",
    imgs: [{ src: "/assets/images/it/events_department/image_6.jpeg", alt: "Seminar on Driverless Future: Deep Learning's Path To Autonomous Mobility" }],
  },
  {
    date: "07-03-2026",
    category: "Guest Lecture",
    person: "Mrs. Divya A",
    title: "Understanding AI-ML & Career in AI-ML",
    desc: "We are delighted to share that the Department of IT & AI-ML organized a Guest Lecture on “Understanding AI-ML & Career in AI-ML” on 7th March 2026 at the Seminar Hall.\n\nWe extend our sincere gratitude to the Management and the Principal for their constant support and encouragement in organizing such enriching academic events. A special thanks to Mrs. Divya A, Senior Software Engineer, Tekion India Pvt. Ltd., Chennai, for delivering an insightful and engaging session.\n\nThrough her lecture, students gained a clear understanding of the fundamentals of Artificial Intelligence and Machine Learning, along with practical insights into real-world applications. She elaborated on key concepts in AI-ML, industry expectations, and the essential technical and soft skills required to build a successful career in this domain. She also shared valuable knowledge about current industry trends, career opportunities, and the future scope of AI-driven technologies.\n\nThe session was highly informative and interactive, inspiring students to explore the vast potential of AI and ML. It encouraged them to enhance their skills and prepare themselves for emerging opportunities in the field of intelligent systems.",
    imgs: [{ src: "/assets/images/it/events_department/image_5.jpeg", alt: "Guest Lecture on Understanding AI-ML & Career in AI-ML" }],
  },
  {
    date: "09-03-2026",
    category: "Workshop",
    person: "Mr. Nirmal S & Mr. Dinesh",
    title: "AI & ML in Real-World Situations, and Python Essentials",
    desc: "It’s our pleasure to express that students of IT and AI-ML departments participated enthusiastically in the workshop on 9th March 2026.\n\nWe would like to extend our gratitude to our management and principal of T.J.S. Engg College for supporting us. And a sincere thanks to Mr. Nirmal S and Mr. Dinesh for taking such an interactive and informative session. Through him students learnt about the usage of “AI&ML, and the usage of AI” in real-world situations and about the importance of Python, and they explained briefly about Python libraries like NumPy, Pandas and Matplotlib. They also explained how to create a chatbot like ChatGPT, and covered ML & DL concepts and career opportunities in this field.\n\nThe session was eye-opening to our students; this workshop truly opened a door for students to think of AI as a career choice and about prompt engineering. Students expect more such beneficial workshops in future.",
    imgs: [{ src: "/assets/images/it/events_department/image_7.jpeg", alt: "Workshop on AI & ML in Real-World Situations and Python Essentials" }],
  },
  {
    date: "10-03-2026",
    category: "Workshop",
    person: "Dr. B. Ezhilavan & Mr. Nirmal",
    title: "Importance of Algorithms in Data Preprocessing",
    desc: "We are delighted to share that the students of the IT and AI-ML departments attended an insightful workshop on 10th March 2026.\n\nWe extend our sincere gratitude to the management and the Principal of T.J.S. Engineering College for providing us with this valuable opportunity. And a sincere thanks to Dr. B. Ezhilavan & Mr. Nirmal for taking such an interactive and informative session. Through him students learnt about the importance of Algorithms and their major role in data preprocessing, and explained various algorithms — KNN, K-means, A* Algorithm — and about sensors. They also explained a major project, “text to voice converter” and “voice to text converter”.\n\nThe CEO introduced an internship offer to the students by submitting a report; through this workshop our students learnt more about the usage and execution of AI tools. Thanks for organizing such an inspirational workshop. Students look forward to gaining internship experience in your prestigious organization.",
    imgs: [{ src: "/assets/images/it/events_department/image_3.jpeg", alt: "Workshop on the Importance of Algorithms in Data Preprocessing" }],
  },
  {
    date: "24-08-2026",
    category: "Inauguration",
    person: "Dept. of AI&ML and IT",
    title: "Inauguration of Nexora & Zorvix",
    desc: "It’s our pleasure to express that the students of the Department of AI&ML and IT participated enthusiastically in the inauguration of Nexora & Zorvix. The event was organized with the aim of encouraging students to explore their technical skills, creativity, innovation, and interest in emerging technologies.\n\nWe would like to extend our gratitude to our management and principal of T.J.S. Engineering College for their valuable support and encouragement in organizing this event. We also sincerely thank the faculty members and coordinators for their efforts in making the inauguration a successful and memorable occasion.\n\nThe inauguration session provided an excellent platform for students to understand the importance of innovation, technology, teamwork, and professional development. The event motivated students to actively participate in technical activities and encouraged them to develop their skills through practical learning and collaborative experiences.\n\nThe occasion was truly an inspiring experience for our students. The inauguration of Nexora & Zorvix opened new opportunities for students to showcase their talents, explore their interests, and enhance their technical knowledge. We look forward to organizing more such beneficial and innovative activities in the future.",
    imgs: [{ src: "/assets/images/it/events_department/image_1.png", alt: "Inauguration of Nexora & Zorvix", wide: true }],
  },
  {
    date: "",
    category: "Symposium",
    person: "Dept. of IT & AI&ML",
    title: "Technical Symposium – “CRYPTON”",
    desc: "The Department of Information Technology and Artificial Intelligence & Machine Learning, T.J.S. Engineering College, successfully organized a National-Level Technical Symposium – “CRYPTON”, providing students with an exciting platform to showcase their technical knowledge, creativity, problem-solving abilities, and innovative ideas.\n\nTechnical Events: Paper Presentation, Web Forge, Prompt War, Tech Speech, Code Quest.\n\nNon-Technical Events: Treasure Hunt, Free Fire, Movie & Song Prediction, Lyric Crush.\n\nThe symposium witnessed enthusiastic participation from students and provided opportunities to explore emerging technologies, develop technical skills, and engage in healthy competition. The various events encouraged participants to demonstrate their expertise in Artificial Intelligence, Machine Learning, Information Technology, coding, web development, communication, and creative thinking.\n\nThe event was conducted with the support and guidance of the faculty members and student coordinators, making it a memorable and enriching experience for all participants.",
    imgs: [{ src: "/assets/images/it/events_department/image_2.jpeg", alt: "Technical Symposium CRYPTON", wide: true }],
  },
];

const ACHIEVEMENTS = [
  {
    date: "September 2026",
    category: "Achievement",
    person: "M. Gandhidhasan",
    title: "Gold Medal, Silambam (Above 75 kg)",
    desc: "Our student, Mr. M. Gandhidhasan (B.Tech – IT), won the Gold Medal in Silambam (above 75 kg category) at the district-level competition in Thiruvallur for the “Chief Minister’s Trophy” in September 2026.",
    imgs: [{ src: "/assets/images/it/it_web_pg/image_2.png", alt: "Mr. M. Gandhidhasan receiving the Silambam Gold Medal" }],
  },
];

const SIH_TEAMS = [
  {
    category: "Hackathon",
    person: "Vignesh D",
    topic: "CivicSolve – AI-Powered Social Impact Platform",
    desc: "Our student developed an AI-powered digital platform that connects citizens, students, universities, industries, NGOs, and government to collaboratively address real-world societal problems.\n\nThe platform uses AI to classify, prioritize, detect duplicate issues, and match problems with suitable student teams and industry partners, while enabling project tracking and impact analytics.\n\nProblem → AI Analysis → Team Matching → Collaboration → Solution → Social Impact",
    members: "Vignesh D, Harini M, Darshan K, Kavitha R, Salini M",
  },
  {
    category: "Hackathon",
    person: "Ragapreethi",
    topic: "Predictive Analytics Framework for Cybercrime Complaints",
    desc: "Development of a Predictive Analytics Framework for Cybercrime Complaints to forecast likely cash withdrawal locations in advance, enabling generation of actionable intelligence for timely and proactive cybercrime intervention.",
    members: "Ragapreethi, Praveena, Anisha, Sakthi K, Harini P, Laxmi Priya Mallick",
  },
];

const PUBLICATIONS = [
  {
    title: "Advanced hybrid attention-based deep learning network with heuristic algorithm for adaptive CT and PET image fusion in lung cancer detection",
    by: "Shalini Chowdary",
    venue: "Medical Engineering & Physics, 2024",
    impact: "Impact Factor 2.5",
    citation: "Citation 52",
    link: "https://scholar.google.com/scholar?oi=bibs&cluster=18051348610961890072&btnI=1&hl=en",
  },
  {
    title: "An Improved Archimedes Optimization-aided Multi-scale Deep Learning Segmentation with dilated ensemble CNN classification for detecting lung cancer using CT images",
    by: "Shalini Chowdary",
    venue: "Network: Computation in Neural Systems, 2025",
    impact: "Impact Factor 7.5",
    citation: "Citation 5",
    link: "https://scholar.google.com/scholar?oi=bibs&cluster=7814968460803286478&btnI=1&hl=en",
  },
  {
    title: "Exploitation of Spectrum White Spaces by Using Energy Based Primary Transmitter Detection Approach for Cognitive Radio Networks",
    by: "Shalini Chowdary",
    venue: "Power Energy and Secure Smart Technologies, 2025",
    impact: null,
    citation: null,
    link: "https://scholar.google.com/scholar?oi=bibs&cluster=1278709396236894687&btnI=1&hl=en",
  },
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

function EventCard({ date, title, desc, imgs, children }) {
  return (
    <div className="tjs-dept-event">
      {date ? <span className="tjs-dept-event-date">{date}</span> : null}
      <p className="tjs-dept-event-title">{title}</p>
      {desc ? <p>{desc}</p> : null}
      {imgs && imgs.length > 0 && (
        <div className="tjs-dept-event-imgs">
          {imgs.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={img.wide ? "tjs-dept-event-img-wide" : ""}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

function SimpleCard({ img, date, title, desc, onClick }) {
  return (
    <div className="tjs-slider-card" onClick={onClick} role="button" tabIndex={0}>
      {img ? (
        <img src={img} alt={title} className="tjs-slider-card-img" />
      ) : (
        <div className="tjs-slider-card-img-ph">Photo</div>
      )}
      <div className="tjs-slider-card-body">
        {date && (
          <div className="tjs-slider-card-meta">
            <span>
              <i className="ri-calendar-2-line"></i> {date}
            </span>
          </div>
        )}
        <h4 className="tjs-slider-card-title">{title}</h4>
        {desc && <p className="tjs-slider-card-desc">{desc}</p>}
        <button type="button" className="tjs-slider-card-readmore" onClick={onClick}>
          Read More <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}

function EventModal({ item, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.tjsLenis?.stop();
    // Belt-and-braces: Lenis listens for wheel/touchmove on window in the
    // bubble phase. Stopping propagation during the capture phase (which
    // always finishes before any bubble-phase listener runs) keeps those
    // events from ever reaching Lenis, so the page behind the modal can't
    // scroll — while our own modal's native overflow-y:auto keeps working,
    // since that's the browser's own scroll behaviour, not a JS listener.
    function stopBubble(e) {
      e.stopPropagation();
    }
    document.addEventListener("wheel", stopBubble, { capture: true, passive: true });
    document.addEventListener("touchmove", stopBubble, { capture: true, passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("wheel", stopBubble, { capture: true });
      document.removeEventListener("touchmove", stopBubble, { capture: true });
      window.tjsLenis?.start();
    };
  }, [onClose]);

  const hasMeta = item.category || item.date;

  return (
    <div className="tjs-modal-overlay" onClick={onClose}>
      <div className="tjs-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="tjs-modal-close" aria-label="Close" onClick={onClose}>
          <i className="ri-close-line"></i>
        </button>
        <div className="tjs-modal-scroll">
          {item.img ? (
            <div className="tjs-modal-img-wrap">
              <img src={item.img} alt={item.title} className="tjs-modal-img" />
              {hasMeta && (
                <div className="tjs-modal-meta-float">
                  {item.category && (
                    <span>
                      <i className="ri-price-tag-3-line"></i> {item.category}
                    </span>
                  )}
                  {item.date && (
                    <span>
                      <i className="ri-calendar-2-line"></i> {item.date}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            hasMeta && (
              <div className="tjs-slider-card-meta tjs-modal-meta-noimg">
                {item.category && (
                  <span>
                    <i className="ri-price-tag-3-line"></i> {item.category}
                  </span>
                )}
                {item.date && (
                  <span>
                    <i className="ri-calendar-2-line"></i> {item.date}
                  </span>
                )}
              </div>
            )
          )}
        <div className="tjs-modal-body">
          <h3 className="tjs-modal-title">{item.title}</h3>
          {item.desc.split("\n\n").map((para, i) => (
            <p className="tjs-modal-desc" key={i}>{para}</p>
          ))}
          {item.category === "Hackathon" && item.person && (
            <p className="tjs-modal-person">
              <strong>Team Members:</strong> {item.person}
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ items }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function scroll(direction) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "0");
    const step = card ? card.getBoundingClientRect().width + gap : 340;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div className="tjs-slider-wrap">
      <button
        type="button"
        className="tjs-slider-nav"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <div className="tjs-slider-track" ref={trackRef}>
        {items.map((item, i) => (
          <SimpleCard key={item.title} {...item} onClick={() => setActiveIndex(i)} />
        ))}
      </div>
      <button
        type="button"
        className="tjs-slider-nav"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
      {activeIndex !== null && (
        <EventModal item={items[activeIndex]} onClose={() => setActiveIndex(null)} />
      )}
    </div>
  );
}

export default function ITDepartment() {
  const [activeSem, setActiveSem] = useState("I");
  const semester = SEMESTERS.find((s) => s.id === activeSem);

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
        <nav className="tjs-dept-jump">
          <a href="#about">About</a>
          <a href="#hod">HOD&apos;s Desk</a>
          <a href="#people">Faculty &amp; Staff</a>
          <a href="#programmes">Programmes Offered</a>
          <a href="#curriculum">Curriculum</a>
          <a href="#regulations">Regulations</a>
          <a href="#facilities">Facilities &amp; Library</a>
          <a href="#industry">Industry Interface</a>
          <a href="#events">Events &amp; Achievements</a>
          <a href="#research">Research</a>
        </nav>

        <section id="about" className="tjs-dept-section">
          <h2>About the Department</h2>
          <p>
            The Department of Information Technology was established in the academic year 2024-2028 with an
            initial intake of 60 students. The department offers a four-year B.Tech degree program in Information
            Technology, committed to delivering quality technical education and developing technically competent,
            ethically strong, and socially responsible professionals capable of meeting the challenges of the
            rapidly evolving IT industry.
          </p>
          <p>
            The mission of the department is to provide value-based education, enhance employability skills,
            encourage innovation, and nurture entrepreneurial abilities among students through effective
            teaching-learning methodologies, continuously upgrading its curriculum and infrastructure to align with
            global industry standards.
          </p>

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
              <ul>
                <li>To provide quality education that builds strong technical and analytical skills in students.</li>
                <li>To encourage innovation, creativity, and continuous learning for solving real-world IT challenges.</li>
                <li>To shape students into responsible, ethical, and globally competent IT Professionals.</li>
              </ul>
            </div>
          </div>

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

          <h3>Board of Studies, Centre of Excellence &amp; Value Added Programmes</h3>
          <div className="tjs-dept-grid-3">
            <div className="tjs-dept-card">
              <h3 style={{ marginTop: 0 }}>Board of Studies</h3>
              <p style={{ marginBottom: 0 }}>An Autonomous Institution Affiliated to Anna University</p>
            </div>
            <div className="tjs-dept-card">
              <h3 style={{ marginTop: 0 }}>Centre of Excellence</h3>
              <p style={{ marginBottom: 0 }}>HCL</p>
            </div>
            <div className="tjs-dept-card">
              <h3 style={{ marginTop: 0 }}>Value Added Programme</h3>
              <ul style={{ marginBottom: 0 }}>
                <li>Artificial Intelligence and Machine Learning</li>
                <li>Cyber Security</li>
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
                qualities, ethical awareness, and a spirit of innovation. These qualities help them become not only
                competent IT professionals but also responsible individuals who can make a positive contribution to
                society.
              </p>
              <p>
                The department continuously encourages students to explore emerging technologies, participate in
                technical competitions, undertake innovative projects, pursue research, and develop entrepreneurial
                skills. We aim to build an academic ecosystem where students can discover their potential,
                transform ideas into solutions, and prepare themselves for successful careers in the global
                technology sector.
              </p>
              <p className="tjs-dept-hod-quote">
                &ldquo;Our commitment is to nurture a generation of skilled, innovative, adaptable, and socially
                responsible IT professionals who are ready to meet the challenges of the digital era. I warmly
                welcome students, parents, alumni, industry professionals, and well-wishers to be part of the
                Department of Information Technology. Together, let us create a culture of learning, innovation,
                collaboration, and excellence. Learn. Create. Innovate. Transform.&rdquo;
              </p>
              <p className="tjs-dept-hod-sign">
                Dr. C. Shalini
                <br />
                Head of the Department, Department of Information Technology
              </p>
            </div>
          </div>
        </section>

        <section id="people" className="tjs-dept-section">
          <h2>Faculty &amp; Staff</h2>
          <h3>Faculty</h3>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Staff Name</th>
                  <th>Qualification</th>
                  <th>Designation</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {FACULTY.map((f, i) => (
                  <tr key={f.name}>
                    <td>{i + 1}</td>
                    <td>{f.name}</td>
                    <td>{f.qual}</td>
                    <td>{f.role}</td>
                    <td><a href={"mailto:" + f.email}>{f.email}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="programmes" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Programmes Offered</h2>
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

        <section id="curriculum" className="tjs-dept-section">
          <h2>Curriculum – Regulations 2026 (CBCS)</h2>
          <p>
            Choice Based Credit System curriculum for B.Tech. Information Technology, applicable to students
            admitted in the Academic Year 2026-2027.
          </p>

          <div className="tjs-dept-tabs" style={{ flexWrap: "wrap" }}>
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
                  <th>Type</th>
                  <th>L-T-P</th>
                  <th>Credit</th>
                  <th>Category</th>
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
                  <td colSpan={5} style={{ textAlign: "right", fontWeight: 700 }}>TOTAL (TCP / Credit)</td>
                  <td colSpan={2} style={{ fontWeight: 700 }}>{semester.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {semester.note && <p className="tjs-dept-pending">{semester.note}</p>}

          <h3>Professional Elective Verticals</h3>
          <div className="tjs-dept-grid-2">
            {VERTICALS.map((v) => (
              <div className="tjs-dept-card" key={v.name}>
                <h3 style={{ marginTop: 0 }}>{v.name}</h3>
                <ul style={{ marginBottom: 0 }}>
                  {v.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3>Minor Elective Verticals</h3>
          <div className="tjs-dept-grid-2">
            {MINOR_VERTICALS.map((v) => (
              <div className="tjs-dept-card" key={v.name}>
                <h3 style={{ marginTop: 0 }}>{v.name}</h3>
                <ul style={{ marginBottom: 0 }}>
                  {v.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3>Credit Distribution Across Semesters</h3>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>I</th>
                  <th>II</th>
                  <th>III</th>
                  <th>IV</th>
                  <th>V</th>
                  <th>VI</th>
                  <th>VII</th>
                  <th>VIII</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {CREDIT_DIST.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 700 }}>Total</td>
                  <td>20</td><td>22</td><td>25</td><td>25</td><td>21</td><td>22</td><td>21</td><td>8</td>
                  <td style={{ fontWeight: 700 }}>164</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="regulations" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Academic Regulations 2026 – Key Points</h2>
          <p>
            T.J.S. Engineering College Academic Regulations 2026 (TJSEC-AR-2026-UG) govern all B.E. / B.Tech.
            programmes of the Institution, an Autonomous Institution affiliated to Anna University, Chennai. Key
            provisions relevant to Information Technology students are summarised below.
          </p>
          <AccordionSection items={KEY_REGULATIONS} />
        </section>

        <section id="facilities" className="tjs-dept-section">
          <h2>Facilities &amp; Library</h2>
          <h3>Laboratories</h3>
          <ul className="tjs-dept-bullets">
            <li>Computer Laboratory</li>
          </ul>
          <div className="tjs-dept-event-imgs">
            <img src="/assets/images/it/it_web_pg/image_1.jpg" alt="Students at the Computer Laboratory" />
            <img src="/assets/images/it/it_web_pg/image_4.jpg" alt="A training session at the Computer Laboratory" />
          </div>

          <h3>Department Library</h3>
          <p>
            The Department of Information Technology has a dedicated library facility with a wide collection of
            textbooks, reference books, and technical resources covering programming, networking, databases,
            artificial intelligence, and emerging technologies. Students use these resources for assignments,
            projects, examinations, and research activities, promoting a culture of self-learning and continuous
            knowledge development.
          </p>
          <div className="tjs-dept-event-imgs">
            <img src="/assets/images/it/it_web_pg/image_7.jpeg" alt="Department of Information Technology library shelves" />
          </div>
        </section>

        <section id="industry" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Industry Interface</h2>
          <h3>Industrial Visits</h3>
          <div className="tjs-dept-event-list">
            {INDUSTRIAL_VISITS.map((v) => (
              <EventCard key={v.title} title={v.title} desc={v.desc} imgs={v.imgs} />
            ))}
          </div>
        </section>

        <section id="events" className="tjs-dept-section">
          <h2>Events &amp; Achievements</h2>
          <Slider
            items={[
              ...EVENTS.map((e) => ({
                title: e.title,
                img: e.imgs && e.imgs[0] ? e.imgs[0].src : null,
                date: e.date,
                category: e.category,
                person: e.person,
                desc: e.desc,
              })),
              ...ACHIEVEMENTS.map((a) => ({
                title: a.title,
                img: a.imgs && a.imgs[0] ? a.imgs[0].src : null,
                date: a.date,
                category: a.category,
                person: a.person,
                desc: a.desc,
              })),
              ...SIH_TEAMS.map((t) => ({
                title: t.topic,
                img: null,
                date: null,
                category: t.category,
                person: t.members,
                desc: t.desc,
              })),
            ]}
          />
        </section>

        <section id="research" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Research &amp; Development</h2>
          <h3>Publications</h3>
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
                    <strong>{p.by}</strong> &middot; {p.venue}
                  </p>
                  {(p.impact || p.citation) && (
                    <div className="tjs-pub-badges">
                      {p.impact && <span className="tjs-pub-badge">{p.impact}</span>}
                      {p.citation && <span className="tjs-pub-badge tjs-pub-badge-alt">{p.citation}</span>}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
