import Link from "next/link";
import { getAboutPage } from "@/lib/wordpress";

// "Dr. Subramanin" -> "S" (titles and initials skipped), for members without a photo.
function initial(name) {
  const word = (name || "").split(/\s+/).find((w) => !/^(mr|mrs|ms|dr|prof)\.?$/i.test(w) && !/^[A-Z]\.?$/.test(w));
  return (word || name || "?")[0];
}

// Content is managed in WordPress: admin.tjsec.ac.in → About → Governing Council
export default async function GoverningCouncil() {
  const d = await getAboutPage("governing-council");
  const members = Array.isArray(d?.members) ? d.members : [];

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

          {members.length ? (
            <div className="tjs-gc-grid">
              {members.map((member, i) => (
                <article
                  className={"tjs-gc-card" + (member.position === "Chairman" ? " is-chair" : "")}
                  key={member.name + i}
                >
                  <div className="tjs-gc-photo">
                    {member.photo?.url ? (
                      <img loading="lazy" src={member.photo.url} alt={member.photo.alt || member.name} />
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
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
