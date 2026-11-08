"use client";

import { useState } from "react";

// categories: [{ label: "B.E", programmes: [{ name, duration, intake, href }] }]
export default function ProgrammesView({ pageTitle, intro, categories }) {
  const [active, setActive] = useState(0);
  const category = categories[active];

  return (
    <div className="tjs-prog-page">
      <div className="tjs-prog-hero">
        <h1>{pageTitle || "Programmes Offered"}</h1>
        {intro && <p>{intro}</p>}
      </div>

      {category ? (
        <>
          <div className="tjs-prog-tabs-wrapper">
            <div className="tjs-prog-tabs">
              {categories.map((c, i) => (
                <button
                  key={c.label + i}
                  type="button"
                  className={"tjs-prog-tab" + (active === i ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className="tjs-prog-hint">
              Select {categories.map((c) => c.label).join(", ")} above to view all available courses
            </p>
          </div>

          <div className="tjs-prog-grid">
            {category.programmes.map((prog, i) => (
              <div className="tjs-prog-card" key={prog.name + i}>
                <h3>{prog.name}</h3>
                <span className="tjs-prog-degree-tag">{category.label} Degree</span>
                {(prog.duration || prog.intake) && (
                  <div className="tjs-prog-meta">
                    {prog.duration && <span>{prog.duration}</span>}
                    {prog.intake && <span>Intake: {prog.intake}</span>}
                  </div>
                )}
                <a href={prog.href || "#"} className="tjs-prog-explore">
                  Explore &rarr;
                </a>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="tjs-dept-pending" style={{ textAlign: "center" }}>
          Programmes will be added soon.
        </p>
      )}
    </div>
  );
}
