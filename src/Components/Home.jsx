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

const Home = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ once: true });
  }, []);

  const navigate = useNavigate();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}subscribeNewsletter`,
        { email }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Subscribed!",
          text: "You have successfully subscribed to our newsletter.",
          showConfirmButton: true,
        });
        setEmail(""); // reset email input if using useState
      }
    } catch (err) {
      console.error("Subscription failed:", err);
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text:
          err?.response?.data?.message ||
          "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

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

        {/* <Categoryslider /> */}

        {/* <FeaturedPlans /> */}

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
                      100
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
                      50
                    </span>
                    <span>+</span>
                  </div>
                  <h6>Projects Completed</h6>
                </div>
              </div>

              {/* Project Completed */}
              {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
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
              </div> */}

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

        <WhyChooseUs />

        {/* <OurPopularPlans /> */}

        {/* <PopulerInvestment /> */}

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
                  <h4>Step 1: Share Your Goals</h4>
                  <p>
                    Tell us about your financial priorities — whether it’s
                    saving, investing, or planning for your business or family.
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
                  <h4>Step 2: Choose a Plan</h4>
                  <p>
                    Select one of our advisory plans designed for individuals,
                    businesses, or institutions — based on your needs and stage.
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
                  <h4>Step 3: Get Personalized Guidance</h4>
                  <p>
                    Receive structured financial reports, insights, and
                    recommendations from our team — delivered directly to your
                    inbox.
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
            ></div>
          </div>
        </section>

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

        <section
          className="cta_section"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="500"
          style={{ marginTop: "50px" }}
        >
          <div className="container">
            <div className="cta_inner">
              <h3 style={{ color: "#fff !important" }}>
                Subscribe to our weekly <br /> news latter
              </h3>
              <div className="subscribe-inner">
                <form
                  className="subscribe-form"
                  onSubmit={handleNewsletterSubmit}
                >
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn_style_one">
                      {loading ? "Sending..." : "Subscribe"}
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
