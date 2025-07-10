import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Faqsection = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    AOS.init({ once: true });

    // Fetch FAQs from API
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}getAllFAQsInUser`);
        if (response.data?.faqs) {
          setFaqs(response.data.faqs.filter(faq => faq.isActive));
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
    <section
      className="faq_section"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration={500}
    >
      <div className="container">
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
                  className={`accordion block ${isActive ? "active-block" : ""}`}
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
  );
};

export default Faqsection;
