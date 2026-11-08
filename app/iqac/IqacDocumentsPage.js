import Link from "next/link";
import YearPdfTabs from "../components/YearPdfTabs";
import { getIqacDocuments } from "@/lib/wordpress";

// IQAC → Innovation Cell / NIRF: heading, optional intro and the documents in a
// viewer (tabs only when there is more than one).
// Content is managed in WordPress: admin.tjsec.ac.in → IQAC → Innovation Cell / NIRF
export default async function IqacDocumentsPage({ slug, fallbackTitle }) {
  const { pageTitle, intro, docs } = await getIqacDocuments(slug);
  const title = pageTitle || fallbackTitle;

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>IQAC</h1>
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
            <YearPdfTabs docs={docs} title={title} hideSingleTab />
          ) : (
            <p className="tjs-dept-pending">Documents will be added soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
