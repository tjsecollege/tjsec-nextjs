import Link from "next/link";
import { getAboutPage } from "@/lib/wordpress";

function Html({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// Content is managed in WordPress: admin.tjsec.ac.in → About → Directors
export default async function Directors() {
  const d = await getAboutPage("directors");
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
          <span>Directors</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Directors
          </h2>

          {members.length ? (
            <div className="tjs-team-grid">
              {members.map((d, i) => (
                <div className="tjs-team-card" key={d.name + i}>
                  <div className="tjs-team-photo">
                    {d.photo?.url ? <img loading="lazy" src={d.photo.url} alt={d.photo.alt || d.name} /> : <span>Photo</span>}
                  </div>
                  <div className="tjs-team-info">
                    <h4>{d.name}</h4>
                    {d.qualification && <p className="tjs-trustee-qualification">{d.qualification}</p>}
                    <p>{d.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}

          {d?.message && (
            <div className="tjs-trustee-message-card" style={{ marginTop: 32 }}>
              <h3>Directors&apos; Message</h3>
              <Html html={d.message} />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
