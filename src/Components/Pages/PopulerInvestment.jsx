import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopulerInvestment = () => {
  const sliderRef = useRef(null);
  
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false, // We'll use our custom arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const plans = [
    {
      id: 1,
      title: "Retirement Solutions",
      icon: "icon-33",
      roi: "12.5% p.a",
      duration: "12 months",
      risk: "Moderate",
      description: "Duis aute irure sdsdsd df ....",
      aosDuration: 300
    },
    {
      id: 2,
      title: "Fraud & Protect",
      icon: "icon-32",
      roi: "10.8% p.a",
      duration: "24 months",
      risk: "Low",
      description: "Duis aute irure sdsdsd df ....",
      aosDuration: 500
    },
    {
      id: 3,
      title: "Risk & Compliance",
      icon: "icon-31",
      roi: "15.2% p.a",
      duration: "18 months",
      risk: "High",
      description: "Duis aute irure sdsdsd df ....",
      aosDuration: 700
    },
    {
      id: 4,
      title: "Wealth Management",
      icon: "icon-30",
      roi: "18.5% p.a",
      duration: "36 months",
      risk: "High",
      description: "Duis aute irure sdsdsd df ....",
      aosDuration: 900
    }
  ];

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <section className="service_section">
        <div className="circle_one" />
        <div className="circle_two" />
        <div className="container">
          <div className="section_title light centred">
            <div className="tag_text">
              <h6>Popular Investment Plans</h6>
            </div>
            <h2>Popular Investment Plans</h2>
          </div>
          
          <div style={{ position: "relative", marginBottom: "50px" }}>
            <Slider ref={sliderRef} {...settings}>
              {plans.map((plan) => (
                <div key={plan.id} style={{ padding: "0 15px" }}>
                  <div
                    className="service_block_one"
                    data-aos="fade-up"
                    data-aos-duration={plan.aosDuration}
                    style={{
                      background: "#ffffff",
                      borderRadius: "14px",
                      padding: "20px",
                      height: "100%",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                      border: "1px solid rgba(241, 245, 249, 0.8)",
                      display: "flex",
                      flexDirection: "column",
                      margin: "0 10px"
                    }}
                  >
                    <div
                      className="service_icon"
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "linear-gradient(111deg, #E770C1 19.42%, #9F70FD 73.08%)",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "24px",
                        color: "white",
                        fontSize: "28px",
                        boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      <i className={plan.icon} />
                    </div>
                    <h4 style={{ color: "#1e293b", fontSize: "20px", fontWeight: "700", marginBottom: "16px", lineHeight: "1.4", textAlign: "start" }}>
                      <a href="#">{plan.title}</a>
                    </h4>

                    <div style={{ marginBottom: "20px", textAlign: "start" }}>
                      <div style={{ display: "flex", marginBottom: "8px" }}>
                        <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>ROI:</span>
                        <span style={{ fontWeight: "600", color: "#0D0D0D" }}>{plan.roi}</span>
                      </div>
                      <div style={{ display: "flex", marginBottom: "8px" }}>
                        <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Duration:</span>
                        <span style={{ fontWeight: "600", color: "#1e293b" }}>{plan.duration}</span>
                      </div>
                      <div style={{ display: "flex", marginBottom: "8px" }}>
                        <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Risk:</span>
                        <span style={{ fontWeight: "600", color: "#0D0D0D" }}>{plan.risk}</span>
                      </div>
                    </div>

                    <p style={{ color: "#64748b", marginBottom: "24px", lineHeight: "1.6", fontSize: "15px", flexGrow: 1, textAlign: "start" }}>
                      {plan.description}
                    </p>

                    <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
                      <a
                        href="#"
                        style={{
                          color: "#3b82f6",
                          fontWeight: "600",
                          fontSize: "15px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          transition: "all 0.2s ease",
                          padding: "8px 0",
                        }}
                      >
                        Learn More
                        <span style={{ marginLeft: "8px", fontSize: "14px", transition: "transform 0.2s ease" }}>→</span>
                      </a>

                      <button
                        style={{
                          background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                          color: "white",
                          border: "none",
                          padding: "8px 20px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "15px",
                          transition: "all 0.2s ease",
                          boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
                          flex: 1,
                        }}
                      >
                        Invest Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* Custom Arrow Buttons - Centered at Bottom */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "30px",
              position: "relative",
              bottom: "0",
              width: "100%"
            }}>
              <button 
                onClick={goToPrev}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                  color: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  ":hover": {
                    transform: "scale(1.05)"
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              <button 
                onClick={goToNext}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                  color: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  ":hover": {
                    transform: "scale(1.05)"
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          
          <h1 className="section_tag" style={{ fontSize: "220px" }}>Investment</h1>
        </div>
      </section>
    </>
  );
};

export default PopulerInvestment;
