import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}createContact`,
        formData
      );
      console.log(response);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: "Your message has been sent successfully!",
          confirmButtonText: "OK",
        });
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <div>
      <section
        className="page_breadcrumb"
        style={{ background: "linear-gradient(135deg, #00833D, #000000)" }}
      >
        <div className="page_breadcrumb_shape_one float-bob-x">
          <img src="assets/images/icons/shape_icon_13.png" alt="" />
        </div>
        <div className="page_breadcrumb_shape_two float-bob-y">
          <img src="assets/images/icons/shape_icon_1.png" alt="" />
        </div>
        <div className="container">
          <div className="breadcrumb_content centred">
            <div className="breadcrumb_sutitle">
              <h5
                style={{
                  background: "linear-gradient(135deg, #00833D, #000000)",
                  WebkitBackgroundClip: "text",
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: "#fff",
                }}
              >
                Contact us
              </h5>
            </div>
            <h1 className="breadcrumb_title" style={{ color: "white" }}>
              Contact Information
            </h1>
            <ul className="breadcrumb_menu" style={{ color: "white" }}>
              <li>
                <Link to="/" style={{ color: "white" }}>
                  Home
                </Link>
              </li>
              <li style={{ color: "white" }}>/</li>
              <li style={{ color: "white" }}>Contact</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact_info_section pt_150 pb_120">
        <div className="container">
          <div className="section_title centred">
            <div className="tag_text">
              <h6>Contact Info</h6>
            </div>
            <h2>Contact Information</h2>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div
                className="contact_block_one mb_30 aos-init"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration={500}
              >
                <div className="contact_block_icon">
                  <i className="icon-3" />
                </div>
                <div className="contact_block_title">
                  <h4>Office Location</h4>
                </div>
                <div className="contact_block_text">
                  <p>
                    Panjot, 3116 Kataula, Sardar, Mandi 175005, Himachal Pradesh
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div
                className="contact_block_one mb_30 aos-init"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration={550}
              >
                <div className="contact_block_icon">
                  <i className="icon-2" />
                </div>
                <div className="contact_block_title">
                  <h4>Email Address</h4>
                </div>
                <div className="contact_block_text">
                  <p>
                    <a href="#">info@seraphinawealth.com</a> <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div
                className="contact_block_one mb_30 aos-init"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration={600}
              >
                <div className="contact_block_icon">
                  <i className="icon-1" />
                </div>
                <div className="contact_block_title">
                  <h4>Phone Number</h4>
                </div>
                <div className="contact_block_text">
                  <p>
                    Emergency Cases <br />
                    <a href="#">+(208) 555-0112 (24/7)</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="google_map aos-init"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration={500}
      >
        <div className="container">
          <div className="map_outer_box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3376.727978321843!2d77.016344!3d31.798296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ3JzUzLjkiTiA3N8KwMDAnNTguOCJF!5e0!3m2!1sen!2sus!4v1625500000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <section
        className="contact_section pt_150 pb_120 aos-init aos-animate"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration={500}
      >
        <div className="container">
          <div className="section_title centred">
            <div className="tag_text">
              <h6>Contact Info</h6>
            </div>
            <h2>Contact Information</h2>
          </div>
          <form onSubmit={handleSubmit} className="contact_form">
            <div className="row">
              {/* First Name */}
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="col-xl-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-xl-12 col-md-12 col-sm-12">
                <div className="form-group centred">
                  <button type="submit" className="btn_style_one">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
