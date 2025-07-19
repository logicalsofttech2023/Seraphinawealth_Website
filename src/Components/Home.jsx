import React, { useEffect, useState } from "react";
import Categoryslider from "./Pages/Categoryslider";
import Investmentplans from "./Pages/Investmentplans";
import AOS from "aos";
import "aos/dist/aos.css";
import Testimonialsection from "./Pages/Testimonialsection";
import Faqsection from "./Pages/Faqsection";
import PopulerInvestment from "./Pages/PopulerInvestment";
import Banner from "./Banner";
import FeaturedPlans from "./Pages/FeaturedPlans";
import RecommendedPlans from "./Pages/RecommendedPlans";
import { useNavigate } from "react-router-dom";
import WhyChooseUs from "./Pages/WhyChooseUs";
import OurPopularPlans from "./Pages/OurPopularPlans";
import axios from "axios";
import Swal from "sweetalert2";
import HowItWorks from "./Pages/HowItWorks";
import Newsletter from "./Pages/Newsletter";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ once: true });
  }, []);

  return (
    <div>
      <div>

        <Banner />

        {/* <Categoryslider /> */}

        {/* <FeaturedPlans /> */}

        <WhyChooseUs />

        {/* <OurPopularPlans /> */}

        {/* <PopulerInvestment /> */}

        <HowItWorks />

        {/* <section className="team_section">
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
        </section> */}

        {/* <RecommendedPlans /> */}

        <Newsletter />

        <Testimonialsection />

        <Faqsection />
      </div>
    </div>
  );
};

export default Home;
