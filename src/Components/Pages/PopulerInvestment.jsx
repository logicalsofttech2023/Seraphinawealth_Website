import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Skeleton,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, CheckCircleOutline } from "@mui/icons-material";

const PopulerInvestment = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    AOS.init({ once: true });
    fetchAllPlans();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const fetchAllPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getFeaturedPlans`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPlans(response.data.data || []);
    } catch (error) {
      console.error("Error fetching featured plans:", error);
      setError("Failed to load featured plans. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return "#ef4444"; // red
      case "moderate":
        return "#f59e0b"; // amber
      case "low":
        return "#10b981"; // emerald
      default:
        return "#64748b"; // slate
    }
  };

  const renderPlanCard = (plan) => (
    <div
      key={plan._id}
      style={{ padding: "0 15px" }}
      onClick={() =>
        navigate(`/investPlanDetail`, {
          state: {
            planId: plan._id,
            investMore: plan.isPurchased || false,
          },
        })
      }
    >
      <div
        className="service_block_one"
        data-aos="fade-up"
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "20px",
          height: "100%",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          border: "1px solid rgba(241, 245, 249, 0.8)",
          display: "flex",
          flexDirection: "column",
          margin: "0 10px",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          },
          position: "relative",
        }}
      >
        {/* Purchased badge */}
        {plan.isPurchased && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#00833D",
              color: "white",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <CheckCircleOutline sx={{ fontSize: "16px" }} />
            Already Invested
          </div>
        )}
  
        <div
          className="service_icon"
          style={{
            width: "70px",
            height: "70px",
            background: "#fff",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            color: "white",
            fontSize: "28px",
            boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
          }}
        >
          {plan.categoryId?.icon ? (
            <img
              src={`${import.meta.env.VITE_FILE_URL}${plan.categoryId.icon}`}
              alt={plan.title}
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
          ) : (
            <i className="icon-33" />
          )}
        </div>
        <h4
          style={{
            color: "#1e293b",
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "16px",
            lineHeight: "1.4",
            textAlign: "start",
          }}
        >
          {plan.title}
        </h4>
  
        <div style={{ marginBottom: "20px", textAlign: "start" }}>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>
              ROI:
            </span>
            <span style={{ fontWeight: "600", color: "#0D0D0D" }}>
              {plan.roi}% p.a
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>
              Duration:
            </span>
            <span style={{ fontWeight: "600", color: "#1e293b" }}>
              {plan.durationMonths} months
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>
              Risk:
            </span>
            <span
              style={{
                fontWeight: "600",
                color: getRiskColor(plan.risk),
              }}
            >
              {plan.risk}
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "8px" }}>
            <span style={{ flex: 1, color: "#64748b", fontWeight: "500" }}>
              Min. Amount:
            </span>
            <span style={{ fontWeight: "600", color: "#1e293b" }}>
              ₹{plan.minAmount?.toLocaleString() || "N/A"}
            </span>
          </div>
        </div>
  
        <p
          style={{
            color: "#64748b",
            marginBottom: "24px",
            lineHeight: "1.6",
            fontSize: "15px",
            flexGrow: 1,
            textAlign: "start",
          }}
        >
          {plan.description || "No description available"}
        </p>
  
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "auto",
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "#3b82f6",
              fontWeight: "600",
              fontSize: "15px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#2563eb",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/investPlanDetail`, {
                state: {
                  planId: plan._id,
                  investMore: plan.isPurchased || false,
                },
              });
            }}
          >
            Learn More
            <ArrowForwardIos sx={{ fontSize: "14px", ml: 1 }} />
          </Button>
  
          {plan.isPurchased ? (
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #00833D, #000000)",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "15px",
                flex: 1,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #006b32, #000000)",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/investPlanDetail`, {
                  state: {
                    planId: plan._id,
                    investMore: true,
                  },
                });
              }}
            >
              Invest More
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #00833D, #000000)",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "15px",
                flex: 1,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #006b32, #000000)",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/investPlanDetail`, {
                  state: {
                    planId: plan._id,
                  },
                });
              }}
            >
              Invest Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderSkeletonCard = () => (
    <div style={{ padding: "0 15px" }}>
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "20px",
          height: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          border: "1px solid rgba(241, 245, 249, 0.8)",
          display: "flex",
          flexDirection: "column",
          margin: "0 10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={70}
          height={70}
          sx={{ borderRadius: "12px", mb: 3 }}
        />
        <Skeleton variant="text" width="80%" height={32} />
        <Box sx={{ my: 2 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="60%" />
        </Box>
        <Skeleton variant="text" width="100%" height={60} />
        <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
          <Skeleton variant="text" width={100} height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      </div>
    </div>
  );

  return (
    <section className="service_section" style={{ position: "relative" }}>
      <div className="circle_one" />
      <div className="circle_two" />
      <div className="container">
        <div className="section_title light centred">
          <div className="tag_text">
            <h6>Popular Investment Plans</h6>
          </div>
          <h2>Our Popular Investment Plans</h2>
        </div>

        {error ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            {error}
            <Button variant="outlined" sx={{ mt: 2 }} onClick={fetchAllPlans}>
              Retry
            </Button>
          </Box>
        ) : (
          <div style={{ position: "relative", marginBottom: "50px" }}>
            {loading || plans.length === 0 ? (
              <Slider ref={sliderRef} {...settings}>
                {[...Array(4)].map((_, index) => (
                  <React.Fragment key={index}>
                    {renderSkeletonCard()}
                  </React.Fragment>
                ))}
              </Slider>
            ) : (
              <Slider ref={sliderRef} {...settings}>
                {plans.map(renderPlanCard)}
              </Slider>
            )}

            {/* Always show arrows if there are plans (remove the length check) */}
            {plans.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  marginTop: "30px",
                  position: "relative",
                  bottom: "0",
                  width: "100%",
                }}
              >
                <button
                  onClick={goToPrev}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00833D, #000000)",
                    color: "white",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    ":hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00833D, #000000)",
                    color: "white",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    ":hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        <h1 className="section_tag" style={{ fontSize: "220px" }}>
          Investment
        </h1>
      </div>
    </section>
  );
};

export default PopulerInvestment;
