import axios from "axios";
import React, { useEffect, useState } from "react";

const HowItWorks = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getAllHowItWorks`
      );
      if (response.data.success) {
        setData(response.data.data[0]); // Get the first item from the array
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load How It Works data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="work_process_section">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="work_process_section">
        <div className="container">
          <div className="alert alert-danger mt-3">{error}</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="work_process_section">
        <div className="container">
          <div className="alert alert-info mt-3">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="work_process_section">
        <div className="container">
          <div className="section_title centred">
            <div className="tag_text">
              <h6>Work Process</h6>
            </div>
            <h2>How it works</h2>
          </div>

          <div className="row">
            {data.content.map((step, index) => (
              <div
                key={step._id}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
              >
                <div
                  className={`process_block_one centred ${
                    index === 1 ? "shape_image" : ""
                  }`}
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration={300 + index * 100}
                >
                  <div className="process_icon">
                    <i className={`icon-${35 + index}`} />
                  </div>
                  <h4>Step {index + 1}: {step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Box */}
          {data.image && (
            <div
              className="video_box"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="600"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_FILE_URL}${data.image})`,
              }}
            ></div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;