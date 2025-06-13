import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "linear",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <>
      <footer className="main_footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              {/* Logo & About Section */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-xs-12">
                <div
                  className="footer_widget about_widget"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <figure className="footer_logo">
                    <Link to="/">
                      <img
                        style={{
                          width: "25%",
                          borderRadius: "50%",
                          height: "auto",
                        }}
                        src="/assets/images/logo.jpg"
                        alt="Company Logo"
                      />
                    </Link>
                  </figure>
                  <p>
                    The future is fast approaching, and the consumer industry is
                    on the precipice of dramatic change.
                  </p>
                  <ul className="social-links">
                    <li>
                      <a href="#"><i className="icon-43" /></a>
                    </li>
                    <li>
                      <a href="#"><i className="icon-42" /></a>
                    </li>
                    <li>
                      <a href="#"><i className="icon-40" /></a>
                    </li>
                    <li>
                      <a href="#"><i className="icon-41" /></a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pages Section */}
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-5 col-xs-12">
                <div
                  className="footer_widget page_widget"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration={550}
                >
                  <h4 className="footer_widget_title">Pages</h4>
                  <ul className="page_list">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to="/faq">FAQ's</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/support">Support</Link></li>
                  </ul>
                </div>
              </div>

              {/* Primary Pages Section */}
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-5 col-xs-12">
                <div
                  className="footer_widget primary_page_widget"
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-duration={600}
                >
                  <h4 className="footer_widget_title">Primary Pages</h4>
                  <ul className="primary_page_list">
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/careers">Careers</Link></li>
                    <li><Link to="/pricing">Pricing Plans</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><Link to="/news">News</Link></li>
                  </ul>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-xs-12">
                <div
                  className="footer_widget newsletter_widget"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration={650}
                >
                  <h4 className="footer_widget_title">Subscribe Newsletter</h4>
                  <p>
                    To add complexity, this is happening against a backdrop of
                    significant challenges.
                  </p>
                  <div className="subscribe-inner">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        // handle subscription here
                      }}
                      className="subscribe-form"
                    >
                      <div className="form-group">
                        <label htmlFor="email" className="visually-hidden">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email Address"
                          required
                        />
                        <button type="submit" className="btn_style_one">
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer_bottom">
          <div className="container">
            <div className="copyright">
              Copyright © 2024 &nbsp;
              <Link to="/">Financer</Link>, Inc. All Rights Reserved.
            </div>
          </div>
        </div>

        {/* Decorative Shape (style with CSS if needed) */}
        <div className="footer_shape" />
      </footer>
    </>
  );
};

export default Footer;
