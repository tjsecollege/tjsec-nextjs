"use client";

import { useState } from "react";

export default function EventAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="tjs-committee-list">
      {items.map((item, i) => (
        <div className="tjs-committee-item" key={item.date + item.title}>
          <button
            type="button"
            className={"tjs-committee-toggle" + (open === i ? " active" : "")}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span>
              {item.date && <span className="tjs-dept-event-date">{item.date}</span>}
              <br />
              {item.title}
            </span>
            <i className="ri-arrow-down-s-line"></i>
          </button>
          {open === i && (
            <div className="tjs-committee-body">
              {item.desc ? <p>{item.desc}</p> : null}
              {item.people && item.people.length > 0 && (
                <ul className="tjs-dept-person-list">
                  {item.people.map((p) => (
                    <li key={p.name}>
                      <strong>{p.name}</strong> <span className="tjs-dept-person-role">– {p.role}</span>
                    </li>
                  ))}
                </ul>
              )}
              {item.imgs && item.imgs.length > 0 && (
                <div className="tjs-dept-event-imgs">
                  {item.imgs.map((img) => (
                    <img key={img.src} src={img.src} alt={img.alt} className={img.wide ? "tjs-dept-event-img-wide" : ""} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
