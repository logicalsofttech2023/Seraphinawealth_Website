import React, { useEffect, useState } from "react";
import Categoryslider from "./Pages/Categoryslider";
import Investmentplans from "./Pages/Investmentplans";
import AOS from "aos";
import "aos/dist/aos.css";
import Testimonialsection from "./Pages/Testimonialsection";
import Faqsection from "./Pages/Faqsection";
import PopulerInvestment from "./Pages/PopulerInvestment";
import Banner from "./Banner";
const Home = () => {
  

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  

  return (
    <div>
      <div>
        <div id="search-popup" className="search-popup">
          <div className="popup-inner">
            <div className="upper-box">
              <figure className="logo-box">
                <a href="index.html">
                  <img src="/assets/images/logo.png" alt />
                </a>
              </figure>
              <div className="close-search">
                <span className="fa-solid fa-xmark" />
              </div>
            </div>
            <div className="overlay-layer" />
            <div className="container">
              <div className="search-form">
                <form method="post" action="index.html">
                  <div className="form-group">
                    <fieldset>
                      <input
                        type="search"
                        className="form-control"
                        name="search-input"
                        defaultValue
                        placeholder="Type your keyword and hit"
                        required
                      />
                      <button type="submit">
                        <i className="icon-50" />
                      </button>
                    </fieldset>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Banner />

        <Categoryslider />

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
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div
                  className="funfact-block-one"
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
                      150
                    </span>
                    <span>+</span>
                  </div>
                  <h6>Expert Team Members</h6>
                </div>
              </div>

              {/* Total Assets under Management */}
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div
                  className="funfact-block-one"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="550"
                >
                  <div className="count-outer count-box">
                    <span>$</span>
                    <span
                      className="count-text"
                      data-speed="1500"
                      data-stop="3.5"
                    >
                      3.5
                    </span>
                    <span>B+</span>
                  </div>
                  <h6>Total Assets under Manage</h6>
                </div>
              </div>

              {/* Project Completed */}
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div
                  className="funfact-block-one"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="600"
                >
                  <div className="count-outer count-box">
                    <span
                      className="count-text"
                      data-speed="1500"
                      data-stop="270"
                    >
                      270
                    </span>
                    <span>+</span>
                  </div>
                  <h6>Project Completed</h6>
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div
                  className="funfact-block-one"
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
                      99
                    </span>
                    <span>%</span>
                  </div>
                  <h6>Customer Satisfaction</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feature_section">
          <div className="container">
            <div className="row">
              {/* Secure Retirement Block */}
              <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">
                <div
                  className="feature_block_one"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                >
                  <div className="tag_icon">
                    <i className="icon-49" />
                  </div>
                  <h3>Secure Retirement</h3>
                  <p>
                    Want to feel more confident about your financial future? Our
                    range of annuity strategies can help.
                  </p>
                  <div className="chart_box">
                    <img
                      src="/assets/images/resource/chart_2.png"
                      alt="Retirement Chart"
                    />
                  </div>
                </div>
              </div>

              {/* Invest with Potential Block */}
              <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12">
                <div
                  className="feature_block_one"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="600"
                >
                  <div className="tag_icon">
                    <i className="icon-48" />
                  </div>
                  <h3>Invest with Potential</h3>
                  <p>
                    FlexGuard includes a Performance Lock feature which gives
                    clients the flexibility to set the End Date for their
                    future.
                  </p>
                  <div className="chart_box">
                    <img
                      src="/assets/images/resource/chart_3.png"
                      alt="Investment Chart"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="why_choose_us">
          <div className="container">
            <div className="row why_choose_us_row">
              {/* Left Section */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div
                  className="why_choose_left"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                >
                  <div className="tag_text">
                    <h6>Why Choose US</h6>
                  </div>
                  <h2>Investment views and financial market data</h2>
                  <p>
                    We want to create superior value for our clients,
                    shareholders, and employees. And we want to stand out as a
                    winner in our industry for our expertise, advice, and
                    execution.
                  </p>
                  <div className="link_btn">
                    <a href="#" className="btn_style_one">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Section with Features */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div
                  className="why_choose_right"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration="600"
                >
                  <div className="row">
                    {/* Investor Relations */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 colmun">
                      <div
                        className="why_choose_block_one mb_40"
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="600"
                      >
                        <div className="choose_icon">
                          <i className="icon-47" />
                        </div>
                        <h4>Investor Relations</h4>
                        <p>
                          Duis aute irure dolor in velit one reprehenderit in
                          voluptate more esse cillum dolore neris.
                        </p>
                      </div>
                    </div>

                    {/* Corporate Calendar */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 colmun">
                      <div
                        className="why_choose_block_one mt_70 mb_40"
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="650"
                      >
                        <div className="choose_icon">
                          <i className="icon-46" />
                        </div>
                        <h4>Corporate Calendar</h4>
                        <p>
                          Duis aute irure dolor in velit one reprehenderit in
                          voluptate more esse cillum dolore neris.
                        </p>
                      </div>
                    </div>

                    {/* Sustainability */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 colmun">
                      <div
                        className="why_choose_block_one mt_-70 mb_40"
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="700"
                      >
                        <div className="choose_icon">
                          <i className="icon-45" />
                        </div>
                        <h4>Sustainability</h4>
                        <p>
                          Duis aute irure dolor in velit one reprehenderit in
                          voluptate more esse cillum dolore neris.
                        </p>
                      </div>
                    </div>

                    {/* Annual Reporting */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 colmun">
                      <div
                        className="why_choose_block_one"
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="750"
                      >
                        <div className="choose_icon">
                          <i className="icon-44" />
                        </div>
                        <h4>Annual Reporting</h4>
                        <p>
                          Duis aute irure dolor in velit one reprehenderit in
                          voluptate more esse cillum dolore neris.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PopulerInvestment />

        <section className="work_process_section">
          <div className="container">
            <div className="section_title centred">
              <div className="tag_text">
                <h6>Work Process</h6>
              </div>
              <h2>How it works</h2>
            </div>

            <div className="row">
              {/* Step 1 */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div
                  className="process_block_one centred"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="300"
                >
                  <div className="process_icon">
                    <i className="icon-35" />
                  </div>
                  <h4>Step 1: Create Account</h4>
                  <p>
                    Easily create your Zaplin account with one click and get 100
                    Million Tokens
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div
                  className="process_block_one centred shape_image"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="400"
                >
                  <div className="process_icon">
                    <i className="icon-36" />
                  </div>
                  <h4>Step 2: Type Contex</h4>
                  <p>
                    Easily create your Zaplin account with one click and get 100
                    Million Tokens
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div
                  className="process_block_one centred"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                >
                  <div className="process_icon">
                    <i className="icon-37" />
                  </div>
                  <h4>Step 3: Get Images</h4>
                  <p>
                    Easily create your Zaplin account with one click and get 100
                    Million Tokens
                  </p>
                </div>
              </div>
            </div>

            {/* Video Box */}
            <div
              className="video_box"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="600"
              style={{
                backgroundImage:
                  "url(/assets/images/background/video_box_bg.jpg)",
              }}
            >
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&t=28s"
                className="lightbox-image"
                data-caption=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="icon_box">
                  <i className="icon-38" />
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="team_section">
          <div
            className="shape_one float-bob-x"
            style={{
              "background-image": "url(assets/images/icons/mouse-pointer.png)",
            }}
          />
          <div className="container">
            <div className="section_title centred">
              <div className="tag_text">
                <h6>Our Team</h6>
              </div>
              <h2>Our Expert Team</h2>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 team_block">
                <div
                  className="team_block_one aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration={300}
                >
                  <div className="inner_box">
                    <div className="image_box">
                      <figure className="image">
                        <img src="/assets/images/team/team_1.jpg" alt />
                      </figure>
                      <ul className="team_social_links">
                        <li>
                          <a href="team.html">
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="team.html">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="team.html">
                            <i className="fab fa-skype" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="lower_content">
                      <h4>
                        <a href="team.html">Ronald Richards</a>
                      </h4>
                      <span className="designation">Digital Marketer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 team_block">
                <div
                  className="team_block_one aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration={500}
                >
                  <div className="inner_box">
                    <div className="image_box">
                      <figure className="image">
                        <img src="/assets/images/team/team_2.jpg" alt />
                      </figure>
                      <ul className="team_social_links">
                        <li>
                          <a href="team.html">
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="team.html">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="team.html">
                            <i className="fab fa-skype" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="lower_content">
                      <h4>
                        <a href="team.html">Theresa Webb</a>
                      </h4>
                      <span className="designation">Content Creator</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 team_block">
                <div
                  className="team_block_one aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration={700}
                >
                  <div className="inner_box">
                    <div className="image_box">
                      <figure className="image">
                        <img src="/assets/images/team/team_3.jpg" alt />
                      </figure>
                      <ul className="team_social_links">
                        <li>
                          <a href="team.html">
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="team.html">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="team.html">
                            <i className="fab fa-skype" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="lower_content">
                      <h4>
                        <a href="team.html">Brooklyn Simmons</a>
                      </h4>
                      <span className="designation">Product Designer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 team_block">
                <div
                  className="team_block_one aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration={900}
                >
                  <div className="inner_box">
                    <div className="image_box">
                      <figure className="image">
                        <img src="/assets/images/team/team_4.jpg" alt />
                      </figure>
                      <ul className="team_social_links">
                        <li>
                          <a href="team.html">
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="team.html">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="team.html">
                            <i className="fab fa-skype" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="lower_content">
                      <h4>
                        <a href="team.html">Leslie Alexander</a>
                      </h4>
                      <span className="designation">Web Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="cta_section"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="500"
        >
          <div className="container">
            <div className="cta_inner">
              <h3>
                Subscribe for latest update <br /> about Finance
              </h3>
              <div className="subscribe-inner">
                <form
                  action="contact.html"
                  method="post"
                  className="subscribe-form"
                >
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                    <button type="submit" className="btn_style_one">
                      Get Started
                    </button>
                  </div>
                </form>
              </div>

              <div className="cta_shape float-bob-y">
                <img
                  src="/assets/images/icons/shape_icon_3.png"
                  alt="decorative shape"
                />
              </div>

              <div className="cta_image">
                <figure>
                  <img
                    src="/assets/images/resource/cta_image.png"
                    alt="CTA Illustration"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>

        <Testimonialsection />

        <Faqsection />
      </div>
    </div>
  );
};

export default Home;
