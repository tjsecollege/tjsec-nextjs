"use client";

import { useEffect, useRef, useState } from "react";
import DeptJumpNav from "../DeptJumpNav";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const FACULTY = [
  { name: "J. Agnes", qual: "B.Tech (IT), M.E (CSE), (Ph.D)", role: "Assistant Professor", email: "agnes@tjsec.in" },
  { name: "N. Anu", qual: "B.Tech (IT), M.E (CSE)", role: "Assistant Professor", email: "anu@tjsec.in" },
  { name: "Godwinjosep Paul", qual: "B.Tech (IT), M.E (CSE)", role: "Assistant Professor", email: "" },
  { name: "R. Antony Juliet", qual: "B.Tech (IT), M.E (CSE), (Ph.D)", role: "Assistant Professor", email: "antonyjuliet@tjsec.in" },
  { name: "Priyanka M", qual: "M.E", role: "Assistant Professor", email: "" },
  { name: "Vutuchuru Vasantha M", qual: "M.Tech", role: "Assistant Professor", email: "" },
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

const INDUSTRIAL_VISITS = [
  {
    date: "04-08-2025",
    title: "RETECH, Selvanagar & Kancheepuram (III Year)",
    desc: "Industrial visit to RETECH, Selvanagar, Kadaperi West, Chennai, with additional stops at Kancheepuram and Old Perungalathur, organised jointly by the Department of CSE (AI&ML) and Department of Information Technology.",
    imgs: [
      { src: "/assets/images/it/it_web_pg/image_16.jpg", alt: "Industrial Visit to RETECH, Selvanagar, Kadaperi West" },
      { src: "/assets/images/it/it_web_pg/image_9.jpg", alt: "Students at the RETECH Industrial Visit" },
      { src: "/assets/images/it/it_web_pg/image_17.jpg", alt: "Industrial Visit session at Kancheepuram" },
      { src: "/assets/images/it/it_web_pg/image_18.jpg", alt: "Industrial Visit session at Old Perungalathur" },
    ],
  },
  {
    title: "TANSAM, TIDEL Park (III Year)",
    desc: "Industrial visit to TANSAM, TIDEL Park, Rajiv Gandhi IT Expressway, Tharamani, Chennai on 3rd February, organised jointly by the Department of CSE (AI&ML) and Department of Information Technology. Resource person Mr. Natesh explained the usage of Virtual Reality & Augmented Reality, the technical skills required for IoT, and the importance of AI in day-to-day life such as traffic control and AI integration, along with ML certification and career opportunities.",
    imgs: [{ src: "/assets/images/it/it_web_pg/image_10.jpg", alt: "Industrial Visit to TANSAM, TIDEL Park", wide: true }],
  },
  {
    date: "25-10-2025",
    title: "Lohmanradhri Towers, Egmore, Chennai",
    desc: "Industrial visit to Lohmanradhri Towers, Pantheon Road, Egmore, Chennai, by the Department of Information Technology, including a session on “Cybersecurity: The Skills, Tools, and Career.”",
    imgs: [
      { src: "/assets/images/it/it_web_pg/image_19.jpg", alt: "Industrial Visit to Lohmanradhri Towers, Egmore" },
      { src: "/assets/images/it/it_web_pg/image_20.jpg", alt: "Session at Lohmanradhri Towers, Egmore" },
      { src: "/assets/images/it/it_web_pg/image_21.jpg", alt: "Cybersecurity session at Lohmanradhri Towers, Egmore" },
    ],
  },
  {
    title: "DIGIAURA, Ekkattuthangal",
    desc: "Industrial visit to DigiAura, Ekkattuthangal, on 20th February 2026, by the Department of IT and AI-ML. Resource person Mr. Stalin explained the usage of VFX in Media and Cinema, the technical skills required for animation, and the importance of VFX in international films such as Avatar, the Marvel universe and blockbuster Kollywood films, and provided a brochure on certifications and career opportunities.",
    imgs: [{ src: "/assets/images/it/it_web_pg/image_12.jpg", alt: "Industrial Visit to DigiAura, Ekkattuthangal", wide: true }],
  },
  {
    date: "21-08-2026",
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

const WORKSHOPS = [
  {
    date: "23-09-2025",
    title: "Computer Laboratory Workshop, Puduvoyal",
    desc: "Students of the Department of Information Technology participated in a workshop held at the Main Building computer laboratory, Puduvoyal.",
    imgs: [
      { src: "/assets/images/it/it_web_pg/image_1.jpg", alt: "Workshop session in the computer laboratory" },
      { src: "/assets/images/it/it_web_pg/image_4.jpg", alt: "Workshop session on Cyberattack awareness" },
      { src: "/assets/images/it/it_web_pg/image_5.jpg", alt: "Workshop session presentation" },
      { src: "/assets/images/it/it_web_pg/image_3.jpg", alt: "Group photo at the close of the workshop" },
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
];

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
        <DeptJumpNav
          items={[
            { href: "#about", label: "About" },
            { href: "#hod", label: "HOD's Desk" },
            { href: "#people", label: "Faculty & Staff" },
            { href: "#programmes", label: "Programmes Offered" },
            { href: "#curriculum", label: "Curriculum" },
            { href: "#regulations", label: "Regulations" },
            { href: "#facilities", label: "Facilities & Library" },
            { href: "#industry", label: "Industry Interface" },
            { href: "#events", label: "Events & Achievements" },
            { href: "#research", label: "Research" },
          ]}
        />

        <section id="about" className="tjs-dept-section">
          <h2>About the Department</h2>
          <p>
            The Department of Information Technology was established in the academic year 2024–2028 with an initial intake of 60 students. The department offers a four-year B.Tech degree program in Information Technology.
          </p>
          <p>
            The department is committed to delivering quality technical education in the field of Information Technology. It focuses on developing technically competent, ethically strong, and socially responsible professionals who are capable of meeting the challenges of the rapidly evolving IT industry.
          </p>
          <p>The mission of the Department of Information Technology is to provide value-based education, enhance employability skills, encourage innovation, and nurture entrepreneurial abilities among students through effective teaching-learning methodologies. The department continuously upgrades its curriculum and infrastructure to align with global industry standards.</p>

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
                    <td>{f.email ? <a href={"mailto:" + f.email}>{f.email}</a> : null}</td>
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
          <h2>Curriculum &amp; Syllabus</h2>
          <h3>Undergraduate</h3>
          <div className="tjs-dept-link-list">
            <a href="/assets/pdf/IT%202026%20CURRICULUM%20AND%20SYLLABUS%20UG.pdf" target="_blank" rel="noopener">
              <span>B.Tech Information Technology – Curriculum &amp; Syllabus (Regulations 2026)</span>
              <span className="tjs-dept-link-arrow">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </section>

        <section id="regulations" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Regulations</h2>
          <h3>Undergraduate</h3>
          <div className="tjs-dept-link-list">
            <a href="/assets/pdf/IT%202026%20REGULATIONS%20UG.pdf" target="_blank" rel="noopener">
              <span>B.Tech Information Technology – Academic Regulations 2026</span>
              <span className="tjs-dept-link-arrow">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </section>

        <section id="facilities" className="tjs-dept-section">
          <h2>Facilities &amp; Library</h2>
          <h3>Laboratories</h3>
          <div className="tjs-dept-media-row">
            <div className="tjs-dept-media-row-text">
              <ul className="tjs-dept-bullets">
                <li>Computer Laboratory</li>
              </ul>
              <p>
                The Information Technology Laboratory of the Department of Information Technology is designed to
                provide students with hands-on experience in computer programming, software development, database
                management, networking, web technologies, and information systems.
              </p>
              <p>
                The laboratory supports practical learning in areas such as programming languages, data structures,
                database systems, web development, computer networks, operating systems, software engineering, and
                emerging information technologies. Through systematic laboratory exercises and projects, students
                develop essential skills in problem-solving, algorithm design, coding, system development, data
                management, and software testing.
              </p>
              <p>
                The laboratory bridges the gap between theoretical concepts and practical applications, enabling
                students to apply classroom knowledge to real-world computing problems. It provides an environment
                for students to develop technical, analytical, and programming skills required for careers in
                software development, information technology, data management, networking, and related industries.
              </p>
            </div>
            <div className="tjs-dept-media-row-img">
              <img src="/assets/images/it/it_web_pg/image_15.jpg" alt="Information Technology Laboratory" />
            </div>
          </div>

          <hr className="tjs-dept-divider" />

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
            <div className="tjs-dept-media-row-img">
              <img src="/assets/images/it/it_web_pg/image_7.jpeg" alt="Department of Information Technology library shelves" />
            </div>
          </div>
        </section>

        <section id="industry" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Industry Interface</h2>
          <h3>Industrial Visits</h3>
          <div className="tjs-dept-event-list">
            {INDUSTRIAL_VISITS.map((v) => (
              <EventCard key={v.title} date={v.date} title={v.title} desc={v.desc} imgs={v.imgs} />
            ))}
          </div>

          <hr className="tjs-dept-divider" />

          <h3>Workshops</h3>
          <div className="tjs-dept-event-list">
            {WORKSHOPS.map((w) => (
              <EventCard key={w.title} date={w.date} title={w.title} desc={w.desc} imgs={w.imgs} />
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

          <h3>Publications Summary</h3>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date / Year Published</th>
                  <th>Topic / Research Paper Title</th>
                  <th>Publication / Journal</th>
                  <th>Impact Factor</th>
                  <th>Citations</th>
                </tr>
              </thead>
              <tbody>
                {PUBLICATIONS.map((p, i) => (
                  <tr key={p.title}>
                    <td>{i + 1}</td>
                    <td>{p.year}</td>
                    <td>{p.title}</td>
                    <td>{p.journal}</td>
                    <td>{p.impactFactor || "—"}</td>
                    <td>{p.citations || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
      </div>
    </>
  );
}
