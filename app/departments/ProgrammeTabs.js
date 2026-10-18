"use client";

import { useState } from "react";

function OutcomeList({ heading, items }) {
  if (!items.length) return null;
  return (
    <>
      <h3>{heading}</h3>
      <div className="tjs-dept-peo-list">
        {items.map((item, i) => (
          <div className="tjs-dept-peo" key={i}>
            {item.title ? (
              <>
                <h4>{item.title}</h4>
                {item.text && <p>{item.text}</p>}
              </>
            ) : (
              <p>
                {item.number}. {item.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// programmes: [{ name, peos, pos, psos }], each list item being either
// { title, text } or a numbered { number, text }.
export default function ProgrammeTabs({ programmes }) {
  const [active, setActive] = useState(0);
  const programme = programmes[active];

  return (
    <>
      <div className="tjs-dept-tabs">
        {programmes.map((p, i) => (
          <button
            type="button"
            key={p.name + i}
            className={"tjs-dept-tab" + (i === active ? " active" : "")}
            onClick={() => setActive(i)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <OutcomeList heading="Program Educational Objectives (PEOs)" items={programme.peos} />
      <OutcomeList heading="Program Outcomes (POs)" items={programme.pos} />
      <OutcomeList heading="Program Specific Outcomes (PSOs)" items={programme.psos} />
    </>
  );
}
