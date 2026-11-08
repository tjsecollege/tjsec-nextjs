import Link from "next/link";
import { getWellnessCentre } from "@/lib/wordpress";

function paragraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// Content is managed in WordPress: admin.tjsec.ac.in → Wellness Centre
export default async function WellnessCentre() {
  const w = await getWellnessCentre();
  const title = w.pageTitle || "Wellness Centre";
  const contacts = [
    w.location && { icon: "ri-map-pin-line", label: "Visit Us", value: w.location },
    w.email && { icon: "ri-mail-line", label: "Email", value: w.email, href: `mailto:${w.email}` },
    w.phone && { icon: "ri-phone-line", label: "Phone", value: w.phone, href: `tel:${w.phone.replace(/[^\d+]/g, "")}` },
    w.instagram && { icon: "ri-instagram-line", label: "Instagram", value: "Follow us", href: w.instagram, external: true },
  ].filter(Boolean);

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Campus Life</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {title}
          </h2>

          {/* Welcome */}
          <div className={"tjs-well-hero" + (w.heroPhoto ? "" : " no-photo")}>
            <div className="tjs-well-hero-text">
              {w.heroEyebrow && <span className="tjs-well-eyebrow">{w.heroEyebrow}</span>}
              {w.heroTitle && <h3>{w.heroTitle}</h3>}
              {w.heroText && <p>{w.heroText}</p>}
              {(w.bookLink || w.thoughtsLink) && (
                <div className="tjs-well-actions">
                  {w.bookLink && (
                    <a className="tjs-well-btn" href={w.bookLink} target="_blank" rel="noopener">
                      <i className="ri-chat-smile-2-line"></i> Book a Chat
                    </a>
                  )}
                  {w.thoughtsLink && (
                    <a className="tjs-well-btn is-outline" href={w.thoughtsLink} target="_blank" rel="noopener">
                      <i className="ri-quill-pen-line"></i> Share Your Thoughts
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="tjs-well-hero-side">
              {w.heroPhoto ? (
                <img loading="lazy" src={w.heroPhoto.src} alt={w.heroPhoto.alt} />
              ) : (
                <span className="tjs-well-hero-icon" aria-hidden="true">
                  <i className="ri-heart-pulse-line"></i>
                </span>
              )}
              {w.heroNote && <p className="tjs-well-hero-note">{w.heroNote}</p>}
            </div>
          </div>

          {/* Objective */}
          {(w.objectiveText || w.pillars.length > 0) && (
            <div className="tjs-well-block">
              <span className="tjs-well-eyebrow">Our Purpose</span>
              <h3 className="tjs-well-heading">{w.objectiveTitle || "Objective of the Wellness Centre"}</h3>
              {paragraphs(w.objectiveText).map((p, i) => (
                <p className="tjs-well-para" key={i}>
                  {p}
                </p>
              ))}
              {w.pillars.length > 0 && (
                <div className="tjs-well-pillars">
                  {w.pillars.map((p, i) => (
                    <div className="tjs-well-pillar" key={p.title + i}>
                      <span className="tjs-well-pillar-icon">
                        <i className={p.icon}></i>
                      </span>
                      <h4>{p.title}</h4>
                      {p.text && <p>{p.text}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FAQ */}
          {(w.faqs.length > 0 || w.challenges.length > 0) && (
            <div className="tjs-well-block tjs-well-faq">
              <div className="tjs-well-faq-intro">
                <span className="tjs-well-eyebrow">Need to know?</span>
                <h3 className="tjs-well-heading">{w.faqTitle || "Frequently Asked Questions"}</h3>
                {w.faqIntro && <p className="tjs-well-para">{w.faqIntro}</p>}
                {w.bookLink && (
                  <a className="tjs-well-btn" href={w.bookLink} target="_blank" rel="noopener">
                    <i className="ri-chat-heart-line"></i> Talk to a Counsellor
                  </a>
                )}
              </div>
              <div className="tjs-well-faq-list">
                {w.faqs.map((f, i) => (
                  <details className="tjs-well-qa" key={f.question + i} open={i === 0}>
                    <summary>
                      {f.question}
                      <i className="ri-arrow-down-s-line" aria-hidden="true"></i>
                    </summary>
                    {f.answer && <p>{f.answer}</p>}
                  </details>
                ))}
              </div>
            </div>
          )}

          {(w.challenges.length > 0 || w.privacyText) && (
            <div className="tjs-well-support">
              {w.challenges.length > 0 && (
                <div className="tjs-well-challenges">
                  <h4>{w.challengesTitle || "Common challenges we can discuss"}</h4>
                  <ul>
                    {w.challenges.map((c, i) => (
                      <li key={i}>
                        <i className="ri-checkbox-circle-line" aria-hidden="true"></i>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {w.privacyText && (
                <div className="tjs-well-privacy">
                  <span className="tjs-well-pillar-icon">
                    <i className="ri-shield-check-line"></i>
                  </span>
                  <h4>{w.privacyTitle || "Your privacy matters"}</h4>
                  <p>{w.privacyText}</p>
                </div>
              )}
            </div>
          )}

          {/* Contact */}
          {(w.contactTitle || w.contactText || contacts.length > 0) && (
            <div className="tjs-well-contact">
              <div>
                <span className="tjs-well-eyebrow">Stay connected</span>
                {w.contactTitle && <h3>{w.contactTitle}</h3>}
                {w.contactText && <p>{w.contactText}</p>}
              </div>
              {contacts.length > 0 && (
                <ul className="tjs-well-contact-list">
                  {contacts.map((c) => (
                    <li key={c.label}>
                      <span className="tjs-well-contact-icon">
                        <i className={c.icon}></i>
                      </span>
                      <span>
                        <strong>{c.label}</strong>
                        {c.href ? (
                          <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})}>
                            {c.value}
                          </a>
                        ) : (
                          c.value
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
