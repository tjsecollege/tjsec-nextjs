"use client";

import { Fragment, useState } from "react";

function LabContent({ lab }) {
  return (
    <>
      {lab.label && <p className="tjs-dept-lab-label">{lab.label}</p>}
      {lab.paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      {lab.imgs && lab.imgs.length > 0 && (
        <div className="tjs-dept-event-imgs">
          {lab.imgs.map((img) => (
            <img key={img.src} src={img.src} alt={img.alt} />
          ))}
        </div>
      )}
    </>
  );
}

/**
 * Collapsible lab list — replaces the old side-by-side photo-slider layout.
 * Images render directly in a wrapped grid (no slider) inside each expanded
 * entry, matching the reference accordion design.
 */
export default function LabAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="tjs-committee-list tjs-lab-accordion">
      {items.map((item, i) => (
        <div className="tjs-committee-item" key={item.name}>
          <button
            type="button"
            className={"tjs-committee-toggle" + (open === i ? " active" : "")}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span>{item.name}</span>
            <i className="ri-arrow-down-s-line"></i>
          </button>
          {open === i && (
            <div className="tjs-committee-body">
              {item.subLabs ? (
                item.subLabs.map((sub) => (
                  <Fragment key={sub.name}>
                    <h4>{sub.name}</h4>
                    <LabContent lab={sub} />
                  </Fragment>
                ))
              ) : (
                <LabContent lab={item} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
