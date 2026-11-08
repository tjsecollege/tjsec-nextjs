import Link from "next/link";
import YearGroupedVisits from "../../departments/YearGroupedVisits";
import { getIndustryConclave } from "@/lib/wordpress";

// "2025-02-27" -> "27-02-2025"
function formatDate(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd || "");
  return m ? `${m[3]}-${m[2]}-${m[1]}` : ymd || "";
}

function dateRange(start, end) {
  const from = formatDate(start);
  return end && end !== start ? `${from} to ${formatDate(end)}` : from;
}

// Content is managed in WordPress: admin.tjsec.ac.in → Industry Interface → Industry Academy Conclave
export default async function IndustryAcademyConclave() {
  const { pageTitle, intro, conclaves } = await getIndustryConclave();
  const title = pageTitle || "Industry Academy Conclave";
  // Newest first; conclaves without a date keep their admin order at the end.
  const items = conclaves
    .map((c, i) => ({ c, i }))
    .sort((a, b) => {
      const da = a.c.start_date || "";
      const db = b.c.start_date || "";
      if (da === db) return a.i - b.i;
      if (!da) return 1;
      if (!db) return -1;
      return db.localeCompare(da);
    })
    .map(({ c }) => ({
      title: c.title,
      date: dateRange(c.start_date, c.end_date),
      desc: c.description || "",
      people: (c.coordinators || []).filter((p) => p.name),
      imgs: (c.photos || []).map((p) => ({ src: p.url, alt: p.alt || c.title })),
    }));

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Industry Interface</h1>
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

          {intro && <div className="tjs-dept-richtext" dangerouslySetInnerHTML={{ __html: intro }} />}

          {items.length > 0 ? (
            <div style={intro ? { marginTop: 28 } : undefined}>
              <YearGroupedVisits items={items} title={title} />
            </div>
          ) : (
            !intro && <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
