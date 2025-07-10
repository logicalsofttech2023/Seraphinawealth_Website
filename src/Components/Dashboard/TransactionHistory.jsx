import React, { useState, useEffect } from "react";
import { FiPlus, FiArrowRight, FiSearch } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const TransactionHistory = () => {
  const Navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [allTransactions, setAllTransactions] = useState([]);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const transactionsPerPage = 5;

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  useEffect(() => {
    filterAndPaginateTransactions();
  }, [allTransactions, currentPage, filter, searchQuery]);

  const fetchAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}getTransactionHistory`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      
      // Filter to only include planPurchase and planRenewal transactions
      const filteredTransactions = response.data.data.filter(txn => 
        txn.type === "planPurchase" || txn.type === "planRenewal"
      );
      
      setAllTransactions(filteredTransactions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  const filterAndPaginateTransactions = () => {
    // Apply filters
    let filtered = allTransactions;
    
    // Filter by transaction type
    if (filter !== "all") {
      filtered = filtered.filter(txn => txn.type === filter);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(txn => 
        txn.transactionId.toLowerCase().includes(query) ||
        txn.description?.toLowerCase().includes(query) ||
        txn.amount.toString().includes(query) ||
        txn.status.toLowerCase().includes(query)
      );
    }
    
    // Calculate pagination
    const totalFiltered = filtered.length;
    const totalPages = Math.ceil(totalFiltered / transactionsPerPage);
    setTotalPages(totalPages);
    
    // Get transactions for current page
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    
    setDisplayedTransactions(paginated);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const formatAmount = (amount) => {
    return `₹${amount}`;
  };

  const formatType = (type) => {
    return type === "planPurchase" ? "Plan Purchase" : "Plan Renewal";
  };

  return (
    <div>
      <section
        style={{
          flexGrow: 1,
          padding: "1.5rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              margin: 0,
              color: "#000000",
            }}
          >
            Transaction History
          </h2>
          
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", width: "100%", justifyContent: "space-between" }}>
            <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FiSearch
                  size={18}
                  color="#64748b"
                  style={{
                    position: "absolute",
                    left: "12px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: "0.5rem 1rem 0.5rem 2.5rem",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    minWidth: "250px",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  marginLeft: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #00833D, #000000)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Search
              </button>
            </form>
            
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                background: "#f8fafc",
                padding: "4px",
                borderRadius: "8px",
              }}
            >
              {["all", "planPurchase", "planRenewal"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => {
                    setFilter(filterType);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: "0.375rem 0.75rem",
                    borderRadius: "6px",
                    border: "none",
                    background:
                      filter === filterType
                        ? "linear-gradient(135deg, #00833D, #000000)"
                        : "transparent",
                    color: filter === filterType ? "#fff" : "#000000",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textTransform: "capitalize",
                  }}
                >
                  {filterType === "all" ? "All" : filterType === "planPurchase" ? "Purchases" : "Renewals"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "1rem 1.25rem",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%" }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <div style={{ flex: 1 }}>
                      <Skeleton variant="text" width="60%" height={24} />
                      <Skeleton variant="text" width="40%" height={20} style={{ marginTop: "0.25rem" }} />
                      <Skeleton variant="text" width="30%" height={16} style={{ marginTop: "0.25rem" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <Skeleton variant="text" width={80} height={24} />
                    <Skeleton 
                      variant="rounded" 
                      width={60} 
                      height={24} 
                      style={{ marginTop: "0.5rem", borderRadius: "6px" }} 
                    />
                  </div>
                </div>
                <Skeleton 
                  variant="text" 
                  width="80%" 
                  height={20} 
                  style={{ marginTop: "0.5rem", marginLeft: "56px" }} 
                />
              </div>
            ))}
            
            {/* Pagination Skeleton */}
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              gap: "0.5rem", 
              marginTop: "2rem" 
            }}>
              <Skeleton variant="rounded" width={80} height={36} style={{ borderRadius: "6px" }} />
              {[1, 2, 3, 4, 5].map((page) => (
                <Skeleton 
                  key={page} 
                  variant="rounded" 
                  width={36} 
                  height={36} 
                  style={{ borderRadius: "6px" }} 
                />
              ))}
              <Skeleton variant="rounded" width={80} height={36} style={{ borderRadius: "6px" }} />
            </div>
          </div>
        ) : displayedTransactions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>No transactions found</p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {displayedTransactions.map((txn) => (
                <div
                  key={txn._id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "1rem 1.25rem",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, #00833D, #000000)",
                        }}
                      >
                        {txn.type === "planPurchase" ? (
                          <FiPlus size={20} color={"#fff"} />
                        ) : (
                          <FiArrowRight size={20} color={"#fff"} />
                        )}
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: 600,
                            color: "#000000",
                            fontSize: "1rem",
                          }}
                        >
                          {formatType(txn.type)}
                        </p>
                        <p
                          style={{
                            margin: "0.25rem 0 0",
                            color: "#64748b",
                            fontSize: "0.875rem",
                          }}
                        >
                          {new Date(txn.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p
                          style={{
                            margin: "0.25rem 0 0",
                            color: "#64748b",
                            fontSize: "0.75rem",
                          }}
                        >
                          {txn.transactionId}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 600,
                          color: txn.status === "failed" ? "#ef4444" : "#00833D",
                          fontSize: "1rem",
                        }}
                      >
                        {formatAmount(txn.amount)}
                      </p>
                      <span
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          background:
                            txn.status === "success"
                              ? "#e6f6ec"
                              : txn.status === "pending"
                              ? "#fef9c3"
                              : "#fee2e2",
                          color:
                            txn.status === "success"
                              ? "#00833D"
                              : txn.status === "pending"
                              ? "#854d0e"
                              : "#991b1b",
                          textTransform: "capitalize",
                        }}
                      >
                        {txn.status}
                      </span>
                    </div>
                  </div>
                  {txn.description && (
                    <p
                      style={{
                        margin: "0.5rem 0 0",
                        color: "#64748b",
                        fontSize: "0.875rem",
                        paddingLeft: "56px",
                      }}
                    >
                      {txn.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "2rem",
                }}
              >
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        background:
                          currentPage === pageNum
                            ? "linear-gradient(135deg, #00833D, #000000)"
                            : "#fff",
                        color: currentPage === pageNum ? "#fff" : "#000000",
                        cursor: "pointer",
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default TransactionHistory;