"use client";

import { useState } from "react";
import DeptJumpNav from "../../departments/DeptJumpNav";

const SOURCE_LINKS = {
  "K-Hub": "http://k-hub.in/",
  Delnet: "https://www.delnet.in/",
};

function SourceLabel({ text }) {
  const url = SOURCE_LINKS[text];
  if (!url) return text;
  return (
    <a href={url} target="_blank" rel="noopener">
      {text}
    </a>
  );
}

const FACILITIES = [
  "Circulation / Lending Section",
  "Reference / Rare Books Section",
  "Journals & Back Volumes Section",
  "Project Reports Section",
  "Educational CD's & DVD's Section",
  "Digital Library Section",
  "NPTEL Video Zone",
  "Reprographic Service",
  "Reading Area",
  "Newspaper Zone",
  "Anna University Question Papers Section",
  "IBM Training Materials Section",
  "New Arrivals Display",
  "Online Public Access Catalogue (OPAC)",
];

const DEPT_WISE = [
  { dept: "CSE", titles: 1097, volumes: 2732, natJournals: 6, intJournals: 6, cds: 302 },
  { dept: "AIDS", titles: 326, volumes: 1288, natJournals: 6, intJournals: 6, cds: 76 },
  { dept: "ECE", titles: 714, volumes: 2274, natJournals: 6, intJournals: 6, cds: 42 },
  { dept: "EEE", titles: 658, volumes: 1867, natJournals: 6, intJournals: 6, cds: 36 },
  { dept: "MECH", titles: 561, volumes: 2818, natJournals: 6, intJournals: 6, cds: 33 },
  { dept: "MBA", titles: 375, volumes: 1075, natJournals: 6, intJournals: 6, cds: 3 },
  { dept: "M.E. – CSE", titles: 279, volumes: 1095, natJournals: 6, intJournals: 6, cds: 27 },
  { dept: "M.E. – VLSI", titles: 352, volumes: 1062, natJournals: 6, intJournals: 6, cds: 19 },
  { dept: "CIVIL", titles: 628, volumes: 2109, natJournals: null, intJournals: null, cds: 48 },
  { dept: "S & H", titles: 490, volumes: 1584, natJournals: null, intJournals: null, cds: 45 },
];

const ERESOURCES = [
  { source: "K-Hub", category: "E-Books", count: "5,200" },
  { source: "K-Hub", category: "E-Journals", count: "10,394" },
  { source: "K-Hub", category: "E-Magazines", count: "156" },
  { source: "K-Hub", category: "Case Reports", count: "825" },
  { source: "IESTC", category: "E-Journals (Total)", count: "1,825" },
  { source: "IESTC", category: "– Full Text Journals", count: "1,178" },
  { source: "IESTC", category: "– Current Full Text", count: "547" },
  { source: "Delnet", category: "E-Journals", count: "911" },
];

const OTHER_COLLECTIONS = [
  { category: "E-Books (Through Delnet)", count: "710" },
  { category: "E-Books (Through K-Hub)", count: "5,200" },
  { category: "Rare Books", count: "205" },
  { category: "Others (Tamil Books)", count: "120" },
];

