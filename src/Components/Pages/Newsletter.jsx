import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [data , setData] = useState(null);

  useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}getNewsletter`
        );
        if (response.status === 200) {
          console.log("Newsletter data fetched successfully:", response.data);
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load Newsletter data");
      } finally {
        setLoading(false);
      }
    };
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
              {data?.title.slice(0, 23)}<br />
              {data?.title.slice(23)}
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
                  src={`${import.meta.env.VITE_FILE_URL}${data?.image}`}
                  alt="CTA Illustration"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "/assets/images/resource/cta_image.png";
                  }}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
