import fs from "fs";
import path from "path";
import Script from "next/script";
import { getPlacements } from "@/lib/wordpress";

// Home page's own section markup (banner, about, courses, etc.) — kept
// verbatim as one HTML fragment for the same reason as the rest of the
// template (see app/layout.js). Header/footer/widgets/vendor scripts are
// shared chrome and live in the root layout, not here.
function readContent(file) {
  return fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
}

// Where home-main.html's "Eminent Recruiters" grid gets its logos.
const RECRUITERS_SLOT = /<!-- tjs:major-recruiters[^>]*-->/;

function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Logo file titles like "10_tcs" -> "Tcs".
function logoName(title) {
  return (title || "")
    .replace(/^\d+[_-]*/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

// Two rows of logos on a desktop (7 per row); more than that gets a Show More toggle.
const RECRUITERS_COLLAPSED = 14;

// The same logos as Placements → Our Recruiters → Major Recruiters, so
// editing them in WordPress updates both pages. The grid shows two rows until
// Show More is clicked: a hidden checkbox + label toggle, since this markup
// is plain HTML (CSS in tjs-custom-styles.css).
async function recruitersGrid() {
  const { recruiterGroups } = await getPlacements();
  const major = recruiterGroups.find((g) => /major/i.test(g.tab)) || recruiterGroups[0];
  const logos = major?.logos || [];
  const cards = logos
    .map((logo) => {
      const name = logoName(logo.name);
      const alt = name ? `${name} recruiter logo` : "Recruiter logo";
      return `<div class="rs-recruiters-card"><img src="${escapeHtml(logo.url)}" alt="${escapeHtml(alt)}" loading="lazy"></div>`;
    })
    .join("\n");
  if (logos.length <= RECRUITERS_COLLAPSED) return `<div class="rs-recruiters-grid">${cards}</div>`;
  return `<input type="checkbox" id="rs-recruiters-more" class="rs-recruiters-toggle">
<div class="rs-recruiters-grid is-collapsible">${cards}</div>
<label for="rs-recruiters-more" class="rs-recruiters-more"><span class="is-more">Show More</span><span class="is-less">Show Less</span><i class="ri-arrow-down-s-line"></i></label>`;
}

export default async function Home() {
  const mainHtml = readContent("home-main.html").replace(RECRUITERS_SLOT, await recruitersGrid());
  const youtubeJs = readContent("youtube-caption.js");

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: mainHtml }} />

      <Script
        id="rs-yt-caption-fix"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: youtubeJs }}
      />
    </>
  );
}
