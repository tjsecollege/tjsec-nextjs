"use client";

import { useState } from "react";

export default function ProgrammesTabs({ programmes }) {
  const [track, setTrack] = useState(programmes[0]?.track);
  const active = programmes.find((p) => p.track === track);

  if (!active) return null;

  return (
    <>
      <div className="tjs-dept-tabs">
        {programmes.map((p) => (
          <button
            key={p.track}
            type="button"
            className={"tjs-dept-tab" + (track === p.track ? " active" : "")}
            onClick={() => setTrack(p.track)}
          >
            {p.track}
          </button>
        ))}
      </div>

      <h3>Programme Educational Objectives (PEOs)</h3>
      <p>Graduates of the Department of Computer Science and Engineering are expected to:</p>
      <div className="tjs-dept-peo-list">
        {active.peos.map((item) => (
          <div className="tjs-dept-peo" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <h3>Programme Outcomes (POs)</h3>
      <p>Graduates of the Department of Computer Science and Engineering will be able to:</p>
      <div className="tjs-dept-peo-list">
        {active.pos.map((item) => (
          <div className="tjs-dept-peo" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <h3>Programme Specific Outcomes (PSOs)</h3>
      <p>Graduates of the Department of Computer Science and Engineering will be able to:</p>
      <div className="tjs-dept-peo-list">
        {active.psos.map((item) => (
          <div className="tjs-dept-peo" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
