"use client";

import { useState } from "react";
import YearTabs from "../components/YearTabs";

// Department Patent section: one tab per academic year (newest first, "Other"
// for patents without a year), showing that year's patents in a table.
// groups: [{ year, items: [{ inventors, title, application_number, status, document }] }]
export default function PatentYearTabs({ groups, hasStatus }) {
  const [active, setActive] = useState(0);
  const group = groups[active] || groups[0];

  return (
    <>
      <YearTabs tabs={groups.map((g) => g.year || "Other")} active={groups.indexOf(group)} onSelect={setActive} />
      <div className="tjs-dept-table-wrap">
        <table className="tjs-dept-table tjs-patent-table">
          <thead>
            <tr>
              <th>Name of the Faculty</th>
              <th>Title of Patent</th>
              <th>Application Number</th>
              {hasStatus && <th>Status</th>}
            </tr>
          </thead>
          <tbody>
            {group.items.map((p, i) => (
              <tr key={(p.application_number || p.title) + i}>
                <td>{p.inventors}</td>
                <td>
                  {p.document?.url ? (
                    <a href={p.document.url} target="_blank" rel="noopener">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </td>
                <td>{p.application_number}</td>
                {hasStatus && <td style={{ textTransform: "capitalize" }}>{p.status}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