const JOURNALS = [
  {
    dept: "AIDS",
    national: [
      { name: "Journal of Advanced Research in Artificial Intelligence", publisher: "HBRP" },
      { name: "Journal of Network Security and Data Mining", publisher: "HBRP" },
      { name: "Journal of Artificial Neural Networks and Learning System", publisher: "MAT Journals" },
      { name: "Journal of Big Data Analytics and Business Intelligence", publisher: "MAT Journals" },
      { name: "Journal of Image Processing and Artificial Intelligence", publisher: "MAT Journals" },
      { name: "Journal of Information Technology and Sciences", publisher: "MAT Journals" },
    ],
    international: [
      { name: "Recent Trends in Artificial Intelligence & It's Applications", publisher: "IBH" },
      { name: "Journal of Big Data Technology and Business Analytics", publisher: "IBH" },
      { name: "Journal of Soft Computing and Computational Intelligence", publisher: "IBH" },
      { name: "International Journal of Artificial Intelligence and Data Science", publisher: "IBH" },
      { name: "International Journal of Data Science & Com Communication", publisher: "IBH" },
      { name: "International Journal of Nanotechnology and Application", publisher: "TRAN STELLAR" },
    ],
  },
  {
    dept: "CSE",
    national: [
      { name: "Journal of Advance Research in Mobile Computing", publisher: "HBRP" },
      { name: "Journal of Advancement in Software Engineering & Testing", publisher: "HBRP" },
      { name: "Journal of Android and IOS Applications and Testing", publisher: "MAT Journals" },
      { name: "Journal of Computer Science Engineering & Software Testing", publisher: "MAT Journals" },
      { name: "Journal of Data Mining and Management", publisher: "MAT Journals" },
      { name: "Journal of Computer Science Engineering and Information Technology Research (JCSEITR)", publisher: "TRAN STELLAR" },
    ],
    international: [
      { name: "International Journal of Software and Computer Science Engg", publisher: "MANTECH" },
      { name: "International Journal of Computer Networking, Wireless and Mobile Communications (IJCNWMC)", publisher: "TRAN STELLAR" },
      { name: "International Journal of Computer Science Engineering and Information Technology Research (IJCSEITR)", publisher: "TRAN STELLAR" },
      { name: "International Journal of General Engineering and Technology", publisher: "TRAN STELLAR" },
      { name: "International Journal of Information Systems Management Research and Development (IJISMRD)", publisher: "TRAN STELLAR" },
      { name: "International Journal of Management, Information Technology and Engineering (BEST : IJMITE)", publisher: "TRAN STELLAR" },
    ],
  },
  {
    dept: "ECE",
    national: [
      { name: "Journal of Advancement in Electronics Signal Processing", publisher: "MAT Journals" },
      { name: "Journal of Digital Integrated Circuits in Electrical Devices", publisher: "MAT Journals" },
      { name: "Journal of Electronics & Telecommunication System Engg.", publisher: "MAT Journals" },
      { name: "Journal of Microprocessor and Microcontroller Research", publisher: "MAT Journals" },
      { name: "Journal of Computer Networking, Wireless and Mobile Communications", publisher: "TRAN STELLAR" },
      { name: "Journal of Electronics, Communication and Instrumentation Engineering Research", publisher: "TRAN STELLAR" },
    ],
    international: [
      { name: "International Journal of Research in Electrical, Electronics and Communication Engineering", publisher: "MANTECH" },
      { name: "International Journal of VLSI Design, Microelectronics and Embedded System", publisher: "MANTECH" },
      { name: "International Journal of Applied Engineering Research and Development (IJAERD)", publisher: "TRAN STELLAR" },
      { name: "Intl Journal of Electronics, Electrical and Communication Engg", publisher: "IBH" },
      { name: "Intl Journal of Embedded Software and Open Source Systems", publisher: "IBH" },
      { name: "International Journal of Energy Systems, Computers & Control", publisher: "IBH" },
    ],
  },
  {
    dept: "EEE",
    national: [
      { name: "Journal of Control System and its Recent Developments", publisher: "HBRP" },
      { name: "Journal of Emerging Trends in Electrical Engineering", publisher: "HBRP" },
      { name: "Journal of Advance Electrical Engineering and Devices", publisher: "MAT Journals" },
      { name: "Journal of Alternative and Renewable Energy Sources", publisher: "MAT Journals" },
      { name: "Journal of Electrical and Power System Engineering", publisher: "MAT Journals" },
      { name: "Journal of Electrical and Electronics Engineering (JEEE)", publisher: "TRAN STELLAR" },
    ],
    international: [
      { name: "International Journal of Electrical and Electronics Engineering Research (IJEEER)", publisher: "TRAN STELLAR" },
      { name: "International Journal of Electronics, Communication & Instrumentation Engineering Research and Development", publisher: "TRAN STELLAR" },
      { name: "International Journal of Robotics Research and Development", publisher: "TRAN STELLAR" },
      { name: "International Journal of Electrical Energy Systems", publisher: "IBH" },
      { name: "Intl Journal of Electrical Engineering and Embedded Systems", publisher: "IBH" },
      { name: "International Journal of Electrical Engineering Systems Research", publisher: "IBH" },
    ],
  },
  {
    dept: "MECH",
    national: [
      { name: "Journal of Advanced Research in Industrial Engineering", publisher: "HBRP" },
      { name: "Recent Trends in Automation and Automobile Engineering", publisher: "HBRP" },
      { name: "Journal of Automation and Automobile Engineering", publisher: "MAT Journals" },
      { name: "Journal of Fluid Mechanics and Mechanical Design", publisher: "MAT Journals" },
      { name: "Journal of Mechanical and Mechanics Engineering", publisher: "MAT Journals" },
      { name: "Journal of Modern Thermodynamics in Mechanical System", publisher: "MAT Journals" },
    ],
    international: [
      { name: "International Journal of Mechatronics and Manufacturing Technology", publisher: "MANTECH" },
      { name: "International Journal of Automobile Engineering Research and Development (IJAuERD)", publisher: "TRAN STELLAR" },
      { name: "International Journal of Mechanical and Production Engineering Research and Development (IJMPERD)", publisher: "TRAN STELLAR" },
      { name: "International Journal of Advanced Mechatronics and Robotics", publisher: "IBH" },
      { name: "International Journal of Advances in Mechanical Engineering", publisher: "IBH" },
      { name: "International Journal of Digital Manufacturing", publisher: "IBH" },
    ],
  },
  {
    dept: "M.E. – CSE",
    national: [
      { name: "Journal of Advances in Computational Intelligence Theory", publisher: "HBRP" },
      { name: "Journal of Fuzzy Sets and Fuzzy Logic Design", publisher: "MAT Journals" },
      { name: "Journal of Intelligent Decision Technologies and Applications", publisher: "MAT Journals" },
      { name: "Journal of Security in Computer Networks & Distributed Sys", publisher: "MAT Journals" },
      { name: "Journal of Soft Computing and Computational Intelligence", publisher: "MAT Journals" },
      { name: "Journal of Web Development and Web Designing", publisher: "MAT Journals" },
    ],
    international: [
      { name: "International Journal of Advanced Computer Engineering", publisher: "IBH" },
      { name: "International Journal of Advances in Software Engg", publisher: "IBH" },
      { name: "International Journal of Computational Intelligence in Control", publisher: "IBH" },
    ],
  },
  {
    dept: "M.E. – VLSI",
    national: [
      { name: "Journal of Optoelectronics and Communication", publisher: "HBRP" },
      { name: "Journal of Sensor Research and Technologies", publisher: "HBRP" },
      { name: "Journal of VLSI Design and its Advancement", publisher: "HBRP" },
      { name: "Journal of Embedded Systems & Its Applications", publisher: "MANTECH" },
      { name: "Journal of Research in Image and Signal Processing", publisher: "MANTECH" },
      { name: "Journal of Research in VLSI Design Tools and Technology", publisher: "MANTECH" },
    ],
    international: [
      { name: "International Journal of Robotics and Autonomous Systems", publisher: "MANTECH" },
      { name: "International Journal of Industrial Engineering & Technology", publisher: "TRAN STELLAR" },
      { name: "International Journal of Accounting and Financial Management Research", publisher: "TRAN STELLAR" },
      { name: "International Journal of Business and General Management", publisher: "TRAN STELLAR" },
    ],
  },
  {
    dept: "MBA",
    national: [
      { name: "Journal of Research and Review in Digital Marketing and Communications", publisher: "HBRP" },
      { name: "Journal of Accounting Research, Business and Finance Management", publisher: "MAT Journals" },
      { name: "Journal of Integrated Marketing Communications and Digital Marketing", publisher: "MAT Journals" },
      { name: "Journal of Micro & Small Business Management", publisher: "MAT Journals" },
      { name: "Journal of Women Entrepreneurship & Business Management", publisher: "MAT Journals" },
      { name: "Journal of Sales, Service and Marketing Research", publisher: "MAT Journals" },
    ],
    international: [
      { name: "International Journal of Business Management & Research", publisher: "TRAN STELLAR" },
      { name: "International Journal of Human Resource Management & Research", publisher: "TRAN STELLAR" },
      { name: "International Journal of Retail Management and Research", publisher: "TRAN STELLAR" },
      { name: "International Journal of Sales & Marketing Management Research and Development (IJSMMRD)", publisher: "TRAN STELLAR" },
      { name: "International Journal of Marketing and Finance", publisher: "IBH" },
      { name: "Intl Journal of Marketing & Human Resource Development", publisher: "IBH" },
      { name: "Intl Journal of Entrepreneurship and Management Research", publisher: "IBH" },
    ],
  },
  {
    dept: "S & H",
    national: [],
    international: [
      { name: "New Advances in Physics", publisher: "IBH" },
      { name: "International Journal of Applied Mathematics & Applications", publisher: "IBH" },
      { name: "International Journal of Chemical Engineering", publisher: "IBH" },
      { name: "PHYSICS/CHEMISTRY/BIOLOGY TODAY", publisher: "IBH" },
    ],
  },
];

