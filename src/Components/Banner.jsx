import React from 'react'

const Banner = () => {
  return (
    <div>
        <section className="banner_style_one">
          <div
            className="shape_one float-bob-x"
            style={{
              "background-image": "url(assets/images/icons/mouse-pointer.png)",
            }}
          />
          <div
            className="shape_two float-bob-y"
            style={{
              "background-image": "url(assets/images/icons/shape_icon_1.png)",
            }}
          />
          <div className="container">
            <div className="banner_content">
              <div className="tag_text">
                <h6>Consultant</h6>
              </div>
              <h1>
                Smarter Investing,Brilliantly <br /> Spending
              </h1>
              <p>
                Establish your vision and value proposition and turn them <br />{" "}
                into testable prototypes.
              </p>
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
                    />
                    <button type="submit" className="btn_style_one">
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
              <div className="income_chart float-bob-y">
                <div className="title_box">
                  <h6>Total Income</h6>
                  <div className="rate">$ 18532.52</div>
                </div>
                <div className="percentage">
                  <i className="fa-solid fa-arrow-trend-up" /> +11%
                </div>
              </div>
              <div className="banner_image">
                <img src="/assets/images/resource/banner_image.png" alt />
              </div>
              <div className="shape_three" />
              <div className="shape_four float-bob-x">
                <img src="/assets/images/resource/chart_1.png" alt />
              </div>
              <div className="shape_five rotate-me">
                <img src="/assets/images/icons/star_icon.png" alt />
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Banner