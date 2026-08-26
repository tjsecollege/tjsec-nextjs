import fs from "fs";
import path from "path";
import Script from "next/script";

// Home page's own section markup (banner, about, courses, etc.) — kept
// verbatim as one HTML fragment for the same reason as the rest of the
// template (see app/layout.js). Header/footer/widgets/vendor scripts are
// shared chrome and live in the root layout, not here.
function readContent(file) {
  return fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
}

export default function Home() {
  const mainHtml = readContent("home-main.html");
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
