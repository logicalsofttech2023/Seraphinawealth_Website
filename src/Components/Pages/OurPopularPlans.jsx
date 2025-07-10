import { FaUser, FaBuilding, FaUniversity, FaChartLine, FaSearchDollar, FaPiggyBank, FaCashRegister, FaBalanceScale } from "react-icons/fa";

const PopularPlans = () => {
  return (
    <section
      className="popular_plans aos-init aos-animate"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
      >
        {/* Section Header */}
        <div
          className="section_header"
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div
            className="tag_text"
            style={{
              display: "inline-block",
              marginBottom: "15px",
              padding: "8px 20px",
              background: "linear-gradient(135deg, #00833D, #000000)",
              borderRadius: "30px",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            <h6 style={{ margin: 0 }}>Our Popular Plans</h6>
          </div>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #00833D, #000000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1.3",
              margin: "0 auto 20px",
              maxWidth: "800px",
            }}
          >
            Our Popular Advisory Plans
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#666",
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Personalized, research-backed, and easy to act on — our most chosen consulting plans, designed to support better financial decisions.
          </p>
        </div>

        {/* Plans Grid */}
        <div
          className="plans_grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
          }}
        >
          {/* Individuals & Families */}
          <div
            className="plan_category"
            style={{
              backgroundColor: "#f9fafc",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="category_header"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div
                className="icon_wrapper"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #00833D, #000000)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                }}
              >
                <FaUser style={{ color: "#ffffff", fontSize: "24px" }} />
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                For Individuals & Families
              </h3>
            </div>

            <div
              className="plan_item"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
                borderLeft: "4px solid #00833D",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 10px 0",
                  color: "#1a1a1a",
                }}
              >
                1. Financial Planning Roadmap
              </h4>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  margin: 0,
                  fontSize: "15px",
                }}
              >
                A step-by-step plan to help you achieve goals like retirement, education, or early financial independence.
              </p>
            </div>

            <div
              className="plan_item"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "20px",
                borderLeft: "4px solid #00833D",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 10px 0",
                  color: "#1a1a1a",
                }}
              >
                2. Portfolio Health Check
              </h4>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  margin: 0,
                  fontSize: "15px",
                }}
              >
                An objective review of your current investments with insights to improve structure and balance.
              </p>
            </div>
          </div>

          {/* Businesses & Founders */}
          <div
            className="plan_category"
            style={{
              backgroundColor: "#f9fafc",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="category_header"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div
                className="icon_wrapper"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #00833D, #000000)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                }}
              >
                <FaBuilding style={{ color: "#ffffff", fontSize: "24px" }} />
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                For Businesses & Founders
              </h3>
            </div>

            <div
              className="plan_item"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
                borderLeft: "4px solid #00833D",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 10px 0",
                  color: "#1a1a1a",
                }}
              >
                1. Business Finance Strategy Session
              </h4>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  margin: 0,
                  fontSize: "15px",
                }}
              >
                Understand your cash flow, reserves, and budget with actionable strategies to improve financial control.
              </p>
            </div>

            <div
              className="plan_item"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "20px",
                borderLeft: "4px solid #00833D",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 0 10px 0",
                  color: "#1a1a1a",
                }}
              >
                2. Founder Wealth Alignment
              </h4>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  margin: 0,
                  fontSize: "15px",
                }}
              >
                Align your personal finances with your business growth for long-term wealth and security.
              </p>
            </div>
          </div>

          {/* Institutions & Corporates */}
          <div
  className="plan_category"
  style={{
    backgroundColor: "#f9fafc",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    gridColumn: "1 / -1",
  }}
>
  {/* Centered Heading */}
  <div
    className="category_header"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "30px",
    }}
  >
    <div
      className="icon_wrapper"
      style={{
        width: "60px",
        height: "60px",
        background: "linear-gradient(135deg, #00833D, #000000)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "15px",
      }}
    >
      <FaUniversity style={{ color: "#ffffff", fontSize: "24px" }} />
    </div>
    <h3
      style={{
        fontSize: "22px",
        fontWeight: "700",
        color: "#1a1a1a",
        margin: 0,
        textAlign: "center",
      }}
    >
      For Institutions & Corporates
    </h3>
  </div>

  {/* Plan Items Grid */}
  <div
    className="plan_items"
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "30px",
    }}
  >
    <div
      className="plan_item"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        borderLeft: "4px solid #00833D",
      }}
    >
      <h4
        style={{
          fontSize: "18px",
          fontWeight: "600",
          margin: "0 0 10px 0",
          color: "#1a1a1a",
        }}
      >
        1. Capital Allocation Strategy
      </h4>
      <p
        style={{
          color: "#666",
          lineHeight: "1.6",
          margin: 0,
          fontSize: "15px",
        }}
      >
        Plan long-term deployment of surplus or treasury funds with structured
        guidance and risk awareness.
      </p>
    </div>

    <div
      className="plan_item"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "20px",
        borderLeft: "4px solid #00833D",
      }}
    >
      <h4
        style={{
          fontSize: "18px",
          fontWeight: "600",
          margin: "0 0 10px 0",
          color: "#1a1a1a",
        }}
      >
        2. Feasibility & Financial Due Diligence
      </h4>
      <p
        style={{
          color: "#666",
          lineHeight: "1.6",
          margin: 0,
          fontSize: "15px",
        }}
      >
        Independent validation of new initiatives or investment decisions with
        focused financial analysis.
      </p>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default PopularPlans;