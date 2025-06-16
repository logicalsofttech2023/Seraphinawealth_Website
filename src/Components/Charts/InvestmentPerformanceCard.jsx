import { LineChart } from "@mui/x-charts/LineChart";
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

// Updated color scheme for better visibility
const colors = {
  primaryColor: "#6b91fc",
  backgroundColor: "#0d0c11",
  containerColor: "#1b1e2d",
  textPrimary: "#ffffff",
  textSecondary: "#ffffff", // Brighter than before for better readability
  unselectedTabColor: "#a0a1a6",
  profitColor: "#4caf50",
  lossColor: "#f44336",
  dividerColor: "rgba(255, 255, 255, 0.12)",
};

const InvestmentPerformanceCard = () => {
  const [timeRange, setTimeRange] = useState("30days");

  // Sample data
  const portfolioData = {
    currentValue: 12500,
    totalInvestment: 10000,
    profitPercent: 25,
    profitAmount: 2500,
    graphData: {
      "30days": Array.from(
        { length: 30 },
        (_, i) => Math.random() * 500 + 12000
      ),
      "6months": Array.from(
        { length: 6 },
        (_, i) => Math.random() * 2000 + 10500
      ),
      "1year": Array.from(
        { length: 12 },
        (_, i) => Math.random() * 3000 + 9500
      ),
    },
    xAxis: {
      "30days": Array.from({ length: 30 }, (_, i) => i + 1),
      "6months": Array.from({ length: 6 }, (_, i) => `M${i + 1}`),
      "1year": Array.from({ length: 12 }, (_, i) => `M${i + 1}`),
    },
  };

  const isProfit = portfolioData.profitPercent >= 0;
  const currentGraphData = portfolioData.graphData[timeRange];
  const currentXAxis = portfolioData.xAxis[timeRange];

  return (
     <Card
      sx={{
        backgroundColor: colors.containerColor,
        color: colors.textPrimary,
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <div className="row">
          {/* Stats Section */}
          <div className="col-md-6 col-12 mb-4">
            <Stack spacing={3} height="100%">
              <Typography variant="h5" color={colors.textPrimary} fontWeight="bold">
                Portfolio Summary
              </Typography>

              <Box>
                <Typography variant="body2" color={colors.textSecondary}>
                  Current Value
                </Typography>
                <Typography variant="h4" color={colors.textPrimary} fontWeight="bold">
                  ${portfolioData.currentValue.toLocaleString()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color={colors.textSecondary}>
                  Total Investment
                </Typography>
                <Typography variant="h6" color={colors.textPrimary}>
                  ${portfolioData.totalInvestment.toLocaleString()}
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
                    (${Math.abs(portfolioData.profitAmount).toLocaleString()})
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
                  margin={{ top: 20, bottom: 20 }}
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
