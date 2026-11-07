import Link from "next/link";
import YearPdfTabs from "../components/YearPdfTabs";
import { getResearch } from "@/lib/wordpress";

// The Research menu pages, in sidebar order. key = section in getResearch().
const PAGES = [
  { key: "publications", href: "/research/publications", label: "Publication", fallbackTitle: "Publications" },
  { key: "patents", href: "/research/patents", label: "Patents", fallbackTitle: "Patents" },
  { key: "grants", href: "/research/grants", label: "Research Grants", fallbackTitle: "Research Grants" },
];

// One Research page: a sidebar linking the three pages, and the selected
// page's year-wise documents in year tabs with a viewer.
// Content is managed in WordPress: admin.tjsec.ac.in → Research
export default async function ResearchDocsPage({ page }) {
  const research = await getResearch();
  const current = PAGES.find((p) => p.key === page);
  const { title, intro, docs } = research[page];
  const heading = title || current.fallbackTitle;

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Research</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{current.label}</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Research
          </h2>

          <div className="tjs-approvals-layout">
            <aside className="tjs-approvals-sidebar">
              {PAGES.map((p) => (
                <Link
                  key={p.key}
                  href={p.href}
                  className={"tjs-approvals-cat" + (p.key === page ? " active" : "")}
                  aria-current={p.key === page ? "page" : undefined}
                >
                  {p.label}
                </Link>
              ))}
            </aside>

            <div className="tjs-approvals-panel">
              <h3>{heading}</h3>
              {intro && <p>{intro}</p>}
              {docs.length ? (
                <YearPdfTabs docs={docs} title={heading} />
              ) : (
                <p className="tjs-dept-pending">Documents will be added soon.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