const LIBRARY_RULES = [
  "Books will be issued to the students / staff members only against producing their ID Cards.",
  "Staff can borrow 6 books and Students can borrow 5 books maximum at a time.",
  "Borrowed books can be retained by them for 30 days, from the date of issue.",
  "Reference books will not be issued.",
  "Books borrowed from the library are not transferable.",
  "Only one time renewal of book will be permitted and that too, if there is no reservation against that particular book.",
  "Borrowed books should be returned on or before the due date. If not, fine of Rs. 1 per day, shall be levied.",
  "Books due on holidays can be returned on the next working day.",
  "The borrower shall examine the pages of the books for any damage before leaving the library and report the same to the librarian immediately. If the book is found to be damaged while returning, the borrower will be held responsible for the same.",
  "The book lost should be replaced with a new copy. If the book is not available, the cost of the book will be collected.",
  "Every visit of the student to the library should be entered in the Library Entry Register.",
  "Marking on books soiling, underlining, writing remarks on pages, folding or tearing of pages etc., will be held as serious charges.",
  "Requirement of new books / Journals shall be intimated to the Librarian through the HOD concerned.",
  "Personal books and files should be left on the rack at the entrance of the library. Plain sheets may be taken instead.",
  "Students are advised not to keep their valuable things like cell phone, calculator, wallet etc., in the property counter. Library authorities are not responsible for any loss of such items.",
  "Use of mobile phones inside the library is strictly prohibited.",
];

