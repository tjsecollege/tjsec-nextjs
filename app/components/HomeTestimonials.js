import TestimonialSlider from "./TestimonialSlider";

// Home page testimonial section: the template's blue box with the campus photo
// on the left and the Alumni page's testimonials sliding on the right (quotes
// are shortened here; the full text is on /alumni#testimonials).
// Content is managed in WordPress: admin.tjsec.ac.in → Campus Life → Alumni → Testimonials
export default function HomeTestimonials({ items }) {
  return (
    <section className="rs-testimonial-area rs-testimonial-one bg-primary tjs-home-testimonials">
      <div className="rs-testimonial-bg-thumb include-bg" data-background="/assets/images/bg/testimonial-bg-thumb-01.jpg"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="rs-testimonial-wrapper tjs-ht-wrapper">
              <div className="rs-testimonial-thumb tjs-ht-thumb">
                <img loading="lazy" src="/assets/images/campus/campus-road-01.jpg" alt="T.J.S Engineering College campus" />
              </div>
              <div className="rs-testimonial-item tjs-ht-item">
                <div className="tjs-ht-head">
                  <div>
                    <span className="tjs-ht-eyebrow">Alumni Testimonials</span>
                    <h3 className="tjs-ht-title">What Our Alumni Say</h3>
                  </div>
                  <i className="ri-double-quotes-l tjs-ht-quote" aria-hidden="true"></i>
                </div>
                <TestimonialSlider
                  items={items}
                  variant="home"
                  footer={
                    <a className="tjs-home-testimonials-more" href="/alumni#testimonials">
                      Read all testimonials <i className="ri-arrow-right-line"></i>
                    </a>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
