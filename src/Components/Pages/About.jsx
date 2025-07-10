import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

const About = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAbout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getPolicyByType?type=about`
      );
      console.log(response);
      if (response.status === 200) {
        setAbout(response.data.policy);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAbout();
  }, []);
  return (
    <>
      <div>
        <section
          className="about_page_banner aos-init aos-animate"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration={500}
          style={{
            padding: "80px 0",
            backgroundColor: "#f9f9f9",
            backgroundImage: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
          }}
        >
          <div
            className="container"
            style={{ maxWidth: "1200px", margin: "0 auto" }}
          >
            <div
              className="section_title centred"
              style={{
                textAlign: "center",
                marginBottom: "60px",
              }}
            >
              <div
                className="tag_text"
                style={{
                  color: "#4a6bdf",
                  fontSize: "18px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                }}
              >
                <h6 style={{ margin: 0 }}>About Us</h6>
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "42px",
                  fontWeight: "700",
                  color: "#2d3748",
                  lineHeight: "1.2",
                }}
              >
                About Us
              </h2>
            </div>
            <div
              className="banner_content"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "60px",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
              }}
            >
              <div
                className="banner_image"
                style={{
                  flex: "1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={400}
                    animation="wave"
                    sx={{ bgcolor: "grey.200" }}
                  />
                ) : about?.image ? (
                  <img
                    src={`${import.meta.env.VITE_FILE_URL}${about.image}`}
                    alt="About Seraphina Consulting"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      transform: "scale(1.01)",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.03)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1.01)")
                    }
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={400}
                    animation="wave"
                    sx={{ bgcolor: "grey.200" }}
                  />
                )}
              </div>
              <div
                style={{
                  flex: "1",
                  color: "#4a5568",
                  lineHeight: "1.7",
                  fontSize: "16px",
                }}
              >
                {loading ? (
                  <Box>
                    <Skeleton animation="wave" height={30} width="80%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="90%" />
                    <Skeleton animation="wave" height={20} width="95%" />
                    <Skeleton animation="wave" height={20} width="85%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                  </Box>
                ) : about?.content ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: about.content }}
                    style={{
                      textAlign: "justify",
                      hyphens: "auto",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                    }}
                  >
                    <p style={{ color: "#718096" }}>No content available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className="why_choose_us about_page aos-init aos-animate"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration={500}
        >
          <div className="shape_circle float-bob-y">
            <img src="/assets/images/icons/ring_shape.png" alt />
          </div>
          <div className="mouse_pointer float-bob-x">
            <img src="/assets/images/icons/mouse-pointer.png" alt />
          </div>
          <div className="container mb-5 mt-5">
            <div className="border_top" />
            <div className="section_title centred">
              <div className="tag_text">
                <h6>Our Objectives</h6>
              </div>
              <h3>Driving Value Through Strategic Financial Empowerment</h3>
            </div>
            <div className="row">
              <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                <div
                  className="why_choose_block_two mb_40 aos-init aos-animate"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <div className="choose_icon">
                    <i className="icon-28" />
                  </div>
                  {loading ? (
                    <Box>
                      <Skeleton animation="wave" height={20} width="100%" />
                      <Skeleton animation="wave" height={20} width="90%" />
                      <Skeleton animation="wave" height={20} width="95%" />
                    </Box>
                  ) : (
                    <p>
                      To provide financial advisory services, including investment
                      planning, risk management, tax planning, to individuals,
                      businesses, and institutions.
                    </p>
                  )}
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                <div
                  className="why_choose_block_two mb_40 hover aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <div className="choose_icon">
                    <i className="icon-27" />
                  </div>
                  {loading ? (
                    <Box>
                      <Skeleton animation="wave" height={20} width="100%" />
                      <Skeleton animation="wave" height={20} width="90%" />
                      <Skeleton animation="wave" height={20} width="95%" />
                    </Box>
                  ) : (
                    <p>
                      To act as consultants and advisors for corporate finance,
                      mergers and acquisitions, financial restructuring, capital
                      raising, and strategic financial planning.
                    </p>
                  )}
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-12">
                <div
                  className="why_choose_block_two mb_40 aos-init aos-animate"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <div className="choose_icon">
                    <i className="icon-26" />
                  </div>
                  {loading ? (
                    <Box>
                      <Skeleton animation="wave" height={20} width="100%" />
                      <Skeleton animation="wave" height={20} width="90%" />
                      <Skeleton animation="wave" height={20} width="95%" />
                    </Box>
                  ) : (
                    <p>
                      To conduct financial analysis, market research, feasibility
                      studies and due diligence for individuals, corporates,
                      startups and institutions.
                    </p>
                  )}
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-12">
                <div
                  className="why_choose_block_two mb_40 aos-init aos-animate"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <div className="choose_icon">
                    <i className="icon-25" />
                  </div>
                  {loading ? (
                    <Box>
                      <Skeleton animation="wave" height={20} width="100%" />
                      <Skeleton animation="wave" height={20} width="90%" />
                      <Skeleton animation="wave" height={20} width="95%" />
                    </Box>
                  ) : (
                    <p>
                      To facilitate financial literacy and awareness programs,
                      including seminars, workshops, and training sessions on
                      investment strategies, financial risk management, and
                      compliance.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;