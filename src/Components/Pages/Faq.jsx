import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    AOS.init({ once: true });
    window.scrollTo(0, 0);

    // Fetch FAQs from API
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}getAllFAQsInUser`
        );
        if (response.data?.faqs) {
          setFaqs(response.data.faqs.filter((faq) => faq.isActive));
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAccordion = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };
  return (
    <>
      <div>
        <section
          className="page_breadcrumb"
          style={{ background: "linear-gradient(135deg, #00833D, #000000)" }}
        >
          <div className="page_breadcrumb_shape_one float-bob-x">
            <img src="/assets/images/icons/mouse-pointer.png" alt />
          </div>
          <div className="page_breadcrumb_shape_two float-bob-y">
            <img src="/assets/images/icons/shape_icon_1.png" alt />
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
                  FAQ
                </h5>
              </div>
              <h1 className="breadcrumb_title" style={{ color: "white" }}>
                Frequently Asked Questions
              </h1>
              <ul className="breadcrumb_menu">
                <li>
                  <Link style={{ color: "white" }} to={"/"}>
                    Home
                  </Link>
                </li>
                <li style={{ color: "white" }}>/</li>
                <li style={{ color: "white" }}>FAQ</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Page Breadcrumb End */}
        {/* Faq Section */}
        <section
          className="faq_section"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration={500}
        >
          <div className="container mt-5">
            <div className="section_title centred">
              <div className="tag_text">
                <h6>General FAQ</h6>
              </div>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="inner_box">
              <ul className="accordion_box">
                {faqs.map((faq, index) => {
                  const isActive = faq._id === activeId;
                  return (
                    <li
                      key={faq._id}
                      className={`accordion block ${
                        isActive ? "active-block" : ""
                      }`}
                    >
                      <div
                        className={`acc-btn ${isActive ? "active" : ""}`}
                        onClick={() => toggleAccordion(faq._id)}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h4 style={{ margin: 0 }}>
                          {index + 1}.&nbsp;&nbsp;{faq.question}
                        </h4>
                        <span
                          style={{
                            fontSize: "24px",
                            userSelect: "none",
                            fontWeight: "bold",
                          }}
                          aria-label={isActive ? "Collapse" : "Expand"}
                        >
                          {isActive ? "−" : "+"}
                        </span>
                      </div>
                      <div
                        className={`acc-content ${isActive ? "current" : ""}`}
                        style={{ display: isActive ? "block" : "none" }}
                      >
                        <div className="text">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Faq;
