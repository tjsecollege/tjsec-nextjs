import { getDepartment } from "../../../lib/wordpress";
import ProgrammesTabs from "./ProgrammesTabs";
import DeptJumpNav from "../DeptJumpNav";

const CHART_X_MAX = 60;
const CHART_Y_MIN = 2019;
const CHART_Y_MAX = 2025;
const CHART_W = 860;
const CHART_H = 380;
const PAD_L = 60;
const PAD_R = 30;
const PAD_T = 30;
const PAD_B = 55;

function chartX(students) {
  return PAD_L + (students / CHART_X_MAX) * (CHART_W - PAD_L - PAD_R);
}
function chartY(year) {
  return CHART_H - PAD_B - ((year - CHART_Y_MIN) / (CHART_Y_MAX - CHART_Y_MIN)) * (CHART_H - PAD_T - PAD_B);
}
function chartR(students, maxStudents) {
  return 9 + 24 * Math.sqrt(students / maxStudents);
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export const revalidate = 3600;

export default async function CSEDepartment() {
  const dept = await getDepartment("cse");

  if (!dept) {
    return (
      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2>Computer Science and Engineering</h2>
          <p className="tjs-dept-pending">Content is being updated. Please check back soon.</p>
        </section>
      </div>
    );
  }

  const maxInternshipStudents = Math.max(...dept.internships.map((r) => r.students), 1);

  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">{dept.hero_label}</span>
          <h1>{dept.title}</h1>
          <p>{dept.hero_description}</p>
        </div>
        <div className="tjs-dept-hero-image">
          <img
            src={dept.heroImage || "/assets/images/campus/computer-lab-01.jpg"}
            alt={`${dept.title} lab at T.J.S Engineering College`}
          />
        </div>
      </section>

      <div className="tjs-dept-page">
        <DeptJumpNav
          items={[
            { href: "#about", label: "About" },
            { href: "#hod", label: "HOD's Desk" },
            { href: "#people", label: "Faculty & Staff" },
            { href: "#programmes", label: "Programmes Offered" },
            { href: "#regulations", label: "Regulations" },
            { href: "#curriculum", label: "Curriculum & Syllabi" },
            { href: "#industry", label: "Industry Interface" },
            { href: "#research", label: "Research" },
            { href: "#facilities", label: "Facilities" },
          ]}
        />

        <section id="about" className="tjs-dept-section">
          <h2>About the Department</h2>
          {dept.about_paragraphs.map((text, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
          ))}

          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>Vision</h3>
              <p>{dept.vision}</p>
            </div>
            <div className="tjs-dept-card">
              <h3>Mission</h3>
              <ul>
                {dept.mission_points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
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
              <h3>Welcome to the Department of {dept.title}</h3>
              {dept.hod_message.map((text, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
              <p className="tjs-dept-hod-quote">&ldquo;{dept.hod_quote}&rdquo;</p>
              <p className="tjs-dept-hod-sign">
                {dept.hod_signature.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < dept.hod_signature.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        <section id="people" className="tjs-dept-section">
          <h2>Faculty &amp; Staff</h2>
          <h3>Faculty</h3>
          {dept.faculty.length ? (
            <div className="tjs-dept-people-grid">
              {dept.faculty.map((person) => (
                <div className="tjs-dept-people-card" key={person.name}>
                  <div className="tjs-dept-people-photo">
                    {person.photo ? <img src={person.photo} alt={person.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{person.name}</h4>
                  <p className="tjs-dept-people-role">{person.grade}</p>
                  <p className="tjs-dept-people-spec">{person.specialization}</p>
                  {person.email ? (
                    <a href={"mailto:" + person.email} className="tjs-dept-people-email">
                      {person.email}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Faculty details (name, grade, specialization, email) will be updated soon.</p>
          )}

          <h3>Non-Teaching Staff</h3>
          {dept.non_teaching_staff.length ? (
            <div className="tjs-dept-people-grid">
              {dept.non_teaching_staff.map((person) => (
                <div className="tjs-dept-people-card" key={person.name}>
                  <div className="tjs-dept-people-photo">
                    {person.photo ? <img src={person.photo} alt={person.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{person.name}</h4>
                  <p className="tjs-dept-people-role">{person.designation}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Non-teaching staff details will be updated soon.</p>
          )}
        </section>

        <section id="programmes" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Programmes Offered</h2>
          <ProgrammesTabs programmes={dept.programmes} />
        </section>

        <section id="regulations" className="tjs-dept-section">
          <h2>Regulations</h2>
          <h3>UG Regulations</h3>
          <div className="tjs-dept-link-list">
            {dept.regulations_ug.map((item) => (
              <a href={item.url} key={item.label}>
                <span>{item.label}</span>
                <span className="tjs-dept-link-arrow">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
          <h3>PG Regulations</h3>
          <div className="tjs-dept-link-list">
            {dept.regulations_pg.map((item) => (
              <a href={item.url} key={item.label}>
                <span>{item.label}</span>
                <span className="tjs-dept-link-arrow">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="curriculum" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Curriculum &amp; Syllabi</h2>
          <h3>Undergraduate</h3>
          <div className="tjs-dept-link-list">
            {dept.syllabus_ug.map((item) => (
              <a href={item.url} key={item.label}>
                <span>{item.label}</span>
                <span className="tjs-dept-link-arrow">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
          <h3>Postgraduate</h3>
          <div className="tjs-dept-link-list">
            {dept.syllabus_pg.map((item) => (
              <a href={item.url} key={item.label}>
                <span>{item.label}</span>
                <span className="tjs-dept-link-arrow">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="industry" className="tjs-dept-section">
          <h2>Industry Interface</h2>
          <h3>Areas of Industrial Training</h3>
          <p>The following training programs can be organised either on campus or onsite:</p>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Training Program</th>
                  <th>Contact Details</th>
                </tr>
              </thead>
              <tbody>
                {dept.trainings.map((row, i) => (
                  <tr key={row.program}>
                    <td>{i + 1}</td>
                    <td>{row.program}</td>
                    <td>{row.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Internships and In-plant Trainings</h3>
          <div className="tjs-dept-bubble-wrap">
            <svg viewBox={"0 0 " + CHART_W + " " + CHART_H} className="tjs-dept-bubble-svg" role="img" aria-label="Internships and in-plant trainings by company and academic year">
              <text x={CHART_W / 2} y={18} textAnchor="middle" className="tjs-bubble-title">
                Internships and In-plant Trainings
              </text>

              {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                <g key={year}>
                  <line x1={PAD_L} x2={CHART_W - PAD_R} y1={chartY(year)} y2={chartY(year)} className="tjs-bubble-grid" />
                  <text x={PAD_L - 10} y={chartY(year)} textAnchor="end" dominantBaseline="middle" className="tjs-bubble-axis-label">
                    {year}
                  </text>
                </g>
              ))}

              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((val) => (
                <text key={val} x={chartX(val)} y={CHART_H - PAD_B + 22} textAnchor="middle" className="tjs-bubble-axis-label">
                  {val}
                </text>
              ))}
              <text x={(CHART_W - PAD_R + PAD_L) / 2} y={CHART_H - 6} textAnchor="middle" className="tjs-bubble-axis-title">
                No of Students
              </text>
              <text
                x={-CHART_H / 2}
                y={16}
                textAnchor="middle"
                transform="rotate(-90)"
                className="tjs-bubble-axis-title"
              >
                Academic Year
              </text>

              {dept.internships.map((row) => (
                <circle
                  key={row.company}
                  cx={chartX(row.students)}
                  cy={chartY(row.year)}
                  r={chartR(row.students, maxInternshipStudents)}
                  fill={row.color}
                  opacity="0.9"
                />
              ))}
            </svg>
            <div className="tjs-dept-bubble-legend">
              {dept.internships.map((row) => (
                <span className="tjs-dept-bubble-legend-item" key={row.company}>
                  <span className="tjs-dept-bubble-dot" style={{ background: row.color }}></span>
                  {row.company}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Research</h2>
          <div className="tjs-dept-grid-3">
            <div className="tjs-dept-card">
              <h3>Areas of Research</h3>
              <p className="tjs-dept-pending">{dept.research_areas}</p>
            </div>
            <div className="tjs-dept-card">
              <h3>Funded Projects</h3>
              <p className="tjs-dept-pending">{dept.research_funded_projects}</p>
            </div>
            <div className="tjs-dept-card">
              <h3>Seed Money for Research</h3>
              <p className="tjs-dept-pending">{dept.research_seed_money}</p>
            </div>
          </div>
        </section>

        <section id="facilities" className="tjs-dept-section">
          <h2>Facilities</h2>
          <h3>Academic Laboratories</h3>
          <ul className="tjs-dept-bullets">
            {dept.facilities_labs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Centres of Competency</h3>
          <ul className="tjs-dept-bullets">
            {dept.facilities_centres.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
