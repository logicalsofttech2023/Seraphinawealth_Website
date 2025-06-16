import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import InvestmentPerformanceChat from "../Charts/InvestmentPerformanceChat";
import InvestmentPerformanceCard from "../Charts/InvestmentPerformanceCard";
import ActivePlanSnapshot from "../Charts/ActivePlanSnapshot";
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
    { label: "My Wallet" },
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
import {
  BsCashCoin,
  BsGraphUp,
  BsShieldCheck,
  BsExclamationTriangle,
  BsMegaphone,
} from "react-icons/bs";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(dummyUser);
  const [showAddMoneyPopup, setShowAddMoneyPopup] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showBankAccountPopup, setShowBankAccountPopup] = useState(false);
  const [bankAccount, setBankAccount] = useState({
    bankName: "HDFC Bank",
    accountNumber: "1234567890",
    ifscCode: "HDFC0001234",
    accountHolderName: "John Doe",
  });

  const [filter, setFilter] = useState("all");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2025-06-01",

      type: "Deposit",
      amount: "+ ₹5,000",
      status: "Success",
    },
    {
      id: 2,
      date: "2025-06-03",
      type: "Withdrawal",
      amount: "- ₹2,000",
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-06-05",
      txnId: "TXN12345680",
      type: "Deposit",
      amount: "+ ₹10,000",
      status: "Success",
    },
    {
      id: 4,
      date: "2025-06-06",
      type: "Withdrawal",
      amount: "- ₹1,500",
      status: "Failed",
    },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleImageUpload = (e, fieldName) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prev => ({
        ...prev,
        [fieldName]: reader.result
      }));
    };
    reader.readAsDataURL(file);
  }
};

