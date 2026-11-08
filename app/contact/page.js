import Link from "next/link";
export default function Contact() {
  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Contact</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Get in Touch
          </h2>

          <div className="tjs-dept-grid-3">
            <div className="tjs-dept-card">
              <i
                className="ri-map-pin-2-line"
                style={{ fontSize: 28, color: "var(--rs-theme-blue)", display: "block", marginBottom: 10 }}
              ></i>
              <h3>Address</h3>
              <p>
                T.J.S Nagar, Peruvoyal, Kavarapettai,
                <br />
                Near Redhills, Gummidipoondi Taluk,
                <br />
                Thiruvallur Dist &ndash; 601206
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=T.J.S+Engineering+College+Peruvoyal+Kavarapettai+Gummidipoondi"
                target="_blank"
                rel="noopener"
              >
                Locate Us <i className="ri-external-link-line"></i>
              </a>
            </div>

            <div className="tjs-dept-card">
              <i
                className="ri-phone-fill"
                style={{ fontSize: 28, color: "var(--rs-theme-blue)", display: "block", marginBottom: 10 }}
              ></i>
              <h3>Phone</h3>
              <p>
                <a href="tel:+914427967602">044-27967602 / 604 / 605</a>
              </p>
            </div>

            <div className="tjs-dept-card">
              <i
                className="ri-mail-fill"
                style={{ fontSize: 28, color: "var(--rs-theme-blue)", display: "block", marginBottom: 10 }}
              ></i>
              <h3>Email</h3>
              <p>
                <a href="mailto:admission@tjsec.in">admission@tjsec.in</a>
              </p>
            </div>
          </div>
        </section>

        <section className="tjs-dept-section tjs-dept-section-alt">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Find Us
          </h2>
          <div className="tjs-contact-map-wrap">
            <iframe
              title="T.J.S Engineering College location"
              src="https://www.google.com/maps?q=T.J.S+Engineering+College+Peruvoyal+Kavarapettai+Gummidipoondi&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Follow Us
          </h2>
          <div className="tjs-contact-social">
            <ul>
              <li>
                <a href="https://www.instagram.com/t.j.s_engineeringcollege/" target="_blank" rel="noopener">
                  <span className="tjs-footer-social-icon tjs-social-instagram">
                    <i className="ri-instagram-line"></i>
                  </span>{" "}
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://m.facebook.com/tjsgroupofinstitutions/" target="_blank" rel="noopener">
                  <span className="tjs-footer-social-icon tjs-social-facebook">
                    <i className="ri-facebook-fill"></i>
                  </span>{" "}
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/tjsec2009/" target="_blank" rel="noopener">
                  <span className="tjs-footer-social-icon tjs-social-linkedin">
                    <i className="ri-linkedin-fill"></i>
                  </span>{" "}
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://x.com/tjsenggcollege" target="_blank" rel="noopener">
                  <span className="tjs-footer-social-icon tjs-social-twitter">
                    <i className="ri-twitter-x-fill"></i>
                  </span>{" "}
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@TJSECDIGITALCELL" target="_blank" rel="noopener">
                  <span className="tjs-footer-social-icon tjs-social-youtube">
                    <i className="ri-youtube-fill"></i>
                  </span>{" "}
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
