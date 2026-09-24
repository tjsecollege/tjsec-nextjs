import DeptJumpNav from "../DeptJumpNav";

const FACULTY = [
  { name: "Dr. E. Sivakumar", qual: "Ph.D", joined: "22.08.2022", role: "Professor" },
  { name: "Dr. V. Valasamuthiram", qual: "Ph.D.", joined: "03.10.2022", role: "Professor" },
  { name: "Mr. R. Radhakrishnan", qual: "M.E", joined: "01.08.2015", role: "Assistant Professor" },
  { name: "Mr. M. Prakash", qual: "M.E", joined: "01.07.2016", role: "Assistant Professor" },
  { name: "Mr. S. Sathya Moorthi", qual: "M.E", joined: "01.07.2016", role: "Assistant Professor" },
  { name: "Mr. M. Vinoth Kumar", qual: "M.E", joined: "10.08.2016", role: "Assistant Professor" },
  { name: "Mr. R. Sathish Kumar", qual: "M.E.", joined: "01.07.2016", role: "Assistant Professor" },
  { name: "Mr. S. Dhilip Kumar", qual: "M.E", joined: "01.08.2015", role: "Assistant Professor" },
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

const PSOS = [
  "Apply the knowledge gained in Mechanical Engineering for design and development and manufacture of engineering systems.",
  "Apply the knowledge acquired to investigate research-oriented problems in mechanical engineering with due consideration for environmental and social impacts.",
  "Use the engineering analysis and data management tools for effective management of multidisciplinary projects.",
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

const LABS = [
  "Engineering Practices Laboratory",
  "Computer Aided Machine Drawing Laboratory",
  "Manufacturing Technology Laboratory",
  "Strength of Materials and Fluid Machinery Laboratory",
  "Thermal Engineering Laboratory",
  "Metrology and Dynamics Laboratory",
  "CAD/CAM Laboratory",
  "Heat Transfer Laboratory",
  "Mechatronics and IoT Laboratory",
];

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
        <DeptJumpNav
          items={[
            { href: "#about", label: "About" },
            { href: "#people", label: "Faculty & Staff" },
            { href: "#programmes", label: "Programmes Offered" },
            { href: "#facilities", label: "Facilities & Laboratories" },
            { href: "#library", label: "Library" },
          ]}
        />

        <section id="about" className="tjs-dept-section">
          <h2>About the Department</h2>
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

          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p style={{ marginBottom: 0 }}>
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

        <section id="people" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Faculty &amp; Staff</h2>
          <h3>Faculty</h3>
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
                {FACULTY.map((f, i) => (
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

          <h3>Visiting Faculty</h3>
          <p className="tjs-dept-pending">Nil.</p>

          <h3>Supporting Staff</h3>
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
          <h2>Programmes Offered</h2>
          <div className="tjs-dept-tabs">
            <button type="button" className="tjs-dept-tab active">B.E – Mechanical Engineering</button>
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

        <section id="facilities" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Facilities &amp; Laboratories</h2>
          <p>
            The department maintains state-of-art laboratories to meet the demands of practical knowledge for
            present industrial applications:
          </p>
          <ul className="tjs-dept-bullets">
            {LABS.map((lab) => (
              <li key={lab}>{lab}</li>
            ))}
          </ul>
          <div className="tjs-dept-photo-grid">
            {LABS.map((lab) => (
              <div className="tjs-dept-photo-box" key={lab}>Photo</div>
            ))}
          </div>

          <h3>Maker Space Laboratory</h3>
          <p>A dedicated hands-on facility where students work directly on machines to build and prototype ideas.</p>
          <div className="tjs-dept-photo-grid">
            <div className="tjs-dept-photo-box">Photo</div>
          </div>
        </section>

        <section id="library" className="tjs-dept-section">
          <h2>Department Library</h2>
          <div className="tjs-dept-grid-3">
            <div className="tjs-dept-card">
              <h3>Total Books</h3>
              <p style={{ marginBottom: 0 }}>577</p>
            </div>
          </div>
          <div className="tjs-dept-photo-grid">
            <div className="tjs-dept-photo-box">Photo</div>
          </div>
        </section>
      </div>
    </>
  );
}