const handleRemoveImage = (fieldName) => {
  setUserData(prev => ({
    ...prev,
    [fieldName]: null
  }));
};

  const iconMap = {
    "cash-coin": <BsCashCoin />,
    "graph-up": <BsGraphUp />,
    "shield-check": <BsShieldCheck />,
    "exclamation-triangle": <BsExclamationTriangle />,
    megaphone: <BsMegaphone />,
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
                    cursor: "pointer",
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
          {/* Profile Icon for Mobile */}
          <div className="d-md-none position-relative d-flex justify-content-end mb-3">
            {/* Profile Button */}
            <button
              className="btn btn-light rounded-circle shadow-sm"
              style={{ width: "48px", height: "48px", padding: 0 }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={dummyUser.profileImage}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="position-absolute"
                style={{
                  top: "60px",
                  right: 0,
                  width: "220px",
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  zIndex: 1050,
                }}
              >
                <div className="text-center py-3 border-bottom">
                  <h6 className="mb-0">{dummyUser.name}</h6>
                  <small>@{dummyUser.username}</small>
                </div>

                <ul className="list-unstyled m-0 p-2">
                  {dummyUser.menuItems.map((item, index) => (
                    <li
                      key={index}
                      className={`py-2 px-3 rounded ${
                        activeSection === item.label
                          ? "bg-light fw-semibold"
                          : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setActiveSection(item.label);
                        setShowDropdown(false);
                      }}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>

                <div className="border-top p-2">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => {
                      // logout logic
                      setShowDropdown(false);
                    }}
                  >
                    <HiOutlineLogout className="me-2" /> Logout
                  </button>
                </div>
              </div>
            )}
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
                  <InvestmentPerformanceCard />
                  <InvestmentPerformanceChat />
                  <ActivePlanSnapshot />
                </div>
              </section>
            </>
          )}

          {activeSection === "My Wallet" && (
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p style={{ color: "#6c757d", marginBottom: "0.5rem" }}>
                      Available Balance
                    </p>
                    <h3 style={{ fontSize: "24px", fontWeight: "700" }}>
                      ₹12,456.00
                    </h3>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ color: "#6c757d", marginBottom: "0.5rem" }}>
                      Last Added
                    </p>
                    <p style={{ fontWeight: "500" }}>+ ₹5,000 (2 days ago)</p>
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
                <button
                  onClick={() => setShowAddMoneyPopup(true)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  Add Money
                </button>

                <button
                  onClick={() => setShowWithdrawPopup(true)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #E770C1",
                    background: "white",
                    color: "#E770C1",
                    fontWeight: 600,
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  Withdraw
                </button>
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
                    onClick={() => setShowBankAccountPopup(true)}
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
                    <span>Edit</span>
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
                        backgroundColor: "#f3e5ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#9F70FD",
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      {bankAccount.bankName.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                        {bankAccount.bankName} ••••
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
                      onClick={() => setShowBankAccountPopup(true)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: "none",
                        background:
                          "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
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
                    End-to-end encrypted transactions with RBI compliant
                    partners
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
              {showAddMoneyPopup && (
                <Popup
                  title="Add Money to Wallet"
                  onClose={() => setShowAddMoneyPopup(false)}
                >
                  <form>
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
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ced4da",
                          fontSize: "16px",
                        }}
                        placeholder="Enter amount"
                        min="1"
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
                        background:
                          "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      Add Money
                    </button>
                  </form>
                </Popup>
              )}

              {/* Withdraw Popup */}
              {showWithdrawPopup && (
                <Popup
                  title="Withdraw Money"
                  onClose={() => setShowWithdrawPopup(false)}
                >
                  <form>
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
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ced4da",
                          fontSize: "16px",
                        }}
                        placeholder="Enter amount to withdraw"
                        min="1"
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
                      <select
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
                        <option value="">Select Bank Account</option>
                        {bankAccount && (
                          <option value={bankAccount.id}>
                            {bankAccount.bankName} (••••
                            {bankAccount.accountNumber.slice(-4)})
                          </option>
                        )}
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          setShowWithdrawPopup(false);
                          setShowBankAccountPopup(true);
                        }}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "6px",
                          border: "1px dashed #E770C1",
                          background: "none",
                          color: "#E770C1",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5V19"
                            stroke="#E770C1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 12H19"
                            stroke="#E770C1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Add New Bank Account
                      </button>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        background:
                          "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "16px",
                        cursor: "pointer",
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
                  <form>
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
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ced4da",
                          fontSize: "16px",
                        }}
                        placeholder="Enter bank name"
                        defaultValue={bankAccount?.bankName || ""}
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
                        Account Number
                      </label>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ced4da",
                          fontSize: "16px",
                        }}
                        placeholder="Enter account number"
                        defaultValue={bankAccount?.accountNumber || ""}
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
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ced4da",
                          fontSize: "16px",
                        }}
                        placeholder="Enter IFSC code"
                        defaultValue={bankAccount?.ifscCode || ""}
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
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ced4da",
                          fontSize: "16px",
                        }}
                        placeholder="Enter account holder name"
                        defaultValue={bankAccount?.accountHolderName || ""}
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
                        background:
                          "linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)",
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
          )}

          {activeSection === "Transaction" && (
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
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    margin: 0,
                    color: "#2d3748",
                  }}
                >
                  Transaction History
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    background: "#f8fafc",
                    padding: "4px",
                    borderRadius: "8px",
                  }}
                >
                  {["all", "credit", "withdraw"].map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      style={{
                        padding: "0.375rem 0.75rem",
                        borderRadius: "6px",
                        border: "none",
                        background:
                          filter === filterType ? "#4f46e5" : "transparent",
                        color: filter === filterType ? "white" : "#64748b",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textTransform: "capitalize",
                      }}
                    >
                      {filterType}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {transactions
                  .filter(
                    (txn) =>
                      filter === "all" ||
                      (filter === "credit" && txn.type === "Deposit") ||
                      (filter === "withdraw" && txn.type === "Withdrawal")
                  )
                  .map((txn) => (
                    <div
                      key={txn.id}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "1rem 1.25rem",
                        border: "1px solid #e2e8f0",
                        transition: "all 0.2s ease",
                        ":hover": {
                          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                          transform: "translateY(-1px)",
                        },
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
                              background:
                                txn.type === "Deposit"
                                  ? "rgba(16, 185, 129, 0.1)"
                                  : "rgba(245, 158, 11, 0.1)",
                            }}
                          >
                            {txn.type === "Deposit" ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 5V19"
                                  stroke={
                                    txn.status === "Failed"
                                      ? "#ef4444"
                                      : "#10b981"
                                  }
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5 12H19"
                                  stroke={
                                    txn.status === "Failed"
                                      ? "#ef4444"
                                      : "#10b981"
                                  }
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12H19"
                                  stroke={
                                    txn.status === "Failed"
                                      ? "#ef4444"
                                      : "#f59e0b"
                                  }
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 5L19 12L12 19"
                                  stroke={
                                    txn.status === "Failed"
                                      ? "#ef4444"
                                      : "#f59e0b"
                                  }
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: 600,
                                color: "#1e293b",
                                fontSize: "1rem",
                              }}
                            >
                              {txn.type}
                            </p>
                            <p
                              style={{
                                margin: "0.25rem 0 0",
                                color: "#64748b",
                                fontSize: "0.875rem",
                              }}
                            >
                              {new Date(txn.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
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
                              color:
                                txn.type === "Deposit"
                                  ? txn.status === "Failed"
                                    ? "#ef4444"
                                    : "#10b981"
                                  : txn.status === "Failed"
                                  ? "#ef4444"
                                  : "#f59e0b",
                              fontSize: "1rem",
                            }}
                          >
                            {txn.amount}
                          </p>
                          <span
                            style={{
                              marginTop: "0.5rem",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              background:
                                txn.status === "Success"
                                  ? "#dcfce7"
                                  : txn.status === "Pending"
                                  ? "#fef9c3"
                                  : "#fee2e2",
                              color:
                                txn.status === "Success"
                                  ? "#166534"
                                  : txn.status === "Pending"
                                  ? "#854d0e"
                                  : "#991b1b",
                            }}
                          >
                            {txn.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {activeSection === "Notifications" && (
            <section className="bg-white rounded-3 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-semibold mb-0">Notifications</h2>
              </div>

              <div className="notification-list">
                {[
                  {
                    id: 1,
                    message:
                      "Your withdrawal request of ₹2,000 has been processed successfully",
                    category: "Transaction",
                    icon: "cash-coin",
                    time: "2 mins ago",
                    isRead: false,
                    type: "success",
                  },
                  {
                    id: 2,
                    message:
                      "New investment opportunity available - Fixed Deposit @ 7.5% returns",
                    category: "Investment",
                    icon: "graph-up",
                    time: "1 hour ago",
                    isRead: false,
                    type: "info",
                  },
                  {
                    id: 3,
                    message:
                      "Your KYC documents have been verified successfully",
                    category: "Account",
                    icon: "shield-check",
                    time: "5 hours ago",
                    isRead: true,
                    type: "success",
                  },
                  {
                    id: 4,
                    message:
                      "Failed to process your deposit of ₹5,000. Please try again",
                    category: "Transaction",
                    icon: "exclamation-triangle",
                    time: "Yesterday",
                    isRead: true,
                    type: "warning",
                  },
                  {
                    id: 5,
                    message:
                      "New feature added: You can now add multiple bank accounts",
                    category: "System",
                    icon: "megaphone",
                    time: "2 days ago",
                    isRead: true,
                    type: "info",
                  },
                ].map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item p-3 mb-3 rounded-3 border-start border-4 border-${
                      notification.type
                    } ${!notification.isRead ? "bg-light" : "bg-white"}`}
                  >
                    <div className="d-flex align-items-start">
                      <div
                        className={`icon-circle flex-shrink-0 me-3 bg-${notification.type}-subtle text-${notification.type}`}
                      >
                        {iconMap[notification.icon]}
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <p
                            className={`mb-1 ${
                              !notification.isRead ? "fw-semibold" : ""
                            }`}
                          >
                            {notification.message}
                          </p>
                          <small className="text-muted">
                            {notification.time}
                          </small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <span
                            className={`badge bg-${notification.type}-subtle text-${notification.type}`}
                          >
                            {notification.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <style jsx>{`
                .notification-item {
                  transition: all 0.2s ease;
                }
                .notification-item:hover {
                  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
                  transform: translateY(-1px);
                }
                .icon-circle {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 1.1rem;
                }
              `}</style>
            </section>
          )}

          {activeSection === "Settings" && (
  <>
    <section style={{
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        gap: '1rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#2d3748',
          margin: 0
        }}>Settings</h3>
        {!isEditing && (
          <button
            style={{
              background: 'linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)',
              borderRadius: '20px',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1.5rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(151, 70, 253, 0.3)',
              whiteSpace: 'nowrap',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(151, 70, 253, 0.4)'
              }
            }}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <form>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#4a5568'
              }}>First Name</label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                  backgroundColor: isEditing ? '#fff' : '#f8fafc',
                  transition: 'all 0.2s ease',
                  ':focus': {
                    outline: 'none',
                    borderColor: '#9F70FD',
                    boxShadow: '0 0 0 3px rgba(159, 112, 253, 0.1)'
                  }
                }}
                value={userData.firstName || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#4a5568'
              }}>Middle Name</label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                  backgroundColor: isEditing ? '#fff' : '#f8fafc',
                  transition: 'all 0.2s ease'
                }}
                value={userData.middleName || ""}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#4a5568'
              }}>Last Name</label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                  backgroundColor: isEditing ? '#fff' : '#f8fafc',
                  transition: 'all 0.2s ease'
                }}
                value={userData.lastName || ""}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#4a5568'
              }}>Email Address</label>
              <input
                type="email"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                  backgroundColor: isEditing ? '#fff' : '#f8fafc',
                  transition: 'all 0.2s ease'
                }}
                value={userData.userEmail || ""}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#4a5568'
              }}>Date of Birth</label>
              <input
                type="date"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                  backgroundColor: isEditing ? '#fff' : '#f8fafc',
                  transition: 'all 0.2s ease',
                  color: userData.dob ? '#1a202c' : '#a0aec0'
                }}
                value={userData.dob || ""}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#4a5568'
              }}>Gender</label>
              {isEditing ? (
                <select
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#fff',
                    transition: 'all 0.2s ease',
                    color: userData.gender ? '#1a202c' : '#a0aec0',
                    cursor: 'pointer'
                  }}
                  value={userData.gender || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #f7fafc',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.2s ease'
                  }}
                  value={userData.gender || ""}
                  readOnly
                />
              )}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#4a5568'
            }}>Address</label>
            <textarea
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                backgroundColor: isEditing ? '#fff' : '#f8fafc',
                transition: 'all 0.2s ease',
                minHeight: '100px',
                resize: 'vertical'
              }}
              value={userData.address || ""}
              readOnly={!isEditing}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#4a5568'
              }}>Phone Number</label>
              <input
                type="tel"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                  backgroundColor: isEditing ? '#fff' : '#f8fafc',
                  transition: 'all 0.2s ease'
                }}
                value={userData.phone || ""}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Aadhar Card Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            backgroundColor: '#f1f5f9',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <h5 style={{
              margin: 0,
              fontWeight: '600',
              color: '#2d3748'
            }}>Aadhar Card Details</h5>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>Aadhar Number</label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                    backgroundColor: isEditing ? '#fff' : '#f8fafc',
                    transition: 'all 0.2s ease'
                  }}
                  value={userData.aadharNumber || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>Aadhar Front Image</label>
                {userData.aadharFrontImage ? (
                  <>
                    <img
                      src={userData.aadharFrontImage}
                      alt="Aadhar Front"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'contain',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginBottom: '0.75rem',
                        backgroundColor: '#fff'
                      }}
                    />
                    {isEditing && (
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem'
                      }}>
                        <input
                          type="file"
                          id="aadharFrontInput"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "aadharFrontImage")}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="aadharFrontInput"
                          style={{
                            flex: '1',
                            padding: '0.5rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            border: '1px solid #9F70FD',
                            color: '#9F70FD',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#f3f0ff'
                            }
                          }}
                        >
                          Change Front
                        </label>
                        <button
                          type="button"
                          style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid #e53e3e',
                            color: '#e53e3e',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#fff5f5'
                            }
                          }}
                          onClick={() => handleRemoveImage("aadharFrontImage")}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{
                      border: '1px dashed #e2e8f0',
                      borderRadius: '8px',
                      padding: '2rem',
                      textAlign: 'center',
                      color: '#a0aec0',
                      marginBottom: '0.75rem',
                      backgroundColor: '#f8fafc'
                    }}>
                      No image uploaded
                    </div>
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          id="aadharFrontInput"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "aadharFrontImage")}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="aadharFrontInput"
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.75rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            backgroundColor: '#9F70FD',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#8c5cf6'
                            }
                          }}
                        >
                          Upload Front
                        </label>
                      </>
                    )}
                  </>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>Aadhar Back Image</label>
                {userData.aadharBackImage ? (
                  <>
                    <img
                      src={userData.aadharBackImage}
                      alt="Aadhar Back"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'contain',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginBottom: '0.75rem',
                        backgroundColor: '#fff'
                      }}
                    />
                    {isEditing && (
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem'
                      }}>
                        <input
                          type="file"
                          id="aadharBackInput"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "aadharBackImage")}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="aadharBackInput"
                          style={{
                            flex: '1',
                            padding: '0.5rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            border: '1px solid #9F70FD',
                            color: '#9F70FD',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#f3f0ff'
                            }
                          }}
                        >
                          Change Back
                        </label>
                        <button
                          type="button"
                          style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid #e53e3e',
                            color: '#e53e3e',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#fff5f5'
                            }
                          }}
                          onClick={() => handleRemoveImage("aadharBackImage")}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{
                      border: '1px dashed #e2e8f0',
                      borderRadius: '8px',
                      padding: '2rem',
                      textAlign: 'center',
                      color: '#a0aec0',
                      marginBottom: '0.75rem',
                      backgroundColor: '#f8fafc'
                    }}>
                      No image uploaded
                    </div>
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          id="aadharBackInput"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "aadharBackImage")}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="aadharBackInput"
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.75rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            backgroundColor: '#9F70FD',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#8c5cf6'
                            }
                          }}
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
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            backgroundColor: '#f1f5f9',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <h5 style={{
              margin: 0,
              fontWeight: '600',
              color: '#2d3748'
            }}>PAN Card Details</h5>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>PAN Number</label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${isEditing ? '#e2e8f0' : '#f7fafc'}`,
                    backgroundColor: isEditing ? '#fff' : '#f8fafc',
                    transition: 'all 0.2s ease'
                  }}
                  value={userData.panNumber || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>PAN Front Image</label>
                {userData.panFrontImage ? (
                  <>
                    <img
                      src={userData.panFrontImage}
                      alt="PAN Front"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'contain',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginBottom: '0.75rem',
                        backgroundColor: '#fff'
                      }}
                    />
                    {isEditing && (
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem'
                      }}>
                        <input
                          type="file"
                          id="panFrontInput"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "panFrontImage")}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="panFrontInput"
                          style={{
                            flex: '1',
                            padding: '0.5rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            border: '1px solid #9F70FD',
                            color: '#9F70FD',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#f3f0ff'
                            }
                          }}
                        >
                          Change Front
                        </label>
                        <button
                          type="button"
                          style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid #e53e3e',
                            color: '#e53e3e',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#fff5f5'
                            }
                          }}
                          onClick={() => handleRemoveImage("panFrontImage")}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{
                      border: '1px dashed #e2e8f0',
                      borderRadius: '8px',
                      padding: '2rem',
                      textAlign: 'center',
                      color: '#a0aec0',
                      marginBottom: '0.75rem',
                      backgroundColor: '#f8fafc'
                    }}>
                      No image uploaded
                    </div>
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          id="panFrontInput"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "panFrontImage")}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="panFrontInput"
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.75rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            backgroundColor: '#9F70FD',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#8c5cf6'
                            }
                          }}
                        >
                          Upload Front
                        </label>
                      </>
                    )}
                  </>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>PAN Back Image</label>
                {userData.panBackImage ? (
                  <>
                    <img
                      src={userData.panBackImage}
                      alt="PAN Back"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'contain',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginBottom: '0.75rem',
                        backgroundColor: '#fff'
                      }}
                    />
                    {isEditing && (
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem'
                      }}>
                        <input
                          type="file"
                          id="panBackInput"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "panBackImage")}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="panBackInput"
                          style={{
                            flex: '1',
                            padding: '0.5rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            border: '1px solid #9F70FD',
                            color: '#9F70FD',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#f3f0ff'
                            }
                          }}
                        >
                          Change Back
                        </label>
                        <button
                          type="button"
                          style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid #e53e3e',
                            color: '#e53e3e',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#fff5f5'
                            }
                          }}
                          onClick={() => handleRemoveImage("panBackImage")}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{
                      border: '1px dashed #e2e8f0',
                      borderRadius: '8px',
                      padding: '2rem',
                      textAlign: 'center',
                      color: '#a0aec0',
                      marginBottom: '0.75rem',
                      backgroundColor: '#f8fafc'
                    }}>
                      No image uploaded
                    </div>
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          id="panBackInput"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "panBackImage")}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="panBackInput"
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.75rem',
                            textAlign: 'center',
                            borderRadius: '8px',
                            backgroundColor: '#9F70FD',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              backgroundColor: '#8c5cf6'
                            }
                          }}
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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'flex-end'
          }}>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                type="button"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: 'transparent',
                  color: '#4a5568',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: '#f7fafc'
                  }
                }}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(106deg, #E770C1 11.27%, #9F70FD 88.73%)',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(151, 70, 253, 0.3)',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(151, 70, 253, 0.4)'
                  }
                }}
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  </>
)}
        </main>
      </div>
    </>
  );
};

export default Profile;