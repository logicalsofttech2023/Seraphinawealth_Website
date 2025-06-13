import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Investmentplans = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });

    // Check if mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const investmentPlans = [
    {
      id: 1,
      title: "SIP Investment",
      description:
        "Monthly investments in mutual funds to build wealth over time with disciplined investing.",
      category: "mutual-funds",
      icon: "icon-33",
    },
    {
      id: 2,
      title: "Mutual Funds",
      description:
        "Diversify your investment portfolio with professionally managed mutual funds.",
      category: "mutual-funds",
      icon: "icon-32",
    },
    {
      id: 3,
      title: "Fixed Deposits",
      description:
        "Guaranteed returns and safe investment option offered by banks and NBFCs.",
      category: "fixed-income",
      icon: "icon-31",
    },
    {
      id: 4,
      title: "Gold Investment",
      description:
        "Secure your future with digital gold, ETFs, or sovereign gold bonds.",
      category: "commodities",
      icon: "icon-30",
    },
    {
      id: 5,
      title: "Stocks",
      description:
        "Invest in shares of publicly traded companies for potential high returns.",
      category: "equities",
      icon: "icon-29",
    },
    {
      id: 6,
      title: "Real Estate",
      description:
        "Tangible property investments with potential for appreciation and rental income.",
      category: "property",
      icon: "icon-28",
    },
    {
      id: 7,
      title: "Bonds",
      description:
        "Fixed income securities that pay regular interest with lower risk.",
      category: "fixed-income",
      icon: "icon-27",
    },
    {
      id: 8,
      title: "Cryptocurrency",
      description:
        "Digital currency investments with high volatility and potential returns.",
      category: "crypto",
      icon: "icon-26",
    },
  ];

  const filteredPlans =
    activeFilter === "all"
      ? investmentPlans
      : investmentPlans.filter((plan) => plan.category === activeFilter);

  const categories = [
    { id: "all", name: "All Investments" },
    { id: "mutual-funds", name: "Mutual Funds" },
    { id: "fixed-income", name: "Fixed Income" },
    { id: "equities", name: "Stocks" },
    { id: "commodities", name: "Commodities" },
    { id: "property", name: "Real Estate" },
    { id: "crypto", name: "Cryptocurrency" },
  ];

  return (
    <>
      <section
        className="service_section p-0 pt-2"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          padding: "60px 0",
        }}
      >
        {/* Background elements */}
        <div
          className="circle_one"
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(0,0,0,0) 70%)",
            top: "-200px",
            left: "-200px",
            zIndex: 0,
          }}
        />

        <div
          className="circle_two"
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(0,0,0,0) 70%)",
            bottom: "-400px",
            right: "-300px",
            zIndex: 0,
          }}
        />

        {/* Section header */}
        <div
          className="section_title light centred"
          style={{
            marginBottom: "50px",
            position: "relative",
            zIndex: 1,
            marginTop: "20px",
          }}
        >
          
          <h2
            style={{
              color: "#1e293b",
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "16px",
              lineHeight: "1.3",
            }}
          >
            Explore Reliable Investment Options
          </h2>
          <p
            style={{
              color: "#64748b",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontSize: "16px",
            }}
          >
            Choose from our carefully curated investment options to build your
            financial future
          </p>
        </div>

        {/* Main container */}
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            padding: "20px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Sidebar Filter */}
          <div
            style={{
              width: isMobile ? "100%" : "280px",
              padding: isMobile ? "10px 0" : "0 25px 0 0",
              marginBottom: isMobile ? "25px" : "0",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                position: isMobile ? "relative" : "sticky",
                top: "20px",
                border: "1px solid rgba(241, 245, 249, 0.8)",
              }}
            >
              <h3
                style={{
                  marginBottom: "24px",
                  color: "#1e293b",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderBottom: "1px solid #f1f5f9",
                  paddingBottom: "12px",
                }}
              >
                Filter Investments
              </h3>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {categories.map((category) => (
                  <li key={category.id} style={{ marginBottom: "10px" }}>
                    <button
                      onClick={() => setActiveFilter(category.id)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "none",
                        background:
                          activeFilter === category.id
                            ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                            : "#f8fafc",
                        color:
                          activeFilter === category.id ? "white" : "#334155",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontWeight: "500",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        boxShadow:
                          activeFilter === category.id
                            ? "0 2px 5px rgba(59, 130, 246, 0.2)"
                            : "none",
                      }}
                    >
                      {category.name}
                      {activeFilter === category.id && (
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: "14px",
                            background: "rgba(255,255,255,0.2)",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            <div
              className="row"
              style={{ margin: isMobile ? "0 -10px" : "0 -15px", paddingRight: "20px" }}
            >
              {filteredPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                  style={{
                    marginBottom: "30px",
                    padding: isMobile ? "0 10px" : "0 15px",
                  }}
                >
                  <div
                    className="service_block_one"
                    data-aos="fade-up"
                    data-aos-duration={300 + index * 200}
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
                      ":hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <div
                      className="service_icon"
                      style={{
                        width: "70px",
                        height: "70px",
                        background:
                          "linear-gradient(111deg, #E770C1 19.42%, #9F70FD 73.08%)",
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
                    <h4
                      style={{
                        color: "#1e293b",
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "16px",
                        lineHeight: "1.4",
                        textAlign: "start"
                      }}
                    >
                      {plan.title}
                    </h4>

                    {/* Investment details */}
                    <div style={{ marginBottom: "20px", textAlign: "start" }}>
                      <div style={{ display: "flex", marginBottom: "8px" }}>
                        <span
                          style={{
                            flex: 1,
                            color: "#64748b",
                            fontWeight: "500",
                          }}
                        >
                          ROI:
                        </span>
                        <span style={{ fontWeight: "600", color: "#0D0D0D" }}>
                          12.5% p.a
                        </span>
                      </div>
                      <div style={{ display: "flex", marginBottom: "8px" }}>
                        <span
                          style={{
                            flex: 1,
                            color: "#64748b",
                            fontWeight: "500",
                          }}
                        >
                          Duration:
                        </span>
                        <span style={{ fontWeight: "600", color: "#1e293b" }}>
                          12 months
                        </span>
                      </div>
                      <div style={{ display: "flex", marginBottom: "8px" }}>
                        <span
                          style={{
                            flex: 1,
                            color: "#64748b",
                            fontWeight: "500",
                          }}
                        >
                          Risk:
                        </span>
                        <span style={{ fontWeight: "600", color: "#0D0D0D" }}>
                          Moderate
                        </span>
                      </div>
                    </div>

                    <p
                      style={{
                        color: "#64748b",
                        marginBottom: "24px",
                        lineHeight: "1.6",
                        fontSize: "15px",
                        flexGrow: 1,
                        textAlign: "start",
                      }}
                    >
                      {plan.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "auto",
                      }}
                    >
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
                          ":hover": {
                            color: "#2563eb",
                          },
                        }}
                      >
                        Learn More
                        <span
                          style={{
                            marginLeft: "8px",
                            fontSize: "14px",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          →
                        </span>
                      </a>

                      <button
                        style={{
                          background:
                            "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
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
                          ":hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 15px rgba(16, 185, 129, 0.3)",
                          },
                        }}
                      >
                        Invest Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredPlans.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 40px",
                  background: "#ffffff",
                  borderRadius: "14px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(241, 245, 249, 0.8)",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "#f1f5f9",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <i
                    className="fas fa-search"
                    style={{
                      fontSize: "32px",
                      color: "#64748b",
                    }}
                  />
                </div>
                <h3
                  style={{
                    color: "#1e293b",
                    marginBottom: "16px",
                    fontSize: "24px",
                    fontWeight: "600",
                  }}
                >
                  No investment plans found
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    maxWidth: "500px",
                    margin: "0 auto 24px",
                    lineHeight: "1.6",
                  }}
                >
                  Try selecting a different filter category or adjusting your
                  search criteria
                </p>
                <button
                  onClick={() => setActiveFilter("all")}
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    color: "white",
                    border: "none",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    marginTop: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 10px rgba(59, 130, 246, 0.2)",
                    ":hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 15px rgba(59, 130, 246, 0.3)",
                    },
                  }}
                >
                  Show All Investments
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Investmentplans;