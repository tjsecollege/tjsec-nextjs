const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const TOPPERS = [
  { name: "Kaviyasri S" },
  { name: "Oviya R" },
  { name: "Sandhiya A S" },
  { name: "Kamesh G" },
  { name: "Hariniya S" },
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

const REGULATIONS = [
  { label: "B.E – EEE Regulations (2025)", href: "#" },
  { label: "B.E – EEE Regulations (2021)", href: "#" },
];

const LABS = [
  {
    name: "1. Electrical Machines Lab",
    text: "The Electrical Machines Laboratory of the Department of Electrical and Electronics Engineering is designed to provide students with hands-on experience in the operation, testing, performance evaluation, and analysis of electrical machines. The laboratory supports the practical learning of DC machines, transformers, induction motors, synchronous machines, and special electrical machines. Through systematic experiments, students develop an understanding of machine characteristics, losses, efficiency, speed control, torque characteristics, voltage regulation, and operating performance. The laboratory bridges the gap between theoretical concepts and practical applications, enabling students to develop essential technical and experimental skills required for careers in electrical engineering and related industries.",
    photos: 2,
  },
  {
    name: "2. Power Electronics Lab",
    text: "The Power Electronics Laboratory provides students with hands-on experience in the design, analysis, control and application of power electronic converters and semiconductor switching devices. The laboratory enables students to understand the practical operation of power semiconductor devices, controlled rectifiers, DC-DC converters, inverters, AC voltage controllers and cycloconverters. Students perform experiments to study output waveforms, triggering techniques, voltage and current control, efficiency and performance of power electronic circuits. The laboratory bridges theoretical concepts with practical applications in industrial drives, renewable energy systems, electric vehicles, battery systems and power conversion applications.",
    photos: 1,
  },
  {
    name: "3. Control and Instrumentation Laboratory",
    text: "The Control and Instrumentation Laboratory provides students with practical knowledge in measurement, instrumentation, control systems, sensors, transducers and feedback control techniques. The laboratory enables students to understand the behaviour of dynamic systems and to experimentally study open-loop and closed-loop control systems, time response, frequency response, stability, controllers and industrial measurement systems. Students also gain hands-on experience with sensors, transducers and electronic instrumentation used in engineering applications.",
    photos: 1,
  },
  {
    name: "4. Power System Simulation Laboratory",
    text: "The Power System Simulation Laboratory provides students with practical training in the modelling, analysis and simulation of electrical power systems using modern computational tools. The laboratory enables students to simulate and analyze power-flow studies, fault analysis, transmission-line performance, load-frequency control, economic operation and stability of power systems. Students develop the ability to model electrical networks and interpret simulation results for planning, operation and control of modern power systems.",
    photos: 2,
  },
];

const INDUSTRIAL_VISITS = [
  { date: "27-02-2025", title: "Adani Port, Kattupalli", desc: "II & III Year students visited the Port Operation Building, coordinated by Mrs. M. Shunmuga Sankari (HOD/EEE), Mr. T. Kamal Kumar, Mr. M. Arjunkumar, Mrs. C. Anusha, Mr. B. Murali and Mr. K. Shanmugaraj (AP/LI, EEE)." },
  { date: "19-02-2025", title: "North Chennai Thermal Power Station Stage-I (NCTPS-1)", desc: "II & III Year students, coordinated by Mr. S. Ganesh, Mrs. C. Anusha (AP/EEE) and Mr. B. Murali (LI/EEE)." },
  { date: "13-02-2026", title: "Globesci Technology, Korattur, Chennai", desc: "II & III Year students visited for career growth and future scope." },
  { date: "08-08-2025", title: "North Chennai Thermal Power Station Stage-II, Ennore", desc: "II, III and IV Year students." },
  { date: "12-09-2025", title: "BSNL", desc: "II & III Year students, coordinated by Mr. S. Ganesh and Mrs. C. Anusha (AP/EEE)." },
  { date: "24-09-2026", title: "Voltech Manufacturing Company, Chennai", desc: "EEE Department students." },
  { date: "08-09-2026", title: "Approtech R&D Solutions Pvt. Ltd, Chennai", desc: "EEE Department students." },
  { date: "28-08-2026", title: "Niile Technical Skill and Consulting Pvt Ltd, Chennai", desc: "EEE Department students." },
];

const FDPS_ATTENDED = [
  { date: "27.01.2025 – 01.02.2025", title: "The Future of Smart Mobility – Integrating AI and IoT in Electric Vehicle Ecosystems", org: "ATAL, Sree Sakthi Engineering College", by: "Mrs. M. Shunmuga Sankari (HOD), Mr. T. Kamalkumar" },
  { date: "17.02.2025 – 22.02.2025", title: "Impact of Urban Greenspaces in Alleviating Micro-Climate Change Using Geospatial Techniques", org: "ATAL, Sri Ramakrishna Engineering College", by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Mrs. C. Anusha" },
  { date: "10.02.2025 – 16.02.2025", title: "E-Vehicle Fundamentals / EV Technology for EEE", org: "Naan Mudhalvan (University College of Villupuram / Anna University, Guindy)", by: "Mr. M. Arjunkumar, Mr. S. Ganesh" },
  { date: "25.02.2026", title: "Generative AI for Teaching", org: "Dept. of ECE, T.J.S. Engineering College", by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Mr. S. Ganesh, Mrs. C. Anusha" },
  { date: "03.11.2025 – 08.11.2025", title: "The Evolving Landscape in Teaching and Research: AI and Data Approaches", org: "ATAL Academy & Nehru Institute of Technology", by: "Mr. S. Ganesh" },
  { date: "08.11.2025", title: "Market Ka Eklavya", org: "NSDL Technology, Trust & Reach", by: "Mrs. M. Shunmuga Sankari" },
  { date: "18.11.2025", title: "Sustainable Computing and Green IT Solutions", org: "Nehru Institute of Technology, Coimbatore", by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Mr. S. Ganesh, Mrs. C. Anusha, Mr. M. Arjunkumar" },
  { date: "12.12.2025", title: "Quantum Computing: Basic and Applications", org: "Nehru Institute of Technology, Coimbatore", by: "Mr. T. Kamalkumar" },
  { date: "15.12.2025 – 20.12.2025", title: "Electric Vehicles – Breakthroughs and Challenges", org: "AMS College of Engineering", by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar, Mr. S. Ganesh" },
  { date: "Jul – Oct 2025", title: "Introduction to Machine Learning", org: "NPTEL – AICTE", by: "Mrs. M. Shunmuga Sankari" },
  { date: "26.01.2026", title: "Block Chain in Logistics", org: "GRT Institute of Engineering and Technology, Tiruttani", by: "Mrs. M. Shunmuga Sankari, Mr. T. Kamalkumar" },
];

const GUEST_LECTURES = [
  { date: "28-01-2026", title: "IoT – Fundamentals and Applications", desc: "Handled by Ms. Nandhini, FIIT Formacion Pvt Ltd, at the EEE Seminar Hall, in association with FIIT Formacion Pvt Ltd." },
  { date: "21-02-2026", title: "Why Engineering is the Best Choice for Diploma Students", desc: "Career guidance program by Mr. Sujeeth Vishnu, Chief Business Development Executive, OPC Pvt Ltd, coordinated by Mrs. M. Shunmuga Sankari and Mr. T. Kamalkumar." },
];

const WORKSHOPS = [
  { date: "30-07-2025 to 31-07-2025", title: "Generation Incoming: Vehicle Operates with Three Fuels", desc: "Two-day hands-on workshop conducted by Mr. V. Sujeeth Vishnu, NTLS Consultancy OPC Pvt Ltd, for II, III & IV Year students at the Seminar Hall." },
  { date: "29-10-2024", title: "Industrial Training Workshop", desc: "Presented by Axis Global Institute of Industrial Training, attended by II, III & IV Year students." },
];

const CONFERENCES = [
  { date: "13-03-2026", title: "International Conference (Online)", desc: "IV Year students attended at SKP Engineering College, Thiruvannamalai." },
  { date: "25-03-2026", title: "National Conference – Best Paper Award", desc: "III Year students presented “Solar Integrated Power Management System for Electric Two Wheeler” at Prathyusha Engineering College and won the Best Paper Award. Presented by T. Kamalkumar, L. Dhanasekar, A. Anbumuthu, M. Lokesh, G. Kamesh." },
];

const SEMINARS_EVENTS = [
  { date: "06-10-2025", title: "Seminar on Data Science", desc: "II, III & IV Year students attended, conducted by Lokesh Kumar." },
  { date: "29-01-2026", title: "IIC Seminar – Introduction and Application of AI", desc: "Conducted by Ms. P. Pavithra, AP-AIDS, for II & III Year EEE students, under MIC Driven Activity – Atmanirbhar Bharat: HEI Pre-Summit Engagements towards IndiaAI Impact Summit 2026." },
  { date: "09-08-2025", title: "Special Corporate Session on Interview Readiness", desc: "III & IV Year students attended, conducted by Mr. Sarath Chandar Sukumar, General Manager – HR, Vaken Technologies." },
  { date: "09-03-2026", title: "IIC Meeting – Sabka Sath Sabka Vikas", desc: "II & III Year students attended the online MIC Driven Activity." },
];

const EVENTS_ORGANISED = {
  title: "Six Days Faculty Development Program – “Electrical Technology: Recent Trends and Innovations”",
  desc: "Organised by the Department of Electrical and Electronics Engineering, 02-02-2026 to 07-02-2026 (online mode).",
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
  { date: "28-10-2025", title: "Symposium – GNISTA 2K25", desc: "16th National Level Technical Symposium organised by the Association of Electrical and Electronics Engineering, chief guest Dr. V. S. Sriraja Balaguru (Assistant Executive Engineer, IT, TNEB)." },
];

const ALUMNI_INTERACTIONS = [
  { date: "26-02-2025", title: "Thirukumaran P & Akash D", desc: "Thirukumaran P (Senior Engineer, Alstom Transport India Pvt Ltd) and Akash D (Business – Foods and Beverages) interacted with II year students." },
  { date: "13-08-2025", title: "Karthick B", desc: "Alumnus from Sharekhan Company Limited, Chetpat, interacted with II Year students on career growth and future scope." },
  { date: "14-11-2025", title: "Saikrishnan Radhakrishnan (Batch 2021)", desc: "Working at Tata Consultancy Services, met with II and III Year students." },
  { date: "02-02-2026", title: "Mr. B. Udhayakumaran (Batch 2025)", desc: "Interacted with II year students." },
];

const ACHIEVEMENTS = [
  { date: "31-01-2025", title: "Trainer Certification – Grade B", desc: "Mrs. Shunmuga Sankari M cleared the assessment as a Trainer (Trainer ID TR176420) for the Qualification Pack of Hydrogen Plant Technician (Installation, Commissioning and Maintenance), NSQF Level 4." },
  { date: "28-02-2025", title: "Inventec Project Expo – 1st Prize", desc: "Kamesh G and Perarasu K (II year) won 1st Prize at the Inventec Project Expo organised by Gojan School of Business and Technology, Redhills." },
  { date: "04-03-2026", title: "Techuyugam 2026 – Project Expo", desc: "II & III Year students won cash prizes and rewards at Veltech Multitech Engineering College, Avadi." },
  { date: "13-03-2026", title: "Xempler 2026 Symposium", desc: "II & III Year students attended at Velammal Engineering College." },
  { date: "14-03-2026", title: "Technoverse Hackathon 2026", desc: "III year students participated at St. Joseph’s College of Engineering & Technology." },
  { date: "18-03-2026", title: "Ideathon", desc: "III Year students went to St. Peter’s Engineering College." },
  { date: "14-02-2025", title: "Blood Donation Camp", desc: "Mitsuba India Pvt. Ltd. conducted a blood donation camp at T.J.S. Arts & Science College; Lingeshwaran N, Perarasu K and Vijayakumar V donated blood." },
  { date: "14-11-2025", title: "Blood Donation Camp – Rela Hospital", desc: "Three II year students donated blood at the camp conducted at T.J.S. Arts & Science College, Peruvoyal." },
];

const RECRUITERS = ["HT & NISSI Energy Integrated", "Michelin", "Emerald", "Wipro", "Caplin Steriles", "Thinksynq", "Mitsuba India", "Infosys", "TCS"];

const INTERNSHIPS = [
  { org: "Prolific Systems & Technologies Pvt. Ltd.", date: "27-01-2025 to 10-02-2025", who: "II Year students (21 nos.)" },
  {
    org: "V V Electro Systems, Gummidipoondi",
    date: "06-02-2025 to 20-02-2025",
    who: "III Year students: Hemaraj R, Logendheran R, Sanjay U, Surya Prakash T, Avinash K, Gopiraj M, Sakthivel V, Samuel R, Santhosh M, Kaviya Sri S, Nageshwari R, Sandhiya A S, Kalaiselvi P, Oviya R",
  },
  { org: "Mitsuba India Pvt Ltd", date: "02-03-2026 to 31-03-2026", who: "II & III Year students" },
  { org: "IIT Madras", date: "12-02-2025 to 11-04-2025", who: "IV Year students: Vayuluru Mouli, Udhayakumaran B" },
  { org: "Jana Engineering Industries, Gummidipoondi", date: "16-09-2025 (15 days)", who: "Kamesh G (II Year)" },
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
  "DABPR: A large-scale internet of things-based data aggregation back pressure routing for disaster management",
  "Design of PSO-Fuzzy MPPT Controller for Photovoltaic Application",
  "Cuckoo search assisted fuzzy logic algorithm for smart WSN routing system",
  "Design of coordinated control scheme for hybrid resonant boost converter and multi level inverter",
  "Design of Soft Switching Interleaved Boost converter for Photovoltaic application",
  "MPPT in partially shaded PV system with the use of WODE technique",
  "An investigation of various actuation mechanisms in robot arm",
  "Design and Development of Solar Photovoltaic System Using Single-Phase MLI",
  "Performance analysis and simulation of five level and seven level single phase multilevel inverters",
  "Sinusoidal Output Voltage H-bridge Multilevel Inverters",
  "Design of polarization splitter using elliptically dual core – Cladding photonic crystal fiber",
  "A novel technique for common mode-voltage elimination and DC-link balancing in three-level inverter",
  "Topology and performance analysis of cascadable nine level inverter by packed U-cell inverter and using multi-mode synchronized PWM schemes",
  "Polymers based material as a safety suit for high power utilities working",
  "Design and Development of Control Scheme for Solar PV System Using Single Phase Multilevel Inverter",
];

const DISTINGUISHED_ALUMNI = [
  { name: "Mr. Sivakumar", role: "Software Engineer, TCS" },
  { name: "Mr. Naresh Kumar", role: "Software Engineer, TCS" },
  { name: "Mr. Sathish Kumar", role: "Sr. Electrical Engineer, Gummidipoondi" },
  { name: "Mr. Gaddam Sathish", role: "Sr. System Admin, Aquarelle India" },
  { name: "Thirukumaran P", role: "Senior Engineer, Alstom Transport India Private Limited Company" },
];

function LinkList({ items }) {
  return (
    <div className="tjs-dept-link-list">
      {items.map((item) => (
        <a href={item.href} key={item.label}>
          <span>{item.label}</span>
          <span className="tjs-dept-link-arrow">
            <ArrowIcon />
          </span>
        </a>
      ))}
    </div>
  );
}

function EventCard({ date, title, desc, children }) {
  return (
    <div className="tjs-dept-event">
      <span className="tjs-dept-event-date">{date}</span>
      <p className="tjs-dept-event-title">{title}</p>
      {desc ? <p>{desc}</p> : null}
      {children}
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
        <nav className="tjs-dept-jump">
          <a href="#about">About</a>
          <a href="#hod">HOD&apos;s Desk</a>
          <a href="#people">Faculty &amp; Staff</a>
          <a href="#programmes">Programmes Offered</a>
          <a href="#regulations">Regulations &amp; Curriculum</a>
          <a href="#facilities">Facilities &amp; Labs</a>
          <a href="#industry">Industry Interface</a>
          <a href="#events">Events &amp; Achievements</a>
          <a href="#internships">Internships &amp; Placements</a>
          <a href="#research">Research &amp; Publications</a>
        </nav>

        <section id="about" className="tjs-dept-section">
          <h2>About the Department</h2>
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
            The department places considerable emphasis on experiential learning through laboratory work, mini
            projects, major projects, technical seminars, workshops, industrial visits, internships, and technical
            competitions, encouraging students to apply their theoretical knowledge to real-world engineering
            problems.
          </p>

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

          <h3>Department Advisory Committee</h3>
          <p>Mrs. M. Shunmuga Sankari</p>

          <h3>Academic Toppers</h3>
          <div className="tjs-dept-people-grid">
            {TOPPERS.map((t) => (
              <div className="tjs-dept-people-card" key={t.name}>
                <div className="tjs-dept-people-photo">
                  <span>Photo</span>
                </div>
                <h4>{t.name}</h4>
                <p className="tjs-dept-people-role">Academic Topper</p>
              </div>
            ))}
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
                work, seminars, workshops, and technical activities, encouraging analytical thinking, problem-solving
                abilities, creativity, and a continuous-learning mindset.
              </p>

              <h4>Practical Learning and Innovation</h4>
              <p>
                Our well-equipped laboratories and practical learning environment enable students to gain hands-on
                experience and understand the application of engineering concepts, undertaking innovative projects
                and participating in technical events, competitions and workshops.
              </p>

              <h4>Research and Development</h4>
              <p>
                Faculty members and students are encouraged to explore emerging areas of Electrical and Electronics
                Engineering and develop solutions to contemporary technological and societal challenges through
                project-based learning, technical research, innovation, and knowledge sharing.
              </p>

              <h4>Industry Interaction</h4>
              <p>
                Industrial visits, expert lectures, internships, training programmes, workshops, and project-based
                activities provide students with exposure to industrial practices and emerging technologies, helping
                them prepare for successful careers.
              </p>

              <h4>Student Development</h4>
              <p>
                Students are encouraged to participate in technical associations, seminars, workshops, conferences,
                project activities, co-curricular programmes, and extracurricular activities that strengthen
                communication, teamwork, leadership, creativity, and professional skills.
              </p>

              <h4>Infrastructure and Laboratories</h4>
              <p>
                The department provides access to laboratories and learning resources that support both theoretical
                and practical education across electrical machines, power systems, power electronics, control
                systems, measurements and instrumentation, electronics, microprocessors and microcontrollers,
                renewable energy, and embedded systems.
              </p>

              <p className="tjs-dept-hod-quote">
                &ldquo;Our goal is to nurture graduates who possess strong technical knowledge, professional
                competence, ethical values, and a sense of responsibility towards society. I warmly welcome aspiring
                engineers to be part of a learning community that encourages curiosity, innovation, collaboration,
                and continuous growth. With best wishes for a successful and rewarding engineering journey.&rdquo;
              </p>
              <p className="tjs-dept-hod-sign">
                Mrs. M. Shunmuga Sankari
                <br />
                HOD, Department of Electrical and Electronics Engineering
              </p>
            </div>
          </div>
        </section>

        <section id="people" className="tjs-dept-section">
          <h2>Faculty &amp; Staff</h2>
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

          <h3>Visiting Faculty Members</h3>
          <p className="tjs-dept-pending">None at present.</p>

          <h3>Supporting Staff Members</h3>
          <p className="tjs-dept-pending">None at present.</p>

          <h3>Professional Societies</h3>
          <p>Mr. Kamalkumar T – Membership in IAENG (International Association of Engineers).</p>
        </section>

        <section id="programmes" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Programmes Offered</h2>
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

        <section id="regulations" className="tjs-dept-section">
          <h2>Regulations &amp; Curriculum</h2>
          <LinkList items={REGULATIONS} />
          <p className="tjs-dept-pending">2026 regulation &amp; curriculum revision is in progress; documents will be added soon.</p>
        </section>

        <section id="facilities" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Facilities &amp; Laboratories</h2>
          {LABS.map((lab) => (
            <div key={lab.name}>
              <h3>{lab.name}</h3>
              <p>{lab.text}</p>
              <div className="tjs-dept-photo-grid">
                {Array.from({ length: lab.photos }).map((_, i) => (
                  <div className="tjs-dept-photo-box" key={i}>Photo</div>
                ))}
              </div>
            </div>
          ))}

          <h3>Department Library</h3>
          <p>
            The Department Library serves as a valuable academic resource centre that supports teaching, learning,
            research, and professional development, providing access to a wide range of textbooks, reference books,
            journals, and learning resources related to Electrical and Electronics Engineering.
          </p>
          <div className="tjs-dept-photo-grid">
            <div className="tjs-dept-photo-box">Photo</div>
          </div>

          <h3>Innovative Teaching &amp; Learning Practices</h3>
          <ul className="tjs-dept-bullets">
            <li>Smart classroom – Interactive digital teaching using smart boards, projectors and multimedia.</li>
          </ul>
          <div className="tjs-dept-photo-grid">
            <div className="tjs-dept-photo-box">Photo</div>
          </div>
        </section>

        <section id="industry" className="tjs-dept-section">
          <h2>Industry Interface</h2>
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

          <h3>Consultancy Works</h3>
          <p className="tjs-dept-pending">Details will be updated soon.</p>

          <h3>Industrial Visits</h3>
          <div className="tjs-dept-event-list">
            {INDUSTRIAL_VISITS.map((v) => (
              <EventCard key={v.date + v.title} date={v.date} title={v.title} desc={v.desc} />
            ))}
          </div>
        </section>

        <section id="events" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Events &amp; Achievements</h2>

          <h3>Events Organised by the Department</h3>
          <div className="tjs-dept-event-list">
            <div className="tjs-dept-event">
              <span className="tjs-dept-event-date">02-02-2026 to 07-02-2026</span>
              <p className="tjs-dept-event-title">{EVENTS_ORGANISED.title}</p>
              <p>{EVENTS_ORGANISED.desc}</p>
              <ul>
                {EVENTS_ORGANISED.days.map((d) => (
                  <li key={d.date}>
                    <strong>{d.date}:</strong> {d.topic} — {d.speaker}
                  </li>
                ))}
              </ul>
            </div>
            {OTHER_DEPT_EVENTS.map((e) => (
              <EventCard key={e.date + e.title} date={e.date} title={e.title} desc={e.desc} />
            ))}
          </div>

          <h3>Faculty Development Programmes Attended</h3>
          <div className="tjs-dept-event-list">
            {FDPS_ATTENDED.map((f) => (
              <EventCard key={f.date + f.title} date={f.date} title={f.title} desc={f.org}>
                <p>Attended by: {f.by}</p>
              </EventCard>
            ))}
          </div>

          <h3>Guest Lectures</h3>
          <div className="tjs-dept-event-list">
            {GUEST_LECTURES.map((g) => (
              <EventCard key={g.date + g.title} date={g.date} title={g.title} desc={g.desc} />
            ))}
          </div>

          <h3>Workshops</h3>
          <div className="tjs-dept-event-list">
            {WORKSHOPS.map((w) => (
              <EventCard key={w.date + w.title} date={w.date} title={w.title} desc={w.desc} />
            ))}
          </div>

          <h3>Conferences</h3>
          <div className="tjs-dept-event-list">
            {CONFERENCES.map((c) => (
              <EventCard key={c.date + c.title} date={c.date} title={c.title} desc={c.desc} />
            ))}
          </div>

          <h3>Seminars &amp; Other Sessions</h3>
          <div className="tjs-dept-event-list">
            {SEMINARS_EVENTS.map((s) => (
              <EventCard key={s.date + s.title} date={s.date} title={s.title} desc={s.desc} />
            ))}
          </div>

          <h3>Alumni Interactions</h3>
          <div className="tjs-dept-event-list">
            {ALUMNI_INTERACTIONS.map((a) => (
              <EventCard key={a.date + a.title} date={a.date} title={a.title} desc={a.desc} />
            ))}
          </div>

          <h3>Faculty &amp; Student Achievements</h3>
          <div className="tjs-dept-event-list">
            {ACHIEVEMENTS.map((a) => (
              <EventCard key={a.date + a.title} date={a.date} title={a.title} desc={a.desc} />
            ))}
          </div>
        </section>

        <section id="internships" className="tjs-dept-section">
          <h2>Internships &amp; Placements</h2>
          <h3>Internships</h3>
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

          <h3>Placements – Major Recruiters</h3>
          <div className="tjs-dept-photo-grid">
            {RECRUITERS.map((r) => (
              <div className="tjs-dept-photo-box tjs-dept-logo-box" key={r}>{r}</div>
            ))}
          </div>

          <h3>Entrepreneurship</h3>
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

          <h3>Distinguished Alumni</h3>
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

        <section id="research" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Research &amp; Publications</h2>
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

          <h3>Publications (Dr. J. Prakash – 19 Journals)</h3>
          <ul className="tjs-dept-bullets">
            {PUBLICATIONS.map((pub) => (
              <li key={pub}>{pub}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
