"use client";

import { useState } from "react";

function Html({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function MembersTable({ members }) {
  if (!members.length) return <p className="tjs-dept-pending">Committee members will be added soon.</p>;
  return (
    <div className="tjs-dept-table-wrap">
      <table className="tjs-dept-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Position</th>
            <th>E-Mail Id</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={m.name + i}>
              <td>{i + 1}</td>
              <td>{m.name}</td>
              <td>{m.designation}</td>
              <td>{m.position}</td>
              <td>{m.email || "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CommitteesView({ committees }) {
  const [open, setOpen] = useState(0);

  if (!committees.length) {
    return <p className="tjs-dept-pending">Content coming soon.</p>;
  }

  return (
    <div className="tjs-committee-list">
      {committees.map((c, i) => (
        <div className="tjs-committee-item" key={c.name + i}>
          <button
            type="button"
            className={"tjs-committee-toggle" + (open === i ? " active" : "")}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span>
              {i + 1}. {c.name}
            </span>
            <i className="ri-arrow-down-s-line"></i>
          </button>

          {open === i && (
            <div className="tjs-committee-body">
              {c.intro && <Html html={c.intro} />}
              <MembersTable members={c.members} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
