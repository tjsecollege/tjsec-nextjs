"use client";

import { useState } from "react";
import YearTabs from "./YearTabs";

// Browsers can't render Word/PowerPoint/Excel inline, so those are shown
// through Microsoft's free Office Online embed viewer; PDFs load directly.
function viewerUrl(url) {
  return /\.(docx?|pptx?|xlsx?)(?:$|\?)/i.test(url)
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
    : url;
}

// Year tabs (scrollable, with ‹ › arrows) above an embedded document viewer.
// Used by Approval & Affiliations, Placements → Placed Students and
// Sports and Fitness. docs: [{ tab: "2026-27", url: "https://…pdf" }] — the
// first one opens by default. hideSingleTab: with only one document, show
// just the viewer (no lone tab button) — used by CategoryDocsView.
export default function YearPdfTabs({ docs, title, hideSingleTab = false }) {
  const [active, setActive] = useState(0);
  const doc = docs[active];
  const showTabs = !(hideSingleTab && docs.length === 1);

  return (
    <>
      {showTabs && <YearTabs tabs={docs.map((d) => d.tab)} active={active} onSelect={setActive} />}

      {doc && (
        <div className="tjs-approvals-viewer">
          <iframe key={doc.url} src={viewerUrl(doc.url)} title={`${title} ${doc.tab}`} />
        </div>
      )}
    </>
  );
}
