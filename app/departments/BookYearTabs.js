"use client";

import { useState } from "react";
import YearTabs from "../components/YearTabs";

// Department Books & Chapters section: one tab per year (newest first, "Other"
// for entries without a year), showing that year's books and chapters in a table.
// groups: [{ year, items: [{ title, type, isbn, authors, publisher, link }] }]
export default function BookYearTabs({ groups }) {
  const [active, setActive] = useState(0);
  const group = groups[active] || groups[0];

  return (
    <>
      <YearTabs tabs={groups.map((g) => g.year || "Other")} active={groups.indexOf(group)} onSelect={setActive} />
      <div className="tjs-dept-table-wrap">
        <table className="tjs-dept-table tjs-book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>
            {group.items.map((b, i) => (
              <tr key={b.title + i}>
                <td>
                  {b.link ? (
                    <a href={b.link} target="_blank" rel="noopener">
                      {b.title} <i className="ri-external-link-line" aria-hidden="true"></i>
                    </a>
                  ) : (
                    b.title
                  )}
                  {b.type === "chapter" && <span className="tjs-book-tag">Book Chapter</span>}
                  {b.isbn && <span className="tjs-book-isbn">ISBN: {b.isbn}</span>}
                </td>
                <td style={{ whiteSpace: "pre-line" }}>{b.authors}</td>
                <td>{b.publisher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
