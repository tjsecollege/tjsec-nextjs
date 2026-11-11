import TestimonialSlider from "./TestimonialSlider";

// Home page testimonial section: the template's blue box (campus photo on the
// left) with the Alumni page's testimonials sliding on the right.
// Content is managed in WordPress: admin.tjsec.ac.in → Campus Life → Alumni → Testimonials
export default function HomeTestimonials({ items }) {
  return (
    <section className="rs-testimonial-area rs-testimonial-one bg-primary tjs-home-testimonials">
      <div className="rs-testimonial-bg-thumb include-bg" data-background="/assets/images/bg/testimonial-bg-thumb-01.jpg"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="rs-testimonial-wrapper">
              <div className="rs-testimonial-thumb">
                <img loading="lazy" src="/assets/images/campus/campus-road-01.jpg" alt="T.J.S Engineering College campus" />
              </div>
              <div className="rs-testimonial-item">
                <TestimonialSlider items={items} variant="home" />
                <a className="tjs-home-testimonials-more" href="/alumni#testimonials">
                  More from our alumni <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
