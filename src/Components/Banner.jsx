import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div>
      <section className="banner_style_four">
        <div className="container">
          <div className="banner_content centred">
            <div className="shape_icon_13 float-bob-x">
              <img
                src="https://html.tonatheme.com/2024/financer/assets/images/icons/shape_icon_13.png"
                alt
              />
            </div>
            
            <h1 style={{ color: "white" }}>
              Your Wealth, Our Wings. Smart Investments. Powerful Growth.
            </h1>
            <p style={{ marginBottom: "6rem", color: "white" }}>
              At Seraphina Consulting, we help you grow your wealth with smart,
              reliable investment strategies that outperform the market – so you
              can achieve more for yourself, your family, and the world.
            </p>
            <div className="subscribe-inner">
              
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <button
                    type="button"
                    style={{ background: "#00833D" }}
                    className="btn_style_one"
                    onClick={() => navigate("/login")}
                  >
                    Get Started
                  </button>
                </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
