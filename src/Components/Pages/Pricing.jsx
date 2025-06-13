import React from 'react'

const Pricing = () => {
    return (
        <>
            <div>

                <div className="loader-wrap">
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
                            <div className="breadcrumb_sutitle"><h6>Pricing</h6></div>
                            <h1 className="breadcrumb_title">Pricing Plans</h1>
                            <ul className="breadcrumb_menu">
                                <li><a href="index.html">Home</a></li>
                                <li>/</li>
                                <li>Pricing Plans</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="pricing_section pt_150">
                    <div className="shape_bg" />
                    <div className="shape_six float-bob-y"><img src="assets/images/icons/shape_icon_6.png" alt /></div>
                    <div className="container">
                        <div className="section_title centred">
                            <div className="tag_text"><h6>Our Pricing</h6></div>
                            <h2>Affordable Pricing Plans</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12 pricing_block">
                                <div className="pricing_block_one aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
                                    <div className="pricing_table">
                                        <div className="table_header">
                                            <h5>Personal Plan</h5>
                                            <p>For bloggers, freelancers &amp; businesses</p>
                                            <div className="rate">$29 <span>/Month</span></div>
                                        </div>
                                        <div className="table_content">
                                            <ul className="feature_list">
                                                <li>Up to 10 Team Members</li>
                                                <li>Unlimited Usage</li>
                                                <li>Unlimited Drive Storage</li>
                                                <li>Concierge Help Center</li>
                                                <li>Smart Brand Personas</li>
                                                <li>Custom AI Brand Models</li>
                                            </ul>
                                            <div className="link_btn">
                                                <a href="pricing.html" className="btn_style_two"><span>Select This Package</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 pricing_block">
                                <div className="pricing_block_one aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
                                    <div className="pricing_table">
                                        <div className="table_header">
                                            <h5>Business Plan</h5>
                                            <p>For bloggers, freelancers &amp; businesses</p>
                                            <div className="rate">$39 <span>/Month</span></div>
                                        </div>
                                        <div className="table_content">
                                            <ul className="feature_list">
                                                <li>Up to 10 Team Members</li>
                                                <li>Unlimited Usage</li>
                                                <li>Unlimited Drive Storage</li>
                                                <li>Concierge Help Center</li>
                                                <li>Smart Brand Personas</li>
                                                <li>Custom AI Brand Models</li>
                                            </ul>
                                            <div className="link_btn">
                                                <a href="pricing.html" className="btn_style_two"><span>Select This Package</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 pricing_block">
                                <div className="pricing_block_one aos-init aos-animate" data-aos="fade-up" data-aos-easing="linear" data-aos-duration={500}>
                                    <div className="pricing_table">
                                        <div className="table_header">
                                            <h5>Advance Plan</h5>
                                            <p>For bloggers, freelancers &amp; businesses</p>
                                            <div className="rate">$59 <span>/Month</span></div>
                                        </div>
                                        <div className="table_content">
                                            <ul className="feature_list">
                                                <li>Up to 10 Team Members</li>
                                                <li>Unlimited Usage</li>
                                                <li>Unlimited Drive Storage</li>
                                                <li>Concierge Help Center</li>
                                                <li>Smart Brand Personas</li>
                                                <li>Custom AI Brand Models</li>
                                            </ul>
                                            <div className="link_btn">
                                                <a href="pricing.html" className="btn_style_two"><span>Select This Package</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </>
    )
}

export default Pricing
