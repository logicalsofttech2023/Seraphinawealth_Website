import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
const dummyUser = {
  // Basic Info
  profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  name: "Rahul Sharma",
  username: "rahulsharma",
  socials: [
    { link: "#", icon: <FaFacebook /> },
    { link: "#", icon: <FaTwitter /> },
    { link: "#", icon: <FaLinkedinIn /> },
  ],
  menuItems: [
    { label: "Dashboard" },
    { label: "Deposit Money" },
    { label: "Withdraw Money" },
    { label: "Total Investment" },
    { label: "Transaction" },
    { label: "Notifications" },
    { label: "Settings" },
  ],

  // Personal Information
  firstName: "Rahul",
  middleName: "Kumar",
  lastName: "Sharma",
  userEmail: "rahul.sharma@example.com",
  dob: "1990-05-15",
  gender: "Male",
  address: "123, Sunshine Apartment, MG Road, Bangalore, Karnataka - 560001",
  phone: "+91 9876543210",

  // Aadhar Details
  aadharNumber: "1234 5678 9012",
  aadharFrontImage: "https://adarshc.com/index/ent/document/default/aadhar.jpg",
  aadharBackImage: "https://adarshc.com/index/ent/document/default/aadhar.jpg",

  // PAN Details
  panNumber: "ABCDE1234F",
  panFrontImage:
    "https://www.whytecroftford.com/wp-content/uploads/2024/05/PAN-CARD-min.png",
  panBackImage:
    "https://www.whytecroftford.com/wp-content/uploads/2024/05/PAN-CARD-min.png",

  // Bank Account Details (added this section)
  bankAccounts: [
    {
      id: "1",
      accountHolderName: "Rahul Sharma",
      accountNumber: "123456789012",
      bankName: "HDFC Bank",
      ifscCode: "HDFC0001234",
      accountType: "Savings",
      branch: "MG Road, Bangalore",
      bankProof: "https://example.com/passbook.jpg",
      isPrimary: true,
      addedOn: "2024-01-15",
    },
    {
      id: "2",
      accountHolderName: "Rahul Sharma",
      accountNumber: "987654321098",
      bankName: "ICICI Bank",
      ifscCode: "ICIC0005678",
      accountType: "Current",
      branch: "Koramangala, Bangalore",
      bankProof: "https://example.com/cheque.jpg",
      isPrimary: false,
      addedOn: "2024-03-22",
    },
  ],
};

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(dummyUser);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankFormData, setBankFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    accountType: "",
    branch: "",
    bankProof: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancel = () => {
    setUserData(dummyUser); // Revert changes
    setIsEditing(false);
  };

  const handleSave = () => {
    // Save logic here (e.g., API call)
    console.log("Saving updated data:", userData);
    setIsEditing(false);
  };

  const handleBankInputChange = (e) => {
    const { id, value } = e.target;
    setBankFormData({ ...bankFormData, [id]: value });
  };

  const handleBankProofUpload = (e) => {
    // Handle file upload logic
  };

  const handleBankSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleSetPrimary = (index) => {
    // Set account as primary
  };

  const handleDeleteBank = (index) => {
    // Delete bank account
  };

  const handleEditBank = (index) => {
    // Edit existing bank account
    setIsEditingBank(true);
    setBankFormData(userData.bankAccounts[index]);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="d-flex min-vh-100 bg-gray-100">
        {/* Sidebar (Visible only on large screens) */}
        <aside
          className="d-none d-md-block col-md-3 mt-4 bg-white p-5 shadow-lg"
          style={{
            minHeight: "100vh",
            position: "sticky",
            top: "0",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRight: "1px solid #f0f0f0",
          }}
        >
          <div
            className="d-flex flex-column align-items-center"
            style={{ paddingBottom: "2rem" }}
          >
            <img
              src={dummyUser.profileImage}
              alt="Profile"
              className="rounded-circle"
              style={{
                width: "112px",
                height: "112px",
                objectFit: "cover",
                border: "3px solid #f8f9fa",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            <h2
              className="mt-4 font-weight-semibold h4"
              style={{
                color: "#2d3748",
                fontSize: "1.25rem",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              {dummyUser.name}
            </h2>
            <p
              className="text-muted"
              style={{
                color: "#718096",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              @{dummyUser.username}
            </p>
            <div
              className="d-flex gap-3 mt-3 mb-3"
              style={{ fontSize: "1.25rem" }}
            >
              {dummyUser.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#4a5568",
                    transition: "color 0.2s ease",
                    ":hover": {
                      color: "#3182ce",
                    },
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <nav className="mt-4">
            <ul className="list-unstyled" style={{ margin: 0, padding: 0 }}>
              {dummyUser.menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`p-2 rounded cursor-pointer ${
                    activeSection === item.label
                      ? "bg-primary-light"
                      : "hover-bg-light"
                  }`}
                  onClick={() => setActiveSection(item.label)}
                  style={{
                    marginBottom: "0.5rem",
                    transition: "all 0.2s ease",
                    color: activeSection === item.label ? "#3182ce" : "#4a5568",
                    fontWeight: activeSection === item.label ? "600" : "500",
                    backgroundColor:
                      activeSection === item.label ? "#ebf8ff" : "transparent",
                    ":hover": {
                      backgroundColor: "#f7fafc",
                    },
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="mt-4 d-flex align-items-center gap-2 text-danger"
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              background: "transparent",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontWeight: "500",
              ":hover": {
                backgroundColor: "#fff5f5",
                color: "#e53e3e",
              },
            }}
          >
            <HiOutlineLogout style={{ fontSize: "1.25rem" }} />
            <span style={{ marginLeft: "0.5rem" }}>Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-3 p-md-4 p-lg-5">
          {/* User Photo and Name (Visible only on small screens) */}
          <div className="d-md-none d-flex flex-column align-items-center mb-4">
            <img
              src={dummyUser.profileImage}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "112px", height: "112px" }}
            />
            <h2 className="mt-4 font-weight-semibold h4">{dummyUser.name}</h2>
            <p className="text-muted">@{dummyUser.username}</p>
          </div>

          {activeSection === "Dashboard" && (
            <>
              <section
                className="bg-white p-3 p-md-4 rounded shadow-sm"
                style={{
                  minHeight: "80vh",
                  background:
                    "linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)",
                }}
              >
                {/* Header Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                  <h3
                    className="h4 mb-3 mb-md-0"
                    style={{
                      color: "#2c3e50",
                      fontWeight: "700",
                      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Welcome, Suraj
                  </h3>
                  <div className="d-flex align-items-center">
                    {/* Search Bar */}
                    <div className="me-3" style={{ width: "250px" }}>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control border-end-0"
                          placeholder="Search..."
                          style={{
                            borderRadius: "20px 0 0 20px",
                            borderRight: "none",
                            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                            padding: "8px 15px",
                            fontSize: "14px",
                          }}
                        />
                        <button
                          className="btn btn-outline-secondary border-start-0"
                          type="button"
                          style={{
                            borderRadius: "0 20px 20px 0",
                            backgroundColor: "#f8f9fa",
                            borderColor: "#dee2e6",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          }}
                        >
                          <i className="fa fa-search text-muted" />
                        </button>
                      </div>
                    </div>

                   
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="row g-4 mb-4">
                  {[
                    {
                      title: "Deposit",
                      amount: "$500",
                      icon: "flaticon-035-savings",
                      color: "primary",
                      trend: "up",
                    },
                    {
                      title: "Withdraw",
                      amount: "$500",
                      icon: "flaticon-041-umbrella",
                      color: "info",
                      trend: "down",
                    },
                    {
                      title: "Invest",
                      amount: "$500",
                      icon: "flaticon-004-bar-chart",
                      color: "success",
                      trend: "up",
                    },
                    {
                      title: "Wallet",
                      amount: "$1200",
                      icon: "flaticon-042-wallet",
                      color: "warning",
                      trend: "up",
                    },
                    {
                      title: "Referral",
                      amount: "$500",
                      icon: "flaticon-010-cloud",
                      color: "secondary",
                      trend: "neutral",
                    },
                    {
                      title: "Profit",
                      amount: "$500",
                      icon: "flaticon-027-money-bag",
                      color: "danger",
                      trend: "up",
                    },
                  ].map((item, index) => (
                    <div key={index} className="col-xl-4 col-lg-4 col-md-6">
                      <div
                        className="card border-0 shadow-sm"
                        style={{
                          borderRadius: "15px",
                          background: "linear-gradient(106deg, rgb(231, 112, 193) 11.27%, rgb(159, 112, 253) 88.73%)",
                          transition: "all 0.3s ease",
                          borderLeft: `4px solid var(--bs-${item.color})`,
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "translateY(-5px)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div style={{ width: "100%" }}>
                              <h6
                                className="mb-2"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "500",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                  color: "#fff",
                                  float: "right",
                                  marginTop: "2px",
                                }}
                              >
                                {item.title}
                              </h6>
                              <h4
                                className="mb-1"
                                style={{
                                  fontWeight: "700",
                                  color: "#fff",
                                }}
                              >
                                {item.amount}
                              </h4>
                              <div className="d-flex align-items-center mt-2">
                                <span
                                  className={`badge bg-${item.color}-subtle text-${item.color} me-2`}
                                  style={{
                                    fontSize: "11px",
                                    padding: "3px 8px",
                                    borderRadius: "20px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {item.trend === "up" ? (
                                    <>
                                      <i className="ti-arrow-up me-1" /> 12%
                                    </>
                                  ) : item.trend === "down" ? (
                                    <>
                                      <i className="ti-arrow-down me-1" /> 5%
                                    </>
                                  ) : (
                                    <>
                                      <i className="ti-minus me-1" /> 0%
                                    </>
                                  )}
                                </span>
                                <small
                                  
                                  style={{ fontSize: "12px", color: "#fff" }}
                                >
                                  vs last month
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeSection === "Deposit Money" && (
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

              {/* Add Wallet Form */}
              <div
                style={{
                  border: "1px solid #dee2e6",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  marginBottom: "2rem",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <h5 style={{ fontWeight: 600, marginBottom: "1rem" }}>
                  Add Balance
                </h5>
                <form className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount (₹)"
                      min="1"
                      required
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <button
                      type="submit"
                      className="btn btn-success"
                      style={{
                        width: "100%",
                        padding: "10px",
                        fontWeight: 600,
                        fontSize: "16px",
                        borderRadius: "8px",
                        background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)"
                      }}
                    >
                      Add to Wallet
                    </button>
                  </div>
                </form>
              </div>

              {/* Wallet Transactions Table */}
              <h5 style={{ fontWeight: 600, marginBottom: "1rem" }}>
                Transaction History
              </h5>
              <div className="table-responsive">
                <table
                  className="table table-bordered table-striped align-middle"
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <thead style={{ backgroundColor: "#d1e7dd" }}>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Transaction ID</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        date: "2025-06-01",
                        txnId: "TXN123456",
                        type: "Credit",
                        amount: "+ ₹500",
                        status: "Success",
                      },
                      {
                        id: 2,
                        date: "2025-05-22",
                        txnId: "TXN123457",
                        type: "Debit",
                        amount: "- ₹200",
                        status: "Success",
                      },
                      {
                        id: 3,
                        date: "2025-05-15",
                        txnId: "TXN123458",
                        type: "Credit",
                        amount: "+ ₹1,000",
                        status: "Pending",
                      },
                    ].map((txn, index) => (
                      <tr key={txn.id}>
                        <td>{index + 1}</td>
                        <td>{txn.date}</td>
                        <td>{txn.txnId}</td>
                        <td>
                          <span
                            className={`badge ${
                              txn.type === "Credit" ? "bg-success" : "bg-danger"
                            }`}
                            style={{ padding: "6px 12px", fontSize: "14px" }}
                          >
                            {txn.type}
                          </span>
                        </td>
                        <td>{txn.amount}</td>
                        <td>
                          <span
                            className={`badge ${
                              txn.status === "Success"
                                ? "bg-success"
                                : txn.status === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                            style={{ padding: "6px 12px", fontSize: "14px" }}
                          >
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === "Withdraw Money" && (
            <section className="flex-grow-1 p-3 p-md-4 p-lg-5 shadow-sm bg-white mt-4 rounded">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-semibold mb-0">Withdraw Funds</h2>
                <div className="bg-primary bg-opacity-10 px-3 py-2 rounded-pill">
                  <span className="text-muted me-2">Available Balance:</span>
                  <span className="fw-bold">₹18,500</span>
                </div>
              </div>

              {/* Withdrawal Request Form */}
              <div className="border-0 bg-light p-4 rounded-3 mb-5">
                <h5 className="fw-semibold mb-3 d-flex align-items-center">
                  <i className="bi bi-cash-coin me-2"></i>Request Withdrawal
                </h5>
                <form className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="bankSelect" className="form-label">
                      Select Bank Account
                    </label>
                    <select className="form-select" id="bankSelect" required>
                      <option value="">Choose account...</option>
                      <option value="1">HDFC Bank - XXXX-5678</option>
                      <option value="2">ICICI Bank - XXXX-9012</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="amount" className="form-label">
                      Amount (₹)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <input
                        type="number"
                        className="form-control"
                        id="amount"
                        placeholder="Enter amount"
                        min="100"
                        max="18500"
                        step="100"
                        required
                      />
                    </div>
                    <div className="form-text">Minimum withdrawal: ₹100</div>
                  </div>
                  <div className="col-12">
                    <button type="submit" style={{ background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)"}} className="btn btn-primary px-4">
                      <i className="bi bi-send-check me-2"></i>Request
                      Withdrawal
                    </button>
                  </div>
                </form>
              </div>

              {/* Recent Transactions */}
              <div className="border-top pt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold mb-0 d-flex align-items-center">
                    <i className="bi bi-clock-history me-2"></i>Recent
                    Transactions
                  </h5>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-download me-1"></i>Export
                  </button>
                </div>

                <div className="table-responsive rounded-3 overflow-hidden shadow-sm">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th width="5%">#</th>
                        <th width="15%">Date</th>
                        <th width="20%">Transaction ID</th>
                        <th width="15%">Type</th>
                        <th width="20%">Amount</th>
                        <th width="15%">Status</th>
                        <th width="10%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: 1,
                          date: "01 Jun, 2025",
                          time: "10:45 AM",
                          txnId: "TXN12345678",
                          type: "Deposit",
                          amount: "5,000.00",
                          status: "Success",
                          icon: "arrow-down-circle",
                        },
                        {
                          id: 2,
                          date: "03 Jun, 2025",
                          time: "03:22 PM",
                          txnId: "TXN12345679",
                          type: "Withdrawal",
                          amount: "2,000.00",
                          status: "Pending",
                          icon: "arrow-up-circle",
                        },
                        {
                          id: 3,
                          date: "05 Jun, 2025",
                          time: "09:15 AM",
                          txnId: "TXN12345680",
                          type: "Deposit",
                          amount: "10,000.00",
                          status: "Success",
                          icon: "arrow-down-circle",
                        },
                        {
                          id: 4,
                          date: "06 Jun, 2025",
                          time: "11:30 AM",
                          txnId: "TXN12345681",
                          type: "Withdrawal",
                          amount: "1,500.00",
                          status: "Failed",
                          icon: "arrow-up-circle",
                        },
                      ].map((txn, index) => (
                        <tr key={txn.id}>
                          <td className="">{index + 1}</td>
                          <td>
                            <div className="fw-medium">{txn.date}</div>
                          </td>
                          <td>
                            <span className="font-monospace small">
                              {txn.txnId}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                txn.type === "Deposit"
                                  ? "bg-success bg-opacity-10 text-success"
                                  : "bg-warning bg-opacity-10 text-dark"
                              } rounded-pill`}
                            >
                              <i className={`bi bi-${txn.icon} me-1`}></i>
                              {txn.type}
                            </span>
                          </td>
                          <td
                            className={`fw-semibold ${
                              txn.type === "Deposit"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {txn.type === "Deposit" ? "+" : "-"} ₹{txn.amount}
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                txn.status === "Success"
                                  ? "bg-success"
                                  : txn.status === "Pending"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                              } rounded-pill`}
                            >
                              {txn.status}
                            </span>
                          </td>
                          <td className="text-end">
                            {txn.status === "Failed" && (
                              <button className="btn btn-sm btn-outline-danger">
                                <i className="bi bi-exclamation-circle"></i>
                              </button>
                            )}
                            {txn.status === "Pending" && (
                              <button className="btn btn-sm btn-outline-warning">
                                <i className="bi bi-clock"></i>
                              </button>
                            )}
                            {txn.status === "Success" && (
                              <button className="btn btn-sm btn-outline-success">
                                <i className="bi bi-receipt"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                
              </div>
            </section>
          )}

          {activeSection === "Total Investment" && (
            <section className="flex-grow-1 shadow p-3 p-md-4 p-lg-5">
              <h2 className="h5 fw-semibold mb-4">Your Investments</h2>

              <div className="table-responsive">
                <table className="table table-bordered shadow table-striped table-hover align-middle">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Investment Plan</th>
                      <th>Start Date</th>
                      <th>Amount</th>
                      <th>Return Rate</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        plan: "Growth Plan",
                        startDate: "2025-04-15",
                        amount: "₹20,000",
                        returnRate: "8% p.a.",
                        status: "Active",
                      },
                      {
                        id: 2,
                        plan: "Secure Return",
                        startDate: "2025-03-01",
                        amount: "₹10,000",
                        returnRate: "6% p.a.",
                        status: "Completed",
                      },
                      {
                        id: 3,
                        plan: "Monthly Income Plan",
                        startDate: "2025-05-10",
                        amount: "₹15,000",
                        returnRate: "7.5% p.a.",
                        status: "Active",
                      },
                    ].map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.plan}</td>
                        <td>{item.startDate}</td>
                        <td>{item.amount}</td>
                        <td>{item.returnRate}</td>
                        <td>
                          <span
                            className={`badge ${
                              item.status === "Active"
                                ? "bg-success"
                                : item.status === "Completed"
                                ? "bg-secondary"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === "Transaction" && (
            <section className="flex-grow-1 p-3 p-md-4 p-lg-5 shadow-sm bg-white mt-4 rounded">
              <h2 className="h5 fw-semibold mb-4">Recent Transactions</h2>

              <div className="table-responsive">
                <table className="table table-hover table-striped table-bordered align-middle">
                  <thead style={{ backgroundColor: "#d1e7dd" }}>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Type</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        date: "2025-06-01",
                        txnId: "TXN12345678",
                        type: "Deposit",
                        amount: "₹5,000",
                        status: "Success",
                      },
                      {
                        id: 2,
                        date: "2025-06-03",
                        txnId: "TXN12345679",
                        type: "Withdrawal",
                        amount: "₹2,000",
                        status: "Pending",
                      },
                      {
                        id: 3,
                        date: "2025-06-05",
                        txnId: "TXN12345680",
                        type: "Deposit",
                        amount: "₹10,000",
                        status: "Success",
                      },
                      {
                        id: 4,
                        date: "2025-06-06",
                        txnId: "TXN12345681",
                        type: "Withdrawal",
                        amount: "₹1,500",
                        status: "Failed",
                      },
                    ].map((txn, index) => (
                      <tr key={txn.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{txn.date}</td>
                        <td>{txn.txnId}</td>
                        <td>
                          <span
                            className={`badge ${
                              txn.type === "Deposit"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {txn.type}
                          </span>
                        </td>
                        <td>{txn.amount}</td>
                        <td>
                          <span
                            className={`badge ${
                              txn.status === "Success"
                                ? "bg-success"
                                : txn.status === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === "Notifications" && (
  <section className="bg-white rounded shadow-sm mt-4 flex-grow-1 p-3 p-md-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="h5 fw-semibold mb-0">Notifications</h2>
      
    </div>

    <div className="table-responsive">
      <table className="table table-hover table-striped table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th width="5%"></th>
            <th width="50%">Notification</th>
            <th width="20%">Category</th>
            <th width="15%">Time</th>
            <th width="10%">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              id: 1,
              message: "Your withdrawal request of ₹2,000 has been processed successfully",
              category: "Transaction",
              icon: "cash-coin",
              time: "2 mins ago",
              isRead: false,
              type: "success"
            },
            {
              id: 2,
              message: "New investment opportunity available - Fixed Deposit @ 7.5% returns",
              category: "Investment",
              icon: "graph-up",
              time: "1 hour ago",
              isRead: false,
              type: "info"
            },
            {
              id: 3,
              message: "Your KYC documents have been verified successfully",
              category: "Account",
              icon: "shield-check",
              time: "5 hours ago",
              isRead: true,
              type: "success"
            },
            {
              id: 4,
              message: "Failed to process your deposit of ₹5,000. Please try again",
              category: "Transaction",
              icon: "exclamation-triangle",
              time: "Yesterday",
              isRead: true,
              type: "warning"
            },
            {
              id: 5,
              message: "New feature added: You can now add multiple bank accounts",
              category: "System",
              icon: "megaphone",
              time: "2 days ago",
              isRead: true,
              type: "info"
            }
          ].map((notification) => (
            <tr key={notification.id} className={!notification.isRead ? "fw-semibold bg-light" : ""}>
              <td>
                <div className={`p-2 rounded-circle bg-${notification.type}-subtle text-${notification.type}`}>
                  {notification.id}
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  {notification.message}
                </div>
              </td>
              <td>
                <span className="badge bg-secondary bg-opacity-10 text-secondary">
                  {notification.category}
                </span>
              </td>
              <td className="">{notification.time}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}

          {activeSection === "Settings" && (
            <>
              <section className="bg-white p-3 p-md-4 rounded shadow-sm">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                  <h3 className="h4 mb-3 mb-md-0">Settings</h3>
                  {!isEditing && (
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                      style={{
                        background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                        borderRadius: "20px",
                      }}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                <form>
                  <div className="row">
                    {/* First Row */}
                    <div className="col-md-4 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={userData.firstName || ""}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="middleName" className="form-label">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="middleName"
                        value={userData.middleName || ""}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={userData.lastName || ""}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="userEmail" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="userEmail"
                        value={userData.userEmail || ""}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="dob" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        value={userData.dob || ""}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="gender"
                        value={userData.gender || ""}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Third Row - Address */}
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows="3"
                      value={userData.address || ""}
                      readOnly={!isEditing}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Fourth Row */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={userData.phone || ""}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Aadhar Card Section */}
                  <div className="card mb-4">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Aadhar Card Details</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="aadharNumber" className="form-label">
                            Aadhar Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="aadharNumber"
                            value={userData.aadharNumber || ""}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">
                            Aadhar Front Image
                          </label>
                          {userData.aadharFrontImage ? (
                            <>
                              <img
                                src={userData.aadharFrontImage}
                                alt="Aadhar Front"
                                className="img-thumbnail w-100 mb-2"
                                style={{ maxHeight: "200px" }}
                              />
                              {isEditing && (
                                <div className="d-flex gap-2">
                                  <input
                                    type="file"
                                    id="aadharFrontInput"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, "aadharFrontImage")
                                    }
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="aadharFrontInput"
                                    className="btn btn-sm btn-outline-primary flex-grow-1"
                                  >
                                    Change Front
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                      handleRemoveImage("aadharFrontImage")
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="border rounded p-3 text-center text-muted mb-2">
                                No image uploaded
                              </div>
                              {isEditing && (
                                <>
                                  <input
                                    type="file"
                                    id="aadharFrontInput"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, "aadharFrontImage")
                                    }
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="aadharFrontInput"
                                    className="btn btn-sm btn-primary w-100"
                                  >
                                    Upload Front
                                  </label>
                                </>
                              )}
                            </>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">
                            Aadhar Back Image
                          </label>
                          {userData.aadharBackImage ? (
                            <>
                              <img
                                src={userData.aadharBackImage}
                                alt="Aadhar Back"
                                className="img-thumbnail w-100 mb-2"
                                style={{ maxHeight: "200px" }}
                              />
                              {isEditing && (
                                <div className="d-flex gap-2">
                                  <input
                                    type="file"
                                    id="aadharBackInput"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, "aadharBackImage")
                                    }
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="aadharBackInput"
                                    className="btn btn-sm btn-outline-primary flex-grow-1"
                                  >
                                    Change Back
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                      handleRemoveImage("aadharBackImage")
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="border rounded p-3 text-center text-muted mb-2">
                                No image uploaded
                              </div>
                              {isEditing && (
                                <>
                                  <input
                                    type="file"
                                    id="aadharBackInput"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, "aadharBackImage")
                                    }
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="aadharBackInput"
                                    className="btn btn-sm btn-primary w-100"
                                  >
                                    Upload Back
                                  </label>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PAN Card Section */}
                  <div className="card mb-4">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">PAN Card Details</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="panNumber" className="form-label">
                            PAN Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="panNumber"
                            value={userData.panNumber || ""}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">PAN Front Image</label>
                          {userData.panFrontImage ? (
                            <>
                              <img
                                src={userData.panFrontImage}
                                alt="PAN Front"
                                className="img-thumbnail w-100 mb-2"
                                style={{ maxHeight: "200px" }}
                              />
                              {isEditing && (
                                <div className="d-flex gap-2">
                                  <input
                                    type="file"
                                    id="panFrontInput"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, "panFrontImage")
                                    }
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="panFrontInput"
                                    className="btn btn-sm btn-outline-primary flex-grow-1"
                                  >
                                    Change Front
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                      handleRemoveImage("panFrontImage")
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="border rounded p-3 text-center text-muted mb-2">
                                No image uploaded
                              </div>
                              {isEditing && (
                                <>
                                  <input
                                    type="file"
                                    id="panFrontInput"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, "panFrontImage")
                                    }
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="panFrontInput"
                                    className="btn btn-sm btn-primary w-100"
                                  >
                                    Upload Front
                                  </label>
                                </>
                              )}
                            </>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">PAN Back Image</label>
                          {userData.panBackImage ? (
                            <>
                              <img
                                src={userData.panBackImage}
                                alt="PAN Back"
                                className="img-thumbnail w-100 mb-2"
                                style={{ maxHeight: "200px" }}
                              />
                              {isEditing && (
                                <div className="d-flex gap-2">
                                  <input
                                    type="file"
                                    id="panBackInput"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, "panBackImage")
                                    }
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="panBackInput"
                                    className="btn btn-sm btn-outline-primary flex-grow-1"
                                  >
                                    Change Back
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                      handleRemoveImage("panBackImage")
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="border rounded p-3 text-center text-muted mb-2">
                                No image uploaded
                              </div>
                              {isEditing && (
                                <>
                                  <input
                                    type="file"
                                    id="panBackInput"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, "panBackImage")
                                    }
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="panBackInput"
                                    className="btn btn-sm btn-primary w-100"
                                  >
                                    Upload Back
                                  </label>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-primary me-2"
                        onClick={handleSave}
                        style={{
                          background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                          
                        }}
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </section>

              {/* New Bank Details Section */}
              <section className="bg-white p-3 p-md-4 rounded shadow-sm">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                  <h3 className="h4 mb-3 mb-md-0">Bank Account Details</h3>
                  {!isEditingBank && (
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBank(true)}
                      style={{
                        background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                      }}
                    >
                      {userData.bankAccounts?.length
                        ? "Add Another Account"
                        : "Add Bank Account"}
                    </button>
                  )}
                </div>

                {isEditingBank ? (
                  <form onSubmit={handleBankSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="accountHolderName"
                          className="form-label"
                        >
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="accountHolderName"
                          value={bankFormData.accountHolderName || ""}
                          onChange={handleBankInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="accountNumber" className="form-label">
                          Account Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="accountNumber"
                          value={bankFormData.accountNumber || ""}
                          onChange={handleBankInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="bankName" className="form-label">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="bankName"
                          value={bankFormData.bankName || ""}
                          onChange={handleBankInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="ifscCode" className="form-label">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ifscCode"
                          value={bankFormData.ifscCode || ""}
                          onChange={handleBankInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="accountType" className="form-label">
                          Account Type
                        </label>
                        <select
                          className="form-select"
                          id="accountType"
                          value={bankFormData.accountType || ""}
                          onChange={handleBankInputChange}
                          required
                        >
                          <option value="">Select Account Type</option>
                          <option value="Savings">Savings</option>
                          <option value="Current">Current</option>
                          <option value="Salary">Salary</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="branch" className="form-label">
                          Branch
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="branch"
                          value={bankFormData.branch || ""}
                          onChange={handleBankInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Bank Passbook/Canceled Cheque
                      </label>
                      {bankFormData.bankProof ? (
                        <>
                          <img
                            src={bankFormData.bankProof}
                            alt="Bank Proof"
                            className="img-thumbnail w-100 mb-2"
                            style={{ maxHeight: "200px" }}
                          />
                          <div className="d-flex gap-2">
                            <input
                              type="file"
                              id="bankProofInput"
                              accept="image/*"
                              onChange={handleBankProofUpload}
                              className="d-none"
                            />
                            <label
                              htmlFor="bankProofInput"
                              className="btn btn-sm btn-outline-primary flex-grow-1"
                            >
                              Change Document
                            </label>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                setBankFormData({
                                  ...bankFormData,
                                  bankProof: null,
                                })
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="border rounded p-3 text-center text-muted mb-2">
                            No document uploaded
                          </div>
                          <input
                            type="file"
                            id="bankProofInput"
                            accept="image/*"
                            onChange={handleBankProofUpload}
                            className="d-none"
                          />
                          <label
                            htmlFor="bankProofInput"
                            className="btn btn-sm btn-primary w-100"
                          >
                            Upload Document
                          </label>
                        </>
                      )}
                      <div className="form-text">
                        Upload clear image of your passbook first page or
                        canceled cheque
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" style={{ background: "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)", border: "none" }} className="btn btn-primary me-2">
                        Save Bank Details
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setIsEditingBank(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    {userData.bankAccounts?.length ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>Bank Name</th>
                              <th>Account Number</th>
                              <th>Account Type</th>
                              <th>IFSC Code</th>
                              <th>Primary</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userData.bankAccounts.map((account, index) => (
                              <tr key={index}>
                                <td>
                                  <div className="fw-medium">
                                    {account.bankName}
                                  </div>
                                  <small className="text-muted">
                                    {account.branch}
                                  </small>
                                </td>
                                <td className="font-monospace">
                                  ****{account.accountNumber.slice(-4)}
                                </td>
                                <td>
                                  <span className="badge bg-info bg-opacity-10 text-info">
                                    {account.accountType}
                                  </span>
                                </td>
                                <td className="font-monospace">
                                  {account.ifscCode}
                                </td>
                                <td>
                                  {account.isPrimary ? (
                                    <span className="badge bg-success">
                                      Primary
                                    </span>
                                  ) : (
                                    <button
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => handleSetPrimary(index)}
                                    >
                                      Set Primary
                                    </button>
                                  )}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-outline-danger me-2"
                                    onClick={() => handleDeleteBank(index)}
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleEditBank(index)}
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5 bg-light rounded">
                        <i className="bi bi-bank fs-1 text-muted mb-3"></i>
                        <h5 className="mb-2">No Bank Accounts Added</h5>
                      </div>
                    )}
                  </>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