const DIGITAL_LIBRARY_RULES = [
  "Digital Library is to be used for academic purpose only.",
  "Personal chatting in the Library is not allowed.",
  "Internet Browsing in social network sites are strictly prohibited. Disciplinary action will be taken against the defaulters.",
  "Stake holder can access the e-resources from remote places using user ID and Password provided by the College.",
];

const LIBRARY_COMMITTEE = [
  { name: "Dr. J Prakash", designation: "Principal", position: "Chairman" },
  { name: "Mr. P Prabhu", designation: "Librarian", position: "Convenor" },
  { name: "Dr. S VelMurugan", designation: "Professor – ECE", position: "Member" },
  { name: "Dr. E Sivakumar", designation: "Professor – MECH", position: "Member" },
  { name: "Ms. J Agnes", designation: "Asst. Professor – CSE", position: "Member" },
  { name: "Ms. M Shunmuga Sankari", designation: "Associate Professor – EEE", position: "Member" },
  { name: "Mr. R Murali", designation: "Assistant Professor – MBA", position: "Member" },
  { name: "Dr. S Arjunan", designation: "Professor – PHY", position: "Member" },
];

const TOTAL_TITLES = DEPT_WISE.reduce((s, d) => s + d.titles, 0);
const TOTAL_VOLUMES = DEPT_WISE.reduce((s, d) => s + d.volumes, 0);
const TOTAL_CDS = DEPT_WISE.reduce((s, d) => s + d.cds, 0);

