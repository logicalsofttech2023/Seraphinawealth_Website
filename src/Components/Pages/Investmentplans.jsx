import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Skeleton,
  Box,
  Pagination,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CheckCircle } from "@mui/icons-material";
import { BsCashStack, BsGraphUp } from "react-icons/bs";


const Investmentplans = () => {
  const location = useLocation();
  const id = location.state?.category;
  const [activeFilter, setActiveFilter] = useState(id || "all");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const Navigate = useNavigate();

  // Constants
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    AOS.init({ once: true });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchAllCategories();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchInvestmentPlans();
  }, [activeFilter, searchQuery, page]);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getAllCategory`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchInvestmentPlans = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getAllInvestmentPlansInWeb`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            categoryId: activeFilter === "all" ? "" : activeFilter,
            search: searchQuery,
            page,
            limit: ITEMS_PER_PAGE,
          },
        }
      );

      // Ensure we have valid numbers for pagination
      const totalCount = Number(response.data?.pagination.total) || 0;
      const itemsPerPage = Number(ITEMS_PER_PAGE) || 6; // Default to 6 if ITEMS_PER_PAGE is invalid

      // Calculate total pages safely
      const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage);
      setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1); // Ensure at least 1 page

      console.log("Total Pages:", calculatedTotalPages); // Debug log

      setInvestmentPlans(response.data.data || []);
    } catch (error) {
      console.error("Error fetching investment plans:", error);
      setTotalPages(1); // Fallback to 1 page on error
      setInvestmentPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const LoadingSkeleton = () => (
    <div
      className="row"
      style={{ margin: isMobile ? "0 -10px" : "0 -15px", paddingRight: "20px" }}
    >
      {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
        <div
          key={index}
          className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
          style={{
            marginBottom: "30px",
            padding: isMobile ? "0 10px" : "0 15px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "20px",
              height: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              border: "1px solid rgba(241, 245, 249, 0.8)",
            }}
          >
            <Skeleton
              variant="circular"
              width={70}
              height={70}
              style={{ marginBottom: "24px" }}
            />
            <Skeleton
              variant="text"
              width="60%"
              height={30}
              style={{ marginBottom: "16px" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              style={{ marginBottom: "8px" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              style={{ marginBottom: "8px" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              style={{ marginBottom: "24px" }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={100}
              style={{ marginBottom: "24px", borderRadius: "8px" }}
            />
            <div style={{ display: "flex", gap: "12px" }}>
              <Skeleton variant="text" width="30%" height={40} />
              <Skeleton
                variant="rectangular"
                width="70%"
                height={40}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "60px 0",
      }}
    >
      {/* Background elements */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(0,0,0,0) 70%)",
          top: "-200px",
          left: "-200px",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(0,0,0,0) 70%)",
          bottom: "-400px",
          right: "-300px",
          zIndex: 0,
        }}
      />

      {/* Section header */}
      <div
        style={{
          marginBottom: "50px",
          position: "relative",
          zIndex: 1,
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#1e293b",
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "16px",
            lineHeight: "1.3",
          }}
        >
          Explore Reliable Investment Options
        </h2>
        <p
          style={{
            color: "#64748b",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.6",
            fontSize: "16px",
          }}
        >
          Choose from our carefully curated investment options to build your
          financial future
        </p>
      </div>

      {/* Main container */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          padding: "20px 0",
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Sidebar Filter */}
        <div
          style={{
            width: isMobile ? "100%" : "280px",
            padding: isMobile ? "10px 0" : "0 25px 0 0",
            marginBottom: isMobile ? "25px" : "0",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              position: isMobile ? "relative" : "sticky",
              top: "20px",
              border: "1px solid rgba(241, 245, 249, 0.8)",
              display: "flex",
              flexDirection: "column",
              height: isMobile ? "auto" : "calc(100vh)",
            }}
          >
            <h3
              style={{
                marginBottom: "24px",
                color: "#1e293b",
                fontSize: "18px",
                fontWeight: "600",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "12px",
              }}
            >
              Filter Investments
            </h3>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search plans..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {loading ? <CircularProgress size={20} /> : <SearchIcon />}
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: "20px" }}
            />

            <div
              style={{
                overflowY: "auto",
                flex: 1,
                paddingRight: "8px", // Add space for scrollbar
                scrollbarWidth: "thin",
                scrollbarColor: "#00833D #f1f5f9",
                // Custom scrollbar for webkit browsers
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f5f9",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#00833D",
                  borderRadius: "10px",
                },
              }}
            >
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => setActiveFilter("all")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "none",
                      background:
                        activeFilter === "all"
                          ? "linear-gradient(135deg, #00833D, #000000)"
                          : "#f8fafc",
                      color: activeFilter === "all" ? "white" : "#334155",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontWeight: "500",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      boxShadow:
                        activeFilter === "all"
                          ? "0 2px 5px rgba(59, 130, 246, 0.2)"
                          : "none",
                    }}
                  >
                    All Investments
                    {activeFilter === "all" && (
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: "14px",
                          background: "rgba(255,255,255,0.2)",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category._id} style={{ marginBottom: "10px" }}>
                    <button
                      onClick={() => setActiveFilter(category._id)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "none",
                        background:
                          activeFilter === category._id
                            ? "linear-gradient(135deg, #00833D, #000000)"
                            : "#f8fafc",
                        color:
                          activeFilter === category._id ? "white" : "#334155",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontWeight: "500",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        boxShadow:
                          activeFilter === category._id
                            ? "0 2px 5px rgba(59, 130, 246, 0.2)"
                            : "none",
                      }}
                    >
                      {category.name}
                      {activeFilter === category._id && (
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: "14px",
                            background: "rgba(255,255,255,0.2)",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
      {loading ? (
        <LoadingSkeleton />
      ) : investmentPlans.length > 0 ? (
        <>
          <div
            className="row"
            style={{
              margin: isMobile ? "0 -10px" : "0 -15px",
              paddingRight: "20px",
            }}
          >
            {investmentPlans.map((plan, index) => (
              <div
                key={plan._id}
                className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                style={{
                  marginBottom: "30px",
                  padding: isMobile ? "0 10px" : "0 15px",
                }}
              >
                <div
                  className="service_block_one"
                  data-aos="fade-up"
                  data-aos-duration={300 + index * 200}
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
                    position: "relative",
                    ":hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {/* Top Badges */}
                  <div style={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "10px", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "flex-end", 
                    gap: "8px" 
                  }}>
                    {/* Purchased Badge */}
                    {plan.isPurchased && (
                      <div
                        style={{
                          background: "linear-gradient(135deg, #00833D, #000000)",
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "600",
                          zIndex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <CheckCircle style={{ fontSize: "16px" }} />
                        Invested
                      </div>
                    )}
                    
                    {/* Popular/Featured Badge */}
                    {(plan.isPopular || plan.isFeatured) && (
                      <div
                        style={{
                          background: plan.isPopular
                            ? "linear-gradient(135deg, #FFD700, #FFA500)"
                            : "linear-gradient(135deg, #3b82f6, #1e40af)",
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "600",
                          zIndex: 1,
                        }}
                      >
                        {plan.isPopular ? "Popular" : "Featured"}
                      </div>
                    )}
                  </div>

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
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_FILE_URL}${plan.categoryId.icon}`}
                      alt={plan.title}
                      style={{ width: "40px", height: "40px" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "placeholder-icon.png";
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <h4
                      style={{
                        color: "#1e293b",
                        fontSize: "20px",
                        fontWeight: "700",
                        margin: 0,
                        lineHeight: "1.4",
                        textAlign: "start",
                      }}
                    >
                      {plan.title}
                    </h4>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "12px",
                        background:
                          plan.risk === "High"
                            ? "#fef2f2"
                            : plan.risk === "Medium"
                            ? "#fffbeb"
                            : "#f0fdf4",
                        color:
                          plan.risk === "High"
                            ? "#dc2626"
                            : plan.risk === "Medium"
                            ? "#d97706"
                            : "#16a34a",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {plan.risk || "Moderate"}
                    </span>
                  </div>

                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                      marginBottom: "16px",
                      textAlign: "start",
                    }}
                  >
                    {plan.categoryId.name}
                  </p>

                  {/* Key Metrics */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        background: "#f8fafc",
                        borderRadius: "8px",
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Min. Investment
                      </div>
                      <div style={{ fontWeight: "700", color: "#1e293b" }}>
                        ₹{plan.minAmount?.toLocaleString() || "20,000"}
                      </div>
                    </div>

                    <div
                      style={{
                        background: "#f8fafc",
                        borderRadius: "8px",
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Returns (ROI)
                      </div>
                      <div style={{ fontWeight: "700", color: "#16a34a" }}>
                        {plan.roi || "8.25"}%
                      </div>
                    </div>

                    <div
                      style={{
                        background: "#f8fafc",
                        borderRadius: "8px",
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Duration
                      </div>
                      <div style={{ fontWeight: "700", color: "#1e293b" }}>
                        {plan.durationMonths || "24"} months
                      </div>
                    </div>

                    <div
                      style={{
                        background: "#f8fafc",
                        borderRadius: "8px",
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "12px",
                          marginBottom: "4px",
                        }}
                      >
                        Payout
                      </div>
                      <div style={{ fontWeight: "700", color: "#1e293b" }}>
                        {plan.additionalInfo?.includes("Monthly")
                          ? "Monthly"
                          : plan.additionalInfo?.includes("Quarterly")
                          ? "Quarterly"
                          : plan.additionalInfo?.includes("Yearly")
                          ? "Yearly"
                          : "At Maturity"}
                      </div>
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
                    {plan.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "auto",
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        color: "#3b82f6",
                        fontWeight: "600",
                        fontSize: "15px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        transition: "all 0.2s ease",
                        padding: "8px 0",
                        ":hover": {
                          color: "#2563eb",
                        },
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        Navigate(`/investPlanDetail`, {
                          state: {
                            planId: plan._id,
                          },
                        });
                      }}
                    >
                      Learn More
                      <span
                        style={{
                          marginLeft: "8px",
                          fontSize: "14px",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        →
                      </span>
                    </a>

                    {plan.isPurchased ? (
                      <button
                        style={{
                          background: "#e2e8f0",
                          color: "#64748b",
                          border: "none",
                          padding: "8px 20px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "15px",
                          transition: "all 0.2s ease",
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          ":hover": {
                            background: "#cbd5e1",
                          },
                        }}
                        onClick={() =>
                          Navigate(`/investPlanDetail`, {
                            state: {
                              planId: plan._id,
                              investMore: true,
                            },
                          })
                        }
                      >
                        <BsCashStack />
                        Invest More
                      </button>
                    ) : (
                      <button
                        style={{
                          background: "linear-gradient(135deg, #00833D, #000000)",
                          color: "white",
                          border: "none",
                          padding: "8px 20px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "15px",
                          transition: "all 0.2s ease",
                          boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
                          flex: 1,
                          ":hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 15px rgba(16, 185, 129, 0.3)",
                          },
                        }}
                        onClick={() =>
                          Navigate(`/investPlanDetail`, {
                            state: {
                              planId: plan._id,
                            },
                          })
                        }
                      >
                        Invest Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "2rem",
              }}
            >
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  opacity: page === 1 ? 0.5 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke={page === 1 ? "#64748B" : "#1E293B"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (page <= 3) {
                  pageNumber = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = page - 2 + i;
                }

                return pageNumber <= totalPages ? (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    style={{
                      padding: "0.5rem 1rem",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      background:
                        page === pageNumber
                          ? "linear-gradient(135deg, #00833D, #000000)"
                          : "#fff",
                      color: page === pageNumber ? "#fff" : "#1E293B",
                      cursor: "pointer",
                      fontWeight: page === pageNumber ? "600" : "500",
                      minWidth: "40px",
                    }}
                  >
                    {pageNumber}
                  </button>
                ) : null;
              })}

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  opacity: page === totalPages ? 0.5 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                Next
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke={page === totalPages ? "#64748B" : "#1E293B"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 40px",
            background: "#ffffff",
            borderRadius: "14px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            border: "1px solid rgba(241, 245, 249, 0.8)",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#f1f5f9",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <SearchIcon style={{ fontSize: "32px", color: "#64748b" }} />
          </div>
          <h3
            style={{
              color: "#1e293b",
              marginBottom: "16px",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            No investment plans found
          </h3>
          <p
            style={{
              color: "#64748b",
              maxWidth: "500px",
              margin: "0 auto 24px",
              lineHeight: "1.6",
            }}
          >
            Try adjusting your search criteria or selecting a different
            category
          </p>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            style={{
              background: "linear-gradient(135deg, #00833D, #000000)",
              color: "white",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              marginTop: "10px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
              ":hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 15px rgba(16, 185, 129, 0.3)",
              },
            }}
          >
            Show All Investments
          </button>
        </div>
      )}
    </div>
      </div>
    </section>
  );
};

export default Investmentplans;
