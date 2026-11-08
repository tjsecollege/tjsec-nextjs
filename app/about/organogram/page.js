import Link from "next/link";
import { getAboutPage } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → About → Organogram
export default async function Organogram() {
  const d = await getAboutPage("organogram");

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
          <span>Organogram</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Organogram
          </h2>

          {d?.image?.url ? (
            <div className="tjs-organogram-card">
              <img loading="lazy" src={d.image.url} alt={d.image.alt || "T.J.S. Engineering College Organogram"} />
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
