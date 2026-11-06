import { getAboutPage } from "@/lib/wordpress";
import CommitteesView from "../CommitteesView";

// Content is managed in WordPress: admin.tjsec.ac.in → About → Committees
export default async function Committees() {
  const d = await getAboutPage("committees");
  const committees = Array.isArray(d?.committees)
    ? d.committees.map((c) => ({
        name: c.name,
        intro: c.intro || "",
        members: Array.isArray(c.members) ? c.members : [],
      }))
    : [];

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
          <span>Committees</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Institutional Committees
          </h2>

          <CommitteesView committees={committees} />
        </section>
      </div>
    </>
  );
}
