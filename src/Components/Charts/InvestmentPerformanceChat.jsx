import { LineChart } from '@mui/x-charts/LineChart';
import React, { useState } from "react";
import { 
  Box, 
  Button, 
  ButtonGroup, 
  Dialog, 
  DialogContent, 
  IconButton, 
  Paper, 
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";

// Custom colors based on your specifications
const colors = {
  primaryColor: '#6b91fc',
  backgroundColor: '#0d0c11',
  containerColor: '#1b1e2d',
  textColor: '#ffffff',
  unselectedTabColor: '#ffffff'
};

const InvestmentPerformanceChart = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [fullscreen, setFullscreen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample data for different time ranges
  const data = {
    "30days": {
      xAxis: Array.from({ length: 30 }, (_, i) => i + 1),
      series: Array.from({ length: 30 }, () => Math.random() * 10 - 5)
    },
    "6months": {
      xAxis: Array.from({ length: 6 }, (_, i) => `M${i + 1}`), // Shortened for mobile
      series: Array.from({ length: 6 }, () => Math.random() * 20 - 10)
    },
    "1year": {
      xAxis: Array.from({ length: 12 }, (_, i) => `M${i + 1}`),
      series: Array.from({ length: 12 }, () => Math.random() * 30 - 15)
    }
  };

  const currentData = data[timeRange];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        position: 'relative',
        backgroundColor: colors.containerColor,
        color: colors.textColor,
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexDirection={isMobile ? 'column' : 'row'}>
        <Typography variant="h6" component="h2" sx={{ color: colors.textColor, mb: isMobile ? 1 : 0 }}>
          Investment Performance
        </Typography>
        <Box display="flex" alignItems="center" mt={isMobile ? 1 : 0}>
          <ButtonGroup 
            size="small" 
            sx={{ mr: isMobile ? 0 : 2 }}
            orientation={isMobile ? "vertical" : "horizontal"}
            fullWidth={isMobile}
          >
            <Button 
              variant={timeRange === "30days" ? "contained" : "outlined"}
              onClick={() => setTimeRange("30days")}
              sx={{
                backgroundColor: timeRange === "30days" ? colors.primaryColor : 'transparent',
                color: timeRange === "30days" ? colors.textColor : colors.unselectedTabColor,
                borderColor: colors.unselectedTabColor,
                '&:hover': {
                  borderColor: colors.primaryColor,
                  color: colors.textColor
                },
                fontSize: isMobile ? '0.75rem' : 'inherit'
              }}
            >
              {isMobile ? '30D' : 'Last 30 Days'}
            </Button>
            <Button 
              variant={timeRange === "6months" ? "contained" : "outlined"}
              onClick={() => setTimeRange("6months")}
              sx={{
                backgroundColor: timeRange === "6months" ? colors.primaryColor : 'transparent',
                color: timeRange === "6months" ? colors.textColor : colors.unselectedTabColor,
                borderColor: colors.unselectedTabColor,
                '&:hover': {
                  borderColor: colors.primaryColor,
                  color: colors.textColor
                },
                fontSize: isMobile ? '0.75rem' : 'inherit'
              }}
            >
              {isMobile ? '6M' : 'Last 6 Months'}
            </Button>
            <Button 
              variant={timeRange === "1year" ? "contained" : "outlined"}
              onClick={() => setTimeRange("1year")}
              sx={{
                backgroundColor: timeRange === "1year" ? colors.primaryColor : 'transparent',
                color: timeRange === "1year" ? colors.textColor : colors.unselectedTabColor,
                borderColor: colors.unselectedTabColor,
                '&:hover': {
                  borderColor: colors.primaryColor,
                  color: colors.textColor
                },
                fontSize: isMobile ? '0.75rem' : 'inherit'
              }}
            >
              {isMobile ? '1Y' : 'Last Year'}
            </Button>
          </ButtonGroup>
          
          {!isMobile && (
            <IconButton 
              onClick={() => setFullscreen(!fullscreen)}
              sx={{ color: colors.primaryColor }}
              aria-label={fullscreen ? "Exit fullscreen" : "View fullscreen"}
            >
              {fullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          )}
        </Box>
      </Box>

      <Box height={isMobile ? 250 : 300}>
        <LineChart
          colors={[colors.primaryColor]}
          xAxis={[{ 
            data: currentData.xAxis,
            label: timeRange === "30days" ? "Day" : timeRange === "6months" ? "Month" : "Month",
            scaleType: timeRange === "30days" ? "linear" : "band",
            tickLabelStyle: { 
              fill: colors.textColor,
              fontSize: isMobile ? 10 : 12 
            },
            labelStyle: { 
              fill: colors.textColor,
              fontSize: isMobile ? 12 : 14
            }
          }]}
          yAxis={[{ 
            tickLabelStyle: { 
              fill: colors.textColor,
              fontSize: isMobile ? 10 : 12 
            },
            labelStyle: { 
              fill: colors.textColor,
              fontSize: isMobile ? 12 : 14
            }
          }]}
          series={[
            {
              data: currentData.series,
              area: true,
              showMark: isMobile ? false : true, // Hide marks on mobile for cleaner look
              color: colors.primaryColor,
              baseline: "min",
            },
          ]}
          height={isMobile ? 250 : 300}
          margin={{
            left: isMobile ? 40 : 60,
            right: isMobile ? 20 : 40,
            top: 20,
            bottom: isMobile ? 40 : 60
          }}
          sx={{
            '& .MuiChartsAxis-line': {
              stroke: "#fff !important",
            },
            '& .MuiChartsAxis-tick': {
              stroke: colors.unselectedTabColor,
            },
            '& .MuiAreaElement-root': {
              fill: `${colors.primaryColor}30`, // Add transparency to area fill
            },
          }}
        />
      </Box>

      {isMobile && (
        <Box display="flex" justifyContent="center" mt={1}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => setFullscreen(true)}
            sx={{
              color: colors.primaryColor,
              borderColor: colors.primaryColor
            }}
          >
            View Fullscreen
          </Button>
        </Box>
      )}

      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            backgroundColor: colors.containerColor,
            color: colors.textColor
          }
        }}
      >
        <DialogContent sx={{ 
          height: isMobile ? '100%' : '80vh',
          backgroundColor: colors.containerColor,
        }}>
          <Box display="flex" justifyContent="flex-end" mb={1}>
            <IconButton 
              onClick={() => setFullscreen(false)}
              sx={{ color: colors.primaryColor }}
            >
              <FullscreenExit />
            </IconButton>
          </Box>
          <LineChart
            colors={[colors.primaryColor]}
            xAxis={[{ 
              data: currentData.xAxis,
              label: timeRange === "30days" ? "Day" : timeRange === "6months" ? "Month" : "Month",
              scaleType: timeRange === "30days" ? "linear" : "band",
              tickLabelStyle: { fill: colors.textColor },
              labelStyle: { fill: colors.textColor }
            }]}
            yAxis={[{ 
              label: "Return (%)",
              tickLabelStyle: { fill: colors.textColor },
              labelStyle: { fill: colors.textColor }
            }]}
            series={[
              {
                data: currentData.series,
                area: true,
                showMark: true,
                color: colors.primaryColor,
                baseline: "min",
              },
            ]}
            height={isMobile ? '70%' : 600}
            margin={{
              left: 60,
              right: 40,
              top: 20,
              bottom: 60
            }}
            sx={{
              '& .MuiChartsAxis-line': {
                stroke: colors.unselectedTabColor,
              },
              '& .MuiChartsAxis-tick': {
                stroke: colors.unselectedTabColor,
              },
              '& .MuiAreaElement-root': {
                fill: `${colors.primaryColor}30`, // Add transparency to area fill
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default InvestmentPerformanceChart;