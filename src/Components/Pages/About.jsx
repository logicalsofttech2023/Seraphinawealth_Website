import React from 'react'

const About = () => {
  return (
<>
<div>
 
  {/* <div className="loader-wrap">
    <div className="preloader">
      <div className="preloader-close">x</div>
      <div id="handle-preloader" className="handle-preloader">
        <div className="animation-preloader">
          <div className="spinner" />
          <div className="txt-loading">
            <span data-text-preloader="F" className="letters-loading">
              F
            </span>
            <span data-text-preloader="i" className="letters-loading">
              i
            </span>
            <span data-text-preloader="n" className="letters-loading">
              n
            </span>
            <span data-text-preloader="a" className="letters-loading">
              a
            </span>
            <span data-text-preloader="n" className="letters-loading">
              n
            </span>
            <span data-text-preloader="c" className="letters-loading">
              c
            </span>
            <span data-text-preloader="e" className="letters-loading">
              e
            </span>
            <span data-text-preloader="r" className="letters-loading">
              r
            </span>
          </div>
        </div>  
      </div>
    </div>
  </div> */}

  <div id="search-popup" className="search-popup">
    <div className="popup-inner">
      <div className="upper-box">
        <figure className="logo-box"><a href="index.html"><img src="assets/images/logo.png" alt /></a></figure>
        <div className="close-search"><span className="fa-solid fa-xmark" /></div>
      </div>
      <div className="overlay-layer" />
      <div className="container">
        <div className="search-form">
          <form method="post" action="index.html">
            <div className="form-group">
              <fieldset>
                <input type="search" className="form-control" name="search-input" defaultValue placeholder="Type your keyword and hit" required />
                <button type="submit"><i className="icon-50" /></button>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  <section className="about_page_banner aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
    <div className="container">
      <div className="banner_content centred">
        <div className="tag_text"><h6>About us</h6></div>
        <h1>Reimagining the power of <br />Finance Service</h1>
        <p>Establish your vision and value proposition and turn them into testable prototypes.</p>
        <div className="banner_image">
          <img src="/assets/images/resource/about_banner_image.jpg" alt />
        </div>
      </div>
    </div>
  </section>

  <section className="why_choose_us about_page aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
    <div className="shape_circle float-bob-y"><img src="/assets/images/icons/ring_shape.png" alt /></div>
    <div className="mouse_pointer float-bob-x"><img src="/assets/images/icons/mouse-pointer.png" alt /></div>
    <div className="container">
      <div className="border_top" />
      <div className="section_title centred">
        <div className="tag_text"><h6>Why Choose us</h6></div>
        <h2>We are the best in Market</h2>
      </div>
      <div className="row">
        <div className="col-xl-4 col-md-6 col-sm-12">
          <div className="why_choose_block_two mb_40 aos-init aos-animate" data-aos="fade-right" data-aos-easing="linear" data-aos-duration={500}>
            <div className="choose_icon">
              <i className="icon-28" />
            </div>
            <h4>Expert Consultant</h4>
            <p>Duis aute irure dolor in velit onerepreh enderit in voluptate more esse</p>
            <div className="link_btn"><a href="#">Discover More <i className="fa-solid fa-angle-right" /></a></div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 col-sm-12">
          <div className="why_choose_block_two mb_40 hover aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
            <div className="choose_icon">
              <i className="icon-27" />
            </div>
            <h4>Worldpay Solutions</h4>
            <p>Duis aute irure dolor in velit onerepreh enderit in voluptate more esse</p>
            <div className="link_btn"><a href="#">Discover More <i className="fa-solid fa-angle-right" /></a></div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 col-sm-12">
          <div className="why_choose_block_two mb_40 aos-init aos-animate" data-aos="fade-left" data-aos-easing="linear" data-aos-duration={500}>
            <div className="choose_icon">
              <i className="icon-26" />
            </div>
            <h4>Innovative Fintech</h4>
            <p>Duis aute irure dolor in velit onerepreh enderit in voluptate more esse</p>
            <div className="link_btn"><a href="#">Discover More <i className="fa-solid fa-angle-right" /></a></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="feature_section_two home_four">
    <div className="circle_one float-bob-y" />
    <div className="circle_two float-bob-x" />
    <div className="container">
      <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-12">
          <div className="feature_content_block aos-init aos-animate" data-aos="fade-right" data-aos-easing="linear" data-aos-duration={500}>
            <div className="section_title">
              <div className="tag_text"><h6>Features</h6></div>
              <h2>The Specialists in fund administration</h2>
            </div>
            <ul className="accordion_box">
              <li className="accordion block aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
                <div className="acc-btn">                        
                  <h4>1.     Improve operational performance</h4>
                  <div className="icon-box" />
                </div>
                <div className="acc-content">
                  <div className="text">
                    <p>More than of the public reviews by our users mention amazing and super fast customer support as one of our</p>
                  </div>
                </div>
              </li>
              <li className="accordion block aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
                <div className="acc-btn">                     
                  <h4>2.     Focus on core competencies</h4>
                  <div className="icon-box" />
                </div>
                <div className="acc-content">
                  <div className="text">
                    <p>More than of the public reviews by our users mention amazing and super fast customer support as one of our</p>
                  </div>
                </div>
              </li>
              <li className="accordion block active-block aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
                <div className="acc-btn active">                        
                  <h4>3.     Go to market quickly</h4>
                  <div className="icon-box" />
                </div>
                <div className="acc-content current">
                  <div className="text">
                    <p>More than of the public reviews by our users mention amazing and super fast customer support as one of our</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 offset-xl-1">
          <div className="feature_image_block aos-init aos-animate" data-aos="fade-left" data-aos-easing="linear" data-aos-duration={500}>
            <div className="icon_box_one float-bob-y"><i className="icon-44" /></div>
            <div className="icon_box_two float-bob-y"><i className="icon-29" /></div>
            <div className="feture_image">
              <img src="/assets/images/resource/feature_image_2.jpg" alt />
            </div>
            <div className="chart_image_five float-bob-x">
              <img src="/assets/images/resource/chart_5.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
 
  <section className="team_section">
    <div className="container">
      <div className="section_title centred">
        <div className="tag_text"><h6>Our Team</h6></div>
        <h2>Our Expert Team</h2>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 team_block">
          <div className="team_block_one aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
            <div className="inner_box">
              <div className="image_box">
                <figure className="image"><img src="/assets/images/team/team-1.jpg" alt /></figure>
                <ul className="team_social_links">
                  <li><a href="team.html"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="team.html"><i className="fab fa-twitter" /></a></li>
                  <li><a href="team.html"><i className="fab fa-skype" /></a></li>
                </ul>
              </div>
              <div className="lower_content">
                <h4><a href="team.html">Ronald Richards</a></h4>
                <span className="designation">Digital Marketer</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 team_block">
          <div className="team_block_one aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={600}>
            <div className="inner_box">
              <div className="image_box">
                <figure className="image"><img src="/assets/images/team/team-2.jpg" alt /></figure>
                <ul className="team_social_links">
                  <li><a href="team.html"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="team.html"><i className="fab fa-twitter" /></a></li>
                  <li><a href="team.html"><i className="fab fa-skype" /></a></li>
                </ul>
              </div>
              <div className="lower_content">
                <h4><a href="team.html">Theresa Webb</a></h4>
                <span className="designation">Content Creator</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 team_block">
          <div className="team_block_one aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={700}>
            <div className="inner_box">
              <div className="image_box">
                <figure className="image"><img src="/assets/images/team/team-3.jpg" alt /></figure>
                <ul className="team_social_links">
                  <li><a href="team.html"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="team.html"><i className="fab fa-twitter" /></a></li>
                  <li><a href="team.html"><i className="fab fa-skype" /></a></li>
                </ul>
              </div>
              <div className="lower_content">
                <h4><a href="team.html">Brooklyn Simmons</a></h4>
                <span className="designation">Product Designer</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 team_block">
          <div className="team_block_one aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={800}>
            <div className="inner_box">
              <div className="image_box">
                <figure className="image"><img src="/assets/images/team/team-4.jpg" alt /></figure>
                <ul className="team_social_links">
                  <li><a href="team.html"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="team.html"><i className="fab fa-twitter" /></a></li>
                  <li><a href="team.html"><i className="fab fa-skype" /></a></li>
                </ul>
              </div>
              <div className="lower_content">
                <h4><a href="team.html">Leslie Alexander</a></h4>
                <span className="designation">Web Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="app_section style_three aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
    <div className="shape_icon_12"><img src="/assets/images/icons/shape_icon_12.png" alt /></div>
    <div className="container">
      <div className="app_inner_box">
        <div className="app_outer_box">
          <div className="shape_one float-bob-x" />
          <div className="shape_two float-bob-y" />
          <div className="shape_three rotate-me" />
          <div className="content_box">
            <h2>Download Banking App</h2>
            <p>Upgrade to a seamless user experience that delivers a 360-degree view of household accounts for the advisor and client and supports more collaborative engagements.</p>
          </div>            
          <div className="app_links">
            <div className="apple_link"><a href="#"><img src="/assets/images/icons/apple_icon.png" alt /></a></div>
            <div className="play_link"><a href="#"><img src="/assets/images/icons/play_icon.png" alt /></a></div>
          </div>
        </div>
        <div className="app_image float-bob-x"><img src="/assets/images/resource/app_image.png" alt /></div>
      </div>        
    </div>
  </section>

  <section className="testimonial_section_two">
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-md-12 content_column">
          <div className="testimonial_content aos-init aos-animate" data-aos="fade-right" data-aos-easing="linear" data-aos-duration={500}>
            <div className="section_title">
              <div className="tag_text"><h6>Testimonials</h6></div>
              <h2>Love from Clients</h2>
            </div>
            <div className="single-item-carousel owl-carousel owl-theme owl-dots-none nav-style-one">
              <div className="testimonial_block_three">
                <div className="inner_box">
                  <div className="quort_icon"><i className="icon-19" /></div>
                  <p>The great benefit of audio is that it's the cost effective way for your brand to the create compelling content. You don't need an entire production crew and tons of expensive equipment</p>
                </div>
              </div>
              <div className="testimonial_block_three">
                <div className="inner_box">
                  <div className="quort_icon"><i className="icon-19" /></div>
                  <p>The great benefit of audio is that it's the cost effective way for your brand to the create compelling content. You don't need an entire production crew and tons of expensive equipment</p>
                </div>
              </div>
              <div className="testimonial_block_three">
                <div className="inner_box">
                  <div className="quort_icon"><i className="icon-19" /></div>
                  <p>The great benefit of audio is that it's the cost effective way for your brand to the create compelling content. You don't need an entire production crew and tons of expensive equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12 image_column">
          <figure className="testimonial_image aos-init aos-animate float-bob-y" data-aos="fade-left" data-aos-easing="linear" data-aos-duration={500}>
            <img src="/assets/images/resource/testimonial-4.png" alt />
          </figure>
        </div>
      </div>
    </div>    
  </section>


</div>
</>
  )
}

export default About