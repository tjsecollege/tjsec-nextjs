import DeptMegaNav from "../DeptMegaNav";
import PeopleCarousel from "../PeopleCarousel";
import MouTabsViewer from "../MouTabsViewer";
import YearGroupedVisits from "../YearGroupedVisits";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

function regDocUrl(file) {
  return "/assets/images/Regulations-and-Curriculam/" + file.split("/").map(encodeURIComponent).join("/");
}

const TOPPERS = [];

function auImg(n) {
  return "/assets/images/Anna_University_Faculty_Images/image_" + n + "." + ([22].includes(n) ? "jpeg" : "png");
}

const FACULTY = [
  { name: "Dr. Sivakumar E", degree: "Ph.D", designation: "Professor", auFin: "2692531978", aicteId: "1-3539280910", photo: auImg(70) },
  { name: "Mr. Radhakrishnan R", degree: "M.E", designation: "Assistant Professor", auFin: "2684121980", aicteId: "1-2918093421", photo: auImg(22) },
  { name: "Mr. Sathyamoorthi S", degree: "M.E", designation: "Assistant Professor", auFin: "2671211992", aicteId: "1-2191144207", photo: auImg(71) },
  { name: "Mr. Prakash M", degree: "M.E", designation: "Assistant Professor", auFin: "2655111991", aicteId: "1-3360918628", photo: auImg(72) },
  { name: "Mr. Sathish Kumar R", degree: "M.E.", designation: "Assistant Professor", auFin: "2673031992", aicteId: "1-3194544502", photo: auImg(73) },
  { name: "Mr. Vinothkumar M", degree: "M.E", designation: "Assistant Professor", auFin: "2692711990", aicteId: "1-3180185689", photo: auImg(42) },
];

const SUPPORTING_STAFF = [
  { name: "Mr. S. Dilli", qual: "ITI", joined: "07-07-2010", role: "Lab Instructor" },
  { name: "Mr. M. Murugavel", qual: "ITI", joined: "22-08-2013", role: "Lab Instructor" },
  { name: "Mr. R. Durgadevi", qual: "Diploma – Civil", joined: "01-05-2022", role: "Lab Instructor" },
];

const PEOS = [
  "Effectuating success in careers by exploring with the design, digital and computational analysis of engineering systems, experimentation and testing, smart manufacturing, technical services, and research.",
  "Amalgamating effectively with stakeholders to update and improve their core competencies and abilities to ethically compete in the ever-changing multicultural global enterprise.",
  "To encourage multi-disciplinary research and development to foster advanced technology, and to nurture innovation and entrepreneurship in order to compete successfully in the global economy.",
  "To globally share and apply technical knowledge to create new opportunities that proactively advances our society through team efforts and to solve various challenging technical, environmental and societal problems.",
  "To create world class mechanical engineers capable of practice engineering ethically with a solid vision to become great leaders in academia, industries and society.",
];

