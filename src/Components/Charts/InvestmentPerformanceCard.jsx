import { LineChart } from "@mui/x-charts/LineChart";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import axios from "axios";

// Updated color scheme for better visibility
const colors = {
  primaryColor: "#6b91fc",
  backgroundColor: "#0d0c11",
  containerColor: "linear-gradient(135deg, #00833D, #000000)",
  textPrimary: "#ffffff",
  textSecondary: "#ffffff",
  unselectedTabColor: "#a0a1a6",
  profitColor: "#4caf50",
  lossColor: "#f44336",
  dividerColor: "rgba(255, 255, 255, 0.12)",
};

const InvestmentPerformanceCard = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}getInvestmentPerformance`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const apiData = response.data.data;
        
        // Transform API data to match our component structure
        const transformedData = {
          currentValue: apiData.currentValue,
          totalInvestment: apiData.totalInvestment,
          profitPercent: apiData.profitPercent,
          profitAmount: apiData.profitAmount,
          graphData: {
            "30days": apiData.graphData,
            "6months": Array.from(
              { length: 6 },
              (_, i) => apiData.currentValue * (0.95 + Math.random() * 0.1)
            ),
            "1year": Array.from(
              { length: 12 },
              (_, i) => apiData.currentValue * (0.9 + Math.random() * 0.2)
            ),
          },
          xAxis: {
            "30days": apiData.xAxis,
            "6months": getMonthNames(6),
            "1year": getMonthNames(12),
          },
        };

        setPortfolioData(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch performance data");
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  // Function to get month names
  const getMonthNames = (count) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return Array.from({ length: count }, (_, i) => {
      const monthsBack = count - 1 - i;
      const date = new Date(currentYear, currentMonth - monthsBack, 1);
      
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      return `${months[monthIndex]} '${year.toString().slice(-2)}`;
    }).reverse();
  };

  if (loading) {
    return (
      <Card
        sx={{
          background: colors.containerColor,
          color: colors.textPrimary,
          borderRadius: "12px",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: colors.textPrimary }} />
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        sx={{
          background: colors.containerColor,
          color: colors.textPrimary,
          borderRadius: "12px",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Card>
    );
  }

  if (!portfolioData) {
    return (
      <Card
        sx={{
          background: colors.containerColor,
          color: colors.textPrimary,
          borderRadius: "12px",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>No performance data available</Typography>
      </Card>
    );
  }

  const isProfit = portfolioData.profitPercent >= 0;
  const currentGraphData = portfolioData.graphData[timeRange];
  const currentXAxis = portfolioData.xAxis[timeRange];

  return (
    <Card
      sx={{
        background: colors.containerColor,
        color: colors.textPrimary,
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <div className="row">
          {/* Stats Section */}
          <div className="col-md-6 col-12 mb-4">
            <Stack spacing={3} height="100%">
              <Typography
                variant="h5"
                sx={{
                  color: `${colors.textPrimary} !important`,
                  fontWeight: `bold !important`,
                }}
              >
                Portfolio Summary
              </Typography>

              <Box>
                <Typography variant="body2" color={colors.textSecondary}>
                  Current Value
                </Typography>
                <Typography
                  variant="h4"
                  color={colors.textPrimary}
                  fontWeight="bold"
                >
                  ₹{portfolioData.currentValue.toLocaleString()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color={colors.textSecondary}>
                  Total Investment
                </Typography>
                <Typography variant="h6" color={colors.textPrimary}>
                  ₹{portfolioData.totalInvestment.toLocaleString()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color={colors.textSecondary}>
                  Profit/Loss
                </Typography>
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color={isProfit ? colors.profitColor : colors.lossColor}
                  >
                    {isProfit ? "+" : ""}
                    {portfolioData.profitPercent}%
                  </Typography>
                  {isProfit ? (
                    <ArrowUpward sx={{ color: colors.profitColor }} />
                  ) : (
                    <ArrowDownward sx={{ color: colors.lossColor }} />
                  )}
                  <Typography variant="body1" color={colors.textPrimary}>
                    (₹{Math.abs(portfolioData.profitAmount).toLocaleString()})
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </div>

          {/* Chart Section */}
          <div className="col-md-6 col-12">
            <Box height="100%" display="flex" flexDirection="column">
              <Box flexGrow={1} sx={{ minHeight: { xs: 200, md: "auto" } }}>
                <LineChart
                  xAxis={[
                    {
                      data: currentXAxis,
                      scaleType: timeRange === "30days" ? "linear" : "band",
                      tickLabelStyle: {
                        fill: colors.textPrimary,
                        fontSize: 10,
                      },
                    },
                  ]}
                  series={[
                    {
                      data: currentGraphData,
                      showMark: false,
                      color: isProfit ? colors.profitColor : colors.lossColor,
                    },
                  ]}
                  height={200}
                  margin={{ top: 20, bottom: 30 }}
                  sx={{
                    "& .MuiChartsAxis-line, .MuiChartsAxis-tick": {
                      stroke: "#fff !important",
                    },
                    "& .MuiChartsAxis-tickLabel": {
                      fill: "#fff !important",
                    },
                    "& .MuiLineElement-root": {
                      strokeWidth: 2,
                    },
                  }}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                />
              </Box>

              <ButtonGroup size="small" fullWidth sx={{ mt: 2 }}>
                <Button
                  onClick={() => setTimeRange("30days")}
                  sx={{
                    color:
                      timeRange === "30days"
                        ? colors.primaryColor
                        : colors.unselectedTabColor,
                    borderColor: colors.dividerColor,
                    "&:hover": {
                      borderColor: colors.primaryColor,
                    },
                  }}
                >
                  1M
                </Button>
                <Button
                  onClick={() => setTimeRange("6months")}
                  sx={{
                    color:
                      timeRange === "6months"
                        ? colors.primaryColor
                        : colors.unselectedTabColor,
                    borderColor: colors.dividerColor,
                    "&:hover": {
                      borderColor: colors.primaryColor,
                    },
                  }}
                >
                  6M
                </Button>
                <Button
                  onClick={() => setTimeRange("1year")}
                  sx={{
                    color:
                      timeRange === "1year"
                        ? colors.primaryColor
                        : colors.unselectedTabColor,
                    borderColor: colors.dividerColor,
                    "&:hover": {
                      borderColor: colors.primaryColor,
                    },
                  }}
                >
                  1Y
                </Button>
              </ButtonGroup>
            </Box>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentPerformanceCard;