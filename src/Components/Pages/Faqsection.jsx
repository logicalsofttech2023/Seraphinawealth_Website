import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
  {
    id: 1,
    question: "How To Cancel Chase Card?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.",
  },
  {
    id: 2,
    question: "What is GlobalWebPay Alternative?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.",
  },
  {
    id: 3,
    question: "What are BIC and SWIFT codes?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.",
  },
  {
    id: 4,
    question: "Explaining what Britain's exit from the EU means?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.",
  },
  {
    id: 5,
    question: "What is Gross Domestic Product or GDP?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.",
  },
];

const Faqsection = () => {
  const [activeId, setActiveId] = useState(5); 

  useEffect(() => {
    AOS.init({ once: true });
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
            {faqs.map(({ id, question, answer }) => {
              const isActive = id === activeId;
              return (
                <li
                  key={id}
                  className={`accordion block ${isActive ? "active-block" : ""}`}
                >
                  <div
                    className={`acc-btn ${isActive ? "active" : ""}`}
                    onClick={() => toggleAccordion(id)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4 style={{ margin: 0 }}>
                      {id}.&nbsp;&nbsp;{question}
                    </h4>
                    {/* Plus/Minus icon */}
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
                      <p>{answer}</p>
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
