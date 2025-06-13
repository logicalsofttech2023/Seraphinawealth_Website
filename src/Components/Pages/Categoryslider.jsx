import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const services = [
  {
    icon: "icon-33",
    title: "Retirement Solutions",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    icon: "icon-32",
    title: "Fraud & Protect",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    icon: "icon-31",
    title: "Risk & Compliance",
    color: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)"
  },
  {
    icon: "icon-30",
    title: "Wealth Management",
    color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
  },
];

const options = {
  loop: true,
  margin: 20,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 2500,
  responsive: {
    0: { items: 1 },
    600: { items: 3 },
    1000: { items: 4 },
  },
  navText: [
    "<div style='background:#fff; color:#333; padding:5px 10px; border-radius:50%; box-shadow:0 2px 5px rgba(0,0,0,0.1);'><i class='fas fa-chevron-left'></i></div>",
    "<div style='background:#fff; color:#333; padding:5px 10px; border-radius:50%; box-shadow:0 2px 5px rgba(0,0,0,0.1);'><i class='fas fa-chevron-right'></i></div>"
  ]
};

const Categoryslider = () => {
  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      padding: "60px 0",
      background: "#f8f9fa"
    }}>
      {/* Background circles */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(233,236,239,0.8) 0%, rgba(233,236,239,0) 70%)",
        top: "-300px",
        left: "-300px"
      }} />
      <div style={{
        position: "absolute",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(233,236,239,0.6) 0%, rgba(233,236,239,0) 70%)",
        bottom: "-400px",
        right: "-400px"
      }} />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 15px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: "40px"
        }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
            padding: "5px 15px",
            borderRadius: "30px",
            marginBottom: "15px"
          }}>
            <h6 style={{
              margin: 0,
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "1px"
            }}>CATEGORY</h6>
          </div>
          <h2 style={{
            margin: 0,
            fontSize: "36px",
            fontWeight: 700,
            color: "#2c3e50",
            lineHeight: 1.3
          }}>Our Premium Service Categories</h2>
        </div>

        <OwlCarousel className="owl-theme" {...options}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "25px 20px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              height: "90%",
              margin: "10px 0",
              border: "1px solid rgba(0,0,0,0.03)",
              ":hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }
            }}>
              <div style={{
                width: "70px",
                height: "70px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: service.color,
                color: "#fff",
                fontSize: "28px",
                boxShadow: `0 5px 15px ${service.color.split('0%')[1].split(')')[0]}50)`
              }}>
                <i className={service.icon} />
              </div>
              <h4 style={{
                margin: "0 0 10px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#2c3e50"
              }}>
                <a href="#" style={{
                  color: "inherit",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  ":hover": {
                    color: service.color.split('0%')[0].split('#')[1]
                  }
                }}>{service.title}</a>
              </h4>
            </div>
          ))}
        </OwlCarousel>

       
      </div>
    </section>
  );
};

export default Categoryslider;