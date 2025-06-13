import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PopulerInvestment = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <section className="service_section">
  <div className="circle_one" />
  <div className="circle_two" />
  <div className="container">
    <div className="section_title light centred">
      <div className="tag_text">
        <h6>Investment</h6>
      </div>
      <h2>Provide quality Investment.</h2>
    </div>
    <div className="row">
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" style={{ marginBottom: "30px", padding: "0 15px" }}>
        <div
          className="service_block_one"
          data-aos="fade-up"
          data-aos-duration={300}
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
            <i className="icon-33" />
          </div>
          <h4 style={{ color: "#1e293b", fontSize: "20px", fontWeight: "700", marginBottom: "16px", lineHeight: "1.4", textAlign: "start" }}>
            <a href="#">Retirement Solutions</a>
          </h4>

          <div style={{ marginBottom: "20px", textAlign: "start" }}>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>ROI:</span>
              <span style={{ fontWeight: "600", color: "#0D0D0D" }}>12.5% p.a</span>
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Duration:</span>
              <span style={{ fontWeight: "600", color: "#1e293b" }}>12 months</span>
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Risk:</span>
              <span style={{ fontWeight: "600", color: "#0D0D0D" }}>Moderate</span>
            </div>
          </div>

          <p style={{ color: "#64748b", marginBottom: "24px", lineHeight: "1.6", fontSize: "15px", flexGrow: 1, textAlign: "start" }}>
            Duis aute irure sdsdsd df ....
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

      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" style={{ marginBottom: "30px", padding: "0 15px" }}>
        <div
          className="service_block_one"
          data-aos="fade-up"
          data-aos-duration={500}
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
            <i className="icon-32" />
          </div>
          <h4 style={{ color: "#1e293b", fontSize: "20px", fontWeight: "700", marginBottom: "16px", lineHeight: "1.4", textAlign: "start" }}>
            <a href="#">Fraud & Protect</a>
          </h4>

          <div style={{ marginBottom: "20px", textAlign: "start" }}>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>ROI:</span>
              <span style={{ fontWeight: "600", color: "#0D0D0D" }}>10.8% p.a</span>
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Duration:</span>
              <span style={{ fontWeight: "600", color: "#1e293b" }}>24 months</span>
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Risk:</span>
              <span style={{ fontWeight: "600", color: "#0D0D0D" }}>Low</span>
            </div>
          </div>

          <p style={{ color: "#64748b", marginBottom: "24px", lineHeight: "1.6", fontSize: "15px", flexGrow: 1, textAlign: "start" }}>
            Duis aute irure sdsdsd df ....
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

      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" style={{ marginBottom: "30px", padding: "0 15px" }}>
        <div
          className="service_block_one"
          data-aos="fade-up"
          data-aos-duration={700}
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
            <i className="icon-31" />
          </div>
          <h4 style={{ color: "#1e293b", fontSize: "20px", fontWeight: "700", marginBottom: "16px", lineHeight: "1.4", textAlign: "start" }}>
            <a href="#">Risk & Compliance</a>
          </h4>

          <div style={{ marginBottom: "20px", textAlign: "start" }}>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>ROI:</span>
              <span style={{ fontWeight: "600", color: "#0D0D0D" }}>15.2% p.a</span>
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Duration:</span>
              <span style={{ fontWeight: "600", color: "#1e293b" }}>18 months</span>
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Risk:</span>
              <span style={{ fontWeight: "600", color: "#0D0D0D" }}>High</span>
            </div>
          </div>

          <p style={{ color: "#64748b", marginBottom: "24px", lineHeight: "1.6", fontSize: "15px", flexGrow: 1, textAlign: "start" }}>
            Duis aute irure sdsdsd df ....
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

      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" style={{ marginBottom: "30px", padding: "0 15px" }}>
        <div
          className="service_block_one"
          data-aos="fade-up"
          data-aos-duration={900}
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
            <i className="icon-30" />
          </div>
          <h4 style={{ color: "#1e293b", fontSize: "20px", fontWeight: "700", marginBottom: "16px", lineHeight: "1.4", textAlign: "start" }}>
            <a href="#">Wealth Management</a>
          </h4>

          <div style={{ marginBottom: "20px", textAlign: "start" }}>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>ROI:</span>
              <span style={{ fontWeight: "600", color: "#0D0D0D" }}>18.5% p.a</span>
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Duration:</span>
              <span style={{ fontWeight: "600", color: "#1e293b" }}>36 months</span>
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>Risk:</span>
              <span style={{ fontWeight: "600", color: "#0D0D0D" }}>High</span>
            </div>
          </div>

          <p style={{ color: "#64748b", marginBottom: "24px", lineHeight: "1.6", fontSize: "15px", flexGrow: 1, textAlign: "start" }}>
            Duis aute irure sdsdsd df ....
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
    </div>
    <h1 className="section_tag" style={{ fontSize: "220px" }}>Investment</h1>
  </div>
</section>
    </>
  );
};

export default PopulerInvestment;
