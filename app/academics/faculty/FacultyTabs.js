"use client";

import { useState } from "react";

export default function FacultyTabs({ departments }) {
  const [activeSlug, setActiveSlug] = useState(departments[0]?.slug);
  const active = departments.find((d) => d.slug === activeSlug) || departments[0];

  return (
    <div className="tjs-approvals-layout">
      <aside className="tjs-approvals-sidebar">
        {departments.map((dept) => (
          <button
            key={dept.slug}
            type="button"
            className={"tjs-approvals-cat" + (dept.slug === active?.slug ? " active" : "")}
            onClick={() => setActiveSlug(dept.slug)}
          >
            {dept.title}
          </button>
        ))}
      </aside>

      <div className="tjs-approvals-panel">
        {active && (
          <div className="tjs-committee-body">
            <h4>{active.title}</h4>
            <div className="tjs-dept-people-grid-full">
              {active.faculty.map((f, i) => (
                <div className="tjs-dept-people-card" key={f.name + i}>
                  <div className="tjs-dept-people-photo">
                    {f.photo ? <img src={f.photo} alt={f.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{f.name}</h4>
                  {f.role && <p className="tjs-dept-people-role">{f.role}</p>}
                  {f.spec && <p className="tjs-dept-people-spec">{f.spec}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
