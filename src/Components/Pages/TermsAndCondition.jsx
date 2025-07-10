import axios from "axios";
import React, { useEffect, useState } from "react";

const TermsAndCondition = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getPolicyByType?type=terms`
      );
      if (response.status === 200) {
        setData(response.data.policy);
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
      setError("Failed to load terms and conditions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: "#f8fafc"
    }}>
      {/* Hero Section */}
      <section style={{
        padding: "120px 0 80px",
        background: "linear-gradient(135deg, rgb(0, 131, 61), rgb(0, 0, 0))",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "48px"
          }}>
            <div style={{
              display: "inline-block",
              position: "relative",
              marginBottom: "16px"
            }}>
              <span style={{
                display: "block",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "12px"
              }}>
                Terms & Conditions
              </span>
              <div style={{
                width: "60px",
                height: "3px",
                background: "linear-gradient(135deg, #00833D, #000000)",
                margin: "0 auto",
                borderRadius: "3px"
              }}></div>
            </div>
            <h1 style={{
              margin: "0",
              fontSize: "48px",
              fontWeight: "800",
              color: "#fff",
              lineHeight: "1.2",
              letterSpacing: "-0.025em",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              Our Terms of Service
            </h1>
            <p style={{
              fontSize: "18px",
              lineHeight: "1.6",
              color: "#fff",
              maxWidth: "700px",
              margin: "20px auto 0"
            }}>
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{
        padding: "80px 0",
        background: "#ffffff"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "60px"
          }}>
            {/* Image Section */}
            {data?.image && (
              <div style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: "translateY(0)",
                ":hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }
              }}>
                <img
                  src={`${import.meta.env.VITE_FILE_URL}${data.image}`}
                  alt="Privacy Policy"
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              </div>
            )}

            {/* Policy Content */}
            <div style={{
              color: "#4b5563",
              lineHeight: "1.8",
              fontSize: "17px"
            }}>
              {isLoading ? (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px"
                }}>
                  <div style={{
                    display: "inline-block",
                    width: "50px",
                    height: "50px",
                    border: "3px solid rgba(79, 70, 229, 0.3)",
                    borderRadius: "50%",
                    borderTopColor: "#4f46e5",
                    animation: "spin 1s ease-in-out infinite"
                  }}></div>
                </div>
              ) : error ? (
                <div style={{
                  textAlign: "center",
                  padding: "40px",
                  backgroundColor: "#fef2f2",
                  borderRadius: "8px",
                  color: "#dc2626"
                }}>
                  <p style={{ margin: "0 0 20px" }}>{error}</p>
                  <button
                    onClick={fetchData}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#4f46e5",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                      transition: "background-color 0.3s ease",
                      ":hover": {
                        backgroundColor: "#4338ca"
                      }
                    }}
                  >
                    Retry
                  </button>
                </div>
              ) : data?.content ? (
                <div
                  dangerouslySetInnerHTML={{ __html: data.content }}
                  style={{
                    "& h2": {
                      color: "#1f2937",
                      fontSize: "28px",
                      fontWeight: "600",
                      margin: "40px 0 20px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #e5e7eb"
                    },
                    "& h3": {
                      color: "#1f2937",
                      fontSize: "22px",
                      fontWeight: "600",
                      margin: "30px 0 15px"
                    },
                    "& p": {
                      margin: "0 0 20px"
                    },
                    "& ul, & ol": {
                      margin: "0 0 20px",
                      paddingLeft: "20px"
                    },
                    "& li": {
                      marginBottom: "8px"
                    },
                    "& a": {
                      color: "#4f46e5",
                      textDecoration: "none",
                      fontWeight: "500",
                      ":hover": {
                        textDecoration: "underline"
                      }
                    }
                  }}
                />
              ) : (
                <div style={{
                  textAlign: "center",
                  padding: "40px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "8px",
                  color: "#6b7280"
                }}>
                  No privacy policy content available.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated Section */}
      {data?.updatedAt && (
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto 60px",
          padding: "0 24px",
          textAlign: "right"
        }}>
          <p style={{
            color: "#94a3b8",
            fontSize: "14px",
            margin: 0
          }}>
            Last updated: {new Date(data.updatedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default TermsAndCondition;