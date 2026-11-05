import Link from "next/link";

const MEMBERS = [
  { name: "Mr. T.J. Govindarajan", position: "Chairman", designation: "Chairman, TJS Group of Institutions", photo: "/assets/images/directorphotos/CHAIRMAN-TJG.jpg" },
  { name: "Mr. T.J. Arumugam", position: "Member", designation: "Trustee, TJS Group of Institutions", photo: "/assets/images/directorphotos/T.J.Arumugam.jpg" },
  { name: "Mr. T.J. Desamuthu", position: "Member", designation: "Trustee, TJS Group of Institutions", photo: "/assets/images/directorphotos/T.J.Desamuthu.jpg" },
  { name: "A. Kabilan", position: "Member", designation: "Director, TJS Group of Institutions", photo: "/assets/images/directorphotos/A.Kabilan.jpg" },
  { name: "Dr. J. Prakash", position: "Member Secretary", designation: "Principal, T.J.S. Engineering College", photo: "/assets/images/principal.jpg" },
  { name: "Dr. E. Sivakumar", position: "Advisor", designation: "Professor", photo: "/assets/images/sivakumar-150x150.jpeg" },
  { name: "Mr. S. Elumalai", position: "Member", designation: "Administrative Officer, T.J.S. Engineering College", photo: "/assets/images/directorphotos/S. ELUMALAI.jpeg" },
  { name: "Dr. Subramanin", position: "Member / Industrialist", designation: "Managing Director, Malathi Engineering Works" },
];

// "Dr. Subramanin" -> "S" (titles and initials skipped), for members without a photo.
function initial(name) {
  const word = name.split(/\s+/).find((w) => !/^(mr|mrs|ms|dr|prof)\.?$/i.test(w) && !/^[A-Z]\.?$/.test(w));
  return (word || name)[0];
}

export default function GoverningCouncil() {
  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>About</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
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

          <div className="tjs-gc-grid">
            {MEMBERS.map((member) => (
              <article className={"tjs-gc-card" + (member.position === "Chairman" ? " is-chair" : "")} key={member.name}>
                <div className="tjs-gc-photo">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <span aria-hidden="true">{initial(member.name)}</span>
                  )}
                </div>
                <h4>{member.name}</h4>
                <p className="tjs-gc-designation">{member.designation}</p>
                <span className="tjs-gc-position">{member.position}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
