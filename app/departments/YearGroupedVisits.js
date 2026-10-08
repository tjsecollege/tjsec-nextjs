"use client";

import { useState } from "react";
import DeptPhotoSlider from "./DeptPhotoSlider";

function parseYear(date) {
  const match = /(\d{4})(?!.*\d{4})/.exec(date || "");
  return match ? match[1] : "Other";
}

/**
 * Year-sidebar + entry-list layout — replaces the old accordion with an
 * always-expanded list grouped by year, image/slider alongside each
 * writeup (no "Read more" toggle). Reused across Industry Visits,
 * Symposium and Seminars & Activities.
 */
export default function YearGroupedVisits({ items, title = "Events" }) {
  const years = Array.from(new Set(items.map((item) => parseYear(item.date)))).sort((a, b) => b.localeCompare(a));
  const [activeYear, setActiveYear] = useState(years[0]);

  const yearItems = items.filter((item) => parseYear(item.date) === activeYear);

  return (
    <div className="tjs-approvals-layout">
      <aside className="tjs-approvals-sidebar">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            className={"tjs-approvals-cat" + (activeYear === year ? " active" : "")}
            onClick={() => setActiveYear(year)}
          >
            {year}
          </button>
        ))}
      </aside>

      <div className="tjs-ivy-panel">
        <h3>{title} {activeYear}</h3>

        {yearItems.map((item, i) => (
          <div className="tjs-ivy-entry" key={item.title + item.date}>
            <div className="tjs-dept-media-row">
              <div className="tjs-dept-media-row-img">
                {item.imgs && item.imgs.length > 1 ? (
                  <DeptPhotoSlider images={item.imgs} />
                ) : item.imgs && item.imgs.length === 1 ? (
                  <img src={item.imgs[0].src} alt={item.imgs[0].alt} />
                ) : null}
              </div>
              <div className="tjs-dept-media-row-text">
                {item.date && <span className="tjs-dept-event-date">{item.date}</span>}
                <h4 className="tjs-ivy-title">{item.title}</h4>
                {item.desc && <p>{item.desc}</p>}
                {item.people && item.people.length > 0 && (
                  <ul className="tjs-dept-person-list">
                    {item.people.map((p) => (
                      <li key={p.name}>
                        <strong>{p.name}</strong> <span className="tjs-dept-person-role">– {p.role}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {i < yearItems.length - 1 && <hr className="tjs-ivy-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}
