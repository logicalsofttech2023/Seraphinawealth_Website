import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import {
  BsGraphUp,
  BsStarFill,
  BsCheck,
  BsLightningFill,
  BsPeopleFill,
  BsInfoCircle,
  BsPersonCheck,
  BsCashStack,
  BsShield,
  BsClockHistory,
  BsArrowRight,
} from "react-icons/bs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { motion } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";

const InvestPlanDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.planId;
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    amount: "",
    payoutFrequency: "monthly",
  });
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPlanData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}getInvestmentPlanById?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPlanData(response.data.data);
        setLoading(false);
        // Set default amount to minimum investment
        setPurchaseData((prev) => ({
          ...prev,
          amount: response.data.data.minAmount,
        }));
      } catch (err) {
        setError(err.message || "Failed to fetch plan details");
        setLoading(false);
      }
    };

    if (id) {
      fetchPlanData();
    } else {
      setError("No plan ID provided");
      setLoading(false);
    }
  }, [id]);

  const handlePurchase = async () => {
    if (!purchaseData.amount || purchaseData.amount < planData.minAmount) {
      setSnackbar({
        open: true,
        message: `Amount must be at least ₹${planData.minAmount.toLocaleString()}`,
        severity: "error",
      });
      return;
    }

    setIsPurchasing(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}createInvestmentPurchase`,
        {
          planId: id,
          amount: purchaseData.amount,
          payoutFrequency: purchaseData.payoutFrequency,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSnackbar({
        open: true,
        message: "Investment created successfully!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to create investment",
        severity: "error",
      });
    } finally {
      setIsPurchasing(false);
      setOpenDialog(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box
        sx={{
          padding: 4,
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton width="60%" height={40} sx={{ mt: 2 }} />
        <Skeleton width="80%" height={25} sx={{ mt: 2 }} />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} variant="rounded" width={200} height={100} />
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          padding: 4,
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          Error Loading Plan
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!planData) {
    return (
      <Box
        sx={{
          padding: 4,
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No plan data available
        </Typography>
      </Box>
    );
  }

  // Format ROI with percentage sign
  const formattedROI = `${planData.roi}%`;

  // Calculate expected returns
  const calculateReturns = () => {
    if (!purchaseData.amount) return { monthly: 0, total: 0 };
    const amount = parseFloat(purchaseData.amount);
    const monthlyReturn = (amount * (planData.roi / 100)) / 12;
    const totalReturn = monthlyReturn * planData.durationMonths;
    return {
      monthly: monthlyReturn.toFixed(2),
      total: totalReturn.toFixed(2),
    };
  };

  const returns = calculateReturns();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        py: 5,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: isMobile ? 2 : 1 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Box
            sx={{
              background: "white",
              borderRadius: 4,
              overflow: "hidden",
              mb: 4,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <Box sx={{ p: isMobile ? 3 : 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isTablet ? "column" : "row",
                  gap: 2,
                }}
              >
                {/* Left Column */}
                <Box sx={{ flex: 2 }}>
                  {/* Header */}
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                        flexDirection: isMobile ? "column" : "row",
                        textAlign: isMobile ? "center" : "left",
                        gap: isMobile ? 2 : 0,
                      }}
                    >
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          backgroundColor: "rgba(0,131,61,0.1)",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: isMobile ? 0 : 2,
                          flexShrink: 0,
                        }}
                      >
                        <BsGraphUp
                          style={{ fontSize: "32px", color: "#00833D" }}
                        />
                      </Box>

                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: isMobile
                            ? "1.8rem"
                            : isTablet
                            ? "2.2rem"
                            : "2.5rem",
                          fontWeight: 700,
                          color: "#222",
                          lineHeight: 1.2,
                        }}
                      >
                        {planData.title}
                      </Typography>

                      {planData.isPurchased && (
                        <Chip
                          icon={<CheckCircle />}
                          label="Already Invested"
                          color="success"
                          sx={{
                            zIndex: 1,
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="h5"
                      sx={{
                        opacity: 0.85,
                        mb: 4,
                        lineHeight: 1.7,
                        color: "#444",
                        fontSize: "1.1rem",
                      }}
                    >
                      {planData.description}
                    </Typography>
                  </motion.div>

                  {/* Stats */}
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        mb: 4,
                      }}
                    >
                      {[
                        {
                          title: "Expected ROI",
                          value: formattedROI,
                          sub: "per annum",
                        },
                        {
                          title: "Duration",
                          value: `${planData.durationMonths} months`,
                          sub: "fixed term",
                        },
                        {
                          title: "Risk Level",
                          value: planData.risk,
                          sub:
                            planData.risk === "Low"
                              ? "conservative"
                              : "balanced",
                        },
                        {
                          title: "Minimum Investment",
                          value: `₹${planData.minAmount.toLocaleString()}`,
                          sub: "one-time payment",
                        },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                        >
                          <Box
                            sx={{
                              flex: "1 1 200px",
                              p: 2,
                              borderRadius: 2,
                              background: "rgba(0,131,61,0.05)",
                              borderLeft: "4px solid #00833D",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                boxShadow: "0 6px 12px rgba(0, 131, 61, 0.1)",
                              },
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                fontSize: "0.95rem",
                                color: "#555",
                                fontWeight: 600,
                              }}
                            >
                              {stat.title}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 700,
                                mb: 0.5,
                                color: "#00833D",
                                fontSize: "1.5rem",
                              }}
                            >
                              {stat.value}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                opacity: 0.8,
                                color: "#666",
                                fontSize: "0.8rem",
                              }}
                            >
                              {stat.sub}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </motion.div>

                  {/* Why Invest */}
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{
                        backgroundColor: "rgba(0,131,61,0.03)",
                        borderRadius: 2,
                        p: 3,
                        mb: 4,
                        border: "1px solid rgba(0,131,61,0.15)",
                        boxShadow: "0 4px 12px rgba(0, 131, 61, 0.05)",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 3,
                          display: "flex",
                          alignItems: "center",
                          color: "#222",
                          fontWeight: 600,
                        }}
                      >
                        <BsStarFill
                          style={{ marginRight: "12px", color: "#00833D" }}
                        />
                        Why Invest in This Plan?
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                          mb: 2,
                          width: "100%",
                        }}
                      >
                        {[
                          "Guaranteed returns with no market risk",
                          `Fixed interest rate of ${formattedROI}`,
                          `Lock-in period of ${planData.durationMonths} months`,
                          "Capital protection",
                          "Ideal for conservative investors",
                          "No market volatility exposure",
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            style={{
                              width: isMobile ? "100%" : "calc(50% - 16px)",
                              minWidth: "270px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                                borderRadius: 1,
                                transition: "background-color 0.2s ease",
                                backgroundColor: "background.paper",
                                boxShadow: 1,
                                height: "100%",
                                "&:hover": {
                                  backgroundColor: "rgba(0,131,61,0.05)",
                                  boxShadow: 2,
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  minWidth: 28,
                                  height: 28,
                                  background:
                                    "linear-gradient(135deg, #00833D, #000000)",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mr: 2,
                                  flexShrink: 0,
                                }}
                              >
                                <BsCheck
                                  style={{ fontSize: "14px", color: "white" }}
                                />
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  fontSize: "0.95rem",
                                  flexGrow: 1,
                                }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          </motion.div>
                        ))}
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        mt: 4,
                      }}
                    >
                      {planData.isPurchased ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            background:
                              "linear-gradient(135deg, #00833D, #000000)",
                            color: "white",
                            padding: "14px 32px",
                            borderRadius: "12px",
                            minWidth: "200px",
                            boxShadow: "0 4px 12px rgba(0, 131, 61, 0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1rem",
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => setOpenDialog(true)}
                        >
                          <BsLightningFill
                            style={{ marginRight: "12px", color: "white" }}
                          />
                          Invest More
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            background:
                              "linear-gradient(135deg, #00833D, #000000)",
                            color: "white",
                            padding: "14px 32px",
                            borderRadius: "12px",
                            minWidth: "200px",
                            boxShadow: "0 4px 12px rgba(0, 131, 61, 0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1rem",
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => setOpenDialog(true)}
                        >
                          <BsLightningFill
                            style={{ marginRight: "12px", color: "white" }}
                          />
                          Invest Now
                        </motion.button>
                      )}
                    </Box>
                  </motion.div>
                </Box>

                {/* Right Column */}
                <Box sx={{ flex: 1 }}>
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{
                        backgroundColor: "rgba(0,131,61,0.02)",
                        borderRadius: 3,
                        p: 1,
                        height: "100%",
                        border: "1px solid rgba(0,131,61,0.1)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                      }}
                    >
                      {/* Key Details */}
                      <Box
                        sx={{
                          backgroundColor: "rgba(0,131,61,0.03)",
                          borderRadius: 2,
                          p: 1,
                          mb: 4,
                          border: "1px solid rgba(0,131,61,0.1)",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ mb: 2, fontWeight: 600, color: "black" }}
                        >
                          Plan Details
                        </Typography>
                        {[
                          {
                            label: "Minimum Investment",
                            value: `₹${planData.minAmount.toLocaleString()}`,
                          },
                          {
                            label: "Category",
                            value: planData.categoryId.name,
                          },
                          {
                            label: "Recommended For",
                            value: planData.additionalInfo,
                          },
                          { label: "Status", value: planData.status },
                        ].map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: index === 3 ? 0 : 2,
                              pb: index === 3 ? 0 : 2,
                              borderBottom:
                                index === 3
                                  ? "none"
                                  : "1px solid rgba(0,131,61,0.1)",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#555",
                                fontWeight: 500,
                              }}
                            >
                              {item.label}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: "#00833D",
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Investor Profile */}
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          <BsPeopleFill
                            style={{ marginRight: "12px", color: "black" }}
                          />
                          Investor Profile
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}
                        >
                          {[
                            { icon: BsPersonCheck, text: "All age groups" },
                            {
                              icon: BsCashStack,
                              text: "Conservative investors",
                            },
                            { icon: BsShield, text: "Capital protection" },
                            {
                              icon: BsClockHistory,
                              text: `${planData.durationMonths} month commitment`,
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: "rgba(0,131,61,0.08)",
                                  borderRadius: "20px",
                                  p: "8px 16px",
                                  fontSize: "0.85rem",
                                  display: "flex",
                                  alignItems: "center",
                                  color: "#00833D",
                                  fontWeight: 500,
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    backgroundColor: "rgba(0,131,61,0.12)",
                                  },
                                }}
                              >
                                <item.icon
                                  style={{
                                    marginRight: "8px",
                                    color: "#00833D",
                                  }}
                                />
                                {item.text}
                              </Box>
                            </motion.div>
                          ))}
                        </Box>
                      </Box>

                      {/* Expected Returns Preview */}
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          <BsGraphUp
                            style={{ marginRight: "12px", color: "#00833D" }}
                          />
                          Expected Returns
                        </Typography>
                        <Box
                          sx={{
                            backgroundColor: "rgba(0,131,61,0.05)",
                            borderRadius: 2,
                            p: 2,
                            border: "1px dashed rgba(0,131,61,0.2)",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "#555", mb: 1 }}
                          >
                            For ₹{purchaseData.amount.toLocaleString()}:
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" sx={{ color: "#555" }}>
                              Monthly:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, color: "#00833D" }}
                            >
                              ₹{returns.monthly}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="body2" sx={{ color: "#555" }}>
                              Total ({planData.durationMonths} months):
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, color: "#00833D" }}
                            >
                              ₹{returns.total}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </Box>

            {/* Footer */}
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  backgroundColor: "rgba(0,131,61,0.03)",
                  p: 3,
                  borderTop: "1px solid rgba(0,131,61,0.1)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      mb: isMobile ? 1 : 0,
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <BsInfoCircle
                      style={{ marginRight: "8px", color: "#00833D" }}
                    />
                    Investments are subject to terms and conditions. Read all
                    scheme related documents carefully.
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      fontSize: "0.8rem",
                    }}
                  >
                    Last updated:{" "}
                    {new Date(planData.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Box>

      {/* Investment Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#00833D",
            fontWeight: 600,
          }}
        >
          <BsGraphUp style={{ marginRight: "12px" }} />
          Invest in {planData.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Investment Amount (₹)"
              type="number"
              value={purchaseData.amount}
              onChange={(e) =>
                setPurchaseData({
                  ...purchaseData,
                  amount: e.target.value,
                })
              }
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <Typography sx={{ mr: 1, color: "text.secondary" }}>
                    ₹
                  </Typography>
                ),
              }}
              helperText={`Minimum investment: ₹${planData.minAmount.toLocaleString()}`}
            />

            <TextField
              select
              fullWidth
              label="Payout Frequency"
              value={purchaseData.payoutFrequency}
              onChange={(e) =>
                setPurchaseData({
                  ...purchaseData,
                  payoutFrequency: e.target.value,
                })
              }
              sx={{ mb: 3 }}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </TextField>

            <Box
              sx={{
                backgroundColor: "rgba(0,131,61,0.05)",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Investment Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2">Amount:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ₹{purchaseData.amount.toLocaleString()}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2">ROI:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formattedROI} p.a.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2">Duration:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {planData.durationMonths} months
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2">Payout:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {purchaseData.payoutFrequency}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  pt: 2,
                  borderTop: "1px dashed rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="body2">Expected Returns:</Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#00833D" }}
                >
                  ₹{returns.total} total
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: "#666", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePurchase}
            disabled={isPurchasing}
            sx={{
              background: "linear-gradient(135deg, #00833D, #000000)",
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: 2,
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            {isPurchasing ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                Processing...
              </>
            ) : (
              <>
                Confirm Investment{" "}
                <BsArrowRight style={{ marginLeft: "8px" }} />
              </>
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InvestPlanDetail;
