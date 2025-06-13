import React from "react"
const Faq = ()=>{
    return(
<>
<div>
 

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
 
  <section className="page_breadcrumb">
    <div className="page_breadcrumb_shape_one float-bob-x">
      <img src="assets/images/icons/shape_icon_13.png" alt />
    </div>
    <div className="page_breadcrumb_shape_two float-bob-y">
      <img src="assets/images/icons/shape_icon_1.png" alt />
    </div>    
    <div className="container">
      <div className="breadcrumb_content centred">
        <div className="breadcrumb_sutitle"><h6>Client Review</h6></div>
        <h1 className="breadcrumb_title">Frequently Asked Questions</h1>
        <ul className="breadcrumb_menu">
          <li><a href="index.html">Home</a></li>
          <li>/</li>
          <li>FAQ</li>
        </ul>
      </div>
    </div>
  </section>
  {/* Page Breadcrumb End */}
  {/* Faq Section */}
  <section className="faq_section inner_page pt_150">
    <div className="container">
      <div className="section_title centred aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
        <div className="tag_text"><h6>General FAQ</h6></div>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="inner_box">
        <ul className="accordion_box">
          <li className="accordion block aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={600}>
            <div className="acc-btn">                        
              <h4>1.     How To Cancel Chase Card?</h4>
              <div className="icon-box" />
            </div>
            <div className="acc-content">
              <div className="text">
                <p>Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.</p>
              </div>
            </div>
          </li>
          <li className="accordion block active-block aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={700}>
            <div className="acc-btn active">                        
              <h4>2.     What is GlobalWebPay Alternative?</h4>
              <div className="icon-box" />
            </div>
            <div className="acc-content current">
              <div className="text">
                <p>Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.</p>
              </div>
            </div>
          </li>
          <li className="accordion block aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={800}>
            <div className="acc-btn">                        
              <h4>3.     What are BIC and SWIFT codes?</h4>
              <div className="icon-box" />
            </div>
            <div className="acc-content">
              <div className="text">
                <p>Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.</p>
              </div>
            </div>
          </li>
          <li className="accordion block aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={900}>
            <div className="acc-btn">                        
              <h4>4.     Explaining what Britain's exit from the EU means?</h4>
              <div className="icon-box" />
            </div>
            <div className="acc-content">
              <div className="text">
                <p>Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.</p>
              </div>
            </div>
          </li>
          <li className="accordion block aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={1000}>
            <div className="acc-btn">                        
              <h4>5.     What is Gross Domestic Product or GDP?</h4>
              <div className="icon-box" />
            </div>
            <div className="acc-content">
              <div className="text">
                <p>Lorem ipsum dolor sit amet consectetur. Ut parturient at volutpat dolor nunc cursus at rhoncus. Quis sit id tempus aliquam. Mauris felis purus morbi facilisis. Ullamcorper id consectetur ultricies nunc nunc enim accumsan porttitor.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</div>
</>
    )
}
export default Faq
