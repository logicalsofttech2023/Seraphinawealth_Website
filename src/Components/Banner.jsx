import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getBanner`
      );
      console.log("Data fetched successfully:", response.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <section className="banner_style_four" style={{ backgroundImage: `url(${import.meta.env.VITE_FILE_URL}${data?.image})` }}>
        <div className="container">
          <div className="banner_content centred">
            <div className="shape_icon_13 float-bob-x">
              <img
                src="https://html.tonatheme.com/2024/financer/assets/images/icons/shape_icon_13.png"
                alt
              />
            </div>

            <h1 style={{ color: "white" }}>
              {data?.title || "Your Wealth, Our Wings. Smart Investments. Powerful Growth."}
            </h1>
            <p style={{ marginBottom: "6rem", color: "white" }}>
              {data?.altText || "At Seraphina Consulting, we help you grow your wealth with smart, reliable investment strategies that outperform the market – so you can achieve more for yourself, your family, and the world."}
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

      <section className="funfact-section">
          <div
            className="bg_layer"
            style={{
              backgroundImage:
                "url(/assets/images/background/funfact_shape_bg.png)",
            }}
          />
          <div className="container">
            <div className="row">
              {/* Expert Team Members */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div
                  className="funfact-block-one"
                  style={{ margin: "auto"}}
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                >
                  <div className="count-outer count-box">
                    <span
                      className="count-text"
                      data-speed="1500"
                      data-stop="150"
                    >
                      {data?.activeCustomers || 150}
                    </span>
                    <span>+</span>
                  </div>
                  <h6>Active Customers</h6>
                </div>
              </div>

              {/* Total Assets under Management */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div
                  className="funfact-block-one"
                  style={{ margin: "auto"}}
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="550"
                >
                  <div className="count-outer count-box">
                    
                    <span
                      className="count-text"
                      data-speed="1500"
                      data-stop="3.5"
                    >
                      {data?.projectCompleted || 50}
                    </span>
                    <span>+</span>
                  </div>
                  <h6>Projects Completed</h6>
                </div>
              </div>

              

              {/* Customer Satisfaction */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div
                  className="funfact-block-one"
                  style={{ margin: "auto"}}
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="650"
                >
                  <div className="count-outer count-box">
                    <span
                      className="count-text"
                      data-speed="1500"
                      data-stop="99"
                    >
                      {data?.customerSatisfaction || 99}
                    </span>
                    <span>%</span>
                  </div>
                  <h6>Customer Satisfaction</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Banner;
