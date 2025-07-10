import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "./logo.png";
import axios from "axios";
import Swal from "sweetalert2";
const Footer = () => {
  const [email , setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "linear",
      once: true,
      mirror: false,
    });
  }, []);

  const handleNewsletterSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    Swal.fire({
      icon: "warning",
      title: "Email Required",
      text: "Please enter your email address.",
    });
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}subscribeNewsletter`,
      { email }
    );

    if (res.status === 201 || res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "You have successfully subscribed to our newsletter.",
        showConfirmButton: true,
      });
      setEmail(""); // reset email input if using useState
    }
  } catch (err) {
    console.error("Subscription failed:", err);
    Swal.fire({
      icon: "error",
      title: "Subscription Failed",
      text:
        err?.response?.data?.message ||
        "An error occurred. Please try again later.",
    });
  } finally {
    setLoading(false);
  }
};


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
                          width: "50%",
                          borderRadius: "50%",
                          height: "auto",
                        }}
                        src={logo}
                        alt="Company Logo"
                      />
                    </Link>
                  </figure>
                  <p style={{ fontWeight: "bold", marginTop: "10px", fontSize: "15px" }}>
                    Your Wealth, Our Wings. <br />
                    Smart Investments. Powerful Growth.
                  </p>
                  
                  
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
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    
                    <li>
                      <Link to="/faq">FAQ's</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                   
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
                    <li>
                      <Link to="/researchAnalysis">Research Analysis</Link>
                    </li>
                   
                    <li>
                      <Link to="/privacyPolicy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/termsAndCondition">Terms & Conditions</Link>
                    </li>
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

                  <div className="subscribe-inner">
                    <form className="subscribe-form" onSubmit={handleNewsletterSubmit}>
                      <div className="form-group" >
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          style={{ width: "100%" }}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="btn_style_one"
                          style={{ width: "50%", padding: "10px" }}
                        >
                          {loading ? "Sending..." : "Subscribe"}
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
              Copyright © 2025 &nbsp;
              <Link to="/" style={{ color: "#00833D"}}>Seraphina Wealth</Link>, Inc. All Rights Reserved.
            </div>
          </div>
        </div>

        {/* Decorative Shape */}
        <div className="footer_shape" />
      </footer>
    </>
  );
};

export default Footer;
