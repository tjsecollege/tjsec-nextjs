"use client";

import { useState } from "react";

const FACULTY = [
  {
    name: "Dr. P. Venkata Mohan Reddy",
    designation: "Professor and HoD",
    qualification: "M.Sc., M.Phil., Ph.D.,",
    experience: "26 Years",
    email: "drvmr.maths@tjsec.in",
    orcid: "https://orcid.org/0000-0002-8871-546X",
    scopus: "57218377319",
    photo: "/assets/images/Department_of_Maths/image_4.png",
    publications: [
      {
        text: "Sivakumar. P, Balaji. R, Ramesh. A, P. Venkata Mohan Reddy, Andal Srinivasan, Muthucumaraswamy Rajamanickam. (2025), Simulation of reactive flow over a parabolic vertical plate using MATLAB, Indonesian Journal of Electrical Engineering and Computer Science, Vol. 39, No. 3, September 2025, pp. 1673-1682.",
      },
      {
        text: "M. Sundar Raj, G. Nagarajan, B. Saravanan, Venkata Mohan Reddy Polaka, D. Kalaiyarasi and J. Venkatesan. (2025). Computational Dynamics of an Improved Inclined Plate with Variable Temperature and Variable Mass Diffusion in the Existence of Thermal Convection Effects. ARPN Journal of Engineering and Applied Sciences, 20(15), 1243-1255.",
      },
      {
        text: "Nagarajan Gnanavel, Sundarraj Mariadoss, Venkatesan Jayavelu, Venkata Mohan Reddy Polaka, Muthucumaraswamy Rajamanickam. (2025). Chemical Process Effects on a Sloped Surface with Changing Mass and Consistent Temperature. Chemical Industry & Chemical Engineering Quarterly, 31(2), 151–161.",
      },
      {
        text: "Sumathy, M., Venkata Mohan Reddy, P., Maria Susai Manuel, M., & Syed Ali, M. (2022). Oscillation of Third-Order Nonlinear Generalized Difference Equation with Multiple Neutral Terms. Mathematical Problems in Engineering, Hindawi, Article 8103094.",
      },
      {
        text: "Leo Amalraj, J., Venkata Mohan Reddy, P., & Maria Susai Manuel, M. (2021). Oscillation and Non-Oscillation of Fourth Order Neutral Distributed Delay Generalized Difference Equation. Advances in Dynamical Systems and Applications, 16(2), 1006-1018.",
      },
      {
        text: "Sumathy, M., Venkata Mohan Reddy, P., & Maria Susai Manuel, M. (2021). Qualitative Property of Third-Order Nonlinear Neutral Distributed-Delay Generalized Difference Equations. Mathematical Problems in Engineering, Hindawi, Article ID 2875613. doi:10.1155/2021/2875613.",
      },
      {
        text: "Venkata Mohan Reddy, P., & Maria Susai Manuel, M. (2020). Oscillation criteria for higher order nonlinear neutral delay generalized α-difference equation. Advances in Mathematics: Scientific Journal, 9(9), 7611-7628.",
      },
      {
        text: "Leo Amalraj, J., Maria Susai Manuel, M., Dilip, D.S., & Venkata Mohan Reddy, P. (2020). Stability and boundedness properties of a rational exponential difference equation. Advances in Mathematics: Scientific Journal, 9(7), 4945-4954.",
      },
      {
        text: "Venkata Mohan Reddy, P., & Maria Susai Manuel, M. (2020). Oscillation of a class of third order generalized functional difference equation. Advances in Mathematics: Scientific Journal, 9(7), 4369-4382.",
      },
      {
        text: "Venkata Mohan Reddy, P., Maria Susai Manuel, M., & Adem Kilicman. (2020). The qualitative property of numerical solution of third order sublinear neutral-delay generalized difference equation. Applied Mathematics & Information Sciences, 14(2), 215-222.",
      },
      {
        text: "Venkata Mohan Reddy, P., Maria Susai Manuel, M., & Adem Kilicman. (2019). Oscillation Criteria for Third Order Neutral Generalized Difference Equations with Distributed Delay. Symmetry, doi:10.3390/sym11121501.",
      },
      {
        text: "Adem Kilicman, Venkata Mohan Reddy, P., & Maria Susai Manuel, M. (2018). Oscillation criteria for a class of nonlinear neutral generalized α−difference equations. Applied Mathematics & Information Sciences, 12(4), 807-813.",
      },
      {
        text: "Maria Susai Manuel, M., & Venkata Mohan Reddy, P. (2017). Oscillation criteria for second order linear generalized difference equations. International Journal of Pure and Applied Mathematics, 114(3), 639-646.",
      },
    ],
  },
  {
    name: "Mr. M. Vidhurankumar",
    designation: "Assistant Professor",
    qualification: "M.Sc., M.Phil., M.Ed., (Ph.D).,",
    experience: "18 Years, 1 month",
    email: "vidhurankumar@tjsec.in",
    orcid: "https://orcid.org/0009-0006-5775-1085",
    photo: "/assets/images/Department_of_Maths/image_3.png",
    sections: [
      {
        heading: "Papers Presented in International / National Conferences",
        items: [
          "“Thermal Analysis in Rheo-Dynamic Lubrication of an Externally Pressurized Thrust Bearing Using Bingham Lubricant,” First International Conference on Advancing Innovative Technologies for a Sustainable Environment (AITSE-2026), Pondicherry University, Puducherry, 27–28 August 2026.",
          "“A Study on Thermal Effects in Lubrication of Thrust Bearing Using Bingham Lubricants”, 25th August 2025, Sri Sivasubramaniya Nadar College of Engineering (An autonomous institution, affiliated to Anna University), Rajiv Gandhi Salai (OMR), Kalavakkam – 603110.",
          "“Inertia effects in rheodynamic lubrication of an externally pressurized thrust bearing Herschel-bulkley fluid with sinusoidal injection”, International National conference on progress in fluid mechanics, heat transfer and materials, Sri Sivasubramaniya Nadar College of Engineering, Chennai, during 09–10 February 2024.",
          "Presented at the Annual Conference of Ramanujan Mathematical Society organized by the Department of Mathematics, during 06–08 December 2022, held at Sri Sivasubramaniya Nadar College of Engineering (An autonomous institution, affiliated to Anna University), Rajiv Gandhi Salai (OMR), Kalavakkam – 603110.",
        ],
      },
      {
        heading: "International / National Conferences / Workshops Attended",
        items: [
          "Participated in the Two-Day Workshop on Linear Algebra, held on 20–21 June 2018 at the Department of Mathematics, Easwari Engineering College (A Unit of Group of Educational Institutions), Chennai – 600 089.",
          "Participated in the Teachers' Enrichment Workshop for Mathematics Teachers of Engineering Colleges (2016), National Center for Mathematics Faculty Development (a joint centre of TIFR and IIT Bombay), held at The Institute of Mathematical Sciences, Chennai, during 21–26 November 2016.",
          "Participated and presented a paper titled “Integration of AI in field of Matrix calculation: Acceleration in AI Era” at the National Conference on Recent Trends in Science, Engineering and Management (NCRTSET), organized by T.J.S. Engineering College on 21 May 2025, Chennai – 601206.",
        ],
      },
      {
        heading: "Faculty Development Programme (FDP) Attended",
        items: [
          "Participated in the Bridge Course on Mathematics / Physics / English, conducted on 23–24 June 2014, at Anna University, Chennai – 600025 (Center for Faculty Development).",
        ],
      },
      {
        heading: "Papers Published",
        items: [
          "Published a research article titled “The inertia effects in rheodynamic lubrication of an externally pressurized thrust bearing using Herschel–Bulkley lubricant with sinusoidal injection” on 1st August 2025.",
        ],
      },
    ],
  },
  {
    name: "Dr. S. Satheesh",
    designation: "Associate Professor",
    qualification: "M.Sc., M.Phil., Ph.D.,",
    experience: "17.6 Years",
    email: "reachsatheessh@tjsec.in",
    orcid: "http://orcid.org/0009-0009-1312-6511",
    photo: "/assets/images/Department_of_Maths/image_2.png",
    publications: [
      {
        text: "IoT-Assisted Multi-Class Rice Pest Detection Using Deep Residual Network (ResNet-50), 2026 5th OPJU International Technology Conference (OTCON) on Smart Computing for Innovation and Advancement in Industry 5.0.",
        link: "https://ieeexplore.ieee.org/document/11629761/",
      },
      {
        text: "Dynamic ML-DL Switching for Smart City Traffic Forecasting Using Predictive–Adaptive Decision Algorithm, 2026 3rd International Conference on Emerging Trends in Engineering and Medical Sciences (ICETEMS).",
        link: "https://drive.google.com/file/d/1Z7QegY6VtiiIzwSXCiR18Xi3UVbuTTr2/view?usp=drive_link",
      },
      {
        text: "Optimizing Climate Condition Prediction Using Q-Learning, Deep Q-Networks, and Policy Gradient Reinforcement Learning Methods, 2026 3rd International Conference on Emerging Trends in Engineering and Medical Sciences (ICETEMS).",
        link: "https://drive.google.com/file/d/1b7tvzFpRCinr0mAlUyz9fqPhtvgYynXU/view?usp=drive_link",
      },
      {
        text: "Retrieving Images and Its Classification by Acumen Mechanism Using Texture Features, International Journal of Food and Nutritional Sciences (IJFANS), Vol. 12, Iss. 1, 2023.",
        link: "https://drive.google.com/file/d/13XIxfgBqhcAaMjblLl6CjO7Q3EUjYfv7/view?usp=sharing",
      },
      {
        text: "An Evaluation on Game Theory Problem of RSSI Localization Technique in Wireless Sensor Networks, International Journal of Innovative Technology and Exploring Engineering (IJITEE), Volume 8, Number 12, October 2019, pp. 5729-5733, ISSN: 2278-3075.",
        link: "https://drive.google.com/file/d/1oGvH9reb7v85mEg1veCW9ubI_JPzWEB/view?usp=sharing",
      },
      {
        text: "A Study on Shortest Distance Measurement RSSI Localization in Mathematical Software of Cooperative Game Theory with Floyds Algorithm, AIP Conference Proceedings 2112, 020073 (2019), June 2019. doi:10.1063/1.5112258",
        link: "https://drive.google.com/file/d/1m_kRSRrWELHL06uZk1GE7WGIQwerrCOY/view?usp=sharing",
      },
      {
        text: "A Study on Performance Analysis of Distance Estimation RSSI in Wireless Sensor Networks, International Journal of Applied Engineering Research, Volume 13, Number 21, September 2018, pp. 14964-14968, ISSN: 0973-4562.",
        link: "https://drive.google.com/file/d/1AvGz7AkMENvifMcJLpr96pUwT5wiJDpL/view?usp=sharing",
      },
      {
        text: "Distance Measurement Model Based on RSSI Localization Technique in Wireless Sensor Networks, International Journal of Mathematical Archive, Volume 9(5), 2018, pp. 60-65, ISSN: 2229-5046.",
        link: "https://drive.google.com/file/d/1tys9jXuIOElWNZy0WvETsjmOAn6-ZpJJ/view?usp=sharing",
      },
    ],
  },
  {
    name: "Dr. M. Vijayaragavan",
    designation: "Associate Professor",
    qualification: "M.Sc., M.Phil., Ph.D.,",
    experience: "15 Years, 2 months",
    email: "mvragavan09@gmail.com",
    orcid: "https://orcid.org/0009-0003-9912-8687",
    photo: "/assets/images/Department_of_Maths/image_1.png",
    publications: [
      { text: "K. Pattabiraman and M. Vijayaragavan, Reciprocal degree distance of some graph operations, Trans. Combin., 2 (2013) 13-24." },
      { text: "K. Pattabiraman and M. Vijayaragavan, Reciprocal degree distance of product graphs, Discrete Appl. Math., 179 (2014) 201-213. Publisher: Elsevier." },
      { text: "K. Pattabiraman and M. Vijayaragavan, Reformulated reciprocal degree distance of graph operations, Int. J. Appl. Comput. Math., doi: 10.1007/s40819-016-0159-6. Publisher: Springer." },
      { text: "K. Pattabiraman and M. Vijayaragavan, Reformulated reciprocal degree distance of transformation graph, Elect. Notes in Discrete Math., 53 (2016) 259-270. Publisher: Elsevier." },
      { text: "K. Pattabiraman and M. Vijayaragavan, On the reformulated reciprocal degree distance of graphs, Creat. Math. Inform., 25 (2016) 205-213." },
      { text: "K. Pattabiraman and M. Vijayaragavan, F-Indices and its Coindices of Some Composite Graphs and their Complements, MJ Journal on Applied Mathematics, 1 (2016) 26-31." },
      { text: "K. Pattabiraman and M. Vijayaragavan, The Edge a-Zagreb indices and coindices of graphs and their complements, MJ J. Pure & Appl. Math., 1 (2016) 1-8." },
      { text: "K. Pattabiraman and M. Vijayaragavan, Edge a-Zagreb indices and coindices of Transformation graphs, Elect. Notes in Discrete Math., 63 (2017) 251-269. Publisher: Elsevier." },
      { text: "K. Pattabiraman and M. Vijayaragavan, Edge a-Zagreb indices and coindices of graph operations, Bull. IMVI 7 (2017) 217-229." },
      { text: "K. Pattabiraman and M. Vijayaragavan, The Edge a-Zagreb indices and its coindices of some Classes of Graphs, MJ Journal on Applied Mathematics, 2 (2017) 1-8." },
      { text: "K. Pattabiraman and M. Vijayaragavan, Hyper Zagreb indices and its coindices of graphs, Bull. IMVI, 7 (2018), 31-41." },
      { text: "K. Pattabiraman and M. Vijayaragavan, Forgotten topological indices and coindices of graph operations, Int. J. Appl. Comput. Math. (in press). Publisher: Springer." },
      { text: "S. Sathish Narayanan and M. Vijayaragavan, Some 3-Divisor Cordial Graphs Derived From Path, Jordan Journal of Mathematics and Statistics (JJMS), 14(2) (2021), 335-350." },
    ],
  },
  {
    name: "Dr. B. Ramesh",
    designation: "Associate Professor",
    qualification: "M.Sc., M.Phil., TNSET, Ph.D.,",
    experience: "20 Years",
    email: "jeeyaram@gmail.com",
    orcid: "https://orcid.org/0009-0006-7950-259X",
    photo: "/assets/images/Department_of_Maths/image_6.png",
    publications: [
      { text: "B. Ramesh, Dr. R. Sivaraman, Relation Between Sum of Terms of Recurrence Relation, International Conference on Advanced Research in Mathematics and its Industrial Applications, ICARMIA 2025, DDGD Vaishnav College, ISBN: 978-93-90956-58-6, pp. 107-112 (Conference Proceedings)." },
      { text: "B. Ramesh, Dr. R. Sivaraman, Periodic Recurrence Relation, Indian Journal of Natural Sciences, Vol. 15/Issue 83/Apr 2024, ISSN: 0976-0997 (Web of Science)." },
      { text: "B. Ramesh, Dr. R. Sivaraman, Generalized Padovan Sequences and Figurate Numbers, Advances in Nonlinear Variational Inequalities, ISSN 1092-910X, Vol. 27 No. 1 (2024) (Scopus indexed)." },
      { text: "B. Ramesh, Dr. R. Sivaraman, Recurrence Relations Related to Metallic Ratios, Journal of Nonlinear Analysis and Optimization, Vol. 15, Issue 1, No. 1:2024, ISSN: 1906-9685 (UGC CARE indexed)." },
      { text: "B. Ramesh, Dr. R. Sivaraman, On Solving A Diophantine Equation, Recent Trends and Research in Mathematical Sciences, ISBN: 978-93-90956-12-8, pp. 71-78 (Book chapter)." },
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
          <p style={{ margin: "0 0 4px" }}>
            Email: <a href={`mailto:${f.email}`}>{f.email}</a>
          </p>
          {f.orcid && (
            <p style={{ margin: "0 0 4px" }}>
              ORCID:{" "}
              <a href={f.orcid} target="_blank" rel="noopener">
                {f.orcid}
              </a>
            </p>
          )}
          {f.scopus && <p style={{ margin: 0 }}>Scopus Author ID: {f.scopus}</p>}
        </div>
      </div>

      {f.publications && (
        <>
          <h4 style={{ marginTop: 20 }}>Publications</h4>
          <ol className="tjs-dept-bullets">
            {f.publications.map((p, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener">
                    {p.text}
                  </a>
                ) : (
                  p.text
                )}
              </li>
            ))}
          </ol>
        </>
      )}

      {f.sections &&
        f.sections.map((sec) => (
          <div key={sec.heading}>
            <h4 style={{ marginTop: 20 }}>{sec.heading}</h4>
            <ol className="tjs-dept-bullets">
              {sec.items.map((item, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        ))}
    </div>
  );
}

export default function MathsDepartment() {
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
          <span>Department of Maths</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Department of Mathematics
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
                  <h4>Department of Mathematics</h4>
                  <p>
                    The Department of Mathematics at T.J.S. Engineering College provides the mathematical
                    infrastructure required for engineering analysis, computational thinking, modelling, and
                    technological innovation. The department focuses on transforming mathematical concepts into
                    tools for interpreting engineering systems and solving quantitative problems. Areas including
                    differential and integral calculus, linear algebra, differential equations, probability,
                    statistics, numerical techniques, and mathematical modelling are approached from an
                    engineering perspective.
                  </p>
                  <p>
                    Particular emphasis is given to analytical formulation, computational approximation, data
                    interpretation, optimization, and the mathematical representation of real-world systems. By
                    developing quantitative reasoning and algorithmic thinking, the department enables students to
                    construct mathematical models, evaluate engineering parameters, and arrive at technically
                    sound solutions. The department thereby serves as a foundation for advanced engineering
                    studies, computational applications, research, and emerging technology domains.
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
