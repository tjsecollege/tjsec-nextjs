import fs from "fs";
import path from "path";
import Script from "next/script";

export const metadata = {
  title: "T.J.S Engineering College – Building The Future O  n A Foundation of Excellence",
  icons: {
    icon: "/assets/images/favicon.png",
    shortcut: "/assets/images/favicon.png",
  },
  other: {
    "template-version": "1.0.1",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Header, offcanvas menu, footer, back-to-top/admissions button and the
// chatbot widget are site-wide chrome shared by every page, so they live
// here in the root layout instead of being duplicated per page. Each page's
// own markup renders as `{children}` inside <main>. See content/README for
// why these are kept as verbatim HTML fragments instead of JSX.
function readContent(file) {
  return fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
}

export default function RootLayout({ children }) {
  const headerHtml = readContent("header.html");
  const footerHtml = readContent("footer.html");
  const widgetsHtml = readContent("site-widgets.html");
  const chatbotJs = readContent("chatbot-inline.js");

  return (
    <html className="no-js" lang="zxx">
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* Stylesheets — kept in the exact original order so cascade/specificity matches 1:1 */}
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/flatpickr.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/nouislider.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/vendor/odometer.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/spacing.css" />
        <link rel="stylesheet" href="/assets/css/vendor/remixicon.css" />
        <link rel="stylesheet" href="/assets/css/main.css?=29" />
        {/* Consolidated page-specific overrides (was an inline <style> block in the original file) */}
        <link rel="stylesheet" href="/assets/css/tjs-custom-styles.css" />
      </head>
      <body className="rs-smoother-yes">
        <div dangerouslySetInnerHTML={{ __html: headerHtml }} />

        <main>{children}</main>

        <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
        <div dangerouslySetInnerHTML={{ __html: widgetsHtml }} />

        {/* Vendor + plugin scripts, loaded in the exact same order as the
            original index.html so init timing (jQuery -> plugins -> main.js)
            is preserved. strategy="afterInteractive" mirrors scripts placed
            right before </body> in a static page. */}
        <Script src="/assets/js/vendor/jquery-3.7.1.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/meanmenu.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/swiper.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/jarallax.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/ajax-form.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/lenis.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/gsap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/rs-anim-int.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/rs-scroll-trigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/rs-splitText.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/jquery.appear.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/flatpickr.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/nouislider.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/odometer.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js?=1" strategy="afterInteractive" />

        <Script
          id="tjs-chatbot-inline"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: chatbotJs }}
        />
      </body>
    </html>
  );
}
