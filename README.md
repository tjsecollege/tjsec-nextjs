# T.J.S Engineering College — Next.js site

This is the original HTML template converted into a runnable Next.js (App Router) project.
**All design, CSS animations, jQuery/GSAP/Swiper interactions, and sliders are preserved exactly
as in the source template** — see "How this was converted" below for why nothing is missing.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

For a production build:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.js        -> <html>/<head>, loads all stylesheets in the original order
  page.js           -> loads the page markup + all vendor/plugin scripts, in the original order
content/
  body.html         -> the original page markup (header, all sections, footer, chatbot widget),
                       byte-for-byte from the uploaded template, with asset paths fixed to /assets/...
  chatbot-inline.js -> the inline chatbot widget script from the original file
  youtube-caption.js-> the inline script that disables captions on the banner YouTube video
public/
  assets/
    css/            -> all original stylesheets (bootstrap, swiper, main.css, etc.)
                       + tjs-custom-styles.css (was an inline <style> block in the original file)
    js/             -> all original vendor + plugin scripts (jQuery, GSAP, Swiper, WOW, Lenis,
                       Isotope, Odometer, nouislider, flatpickr, meanmenu, jarallax, etc.)
    images/         -> all original images
    fonts/          -> remixicon font
scss-source/        -> the original Sass source partials (not required to run the site — kept
                       only as reference in case you want to recompile main.css yourself later)
```

## How this was converted

The template relies on jQuery + about a dozen classic plugins (GSAP/ScrollTrigger, Swiper,
WOW.js, Lenis, Isotope, Odometer, nouislider, flatpickr, meanmenu, jarallax, magnific-popup)
that all expect to run against the exact original DOM, in the exact original script order.

Rather than hand-rewriting ~2,700 lines of interlinked markup into JSX (which risks silently
breaking selectors that WOW/GSAP/Swiper depend on), the page markup was moved over **verbatim**
into `content/body.html` and is rendered with `dangerouslySetInnerHTML` in `app/page.js`. All
the original `<script>` tags are loaded via `next/script` with `strategy="afterInteractive"`,
in the same order as the source file, so initialization timing matches the original static
page exactly.

This was verified with a headless-browser check after conversion: jQuery, GSAP, Swiper,
Lenis, WOW.js, meanmenu and Odometer all initialize correctly, and a visual screenshot pass
confirmed the header, sticky admissions button, image sections, badges, and events ticker
render pixel-for-pixel like the original template.

## Known items carried over as-is from the original template

- The contact form posts to `assets/mailer.php`, which doesn't exist in the uploaded template
  either (there's a comment in the original file noting it's a front-end placeholder until a
  backend endpoint is wired up). You'll need to point this at a real form-handling endpoint
  (e.g. an API route under `app/api/`) when you're ready to accept submissions.
- The banner video is a real YouTube embed (`iframe_api`), so it needs an internet connection
  to load — it won't play when the dev server is opened somewhere fully offline.
