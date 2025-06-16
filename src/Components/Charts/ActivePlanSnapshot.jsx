import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ActivePlanSnapshot = () => {
  const colors = {
    primaryColor: "#6b91fc",
    backgroundColor: "#fff",
    containerColor: "#1b1e2d",
    textPrimary: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    unselectedTabColor: "#a0a1a6",
    profitColor: "#4caf50",
    lossColor: "#f44336",
    dividerColor: "rgba(255, 255, 255, 0.12)",
  };

  const plans = [
    {
      name: "Growth Plan",
      invested: 50000,
      startDate: "01 Jan 2024",
      maturityDate: "01 Jan 2025",
      interestRate: "12.0%",
      currentValue: 53400,
      accentColor: "#fff",
    },
    {
      name: "Secure Plan",
      invested: 25000,
      startDate: "10 Feb 2024",
      maturityDate: "10 Feb 2025",
      interestRate: "9.0%",
      currentValue: 27250,
      accentColor: "#fff",
    },
  ];

  return (
    <div
      style={{
        padding: "0px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: colors.backgroundColor,
        color: colors.textPrimary,
      }}
    >
      <Typography
        variant="h5"
        style={{
          fontWeight: 600,
          marginBottom: "24px",
          color: colors.textPrimary,
          fontSize: "1.2rem",
        }}
      >
        Active Plans Snapshot
      </Typography>

      <div className="row">
        {plans.map((plan, index) => {
          const profit = plan.currentValue - plan.invested;
          const isProfitable = profit >= 0;
          const profitPercentage = ((profit / plan.invested) * 100).toFixed(2);

          return (
            <div className="col-md-6 mb-4" key={index}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  borderLeft: `4px solid ${plan.accentColor}`,
                  backgroundColor: colors.containerColor,
                  height: "100%",
                }}
              >
                <CardContent style={{ padding: "20px" }}>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: 600,
                      marginBottom: "16px",
                      color: plan.accentColor,
                      fontSize: "1rem",
                    }}
                  >
                    {plan.name}
                  </Typography>

                  {/* Row 1 */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      borderBottom: `1px solid ${colors.dividerColor}`,
                      paddingBottom: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <Typography variant="body2" style={{ color: colors.textSecondary, marginBottom: "4px", fontSize: "0.8rem" }}>
                        Invested Amount
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 500 }}>
                        ₹{plan.invested.toLocaleString()}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" style={{ color: colors.textSecondary, marginBottom: "4px", fontSize: "0.8rem" }}>
                        Current Value
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 600, color: isProfitable ? colors.profitColor : colors.lossColor }}>
                        ₹{plan.currentValue.toLocaleString()}
                      </Typography>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <Typography variant="body2" style={{ color: colors.textSecondary, marginBottom: "4px", fontSize: "0.8rem" }}>
                        Start Date
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 500 }}>
                        {plan.startDate}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" style={{ color: colors.textSecondary, marginBottom: "4px", fontSize: "0.8rem" }}>
                        Maturity Date
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 500 }}>
                        {plan.maturityDate}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" style={{ color: colors.textSecondary, marginBottom: "4px", fontSize: "0.8rem" }}>
                        Interest Rate
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 500, color: plan.accentColor }}>
                        {plan.interestRate} annually
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" style={{ color: colors.textSecondary, marginBottom: "4px", fontSize: "0.8rem" }}>
                        Returns
                      </Typography>
                      <Typography variant="body1" style={{ fontWeight: 600, color: isProfitable ? colors.profitColor : colors.lossColor }}>
                        {isProfitable ? "+" : ""}₹{Math.abs(profit).toLocaleString()} ({profitPercentage}%)
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivePlanSnapshot;
