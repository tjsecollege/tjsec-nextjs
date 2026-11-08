import Link from "next/link";
import YearPdfTabs from "../../components/YearPdfTabs";
import { getAcademicCalendar } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Academics → Academic Calendar
export default async function AcademicCalendar() {
  const { pageTitle, intro, docs } = await getAcademicCalendar();
  const title = pageTitle || "Academic Calendar";

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Academics</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {title}
          </h2>
          {intro && <p>{intro}</p>}
          {docs.length ? (
            <YearPdfTabs docs={docs} title={title} />
          ) : (
            <p className="tjs-dept-pending">The academic calendar will be added soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