const POS = [
  { title: "PO1: Engineering Knowledge", text: "Apply the knowledge of mathematics, natural science, computing, and engineering fundamentals and an engineering specialisation to the solution of complex engineering problems." },
  { title: "PO2: Problem Analysis", text: "Identify, formulate, and analyse complex engineering problems, reaching substantiated conclusions with consideration for the holistic nature of the problem." },
  { title: "PO3: Design/Development of Solutions", text: "Design creative solutions for complex engineering problems and design systems, components, or processes to meet identified needs — with consideration for public health and safety, and cultural, societal, and environmental factors. Sustainability is now intrinsic to design." },
  { title: "PO4: Conduct Investigations of Complex Problems", text: "Conduct investigations of complex engineering problems using research-based knowledge and research methods, including design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions." },
  { title: "PO5: Engineering Tool Usage", text: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modelling — recognising their limitations — to solve complex engineering problems." },
  { title: "PO6: The Engineer and the World", text: "Analyse and evaluate societal and environmental aspects while solving complex engineering problems, considering their impact on sustainability with reference to economy, health, safety, legal frameworks, culture, and the environment." },
  { title: "PO7: Ethics", text: "Apply ethical principles and commit to professional ethics, human values, diversity, and inclusion; and adhere to relevant national and international laws." },
  { title: "PO8: Individual and Collaborative Team Work", text: "Function effectively as an individual, and as a member or leader in diverse and multidisciplinary teams." },
  { title: "PO9: Communication", text: "Communicate effectively and inclusively within the engineering community and with society at large — comprehending and writing effective reports and design documentation, and making effective presentations — considering cultural, language, and learning differences." },
  { title: "PO10: Project Management and Finance", text: "Apply knowledge and understanding of engineering management principles and economic decision-making, and apply these to one's own work, as a member and leader in a team, to manage projects in multi-disciplinary environments." },
  { title: "PO11: Life-Long Learning", text: "Recognise the need for, and have the preparation and ability for, independent and life-long learning, adaptability to new and emerging technologies, and critical thinking in the broadest context of technological change." },
];

const PSOS = [
  "Apply the knowledge gained in Mechanical Engineering for design and development and manufacture of engineering systems.",
  "Apply the knowledge acquired to investigate research-oriented problems in mechanical engineering with due consideration for environmental and social impacts.",
  "Use the engineering analysis and data management tools for effective management of multidisciplinary projects.",
];

const BOS_DOCS = [
  { label: "Mechanical Engineering 2026 Curriculum & Regulations (UG)", href: regDocUrl("Regulation-2026/TJSEC 2026 REGULATIONS - CURRICULUM - UG - MECH.pdf") },
  { label: "Mechanical Engineering 2025 Curriculum (UG)", href: regDocUrl("MECH/curriculam/B.E. Mechanical Engineering-2025.pdf") },
  { label: "Mechanical Engineering 2025 Regulations (UG)", href: regDocUrl("MECH/Regulations/AU- REGULATIONS 2025.pdf") },
  { label: "Mechanical Engineering 2021 Curriculum (UG)", href: regDocUrl("MECH/curriculam/B.E. Mech-2021.pdf") },
  { label: "Mechanical Engineering 2021 Regulations (UG)", href: regDocUrl("MECH/Regulations/UG Regulation 2021.pdf") },
];

const BOS_MEMBERS = [];
const NEWSLETTERS = [];
const MOU_DOCS = [];
const CONSULTANCY = [];
const STUDENT_PROJECTS = [];

const LABS = [
  { name: "Engineering Practices Laboratory", label: "About the Laboratory", desc: "" },
  { name: "Computer Aided Machine Drawing Laboratory", label: "About the Laboratory", desc: "" },
  { name: "Manufacturing Technology Laboratory", label: "About the Laboratory", desc: "" },
  { name: "Strength of Materials and Fluid Machinery Laboratory", label: "About the Laboratory", desc: "" },
  { name: "Thermal Engineering Laboratory", label: "About the Laboratory", desc: "" },
  { name: "Metrology and Dynamics Laboratory", label: "About the Laboratory", desc: "" },
  { name: "CAD/CAM Laboratory", label: "About the Laboratory", desc: "" },
  { name: "Heat Transfer Laboratory", label: "About the Laboratory", desc: "" },
  { name: "Mechatronics and IoT Laboratory", label: "About the Laboratory", desc: "" },
];

const INDUSTRIAL_VISITS = [];
const INTERNSHIPS = [];
const CONFERENCES = [];
const GUEST_LECTURES = [];
const FDPS_ATTENDED = [];
const WORKSHOPS = [];
const OTHER_DEPT_EVENTS = [];
const SEMINARS_EVENTS = [];
const RECRUITERS = [];
const PLACED_STUDENTS = [];
const FACULTY_ACHIEVEMENTS = [];
const CO_CURRICULAR = [];
const EXTRA_CURRICULAR = [];
const ALUMNI_INTERACTIONS = [];
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

export default function MechanicalDepartment() {
  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">Department</span>
          <h1>Mechanical Engineering</h1>
          <p>
            Established in 2009, the Department of Mechanical Engineering offers a four-year undergraduate degree
            programme with an annual intake of 120 students, backed by state-of-the-art laboratories and a
            dedicated, highly qualified faculty.
          </p>
        </div>
        <div className="tjs-dept-hero-image">
          <img src="/assets/images/campus/computer-lab-02.jpg" alt="Mechanical Engineering laboratory at T.J.S Engineering College" />
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
            The Department of Mechanical Engineering was established in the year 2009. The department offers a
            four year under graduate degree program in Mechanical Engineering with an annual intake of 120
            students. Mechanical engineering is one of the largest and most versatile programs with various
            applications virtually in every field and industry. Of all engineering disciplines, mechanical
            engineering is the most diversified branch which offers largest selection of career paths and is
            intended to develop individual initiative, creativity, and more.
          </p>
          <p>
            The department is blessed with a set of hard working and dedicated staff with illustrious educational
            backgrounds. Also the department has well-structured facilities by keeping on par with global standards
            to meet the present technological advancements and industrial requirements. The department has been
            consistently producing proficient students both in knowledge and character, with state-of-art
            laboratories to meet the demands of practical knowledge in present industrial applications.
          </p>
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision and Mission</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p>
                To provide quality education and focus on students to promote innovation leading to responsible
                engineers who will be able to meet the emerging needs of the society.
              </p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <ul>
                <li>Imparting quality education and strong academic practices to the students and enhancing their skills to make them competitive and competent mechanical engineers.</li>
                <li>To provide facilities and opportunities to the students and faculties for creating, interpreting, applying and disseminating knowledge.</li>
                <li>To enhance the overall academic performance of the students gradually, thereby increasing employment opportunities.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="hod" className="tjs-dept-section">
          <h2>HOD&apos;s Desk</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="magazine" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Magazine</h2>
          <LinkList items={NEWSLETTERS} />
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
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Date of Joining</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {SUPPORTING_STAFF.map((f, i) => (
                  <tr key={f.name}>
                    <td>{i + 1}</td>
                    <td>{f.name}</td>
                    <td>{f.qual}</td>
                    <td>{f.joined}</td>
                    <td>{f.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="programmes" className="tjs-dept-section">
          <h2>Programme Offered</h2>
          <div className="tjs-dept-tabs">
            <button type="button" className="tjs-dept-tab active">B.E &ndash; Mechanical Engineering</button>
          </div>

          <h3>Program Educational Objectives (PEOs)</h3>
          <div className="tjs-dept-peo-list">
            {PEOS.map((peo, i) => (
              <div className="tjs-dept-peo" key={i}><p>{i + 1}. {peo}</p></div>
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
              <div className="tjs-dept-peo" key={i}><p>{i + 1}. {pso}</p></div>
            ))}
          </div>
        </section>

        <section id="bos" className="tjs-dept-section tjs-dept-section-alt">
          <h2>BOS</h2>
          <h3>Board of Studies Composition</h3>
          <p className="tjs-dept-pending">Content coming soon.</p>
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
          {INDUSTRIAL_VISITS.length > 0 ? (
            <YearGroupedVisits items={INDUSTRIAL_VISITS} title="Industry Visits" />
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
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
          <p>
            The department maintains state-of-art laboratories to meet the demands of practical knowledge for
            present industrial applications:
          </p>
          <ul className="tjs-dept-bullets">
            {LABS.map((lab) => (
              <li key={lab.name}>{lab.name}</li>
            ))}
          </ul>

          <h3>Maker Space Laboratory</h3>
          <p>A dedicated hands-on facility where students work directly on machines to build and prototype ideas.</p>

          <h3>Department Library</h3>
          <div className="tjs-dept-grid-3">
            <div className="tjs-dept-card">
              <h3>Total Books</h3>
              <p style={{ marginBottom: 0 }}>577</p>
            </div>
          </div>
        </section>

        <section id="conferences" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Conference</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="fdp-workshop" className="tjs-dept-section">
          <h2>Guest Lecturer, FDP &amp; Workshop</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="value-added-course" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Value Added Course</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="symposium" className="tjs-dept-section">
          <h2>Symposium</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="seminars" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Seminars &amp; Activities</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
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
          <p className="tjs-dept-pending">Content coming soon.</p>
        </section>

        <section id="students-achievements" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Students Achievements</h2>
          <LinkList items={STUDENT_PROJECTS} />
        </section>

        <section id="co-curricular" className="tjs-dept-section">
          <h2>Co-Curricular</h2>
          <p className="tjs-dept-pending">Content coming soon.</p>
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
