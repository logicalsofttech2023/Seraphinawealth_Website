import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MobileMenuContext } from "./MobileMenuContext";
import { CgProfile } from "react-icons/cg";


const Header = () => {
  const location = useLocation();

  const { isMobileMenuVisible, setMobileMenuVisible } =
    useContext(MobileMenuContext);

  return (
    <>
      <header className="header">
        {/* Main Header */}
        <div className="main_header">
          <div className="container">
            <div className="main_header_inner">
              <div className="main_header_logo">
                <figure>
                  <Link to="/">
                    <img
                      style={{
                        width: "25%",
                        borderRadius: "50%",
                        height: "auto",
                      }}
                      src="/assets/images/logo.jpg"
                      alt="Company Logo"
                    />
                  </Link>
                </figure>
              </div>

              <div className="main_header_menu menu_area">
                {/* Mobile Navigation Toggler */}
                <div
                  className="mobile-nav-toggler"
                  onClick={() => setMobileMenuVisible(true)}
                >
                  <div className="menu-bar">
                    <i className="fas fa-bars" />
                  </div>
                </div>

                <nav className="main-menu">
                  <div
                    className="collapse navbar-collapse show"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation">
                      <li
                        className={
                          location.pathname === "/"
                            ? "dropdown active"
                            : "dropdown"
                        }
                      >
                        <Link to="/">Home</Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/about" ? "active" : ""
                        }
                      >
                        <Link to="/about">About Us</Link>
                      </li>
                      {/* <li className={
                location.pathname === "/services" || 
                location.pathname === "/services-2" || 
                location.pathname === "/services-details" 
                ? "dropdown active" 
                : "dropdown"
              }>
                <Link to="/services">Investment</Link>
                <ul>
                  <li className={location.pathname === "/services" ? "active" : ""}>
                    <Link to="/services">Services</Link>
                  </li>
                  <li className={location.pathname === "/services-2" ? "active" : ""}>
                    <Link to="/services-2">Services Two</Link>
                  </li>
                  <li className={location.pathname === "/services-details" ? "active" : ""}>
                    <Link to="/services-details">Service Details</Link>
                  </li>
                </ul>
                <div className="dropdown-btn">
                  <i className="fa fa-angle-down" />
                </div>
              </li> */}
                      <li
                        className={
                          location.pathname === "/investmentplans"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/investmentplans">Investment Plans</Link>
                      </li>

                      <li
                        className={
                          location.pathname === "/contact" ? "active" : ""
                        }
                      >
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="header_right_content">
                <Link to={"/profile"} className="search-toggler">
                  <CgProfile style={{ fontSize: "40px" }} />

                </Link>
                <div className="link-btn">
                  <Link to="/login" className="btn_style_one">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Main Header */}
        {/* Sticky Header*/}
        <div className="sticky_header">
          <div className="container">
            <div className="main_header_inner">
              <div className="main_header_logo">
                <figure>
                  <Link to="/">
                    <img
                      style={{
                        width: "25%",
                        borderRadius: "50%",
                        height: "auto",
                      }}
                      src="/assets/images/logo.jpg"
                      alt="Company Logo"
                    />
                  </Link>
                </figure>
              </div>

              <div className="main_header_menu menu_area">
                <nav className="main-menu">
                  <div
                    className="collapse navbar-collapse show"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation">
                      <li
                        className={
                          location.pathname === "/"
                            ? "dropdown active"
                            : "dropdown"
                        }
                      >
                        <Link to="/">Home</Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/about" ? "active" : ""
                        }
                      >
                        <Link to="/about">About Us</Link>
                      </li>
                      {/* <li className={
                location.pathname === "/services" || 
                location.pathname === "/services-2" || 
                location.pathname === "/services-details" 
                ? "dropdown active" 
                : "dropdown"
              }>
                <Link to="/services">Services</Link>
                <ul>
                  <li className={location.pathname === "/services" ? "active" : ""}>
                    <Link to="/services">Services</Link>
                  </li>
                  <li className={location.pathname === "/services-2" ? "active" : ""}>
                    <Link to="/services-2">Services Two</Link>
                  </li>
                  <li className={location.pathname === "/services-details" ? "active" : ""}>
                    <Link to="/services-details">Service Details</Link>
                  </li>
                </ul>
                <div className="dropdown-btn">
                  <i className="fa fa-angle-down" />
                </div>
              </li> */}

                      <li
                        className={
                          location.pathname === "/investmentplans"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/investmentplans">Investment Plans</Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/contact" ? "active" : ""
                        }
                      >
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="header_right_content">
                <button className="search-toggler">
                  <CgProfile style={{ fontSize: "40px" }} />
                </button>
                <div className="link-btn">
                  <Link to="/login" className="btn_style_one">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Sticky Header*/}
        {/* Mobile Menu  */}

        <div className="mobile-menu">
          {isMobileMenuVisible && (
            <>
              <div
                className="menu-backdrop"
                onClick={() => setMobileMenuVisible(false)}
              />
              <div
                className="close-btn"
                onClick={() => setMobileMenuVisible(false)}
              >
                X
              </div>
              <nav className="menu-box">
                <div className="nav-logo">
                  <Link to="/">
                    <img
                      style={{
                        width: "25%",
                        borderRadius: "50%",
                        height: "auto",
                      }}
                      src="/assets/images/logo.jpg"
                      alt="Company Logo"
                    />
                  </Link>
                </div>
                <div className="menu-outer">
                  <div
                    className="collapse navbar-collapse show"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation">
                      <li className="dropdown active">
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      {/* <li className="dropdown">
                        <Link to="/services">Services</Link>
                        <ul>
                          <li>
                            <Link to="/services">Services</Link>
                          </li>
                          <li>
                            <Link to="/services-2">Services Two</Link>
                          </li>
                          <li>
                            <Link to="/services-details">Service Details</Link>
                          </li>
                        </ul>
                        <div className="dropdown-btn">
                          <i className="fa fa-angle-down" />
                        </div>
                      </li> */}

                      <li
                        className={
                          location.pathname === "/investmentplans"
                            ? "active"
                            : ""
                        }
                      >
                        <Link to="/investmentplans">Investment Plans</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="contact-info">
                  <h4>Contact Info</h4>
                  <ul>
                    <li>Chicago 12, Melborne City, USA</li>
                    <li>
                      <a href="tel:+8801682648101">+88 01682648101</a>
                    </li>
                    <li>
                      <a href="mailto:info@example.com">info@example.com</a>
                    </li>
                  </ul>
                </div>

                <ul className="social-links centred">
                  <li>
                    <Link to="/">
                      <span className="fab fa-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <span className="fab fa-facebook-square" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <span className="fab fa-pinterest-p" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <span className="fab fa-instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <span className="fab fa-youtube" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