export default function Library() {
  const [openDept, setOpenDept] = useState(0);

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Campus Life</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Library</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <DeptJumpNav
          items={[
            { href: "#about", label: "About" },
            { href: "#facilities", label: "Facilities & Services" },
            { href: "#collections", label: "Collections" },
            { href: "#deptwise", label: "Department-wise" },
            { href: "#eresources", label: "E-Resources" },
            { href: "#journals", label: "Journals" },
            { href: "#rules", label: "Library Rules" },
            { href: "#committee", label: "Committee" },
          ]}
        />

        <section id="about" className="tjs-dept-section">
          <h2>About the Library</h2>
          <p>
            T.J.S. Engineering College Library provides uncompromising information and intellectual
            requirements to its students and faculty members with a user friendly approach. It offers
            fully Integrated Library Management Software. The Library covers an area of 410 Sq.m and
            stocks over 18,000 books and study materials for the students&apos; benefit.
          </p>
          <p>
            The Library has a great collection of books and e-books covering various branches of
            Engineering and Technology, Science and Humanities and their related fields.
          </p>
          <p>
            We provide access to NPTEL (National Programme on Technology Enhanced Learning) through
            E-Resources — online web and web video courses in engineering and humanities streams.
          </p>
          <p>
            The Library has an Institutional Membership with several external libraries such as the
            British Council Library, Anna University Library, and DELNET &amp; K-Hub (Knowledge Hub).
          </p>

          <div className="tjs-pub-badges" style={{ marginBottom: 24 }}>
            <span className="tjs-pub-badge">British Council Library</span>
            <span className="tjs-pub-badge">Anna University Library</span>
            <a href="https://www.delnet.in/" target="_blank" rel="noopener" className="tjs-pub-badge">DELNET</a>
            <a href="http://k-hub.in/" target="_blank" rel="noopener" className="tjs-pub-badge">K-Hub (Knowledge Hub)</a>
          </div>

          <div className="tjs-lib-stats">
            <div className="tjs-lib-stat">
              <i className="ri-map-pin-2-line"></i>
              <strong>410 Sq.m</strong>
              <span>Library Area</span>
            </div>
            <div className="tjs-lib-stat">
              <i className="ri-book-2-line"></i>
              <strong>18,000+</strong>
              <span>Books &amp; Study Materials</span>
            </div>
            <div className="tjs-lib-stat">
              <i className="ri-award-line"></i>
              <strong>ISO 9001:2015</strong>
              <span>Certified Institution</span>
            </div>
            <div className="tjs-lib-stat">
              <i className="ri-cloud-line"></i>
              <strong>2023</strong>
              <span>Fully Automated (Cloud Based)</span>
            </div>
          </div>

          <p style={{ marginTop: 20 }}>
            <strong>Library Management Software:</strong> LIBMAN – Library Management System with
            MPOAC (Mastersoft), Cloud Based, Fully Automated since 2023.
          </p>
        </section>

        <section id="facilities" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Library Facilities &amp; Services</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <ul>
                {FACILITIES.slice(0, 7).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="tjs-dept-card">
              <ul>
                {FACILITIES.slice(7).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="collections" className="tjs-dept-section">
          <h2>Library Collections – 2026</h2>
          <div className="tjs-lib-stats">
            <div className="tjs-lib-stat">
              <i className="ri-file-text-line"></i>
              <strong>5,480</strong>
              <span>Total Titles</span>
            </div>
            <div className="tjs-lib-stat">
              <i className="ri-stack-line"></i>
              <strong>17,904</strong>
              <span>Total Volumes</span>
            </div>
            <div className="tjs-lib-stat">
              <i className="ri-newspaper-line"></i>
              <strong>96</strong>
              <span>Journals (48 National + 48 International)</span>
            </div>
            <div className="tjs-lib-stat">
              <i className="ri-disc-line"></i>
              <strong>631</strong>
              <span>Educational CD&apos;s &amp; DVD&apos;s</span>
            </div>
            <div className="tjs-lib-stat">
              <i className="ri-user-line"></i>
              <strong>150</strong>
              <span>Seating Capacity</span>
            </div>
          </div>

          <div className="tjs-pub-badges" style={{ marginTop: 20 }}>
            <a href="https://www.delnet.in/" target="_blank" rel="noopener" className="tjs-pub-badge">Delnet Membership – Valid till 13th Feb 2027</a>
            <a href="http://k-hub.in/" target="_blank" rel="noopener" className="tjs-pub-badge">K-Hub (Infotrac) – Valid till 10th Oct 2026</a>
          </div>
        </section>

        <section id="deptwise" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Details of Library Books, Journals &amp; CD&apos;s</h2>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Department</th>
                  <th>Titles</th>
                  <th>Volumes</th>
                  <th>Journals (Nat.)</th>
                  <th>Journals (Int.)</th>
                  <th>CD&apos;s</th>
                </tr>
              </thead>
              <tbody>
                {DEPT_WISE.map((d, i) => (
                  <tr key={d.dept}>
                    <td>{i + 1}</td>
                    <td>{d.dept}</td>
                    <td>{d.titles}</td>
                    <td>{d.volumes}</td>
                    <td>{d.natJournals ?? "–"}</td>
                    <td>{d.intJournals ?? "–"}</td>
                    <td>{d.cds}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700 }}>
                  <td colSpan={2}>Total</td>
                  <td>{TOTAL_TITLES.toLocaleString()}</td>
                  <td>{TOTAL_VOLUMES.toLocaleString()}</td>
                  <td>48</td>
                  <td>48</td>
                  <td>{TOTAL_CDS}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="eresources" className="tjs-dept-section">
          <h2>E-Resources Details</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Category</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {ERESOURCES.map((r, i) => (
                    <tr key={i}>
                      <td><SourceLabel text={r.source} /></td>
                      <td>{r.category}</td>
                      <td>{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Other Collections</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {OTHER_COLLECTIONS.map((r) => (
                    <tr key={r.category}>
                      <td>{r.category}</td>
                      <td>{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="journals" className="tjs-dept-section tjs-dept-section-alt">
          <h2>National &amp; International Journals (Department-wise)</h2>
          <div className="tjs-committee-list">
            {JOURNALS.map((d, i) => (
              <div className="tjs-committee-item" key={d.dept}>
                <button
                  type="button"
                  className={"tjs-committee-toggle" + (openDept === i ? " active" : "")}
                  onClick={() => setOpenDept(openDept === i ? -1 : i)}
                >
                  <span>{d.dept}</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                {openDept === i && (
                  <div className="tjs-committee-body">
                    {d.national.length > 0 && (
                      <>
                        <h4>National Journals</h4>
                        <div className="tjs-dept-table-wrap">
                          <table className="tjs-dept-table">
                            <thead>
                              <tr>
                                <th>Journal Name</th>
                                <th>Publisher</th>
                              </tr>
                            </thead>
                            <tbody>
                              {d.national.map((j) => (
                                <tr key={j.name}>
                                  <td>{j.name}</td>
                                  <td>{j.publisher}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                    {d.international.length > 0 && (
                      <>
                        <h4>International Journals</h4>
                        <div className="tjs-dept-table-wrap">
                          <table className="tjs-dept-table">
                            <thead>
                              <tr>
                                <th>Journal Name</th>
                                <th>Publisher</th>
                              </tr>
                            </thead>
                            <tbody>
                              {d.international.map((j) => (
                                <tr key={j.name}>
                                  <td>{j.name}</td>
                                  <td>{j.publisher}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="rules" className="tjs-dept-section">
          <h2>Library Rules</h2>
          <div className="tjs-dept-grid-2">
            <div className="tjs-dept-card">
              <h3>General Library Rules</h3>
              <ul>
                {LIBRARY_RULES.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="tjs-dept-card">
              <h3>Digital Library Rules</h3>
              <ul>
                {DIGITAL_LIBRARY_RULES.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="committee" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Library Committee</h2>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name of the Faculty</th>
                  <th>Designation</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {LIBRARY_COMMITTEE.map((m, i) => (
                  <tr key={m.name}>
                    <td>{i + 1}</td>
                    <td>{m.name}</td>
                    <td>{m.designation}</td>
                    <td>{m.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
