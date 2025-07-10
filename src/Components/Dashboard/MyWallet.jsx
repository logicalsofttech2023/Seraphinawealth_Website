import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useMediaQuery, useTheme } from "@mui/material";

const Popup = ({ title, children, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "500px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h3 style={{ fontWeight: "600" }}>{title}</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#6c757d",
          }}
        >
          &times;
        </button>
      </div>
      {children}
    </div>
  </div>
);

const MyWallet = () => {
  const Navigate = useNavigate();
  const [showAddMoneyPopup, setShowAddMoneyPopup] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showBankAccountPopup, setShowBankAccountPopup] = useState(false);
  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [bankAccount, setBankAccount] = useState(null);
  const [bankNames, setBankNames] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWalletDetails();
    fetchBankAccount();
    fetchBankNames();
  }, []);

  const fetchWalletDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getWalletDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setWalletData({
          balance: response.data.walletBalance,
          transactions: response.data.transactions,
        });
      } else {
        Swal.fire("Error", "Failed to fetch wallet details", "error");
      }
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      Swal.fire("Error", "Failed to fetch wallet details", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchBankAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getBankAccount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setBankAccount(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching bank account:", error);
    }
  };

  const fetchBankNames = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getAllBankNames`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.bankNames) {
        setBankNames(response.data.bankNames);
      }
    } catch (error) {
      console.error("Error fetching bank names:", error);
    }
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}addMoneyToWallet`,
        { amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        Swal.fire("Success", "Money added to wallet successfully", "success");
        setWalletData((prev) => ({
          ...prev,
          balance: prev.balance + parseFloat(amount),
          transactions: [response.data.transaction, ...prev.transactions],
        }));
        setShowAddMoneyPopup(false);
        setAmount("");
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Failed to add money",
          "error"
        );
      }
    } catch (error) {
      console.error("Error adding money:", error);
      Swal.fire("Error", "Failed to add money", "error");
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!bankAccount) {
      Swal.fire("Error", "Please link a bank account first", "error");
      setShowWithdrawPopup(false);
      setShowBankAccountPopup(true);
      return;
    }

    if (parseFloat(withdrawAmount) > walletData.balance) {
      Swal.fire("Error", "Insufficient balance", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}withdrawFromWallet`,
        {
          amount: parseFloat(withdrawAmount),
          bankAccountId: bankAccount._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        Swal.fire(
          "Success",
          "Withdrawal request submitted successfully",
          "success"
        );
        setWalletData((prev) => ({
          ...prev,
          balance: prev.balance - parseFloat(withdrawAmount),
          transactions: [response.data.transaction, ...prev.transactions],
        }));
        setShowWithdrawPopup(false);
        setWithdrawAmount("");
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Failed to process withdrawal",
          "error"
        );
      }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      Swal.fire("Error", "Failed to process withdrawal", "error");
    }
  };

  const handleBankAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const UpdatePayload = {
        id: bankAccount ? bankAccount._id : null,
        bankNameId: selectedBank,
        accountNumber: accountDetails.accountNumber,
        ifscCode: accountDetails.ifscCode,
        accountHolderName: accountDetails.accountHolderName,
      };

      const AddPayload = {
        id: bankAccount ? bankAccount._id : null,
        bankNameId: selectedBank,
        accountNumber: accountDetails.accountNumber,
        ifscCode: accountDetails.ifscCode,
        accountHolderName: accountDetails.accountHolderName,
      };

      let response;
      if (bankAccount) {
        // Update existing account
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}updateBankAccount`,
          UpdatePayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new account
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}linkBankAccount`,
          AddPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.data.status) {
        Swal.fire(
          "Success",
          bankAccount
            ? "Bank account updated successfully"
            : "Bank account linked successfully",
          "success"
        );
        setBankAccount(response.data.data);
        setShowBankAccountPopup(false);
        setAccountDetails({
          accountNumber: "",
          ifscCode: "",
          accountHolderName: "",
        });
        setSelectedBank("");
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Failed to process bank account",
          "error"
        );
      }
    } catch (error) {
      console.error("Error processing bank account:", error);
      Swal.fire("Error", "Failed to process bank account", "error");
    }
  };

  if (loading) {
    return (
      <section
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginTop: "1.5rem",
          padding: "1.5rem",
          flexGrow: 1,
        }}
      >
        {/* Header Skeleton */}
        <Skeleton
          variant="text"
          width={150}
          height={40}
          style={{ marginBottom: "1.5rem" }}
        />

        {/* Balance Card Skeleton */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            border: "1px solid #e9ecef",
          }}
        >
          <Stack spacing={1}>
            <Skeleton variant="text" width={120} height={24} />
            <Skeleton variant="text" width={180} height={32} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="text" width={150} height={24} />
            </div>
          </Stack>
        </div>

        {/* Action Buttons Skeleton */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <Skeleton variant="rounded" width="100%" height={48} />
          <Skeleton variant="rounded" width="100%" height={48} />
        </div>

        {/* Recent Transactions Section Skeleton */}
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "1.5rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <Skeleton variant="text" width={180} height={32} />
            <Skeleton variant="rounded" width={250} height={32} />
          </div>

          {/* Transaction Items Skeleton */}
          <Stack spacing={2}>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <div>
                    <Skeleton variant="text" width={120} height={24} />
                    <Skeleton variant="text" width={80} height={20} />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Skeleton variant="text" width={80} height={24} />
                  <Skeleton
                    variant="rounded"
                    width={60}
                    height={24}
                    style={{ marginTop: "0.5rem" }}
                  />
                </div>
              </div>
            ))}
          </Stack>

          {/* Pagination Skeleton */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <Skeleton variant="rounded" width={80} height={36} />
            <Skeleton variant="rounded" width={36} height={36} />
            <Skeleton variant="rounded" width={36} height={36} />
            <Skeleton variant="rounded" width={36} height={36} />
            <Skeleton variant="rounded" width={80} height={36} />
          </div>
        </div>

        {/* Bank Account Section Skeleton */}
        <div
          style={{
            border: "1px solid #dee2e6",
            borderRadius: "10px",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Skeleton variant="text" width={150} height={32} />
            <Skeleton variant="text" width={60} height={32} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Skeleton variant="circular" width={48} height={48} />
            <div>
              <Skeleton variant="text" width={180} height={24} />
              <Skeleton variant="text" width={120} height={20} />
            </div>
          </div>
        </div>

        {/* Security Message Skeleton */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Skeleton variant="circular" width={20} height={20} />
          <div>
            <Skeleton variant="text" width={200} height={24} />
            <Skeleton variant="text" width={250} height={20} />
          </div>
        </div>

        {/* Need Help Skeleton */}
        <div style={{ textAlign: "center" }}>
          <Skeleton
            variant="text"
            width={180}
            height={20}
            style={{ margin: "0 auto 0.5rem" }}
          />
          <Skeleton
            variant="text"
            width={120}
            height={20}
            style={{ margin: "0 auto" }}
          />
        </div>
      </section>
    );
  }

  // Find the last added money transaction
  const lastAddedTransaction = walletData.transactions
    .filter((tx) => tx.type === "addMoney")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    // Reset time components to compare only date parts
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 0) return "in the future";

    return `${diffDays} days ago`;
  };

  return (
    <div>
      <section
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginTop: "1.5rem",
          padding: "1.5rem",
          flexGrow: 1,
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "1.5rem",
          }}
        >
          My Wallet
        </h2>

        {/* Available Balance Card */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            border: "1px solid #e9ecef",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#6c757d", marginBottom: "0.5rem" }}>
                Available Balance
              </p>
              <h3 style={{ fontSize: "24px", fontWeight: "700" }}>
                ₹{walletData.balance.toLocaleString("en-IN")}
              </h3>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#6c757d", marginBottom: "0.5rem" }}>
                Last Added
              </p>
              {lastAddedTransaction ? (
                <p style={{ fontWeight: "500" }}>
                  + ₹{lastAddedTransaction.amount} (
                  {formatDate(lastAddedTransaction.createdAt)})
                </p>
              ) : (
                <p style={{ fontWeight: "500" }}>No transactions yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Wallet Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {/* <button
            onClick={() => setShowAddMoneyPopup(true)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #00833D, #000000)",
              color: "white",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            Add Money
          </button> */}

          <button
            onClick={() => setShowWithdrawPopup(true)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #00833D, #000000)",
              color: "white",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            Withdraw
          </button>
        </div>

        {/* Recent Transactions Section */}
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: isMobile ? "1rem" : "1.5rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            marginBottom: isMobile ? "1rem" : "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              marginBottom: "1.5rem",
              gap: isMobile ? "1rem" : 0,
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.1rem" : "1.25rem",
                fontWeight: "600",
                margin: 0,
                color: "#000000",
              }}
            >
              Recent Transactions
            </h3>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                background: "#f8fafc",
                padding: "4px",
                borderRadius: "8px",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {["all", "addMoney", "withdraw"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  style={{
                    padding: isMobile ? "0.25rem 0.5rem" : "0.375rem 0.75rem",
                    borderRadius: "6px",
                    border: "none",
                    background:
                      filter === filterType
                        ? "linear-gradient(135deg, #00833D, #000000)"
                        : "transparent",
                    color: filter === filterType ? "#fff" : "#000000",
                    fontWeight: 500,
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textTransform: "capitalize",
                    flex: isMobile ? 1 : "none",
                  }}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>

          {walletData.transactions.length > 0 ? (
            <div style={{ marginBottom: "1.5rem" }}>
              {walletData.transactions
                .filter(
                  (transaction) =>
                    filter === "all" ||
                    (filter === "addMoney" &&
                      transaction.type === "addMoney") ||
                    (filter === "withdraw" && transaction.type === "withdraw")
                )
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((transaction) => (
                  <div
                    key={transaction._id}
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: "space-between",
                      alignItems: isMobile ? "flex-start" : "center",
                      padding: "1rem 0",
                      borderBottom: "1px solid #f1f1f1",
                      transition: "all 0.2s ease",
                      gap: isMobile ? "0.75rem" : 0,
                      ":hover": {
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        width: isMobile ? "100%" : "auto",
                      }}
                    >
                      <div
                        style={{
                          width: isMobile ? "32px" : "40px",
                          height: isMobile ? "32px" : "40px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            transaction.type === "addMoney"
                              ? "linear-gradient(135deg, #00833D, #000000)"
                              : "linear-gradient(135deg, #00833D, #000000)",
                        }}
                      >
                        {transaction.type === "addMoney" ? (
                          <FiPlus size={isMobile ? 16 : 20} color={"#fff"} />
                        ) : (
                          <FiArrowRight
                            size={isMobile ? 16 : 20}
                            color={"#fff"}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontWeight: "600",
                            margin: 0,
                            color: "#000000",
                            fontSize: isMobile ? "0.9rem" : "1rem",
                          }}
                        >
                          {transaction.description}
                        </p>
                        <p
                          style={{
                            color: "#64748b",
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                            margin: "0.25rem 0 0",
                          }}
                        >
                          {new Date(transaction.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: isMobile ? "left" : "right",
                        width: isMobile ? "100%" : "auto",
                        marginLeft: isMobile ? "48px" : 0,
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "600",
                          margin: 0,
                          color:
                            transaction.type === "addMoney"
                              ? transaction.status === "success"
                                ? "#00833D"
                                : "#ef4444"
                              : transaction.status === "success"
                              ? "#000000"
                              : "#ef4444",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                        }}
                      >
                        {transaction.type === "addMoney" ? "+" : "-"}₹
                        {transaction.amount}
                      </p>
                      <span
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          display: "inline-block",
                          background:
                            transaction.status === "success"
                              ? "#e6f6ec"
                              : transaction.status === "pending"
                              ? "#fef9c3"
                              : "#fee2e2",
                          color:
                            transaction.status === "success"
                              ? "#00833D"
                              : transaction.status === "pending"
                              ? "#854d0e"
                              : "#991b1b",
                        }}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p
              style={{
                color: "#64748b",
                textAlign: "center",
                padding: "2rem 0",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              No transactions found
            </p>
          )}

          {walletData.transactions.length > itemsPerPage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
                flexWrap: isMobile ? "wrap" : "nowrap",
              }}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: isMobile ? "0.375rem 0.75rem" : "0.5rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                }}
              >
                Previous
              </button>

              {Array.from(
                {
                  length: Math.ceil(
                    walletData.transactions.length / itemsPerPage
                  ),
                },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{
                      padding: isMobile ? "0.375rem 0.75rem" : "0.5rem 1rem",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      background:
                        currentPage === i + 1
                          ? "linear-gradient(135deg, #00833D, #000000)"
                          : "#fff",
                      color: currentPage === i + 1 ? "#fff" : "#000000",
                      cursor: "pointer",
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      display:
                        isMobile &&
                        Math.abs(currentPage - (i + 1)) > 1 &&
                        i !== 0 &&
                        i !==
                          Math.ceil(
                            walletData.transactions.length / itemsPerPage
                          ) -
                            1
                          ? "none"
                          : "block",
                    }}
                  >
                    {i + 1}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(walletData.transactions.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(walletData.transactions.length / itemsPerPage)
                }
                style={{
                  padding: isMobile ? "0.375rem 0.75rem" : "0.5rem 1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor:
                    currentPage ===
                    Math.ceil(walletData.transactions.length / itemsPerPage)
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    currentPage ===
                    Math.ceil(walletData.transactions.length / itemsPerPage)
                      ? 0.5
                      : 1,
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Linked Bank Account Section */}
        <div
          style={{
            border: "1px solid #dee2e6",
            borderRadius: "10px",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ fontWeight: "600" }}>Linked Bank Account</h3>
            <button
              onClick={() => {
                setSelectedBank(
                  bankNames.find((bank) => bank.name === bankAccount?.bankName)
                    ?._id || ""
                );
                setAccountDetails({
                  accountNumber: bankAccount?.accountNumber || "",
                  ifscCode: bankAccount?.ifscCode || "",
                  accountHolderName: bankAccount?.accountHolderName || "",
                });
                setShowBankAccountPopup(true);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#E770C1",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{bankAccount ? "Edit" : "Add"}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4H4V11H11V4Z"
                  stroke="#E770C1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 13H13V20H20V13Z"
                  stroke="#E770C1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 13H4V20H11V13Z"
                  stroke="#E770C1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 4H13V11H20V4Z"
                  stroke="#E770C1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {bankAccount ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00833D, #000000)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {bankAccount.bankNameId.name.charAt(0)}
              </div>
              <div>
                <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                  {bankAccount.bankNameId.name} ••••
                  {bankAccount.accountNumber.slice(-4)}
                </p>
                <p style={{ color: "#6c757d", fontSize: "14px" }}>
                  IFSC: {bankAccount.ifscCode}
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1.5rem",
                border: "1px dashed #ced4da",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <p style={{ marginBottom: "1rem", color: "#6c757d" }}>
                No bank account linked
              </p>
              <button
                onClick={() => {
                  setSelectedBank("");
                  setAccountDetails({
                    accountNumber: "",
                    ifscCode: "",
                    accountHolderName: "",
                  });
                  setShowBankAccountPopup(true);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  background: "linear-gradient(135deg, #00833D, #000000) ",
                  color: "white",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Add Bank Account
              </button>
            </div>
          )}
        </div>

        {/* Security Message */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#28a745"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="#28a745"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p style={{ fontWeight: "500", marginBottom: "0.25rem" }}>
              Your transactions are 100% secure
            </p>
            <p style={{ color: "#6c757d", fontSize: "14px" }}>
              End-to-end encrypted transactions with RBI compliant partners
            </p>
          </div>
        </div>

        {/* Need Help Section */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#6c757d", marginBottom: "0.5rem" }}>
            Need help with your wallet?
          </p>
          <a
            href="/help/wallet"
            style={{
              color: "#E770C1",
              fontWeight: "500",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Contact Support
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19"
                stroke="#E770C1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5L19 12L12 19"
                stroke="#E770C1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Add Money Popup */}
        {showAddMoneyPopup ? (
          <Popup
            title="Add Money to Wallet"
            onClose={() => setShowAddMoneyPopup(false)}
          >
            <form onSubmit={handleAddMoney}>
              <div style={{ marginBottom: "1.5rem" }}>
                <TextField
                  label="Amount (₹)"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  onFocus={(e) => e.target.select()}
                  placeholder="Enter amount"
                  fullWidth
                  required
                />
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  padding: "12px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #00833D, #000000)",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(135deg, #00692f, #000000)",
                  },
                }}
              >
                Add Money
              </Button>
            </form>
          </Popup>
        ) : null}

        {/* Withdraw Popup */}
        {showWithdrawPopup && (
          <Popup
            title="Withdraw Money"
            onClose={() => setShowWithdrawPopup(false)}
          >
            <form onSubmit={handleWithdraw}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    fontSize: "16px",
                  }}
                  placeholder="Enter amount to withdraw"
                  min="1"
                  max={walletData.balance}
                  required
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Bank Account Details
                </label>
                {bankAccount ? (
                  <div
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid #e9ecef",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                      {bankAccount.bankNameId.name} ••••
                      {bankAccount.accountNumber.slice(-4)}
                    </p>
                    <p style={{ color: "#6c757d", fontSize: "14px" }}>
                      IFSC: {bankAccount.ifscCode}
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px dashed #ced4da",
                      backgroundColor: "#f8f9fa",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ marginBottom: "1rem", color: "#6c757d" }}>
                      No bank account linked
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowWithdrawPopup(false);
                        setShowBankAccountPopup(true);
                      }}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: "none",
                        background: "linear-gradient(135deg, #00833D, #000000)",
                        color: "white",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      Add Bank Account
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!bankAccount}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  background: bankAccount
                    ? "linear-gradient(135deg, #00833D, #000000)"
                    : "#cccccc",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: bankAccount ? "pointer" : "not-allowed",
                }}
              >
                Request Withdrawal
              </button>
            </form>
          </Popup>
        )}

        {/* Bank Account Popup */}
        {showBankAccountPopup && (
          <Popup
            title={bankAccount ? "Edit Bank Account" : "Add Bank Account"}
            onClose={() => setShowBankAccountPopup(false)}
          >
            <form onSubmit={handleBankAccountSubmit}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Bank Name
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    fontSize: "16px",
                    marginBottom: "10px",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                    backgroundSize: "1em",
                  }}
                  required
                >
                  <option value="">Select Bank</option>
                  {bankNames.map((bank) => (
                    <option key={bank._id} value={bank._id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Account Number
                </label>
                <input
                  type="text"
                  value={accountDetails.accountNumber}
                  onChange={(e) =>
                    setAccountDetails((prev) => ({
                      ...prev,
                      accountNumber: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    fontSize: "16px",
                  }}
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={accountDetails.ifscCode}
                  onChange={(e) =>
                    setAccountDetails((prev) => ({
                      ...prev,
                      ifscCode: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    fontSize: "16px",
                  }}
                  placeholder="Enter IFSC code"
                  required
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={accountDetails.accountHolderName}
                  onChange={(e) =>
                    setAccountDetails((prev) => ({
                      ...prev,
                      accountHolderName: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    fontSize: "16px",
                  }}
                  placeholder="Enter account holder name"
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(135deg, #00833D, #000000)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {bankAccount ? "Update Account" : "Add Account"}
              </button>
            </form>
          </Popup>
        )}
      </section>
    </div>
  );
};

export default MyWallet;
