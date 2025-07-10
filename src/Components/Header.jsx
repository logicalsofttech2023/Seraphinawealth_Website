import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MobileMenuContext } from "./MobileMenuContext";
import logo from "./logo.png"; // Adjust the path as necessary

const Header = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { isMobileMenuVisible, setMobileMenuVisible } = useContext(MobileMenuContext);

  // Common menu items to maintain consistency
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/researchAnalysis", label: "Research Analysis" },
    { path: "/agreementForm", label: "Our Services" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <header className="header">
        {/* Top Small Header with Shloka */}
        <div className="top-small-header" style={{
          backgroundColor: "#f8f9fa",
          padding: "5px 0",
          textAlign: "center",
          fontSize: "12px",
          borderBottom: "1px solid #eee"
        }}>
          <div className="container">
            <div className="sanskrit-shloka" style={{
              fontStyle: "italic",
              color: "#555",
              lineHeight: "1.3"
            }}>
              श्रियः पतिं यज्ञपतिं यज्ञगोप्तारमीश्वरम्। यज्ञपुरुषं यज्ञेशं यज्ञवाहनं नमाम्यहम्॥
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="main_header">
          <div className="container">
            <div className="main_header_inner">
              <div className="main_header_logo">
                <figure>
                  <Link to="/">
                    <img
                      style={{ width: "100px", height: "auto" }}
                      src={logo}
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
                  <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <ul className="navigation">
                      {menuItems.map((item) => (
                        <li
                          key={item.path}
                          className={
                            location.pathname === item.path ? "active" : ""
                          }
                        >
                          <Link to={item.path}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="header_right_content">
                <div className="link-btn">
                  <Link to={token ? "/profile" : "/login"} className="btn_style_one">
                    {token ? "Dashboard" : "Get Started"}
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
                      style={{ width: "100px", height: "auto" }}
                      src={logo}
                      alt="Company Logo"
                    />
                  </Link>
                </figure>
              </div>

              <div className="main_header_menu menu_area">
                <nav className="main-menu">
                  <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <ul className="navigation">
                      {menuItems.map((item) => (
                        <li
                          key={item.path}
                          className={
                            location.pathname === item.path ? "active" : ""
                          }
                        >
                          <Link to={item.path}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="header_right_content">
                <div className="link-btn">
                  <Link to={token ? "/profile" : "/login"} className="btn_style_one">
                    {token ? "Dashboard" : "Get Started"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Sticky Header*/}
        
        {/* Mobile Menu */}
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
                      style={{ width: "100px", height: "auto" }}
                      src={logo}
                      alt="Company Logo"
                    />
                  </Link>
                </div>
                <div className="menu-outer">
                  <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <ul className="navigation">
                      {menuItems.map((item) => (
                        <li
                          key={item.path}
                          className={
                            location.pathname === item.path ? "active" : ""
                          }
                        >
                          <Link 
                            to={item.path} 
                            onClick={() => setMobileMenuVisible(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Add the Dashboard/Get Started button to mobile menu */}
                <div className="mobile-menu-btn" style={{ padding: "15px", textAlign: "center" }}>
                  <Link 
                    to={token ? "/profile" : "/login"} 
                    className="btn_style_one"
                    onClick={() => setMobileMenuVisible(false)}
                    style={{ display: "inline-block", width: "auto" }}
                  >
                    {token ? "Dashboard" : "Get Started"}
                  </Link>
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