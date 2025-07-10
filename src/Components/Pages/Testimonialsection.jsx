import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Testimonialsection = () => {
  const base_url = import.meta.env.VITE_API_URL;
  const file_url = import.meta.env.VITE_FILE_URL;
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ once: true });
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${base_url}getAllTestimonialsInUser`);
      console.log("API Response:", response.data); // Debug log

      if (response.status === 200) {
        setTestimonials(response.data.data);
      }
    } catch (error) {
      console.error("Full error:", error); // More detailed error
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simple fallback UI for debugging
  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>Error loading testimonials: {error}</div>;
  if (testimonials.length === 0) return <div>No testimonials found</div>;

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
          <div
            className="tag_text"
            style={{
              background:
                "linear-gradient(135deg, rgb(0, 131, 61), rgb(0, 0, 0))",
            }}
          >
            <h6>Testimonials</h6>
          </div>
          <h2>Love from Clients</h2>
        </div>

        

        <OwlCarousel
          className="three-item-carousel owl-theme owl-dots-one owl-nav-none"
          items={3}
          margin={30}
          autoplay={true}
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
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial._id} 
              className="testimonial_block_one"
               // Temporary style for visibility
            >
              <div className="inner_box">
                <ul className="rating">
                  {[...Array(5)].map((_, i) => (
                    <li key={i}>
                      <i className="icon-39">★</i> {/* Temporary star */}
                    </li>
                  ))}
                </ul>
                <p>{testimonial.message}</p>
                <div className="author_box">
                  <figure className="thumb_box">
                    <img
                      src={`${file_url}${testimonial.image}`}
                      alt={testimonial.name}
                      style={{
                        objectFit: "cover",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        border: '1px solid red' // Temporary style
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUxAbfR46H-_MPyA4voc5Kz8e6MlT0iI3z2OuaP8-8SvTbYdsNyRGMaCzthVvghkqqKjo&usqp=CAU";
                      }}
                    />
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