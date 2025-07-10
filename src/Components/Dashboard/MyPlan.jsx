import React, { useState, useEffect } from "react";
import {
  FiArrowRight,
  FiPlusCircle,
  FiCheck,
  FiRefreshCw,
} from "react-icons/fi";
import {
  BsGraphUp,
  BsClock,
  BsCashCoin,
  BsExclamationCircle,
} from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";

const MyPlan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState(null);
  const [renewing, setRenewing] = useState(false);
  const fetchUserPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getPlanByUserId`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setPlan(response.data.plan);
      } else {
        setPlan(null);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching your plan"
      );
      setPlan(null);
      console.error("Error fetching plan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserPlan();
  }, []);

  const handleRenewPlan = async () => {
    try {
      setRenewing(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}renewPlan`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchUserPlan();
        Swal.fire("Success", "Plan renewed successfully", "success");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to renew plan");
      console.error("Error renewing plan:", error);
    } finally {
      setRenewing(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getServiceCount = () => {
    if (!plan) return 0;
    return (
      (plan.freeOfferings?.length || 0) +
      (plan.individualBusinessServices?.length || 0) +
      (plan.businessServices?.length || 0) +
      (plan.institutionalServices?.length || 0)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return { bg: "#e6f7ee", text: "#10a760", border: "#10a760" };
      case "expired":
        return { bg: "#ffebee", text: "#f44336", border: "#f44336" };
      case "renewed":
        return { bg: "#e3f2fd", text: "#1976d2", border: "#1976d2" };
      default:
        return { bg: "#f5f5f5", text: "#757575", border: "#e0e0e0" };
    }
  };

  const renderNoPlanCard = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "1200px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#ffebee",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <BsExclamationCircle
              style={{ fontSize: "36px", color: "#f44336" }}
            />
          </div>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 600,
              margin: "0 0 12px 0",
              color: "#333",
            }}
          >
            No Active Plan Found
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              margin: "0 0 32px 0",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            You don't have any active subscription plan. Choose a plan to access
            our premium services.
          </p>
        </div>

        <div
          style={{
            marginTop: "32px",
            paddingTop: "32px",
            borderTop: "1px dashed #e0e0e0",
          }}
        >
          <button
            onClick={() => navigate("/agreementForm")}
            style={{
              background: "linear-gradient(135deg, #00833D, #000000)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              ":hover": {
                backgroundColor: "rgba(33, 150, 243, 0.04)",
              },
            }}
          >
            <FiPlusCircle /> Purchase Services Plan
          </button>
        </div>
      </div>
    </div>
  );

  const renderRenewButton = () => (
    <div
      style={{
        marginTop: "24px",
        paddingTop: "20px",
        borderTop: "1px dashed #e0e0e0",
        textAlign: "center",
      }}
    >
      <button
        onClick={handleRenewPlan}
        disabled={renewing}
        style={{
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          padding: "12px 28px",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)",
          ":hover": {
            backgroundColor: "#1E88E5",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 16px rgba(33, 150, 243, 0.3)",
          },
          ":disabled": {
            backgroundColor: "#90CAF9",
            cursor: "not-allowed",
            transform: "none",
            boxShadow: "none",
          },
        }}
      >
        {renewing ? (
          <>
            <FiRefreshCw
              style={{
                animation: "spin 1s linear infinite",
                fontSize: "18px",
              }}
            />
            Renewing...
          </>
        ) : (
          <>
            <FiRefreshCw style={{ fontSize: "18px" }} />
            Renew Plan
          </>
        )}
      </button>
      <p
        style={{
          fontSize: "13px",
          color: "#757575",
          marginTop: "12px",
        }}
      >
        Renew your plan to continue accessing these services without
        interruption
      </p>
    </div>
  );

  if (!plan) {
    return renderNoPlanCard();
  }

  const renderPlanDetails = () => {
    if (loading) {
      return (
        <Stack spacing={2} style={{ marginTop: "20px" }}>
          <Skeleton
            variant="rectangular"
            height={120}
            style={{ borderRadius: "12px" }}
          />
          <Skeleton
            variant="rectangular"
            height={120}
            style={{ borderRadius: "12px" }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            style={{ borderRadius: "12px" }}
          />
        </Stack>
      );
    }

    if (error) {
      return (
        <div
          style={{
            backgroundColor: "#ffebee",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#f44336",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BsExclamationCircle style={{ fontSize: "24px", color: "white" }} />
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              color: "#d32f2f",
              fontWeight: 500,
            }}
          >
            {error}
          </p>
        </div>
      );
    }

    const statusColor = getStatusColor(plan.status);
    const daysRemaining = Math.ceil(
      (new Date(plan.endDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return (
      <div style={{ marginTop: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "28px",
              borderLeft: "5px solid #00833D",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              ":hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              },
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "24px",
                fontSize: "20px",
                fontWeight: 700,
                color: "#000000",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
                  stroke="#00833D"
                  strokeWidth="2"
                />
                <path
                  d="M12 12H15"
                  stroke="#00833D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 16H15"
                  stroke="#00833D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5C15 5 13.6569 5 12 5C10.3431 5 9 5 9 5Z"
                  stroke="#00833D"
                  strokeWidth="2"
                />
                <rect x="9" y="12" width="1" height="1" fill="#00833D" />
                <rect x="9" y="16" width="1" height="1" fill="#00833D" />
              </svg>
              Plan Summary
            </h3>

            <div style={{ marginBottom: "20px" }}>
              {[
                { label: "Plan Type", value: plan.serviceChoice },
                { label: "Delivery", value: plan.deliveryPreference },
                { label: "Total Services", value: getServiceCount() },
                {
                  label: "Total Price",
                  value: `₹${plan.totalPrice?.toLocaleString("en-IN") || "0"}`,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                    paddingBottom: "16px",
                    borderBottom: index < 3 ? "1px solid #f0f0f0" : "none",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#5f6368",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#000000",
                      fontSize: "15px",
                      backgroundColor: index === 3 ? "#E8F0FE" : "transparent",
                      padding: index === 3 ? "6px 12px" : "0",
                      borderRadius: index === 3 ? "20px" : "0",
                      // color: index === 3 ? "#00833D" : "#000000",
                    }}
                  >
                    {typeof item.value === "string"
                      ? item.value.charAt(0).toUpperCase() + item.value.slice(1)
                      : item.value}
                  </span>
                </div>
              ))}
            </div>

            {plan.status === "expired" && (
              <div style={{ marginTop: "24px" }}>{renderRenewButton()}</div>
            )}
          </div>

          {plan.serviceChoice !== "free" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                padding: "28px",
                borderLeft: "5px solid #00833D",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s ease",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "24px",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="#00833D"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Plan Validity
              </h3>

              <div style={{ marginBottom: "8px" }}>
                {[
                  {
                    label: "Start Date",
                    value: formatDate(plan.startDate),
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="#00833D"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "End Date",
                    value: formatDate(plan.endDate),
                    icon: (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="#F44336"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "Status",
                    value:
                      plan.status?.charAt(0).toUpperCase() +
                      plan.status?.slice(1),
                    isStatus: true,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      paddingBottom: "20px",
                      borderBottom: index < 2 ? "1px solid #f0f0f0" : "none",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#616161",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {item.icon && item.icon}
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontWeight: item.isStatus ? 600 : 500,
                        color: item.isStatus ? statusColor.text : "#000000",
                        backgroundColor: item.isStatus
                          ? statusColor.bg
                          : "transparent",
                        padding: item.isStatus ? "6px 14px" : "0",
                        borderRadius: item.isStatus ? "20px" : "0",
                        border: item.isStatus
                          ? `1px solid ${statusColor.border}`
                          : "none",
                        fontSize: item.isStatus ? "13px" : "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {item.value}
                      {index === 1 && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 3V5M15 3V5M9 19V21M15 19V21M5 9H3M5 15H3M21 9H19M21 15H19M7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19Z"
                            stroke="#616161"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "28px",
              borderLeft: "5px solid #00833D",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              ":hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "24px",
                fontSize: "20px",
                fontWeight: 700,
                color: "#000000",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                position: "relative",
                paddingBottom: "12px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                  stroke="#00833D"
                  strokeWidth="2"
                />
                <path
                  d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                  stroke="#00833D"
                  strokeWidth="2"
                />
              </svg>
              Included Services
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "50px",
                  height: "3px",
                  backgroundColor: "#00833D",
                  borderRadius: "3px",
                }}
              ></span>
            </h3>

            <div
              style={{
                maxHeight: "320px",
                overflowY: "auto",
                paddingRight: "8px",
                scrollbarWidth: "thin",
                scrollbarColor: "#00833D transparent",
                "::-webkit-scrollbar": {
                  width: "6px",
                },
                "::-webkit-scrollbar-thumb": {
                  backgroundColor: "#00833D",
                  borderRadius: "10px",
                },
                "::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {[
                {
                  title: "Individual Business Services",
                  services: plan.individualBusinessServices,
                  color: "#00833D",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="#00833D"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="#00833D"
                        strokeWidth="2"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Business Services",
                  services: plan.businessServices,
                  color: "#00833D",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H5M19 21H21M5 21H3M9 7H15M9 11H15M9 15H15"
                        stroke="#00833D"
                        strokeWidth="2"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Institutional Services",
                  services: plan.institutionalServices,
                  color: "#00833D",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H5M19 21H21M5 21H3M12 7H15M12 11H15M12 15H15M9 7H9.01M9 11H9.01M9 15H9.01"
                        stroke="#00833D"
                        strokeWidth="2"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Free Offerings",
                  services: plan.freeOfferings,
                  color: "#00833D",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="#00833D"
                        strokeWidth="2"
                      />
                      <path
                        d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772V11L19.6224 10.3954Z"
                        stroke="#00833D"
                        strokeWidth="2"
                      />
                    </svg>
                  ),
                },
              ].map(
                (section) =>
                  section.services?.length > 0 && (
                    <ServiceSection
                      key={section.title}
                      title={section.title}
                      services={section.services}
                      color={section.color}
                      icon={section.icon}
                    />
                  )
              )}
            </div>
          </div>
        </div>

        {plan.serviceChoice !== "free" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <StatCard
              icon={<BsGraphUp size={24} />}
              title="Services Used"
              value={getServiceCount()}
              color="#00833D"
            />
            <StatCard
              icon={<BsClock size={24} />}
              title="Days Remaining"
              value={daysRemaining > 0 ? daysRemaining : 0}
              color={
                daysRemaining > 30
                  ? "#00833D"
                  : daysRemaining > 7
                  ? "#00833D"
                  : "#00833D"
              }
            />
            <StatCard
              icon={<BsCashCoin size={24} />}
              title="Total Value"
              value={`₹${plan.totalPrice?.toLocaleString("en-IN") || "0"}`}
              color="#00833D"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        flexGrow: 1,
        padding: "24px",
        backgroundColor: "#fff", // white background
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        marginTop: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            margin: 0,
            color: "#00833D", // green heading
          }}
        >
          My Subscription Plan
        </h2>
      </div>
      <div style={{ color: "#000000" }}>{renderPlanDetails()}</div>
    </div>
  );
};

const ServiceSection = ({ title, services, color }) => (
  <div style={{ marginBottom: "16px" }}>
    <h4
      style={{
        fontSize: "15px",
        fontWeight: 600,
        margin: "0 0 12px 0",
        color,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: color,
          borderRadius: "2px",
          marginRight: "10px",
        }}
      />
      {title}
    </h4>
    <ul
      style={{
        listStyleType: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {services.map((service) => (
        <li
          key={service._id}
          style={{
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            padding: "6px 0",
          }}
        >
          <FiArrowRight
            style={{
              color,
              marginRight: "10px",
              fontSize: "14px",
            }}
          />
          {service.name}
        </li>
      ))}
    </ul>
  </div>
);

const StatCard = ({ icon, title, value, color }) => (
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "20px",
      borderLeft: `4px solid ${color}`,
      display: "flex",
      alignItems: "center",
      gap: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    }}
  >
    <div
      style={{
        width: "48px",
        height: "48px",
        backgroundColor: `${color}20`,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {React.cloneElement(icon, { color })}
    </div>
    <div>
      <div
        style={{
          fontSize: "13px",
          color: "#757575",
          marginBottom: "4px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "22px",
          fontWeight: 600,
          color,
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

export default MyPlan;
