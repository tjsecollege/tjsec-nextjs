"use client";

import { useState } from "react";

const FACULTY = [
  {
    name: "Ms. R. Padmini",
    designation: "Assistant Professor in English",
    qualification: "M.A., M.Phil. in English, B.Ed.",
    experience: "23 Years",
    email: "padmini@tjsec.in",
    photo: "/assets/images/Department_of_English/image_2.png",
  },
  {
    name: "Dr. J.P. Poornima",
    designation: "Assistant Professor",
    qualification: "M.A., M.Phil., Ph.D., NET",
    experience: "14 Years",
    email: "poornima.12jp@tjsec.in",
    photo: "/assets/images/Department_of_English/image_3.png",
  },
  {
    name: "Dr. K. R. Vivek",
    designation: "Assistant Professor",
    qualification: "M.A., M.Phil., Ph.D.",
    experience: "8 Years",
    email: "vivek199377@gmail.com",
    photo: "/assets/images/Department_of_English/image_4.png",
    activities: [
      "Published a paper titled “The Role of Racial Discrimination in Zakes Mda's – Black Diamond” in the National Seminar conducted on 5th March 2020 by Sacred Heart College of Arts & Science, Thirupatur. ISSN: 2321-984X.",
      "Published a paper in UGC Care titled “Impact of Poverty on African Women: A Critical Analysis of Buchi Emecheta's Second Class Citizen” in Kala Sarovar Publication, Vol-24 No.05, October–December 2021. ISSN: 0975-4520.",
      "Published a paper in UGC Care titled “Gender Politics in Buchi Emecheta's The Bride Price” in Kalyan Bharathi Publication, Volume 36 No. (XXVI), October 2021. ISSN: 0976-0822.",
      "Published a book chapter and received a Certificate of Global Achiever – 2024 for poem writing in Thirukkural, conducted for the Thiruvalluvar Book of Global Achiever in Puducherry.",
      "Presented a paper titled “From Chalkboards to Chatbots: The Role of AI in English Language Teaching” at the National Conference on Recent Trends in Science, Engineering and Management (NCRTSET-2025), organized by T.J.S. Engineering College on 21st May 2025.",
      "Participated in a National Level Seminar organized by Muzhal Uloom College, Ambur.",
      "Participated in a National Level Seminar organized by Sacred Heart College of Arts & Science, Thirupatur.",
      "Participated in a two-day international web conference on English Literature from our frontier nations (Pakistan, Bangladesh, Nepal and Sri Lanka), organised by the Research and PG Department of English, Sacred Heart College of Arts & Science, Thirupatur, on 11th and 12th May 2022.",
      "Participated in the One Week Online Faculty Development Programme titled “Reading and Researching the Literature of Crisis”, organised by the Department of Humanities and Social Sciences, NIT Trichy, in collaboration with the UNESCO Chair in Vulnerability Studies, University of Hyderabad, from 22nd to 28th January 2024.",
      "Participated in a 7-day National Level FDP on Python organized by Star International Foundation for Research and Education, from 19.03.2024 to 25.03.2024.",
      "Participated in a 14-day International Virtual Level Faculty Development Programme on Foresights into English Language Teaching and Research – FELTR'24, organised by the Department of English, Saveetha Engineering College, from 9th to 25th September 2024.",
      "Participated in a 5-day International Online Level FDP organized by the Department of English, NPSBCET, from 25th to 29th August 2025.",
      "Participated in a Six-Day Online International Faculty Development Programme on Active Learning Methods in Teaching Learning Process, organized by the Department of English, Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College, Avadi, Chennai, from 07.08.2025 to 13.08.2025.",
      "Participated in the 7-Day International Online Faculty Development Programme titled “Recent Developments and Applications in Advanced Materials”, St. Joseph College of Engineering, Sriperumbudur, held from 03.03.2025 to 09.03.2025.",
      "Participated in an online International Webinar on “Words Across Worlds: A Comparative Lens on Literature and Translation”, organized by Nucleus of Learning and Development, India, on 19th October 2024.",
    ],
  },
];

const CATEGORIES = [
  { id: "objectives", label: "Objectives" },
  { id: "faculty", label: "Faculty Profile" },
  { id: "staff", label: "Staff Profile" },
  { id: "scholars", label: "Research Scholars" },
];

function FacultyProfile({ f }) {
  return (
    <div className="tjs-dept-card" style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        <img
          src={f.photo}
          alt={f.name}
          style={{ width: 110, height: 130, objectFit: "cover", borderRadius: 8, flex: "0 0 auto" }}
        />
        <div style={{ flex: "1 1 240px" }}>
          <h3 style={{ marginTop: 0, marginBottom: 6 }}>{f.name}</h3>
          <p style={{ margin: "0 0 4px" }}>
            <strong>{f.designation}</strong>
          </p>
          <p style={{ margin: "0 0 4px" }}>{f.qualification}</p>
          <p style={{ margin: "0 0 4px" }}>Experience: {f.experience}</p>
          <p style={{ margin: 0 }}>
            Email: <a href={`mailto:${f.email}`}>{f.email}</a>
          </p>
        </div>
      </div>

      {f.activities && (
        <>
          <h4 style={{ marginTop: 20 }}>Publications &amp; Activities</h4>
          <ol className="tjs-dept-bullets">
            {f.activities.map((a, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                {a}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default function EnglishDepartment() {
  const [activeCat, setActiveCat] = useState("objectives");

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Departments</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Department of English</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Department of English
          </h2>

          <div className="tjs-approvals-layout">
            <aside className="tjs-approvals-sidebar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={"tjs-approvals-cat" + (activeCat === cat.id ? " active" : "")}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </aside>

            <div className="tjs-approvals-panel">
              {activeCat === "objectives" && (
                <div className="tjs-committee-body">
                  <h4>Department of English</h4>
                  <p>
                    The Department of English at T.J.S. Engineering College focuses on developing the
                    linguistic, communicative, and professional competencies required for engineers to operate
                    effectively in academic, industrial, and global environments. The department adopts a
                    technology-integrated approach to language development, with emphasis on technical
                    communication, professional discourse, academic writing, presentation skills, workplace
                    interaction, and employability-oriented communication.
                  </p>
                  <p>
                    The Language Laboratory provides a structured digital environment for developing listening
                    comprehension, speech production, pronunciation, phonological awareness, vocabulary
                    acquisition, fluency, and interactive communication. Students engage in activities such as
                    simulated interviews, group discussions, technical presentations, role plays, professional
                    conversations, and structured speaking exercises. The department also develops competencies
                    in technical documentation, report preparation, business correspondence, resume
                    development, and academic communication.
                  </p>
                  <p>
                    Through this integrated approach, T.J.S. Engineering College seeks to produce technically
                    proficient graduates who can articulate ideas with clarity, collaborate effectively, and
                    communicate confidently across professional and multidisciplinary settings.
                  </p>
                </div>
              )}

              {activeCat === "faculty" && (
                <div className="tjs-committee-body">
                  <h4>Faculty Profile</h4>
                  {FACULTY.map((f) => (
                    <FacultyProfile f={f} key={f.name} />
                  ))}
                </div>
              )}

              {activeCat === "staff" && (
                <div className="tjs-committee-body">
                  <h4>Staff Profile</h4>
                  <p className="tjs-dept-pending">Content coming soon.</p>
                </div>
              )}

              {activeCat === "scholars" && (
                <div className="tjs-committee-body">
                  <h4>Research Scholars</h4>
                  <p className="tjs-dept-pending">Content coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
