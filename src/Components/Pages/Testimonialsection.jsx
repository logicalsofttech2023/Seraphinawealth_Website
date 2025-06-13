import React, { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const testimonials = [
  {
    id: 1,
    image: '/assets/images/resource/testimonial-1.jpg',
    name: 'Ronald Rogan',
    role: 'UI Designer',
    message:
      'We will assist in the establishment of the legal entities, working with the Fund and Sponsor\'s advisers to prepare bespoke documentation, supporting you get you smoothly through to launch.',
  },
  {
    id: 2,
    image: '/assets/images/resource/testimonial-2.jpg',
    name: 'Ronald Rogan',
    role: 'UI Designer',
    message:
      'We will assist in the establishment of the legal entities, working with the Fund and Sponsor\'s advisers to prepare bespoke documentation, supporting you get you smoothly through to launch.',
  },
  {
    id: 3,
    image: '/assets/images/resource/testimonial-3.jpg',
    name: 'Ronald Rogan',
    role: 'UI Designer',
    message:
      'We will assist in the establishment of the legal entities, working with the Fund and Sponsor\'s advisers to prepare bespoke documentation, supporting you get you smoothly through to launch.',
  },
];

const Testimonialsection = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <section
      className="testimonial_section"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="500"
    >
      <div className="container">
        <div className="shape_bg" />
        <div className="section_title centred">
          <div className="tag_text">
            <h6>Testimonials</h6>
          </div>
          <h2>Love from Clients</h2>
        </div>

        <OwlCarousel
          className="three-item-carousel owl-theme owl-dots-one owl-nav-none"
          items={3}
          margin={30}
          autoplay
          loop
          smartSpeed={600}
          dots={true}
          nav={false}
          responsive={{
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial_block_one">
              <div className="inner_box">
                <ul className="rating">
                  {[...Array(5)].map((_, i) => (
                    <li key={i}>
                      <i className="icon-39" />
                    </li>
                  ))}
                </ul>
                <p>{testimonial.message}</p>
                <div className="author_box">
                  <figure className="thumb_box">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </figure>
                  <div className="author_info">
                    <h5>{testimonial.name}</h5>
                    <span className="designation">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default Testimonialsection;
