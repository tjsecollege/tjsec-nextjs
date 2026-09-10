"use client";

import { useState } from "react";

const CATEGORIES = ["B.E", "B.Tech", "M.E", "MBA"];

const PROGRAMMES = {
  "B.E": [
    { name: "Computer Science and Engineering", duration: "4 Years", intake: 120, href: "/departments/cse" },
    { name: "Computer Science and Engineering (AI & ML)", duration: "4 Years", intake: 60 },
    { name: "Electrical and Communication Engineering", duration: "4 Years", intake: 60 },
    { name: "Electrical and Electronics Engineering", duration: "4 Years", intake: 60 },
    { name: "Mechanical Engineering", duration: "4 Years", intake: 30 },
  ],
  "B.Tech": [
    { name: "Information Technology", duration: "4 Years" },
    { name: "Artificial Intelligence and Data Science (AIDS)", duration: "4 Years" },
  ],
  "M.E": [
    { name: "Computer Science and Engineering", duration: "2 Years", href: "/departments/cse" },
    { name: "VLSI & Design", duration: "2 Years" },
  ],
  MBA: [{ name: "Master of Business Administration", duration: "2 Years" }],
};

export default function ProgrammesOffered() {
  const [active, setActive] = useState("B.E");

  return (
    <div className="tjs-prog-page">
      <div className="tjs-prog-hero">
        <h1>Programmes Offered</h1>
        <p>Explore our undergraduate and postgraduate programmes</p>
      </div>

      <div className="tjs-prog-tabs-wrapper">
        <div className="tjs-prog-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={"tjs-prog-tab" + (active === cat ? " active" : "")}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="tjs-prog-hint">Select {CATEGORIES.join(", ")} above to view all available courses</p>
      </div>

      <div className="tjs-prog-grid">
        {PROGRAMMES[active].map((prog) => (
          <div className="tjs-prog-card" key={prog.name}>
            <h3>{prog.name}</h3>
            <span className="tjs-prog-degree-tag">{active} Degree</span>
            <div className="tjs-prog-meta">
              {prog.intake ? <span>Intake: {prog.intake}</span> : null}
              {prog.intake ? <span className="tjs-prog-meta-sep">&middot;</span> : null}
              <span>{prog.duration}</span>
            </div>
            <a href={prog.href || "#"} className="tjs-prog-explore">
              Explore &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
