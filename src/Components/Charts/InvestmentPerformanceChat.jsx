import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
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
} from "@mui/material";
import axios from "axios";
import {
  Savings as SavingsIcon,
  CalendarToday as CalendarIcon,
  Paid as PaidIcon,
  Checklist as ChecklistIcon,
  WorkspacePremium as WorkspacePremiumIcon,
} from "@mui/icons-material";
import ApexCharts from "react-apexcharts";

const InvestmentPerformanceChart = () => {
  const [chartData, setChartData] = useState([]);
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          const formattedData = chartResponse.data.data.map((item, index) => ({
            label: item.label,
            amount: item.amount,
            date: new Date(item.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          }));
          setChartData(formattedData);
        }

        if (planResponse.status === 200 && planResponse.data.plan) {
          setPlanData(planResponse.data.plan);
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

  const options = {
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
      categories: chartData.map((d) => d.label),
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

  const series = [
    {
      name: "Investment Value",
      data: chartData.map((d) => d.amount),
    },
  ];

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
                  Investment Growth Over Time
                </Typography>
              </div>

              <div
                style={{
                  height: isMobile ? "300px" : isTablet ? "350px" : "400px",
                  flex: 1,
                }}
              >
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <CircularProgress />
                  </div>
                ) : chartData.length > 0 ? (
                  <ApexCharts
                    options={options}
                    series={series}
                    type="area"
                    height={isMobile ? 300 : isTablet ? 350 : 400}
                  />
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
                  Your Financial Plan
                </Typography>
              </div>

              {planData ? (
                <>
                  <Paper
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
                    <div className="row">
                      <div className="col-6 mb-3">
                        <div className="d-flex align-items-center">
                          <CalendarIcon
                            style={{
                              marginRight: "8px",
                              color:
                                theme.palette.mode === "dark"
                                  ? "#00C853"
                                  : "#00833D",
                            }}
                          />
                          <div>
                            <Typography
                              variant="caption"
                              style={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.7)"
                                    : "text.secondary",
                              }}
                            >
                              Start Date
                            </Typography>
                            <Typography
                              variant="body2"
                              className="d-block"
                              style={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#fff"
                                    : "inherit",
                              }}
                            >
                              {formatDate(planData.startDate)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <div className="d-flex align-items-center">
                          <CalendarIcon
                            style={{
                              marginRight: "8px",
                              color:
                                theme.palette.mode === "dark"
                                  ? "#00C853"
                                  : "#00833D",
                            }}
                          />
                          <div>
                            <Typography
                              variant="caption"
                              style={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.7)"
                                    : "text.secondary",
                              }}
                            >
                              End Date
                            </Typography>
                            <Typography
                              variant="body2"
                              className="d-block"
                              style={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#fff"
                                    : "inherit",
                              }}
                            >
                              {formatDate(planData.endDate)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-2">
                        <div className="d-flex align-items-center">
                          <PaidIcon
                            style={{
                              marginRight: "8px",
                              color:
                                theme.palette.mode === "dark"
                                  ? "#00C853"
                                  : "#00833D",
                            }}
                          />
                          <div>
                            <Typography
                              variant="caption"
                              style={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.7)"
                                    : "text.secondary",
                              }}
                            >
                              Total Plan Value
                            </Typography>
                            <Typography
                              variant="h5"
                              className="d-block"
                              style={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#00C853"
                                    : "#00833D",
                              }}
                            >
                              {formatCurrency(planData.totalPrice)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Chip
                        label={planData.status.toUpperCase()}
                        color={
                          planData.status === "active" ? "success" : "default"
                        }
                        size="small"
                        style={{
                          fontWeight: 600,
                          marginRight: "8px",
                          background:
                            "linear-gradient(135deg, #00833d, #000000)",
                        }}
                      />
                      <Chip
                        label={planData.serviceChoice}
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
                        label={planData.deliveryPreference}
                        color="secondary"
                        size="small"
                        style={{
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #00833d, #000000)",
                        }}
                      />
                    </div>
                  </Paper>

                  <Typography
                    variant="h5"
                    className="mb-2 d-flex align-items-center"
                    style={{
                      fontWeight: 600,
                      color: "#00833D",
                    }}
                  >
                    <ChecklistIcon
                      style={{
                        marginRight: "8px",
                        color: "#00833D",
                      }}
                    />
                    Included Services
                  </Typography>

                  <List
                    dense
                    className="flex-grow-1"
                    style={{
                      maxHeight: isMobile ? "200px" : "250px",
                      overflow: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: `${
                        theme.palette.mode === "dark"
                          ? "#00833D #000"
                          : "#00833D #eee"
                      }`,
                    }}
                  >
                    {planData.individualBusinessServices.map(
                      (service, index) => (
                        <React.Fragment key={service._id}>
                          <ListItem className="px-0">
                            <ListItemText
                              primary={service.name}
                              primaryTypographyProps={{
                                variant: "body2",
                                style: {
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#fff"
                                      : "inherit",
                                },
                              }}
                            />
                          </ListItem>
                          {index <
                            planData.individualBusinessServices.length - 1 && (
                            <Divider
                              component="li"
                              style={{
                                margin: "4px 0",
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.1)"
                                    : undefined,
                              }}
                            />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </List>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <Typography color="text.secondary">
                    No active plan found.
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
