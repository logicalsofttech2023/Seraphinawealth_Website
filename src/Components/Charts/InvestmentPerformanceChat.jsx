import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  useMediaQuery,
  useTheme,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import {
  Savings as SavingsIcon,
  CalendarToday as CalendarIcon,
  Paid as PaidIcon,
  WorkspacePremium as WorkspacePremiumIcon,
} from "@mui/icons-material";

const InvestmentPerformanceChart = () => {
  const [chartData, setChartData] = useState([]);
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const [chartResponse, planResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}getUserGrowthChart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}getPlanByUserId`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }),
      ]);

      if (chartResponse.status === 200) {
        let chartData = chartResponse.data.data;

        const hasNonFreePlan = chartData.some(
          (plan) => plan.serviceChoice !== "free"
        );

        // Filter based on your rule
        if (hasNonFreePlan) {
          chartData = chartData.filter(
            (plan) => plan.serviceChoice !== "free"
          );
        }

        // Process all charts
        const processedData = chartData.map((planChart) => ({
          ...planChart,
          chart: planChart.chart.map((item) => ({
            ...item,
            date: new Date(item.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          })),
        }));

        setChartData(processedData);
      }

      if (planResponse.status === 200) {
        setPlanData(planResponse.data.plans);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getChartOptions = (data) => {
    return {
      chart: {
        type: "area",
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: data.map((d) => d.label),
        labels: {
          rotate: -45,
          style: {
            fontSize: isMobile ? "10px" : "12px",
          },
        },
        title: {
          text: "Duration Period",
          style: {
            fontWeight: 600,
            color: theme.palette.mode === "dark" ? "#fff" : "#2c3e50",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => `₹${val.toLocaleString("en-IN")}`,
          style: {
            fontSize: isMobile ? "10px" : "12px",
          },
        },
        title: {
          text: "Amount (₹)",
          style: {
            fontWeight: 600,
            color: theme.palette.mode === "dark" ? "#fff" : "#2c3e50",
          },
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `₹${val.toLocaleString("en-IN")}`,
        },
      },
      colors: [theme.palette.mode === "dark" ? "#00C853" : "#00833D"],
      grid: {
        borderColor: theme.palette.mode === "dark" ? "#444" : "#e5e5e5",
      },
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="container-fluid p-0">
        <div className="row g-3">
          <div className="col-12 col-lg-12">
            <Card
              className="h-100"
              style={{ borderRadius: "12px", minHeight: "400px" }}
            >
              <CardContent>
                <Skeleton
                  variant="text"
                  width="60%"
                  height={40}
                  style={{ marginBottom: "16px" }}
                />
                <Skeleton variant="rectangular" height={300} />
              </CardContent>
            </Card>
          </div>
          <div className="col-12 col-lg-12">
            <Card
              className="h-100"
              style={{ borderRadius: "12px", minHeight: "400px" }}
            >
              <CardContent>
                <Skeleton
                  variant="text"
                  width="50%"
                  height={40}
                  style={{ marginBottom: "16px" }}
                />
                <Skeleton variant="rectangular" height={300} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mt-3" style={{ borderRadius: "12px" }}>
        <CardContent className="text-center py-4">
          <Typography color="error" variant="h6" gutterBottom>
            Error
          </Typography>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="row g-3">
        {/* Investment Growth Chart */}
        <div className="col-12 col-lg-12">
          <Card
            className="h-100 d-flex flex-column"
            style={{
              borderRadius: "12px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #00833D, #000000)"
                  : "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent className="flex-grow-1 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <Avatar
                  style={{
                    background: "linear-gradient(135deg, #00833D, #000000)",
                    marginRight: "16px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <SavingsIcon />
                </Avatar>
                <Typography
                  variant="h5"
                  className="mb-0"
                  style={{
                    fontWeight: 600,
                    color: "#00833D",
                  }}
                >
                  Example Growth Over Time
                </Typography>
              </div>

              {chartData.length > 0 && (
                <Box
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    mb: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="investment plan tabs"
                    sx={{
                      "& .MuiTab-root": {
                        fontSize: isMobile ? "0.7rem" : "0.875rem",
                        minWidth: "unset",
                        padding: isMobile ? "6px 8px" : "12px 16px",
                      },
                      "& .MuiTabs-scrollButtons": {
                        width: "32px",
                        "&.Mui-disabled": {
                          opacity: 0.3,
                        },
                      },
                    }}
                  >
                    {chartData.map((plan, index) => (
                      <Tab
                        key={plan.planId}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {isMobile && (
                              <Avatar
                                sx={{
                                  width: 24,
                                  height: 24,
                                  mr: 1,
                                  bgcolor:
                                    index === activeTab
                                      ? "#00833D"
                                      : "action.selected",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {index + 1}
                              </Avatar>
                            )}
                            <span>
                              {isMobile
                                ? `${plan.serviceChoice.slice(0, 3)}`
                                : `Plan ${index + 1} (${plan.serviceChoice})`}
                            </span>
                          </Box>
                        }
                        sx={{
                          textTransform: "none",
                          fontWeight: index === activeTab ? 600 : 400,
                        }}
                      />
                    ))}
                  </Tabs>
                </Box>
              )}

              <div
                style={{
                  height: isMobile ? "300px" : isTablet ? "350px" : "400px",
                  flex: 1,
                }}
              >
                {chartData.length > 0 ? (
                  <>
                    {chartData.map((plan, index) => (
                      <div
                        key={plan.planId}
                        style={{
                          display: index === activeTab ? "block" : "none",
                        }}
                      >
                        <ApexCharts
                          options={getChartOptions(plan.chart)}
                          series={[
                            {
                              name: "Investment Value",
                              data: plan.chart.map((d) => d.amount),
                            },
                          ]}
                          type="area"
                          height={isMobile ? 300 : isTablet ? 350 : 400}
                        />
                        <Box mt={2} textAlign="center">
                          <Typography variant="body2" color="textSecondary">
                            Plan started on {formatDate(plan.createdAt)}
                          </Typography>
                        </Box>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <Typography color="text.secondary">
                      No investment data available yet.
                    </Typography>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plan Details */}
        <div className="col-12 col-lg-12">
          <Card
            className="h-100 d-flex flex-column"
            style={{
              borderRadius: "12px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #00833D, #000000)"
                  : "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent className="flex-grow-1 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <Avatar
                  style={{
                    background: "linear-gradient(135deg, #00833d, #000000)",
                    marginRight: "16px",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <WorkspacePremiumIcon />
                </Avatar>
                <Typography
                  variant="h5"
                  className="mb-0"
                  style={{
                    fontWeight: 600,
                    color: "#00833D",
                  }}
                >
                  Your Financial Plans
                </Typography>
              </div>

              {planData?.length > 0 ? (
                planData.map((plan, planIndex) => (
                  <Paper
                    key={plan._id}
                    elevation={0}
                    className="mb-4 p-3"
                    style={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(0,0,0,0.2)"
                          : "rgba(0,0,0,0.03)",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        fontWeight: 600,
                        marginBottom: "8px",
                        color: "#00833D",
                        fontSize: isMobile ? "1.2rem" : "1rem",
                      }}
                    >
                      Plan #{planIndex + 1} ({plan.serviceChoice})
                    </Typography>

                    <div className="row">
                      <div className="col-6 mb-3">
                        <div className="d-flex align-items-center">
                          <CalendarIcon
                            style={{ marginRight: "8px", color: "#00833D" }}
                          />
                          <div>
                            <Typography variant="caption" color="textSecondary">
                              Start Date
                            </Typography>
                            <Typography variant="body2">
                              {formatDate(plan.startDate)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <div className="d-flex align-items-center">
                          <CalendarIcon
                            style={{ marginRight: "8px", color: "#00833D" }}
                          />
                          <div>
                            <Typography variant="caption" color="textSecondary">
                              End Date
                            </Typography>
                            <Typography variant="body2">
                              {formatDate(plan.endDate)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-2">
                        <div className="d-flex align-items-center">
                          <PaidIcon
                            style={{ marginRight: "8px", color: "#00833D" }}
                          />
                          <div>
                            <Typography variant="caption" color="textSecondary">
                              Total Plan Value
                            </Typography>
                            <Typography
                              variant="h5"
                              style={{ color: "#00833D" }}
                            >
                              {formatCurrency(plan.totalPrice)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Chip
                        label={plan.status?.toUpperCase() || "UNKNOWN"}
                        color={plan.status === "active" ? "success" : "default"}
                        size="small"
                        style={{
                          fontWeight: 600,
                          marginRight: "8px",
                          background:
                            "linear-gradient(135deg, #00833d, #000000)",
                        }}
                      />
                      <Chip
                        label={plan.serviceChoice}
                        color="info"
                        size="small"
                        style={{
                          fontWeight: 600,
                          marginRight: "8px",
                          background:
                            "linear-gradient(135deg, #00833d, #000000)",
                        }}
                      />
                      <Chip
                        label={plan.deliveryPreference}
                        color="secondary"
                        size="small"
                        style={{
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #00833d, #000000)",
                        }}
                      />
                    </div>

                    <Typography
                      variant="subtitle1"
                      className="mt-3"
                      style={{ fontWeight: 600, color: "#00833D" }}
                    >
                      Included Services
                    </Typography>
                    <List
                      dense
                      style={{
                        maxHeight: isMobile ? "200px" : "250px",
                        overflow: "auto",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#00833D #eee",
                      }}
                    >
                      {(plan.individualBusinessServices || []).map(
                        (service, idx) => (
                          <React.Fragment key={service._id}>
                            <ListItem className="px-0">
                              <ListItemText primary={service.name} />
                            </ListItem>
                            {idx <
                              plan.individualBusinessServices.length - 1 && (
                              <Divider />
                            )}
                          </React.Fragment>
                        )
                      )}
                      {(plan.businessServices || []).map((service, idx) => (
                        <React.Fragment key={service._id}>
                          <ListItem className="px-0">
                            <ListItemText primary={service.name} />
                          </ListItem>
                          {idx < plan.businessServices.length - 1 && (
                            <Divider />
                          )}
                        </React.Fragment>
                      ))}
                      {(plan.institutionalServices || []).map(
                        (service, idx) => (
                          <React.Fragment key={service._id}>
                            <ListItem className="px-0">
                              <ListItemText primary={service.name} />
                            </ListItem>
                            {idx < plan.institutionalServices.length - 1 && (
                              <Divider />
                            )}
                          </React.Fragment>
                        )
                      )}
                    </List>
                  </Paper>
                ))
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <Typography color="text.secondary">
                    No active plans found.
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPerformanceChart;
