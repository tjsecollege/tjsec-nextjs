const MEMBERS = [
  { name: "Mr. T.J. Govindarajan", position: "Chairman", designation: "Chairman, TJS Group of Institutions" },
  { name: "Mr. T.J. Arumugam", position: "Member", designation: "Trustee, TJS Group of Institutions" },
  { name: "Mr. T.J. Desamuthu", position: "Member", designation: "Trustee, TJS Group of Institutions" },
  { name: "Dr. A. Palani", position: "Member", designation: "Director, TJS Group of Institutions" },
  { name: "Dr. J. Prakash", position: "Member Secretary", designation: "Principal, T.J.S. Engineering College" },
  { name: "Dr. E.K.T. Sivakumar", position: "Advisor", designation: "Professor" },
  { name: "Mr. S. Elumalai", position: "Member", designation: "Administrative Officer, T.J.S. Engineering College" },
  { name: "Dr. Subramanin", position: "Member / Industrialist", designation: "Managing Director, Malathi Engineering Works" },
];

export default function GoverningCouncil() {
  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>About</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Governing Council</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Governing Council
          </h2>

          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Designation / Occupation</th>
                </tr>
              </thead>
              <tbody>
                {MEMBERS.map((member, i) => (
                  <tr key={member.name}>
                    <td>{i + 1}</td>
                    <td>
                      <strong>{member.name}</strong>
                    </td>
                    <td>{member.position}</td>
                    <td>{member.designation}</td>
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
