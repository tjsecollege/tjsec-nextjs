"use client";

import { useState } from "react";
import YearTabs from "../components/YearTabs";

// Department Publication section: one tab per year (newest first, "Other" for
// papers without a year), showing that year's publication cards.
export default function PublicationYearTabs({ publications }) {
  const years = [...new Set(publications.map((p) => (p.year ? String(p.year) : "")))]
    .sort((a, b) => (a === "" ? 1 : b === "" ? -1 : b.localeCompare(a)));
  const [active, setActive] = useState(0);
  const year = years[active] ?? years[0];
  const items = publications.filter((p) => (p.year ? String(p.year) : "") === year);

  return (
    <>
      <YearTabs tabs={years.map((y) => y || "Other")} active={active} onSelect={setActive} />
      <div className="tjs-pub-list">
        {items.map((p, i) => {
          const Card = p.link ? "a" : "div";
          const linkProps = p.link ? { href: p.link, target: "_blank", rel: "noopener" } : {};
          const source = [p.published_in, p.year].filter(Boolean).join(", ");
          return (
            <Card className="tjs-pub-card" key={p.title + i} {...linkProps}>
              <div className="tjs-pub-icon">
                <i className="ri-file-text-line"></i>
              </div>
              <div className="tjs-pub-content">
                <h4 className="tjs-pub-title">
                  {p.title.trim()} {p.link && <i className="ri-external-link-line"></i>}
                </h4>
                {(p.authors || source) && (
                  <p className="tjs-pub-meta">
                    {p.authors && <strong>{p.authors}</strong>}
                    {p.authors && source && <> &middot; </>}
                    {source}
                  </p>
                )}
                {(p.impact_factor || p.citations) && (
                  <div className="tjs-pub-badges">
                    {p.impact_factor && <span className="tjs-pub-badge">Impact Factor {p.impact_factor}</span>}
                    {p.citations && <span className="tjs-pub-badge tjs-pub-badge-alt">Citation {p.citations}</span>}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
