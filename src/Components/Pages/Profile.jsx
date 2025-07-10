import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaSearch,
  FaUserCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineLogout, HiOutlineCog, HiOutlineBell } from "react-icons/hi";
import { MdDashboard, MdAccountBalanceWallet, MdReceipt } from "react-icons/md";
import InvestmentPerformanceChat from "../Charts/InvestmentPerformanceChat";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import MyWallet from "../Dashboard/MyWallet";
import TransactionHistory from "../Dashboard/TransactionHistory";
import EditProfile from "../Dashboard/EditProfile";
import Notification from "../Dashboard/Notification";
import axios from "axios";
import MyPlan from "../Dashboard/MyPlan";
import ResearchAnalysis from "../Dashboard/ResearchAnalysis";

// Move SidebarContent outside of Profile component
const SidebarContent = ({
  userData,
  handleImageUpload,
  menuItems,
  activeSection,
  setActiveSection,
  Navigate,
}) => (
  <>
    <div className="profile-section text-center mb-4">
      <div className="position-relative d-inline-block">
        <img
          src={`${import.meta.env.VITE_FILE_URL}${
            userData.profileImage || "default-profile.png"
          }`}
          alt="Profile"
          className="rounded-circle profile-image"
        />
        <label htmlFor="profileImageUpload" className="profile-upload-btn">
          <FaUserCog className="upload-icon" />
          <input
            type="file"
            id="profileImageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="d-none"
          />
        </label>
      </div>

      <h3 className="mt-3 mb-1 profile-name">
        {`${userData.firstName} ${userData.middleName} ${userData.lastName}`}
      </h3>
      <p className="profile-email">{userData.userEmail}</p>

      {/* <div className="social-links d-flex justify-content-center gap-3 my-3">
        <a href="#" className="social-icon">
          <FaFacebook />
        </a>
        <a href="#" className="social-icon">
          <FaTwitter />
        </a>
        <a href="#" className="social-icon">
          <FaLinkedinIn />
        </a>
      </div> */}
    </div>

    <nav className="menu-nav">
      <ul className="nav flex-column">
        {menuItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link ${
                activeSection === item.label ? "active" : ""
              }`}
              onClick={() => setActiveSection(item.label)}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>

    <button
      className="logout-btn mt-auto"
      onClick={() => {
        Swal.fire({
          title: "Are you sure?",
          text: "You will be logged out!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, logout",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("token");
            Navigate("/login");
          }
        });
      }}
    >
      <HiOutlineLogout className="me-2" />
      Logout
    </button>
  </>
);

const Profile = () => {
  const Navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    userEmail: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    aadharNumber: "",
    aadharFrontImage: "",
    aadharBackImage: "",
    panNumber: "",
    panFrontImage: "",
    panBackImage: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [hasTakenPlan, setHasTakenPlan] = useState();

  const menuItems = [
    { label: "Dashboard", icon: <MdDashboard className="me-2" /> },
    { label: "My Plan", icon: <MdAccountBalanceWallet className="me-2" /> },
    {
      label: "Research Analysis",
      icon: <MdAccountBalanceWallet className="me-2" />,
    },
    { label: "Transaction", icon: <MdReceipt className="me-2" /> },
    { label: "Notifications", icon: <HiOutlineBell className="me-2" /> },
    { label: "Settings", icon: <HiOutlineCog className="me-2" /> },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserData();
    hasUserTakenPlan();
  }, []);

  const hasUserTakenPlan = async () => {
    console.log("bsedghj");
    
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}hasUserTakenPlan`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data.message);
      
      if (response.data.hasPlan === false) {
        setHasTakenPlan(response.data.plan);
        // navigate("/profile");
        if (response.data.message === "User has not taken any plan.") {
          Swal.fire({
            title: "Error",
            text: "You have not taken any plan yet.",
            icon: "error",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              Navigate("/agreementForm");
            }
          });
        }
      }
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getUserById`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status && response.data.data) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch user data",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfileImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}updateProfileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        fetchUserData();
        return response.data;
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      throw error;
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show confirmation dialog before uploading
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update your profile picture?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!confirmResult.isConfirmed) {
      return; // User canceled
    }

    try {
      const result = await updateProfileImage(file);
      setUserData((prev) => ({
        ...prev,
        profileImage: result.profileImageUrl,
      }));
      Swal.fire("Success", "Profile image updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update profile image", "error");
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-gray-100">
      {/* Mobile Menu Button */}

      {/* Sidebar - Desktop */}
      <aside className="d-none d-md-block col-md-3 bg-white p-4 shadow-sm sidebar">
        <SidebarContent
          userData={userData}
          handleImageUpload={handleImageUpload}
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          Navigate={Navigate}
        />
      </aside>

      {/* Sidebar - Mobile */}
      {showMobileMenu && (
        <div className="mobile-sidebar-overlay d-md-none">
          <div className="mobile-sidebar bg-white">
            <div className="mobile-sidebar-header d-flex justify-content-end p-3">
              <button
                className="close-btn bg-transparent border-0"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaTimes size={24} />
              </button>
            </div>
            <SidebarContent
              userData={userData}
              handleImageUpload={handleImageUpload}
              menuItems={menuItems}
              activeSection={activeSection}
              setActiveSection={(section) => {
                setActiveSection(section);
                setShowMobileMenu(false);
              }}
              Navigate={Navigate}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow-1 p-3 p-md-4">
        {/* Mobile Header */}
        <div className="d-md-none mobile-header mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">{activeSection}</h4>
            <div className="position-relative">
              <button
                className="profile-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src={`${import.meta.env.VITE_FILE_URL}${
                    userData.profileImage || "default-profile.png"
                  }`}
                  alt="Profile"
                  className="profile-image-sm"
                />
              </button>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <img
                      src={`${import.meta.env.VITE_FILE_URL}${
                        userData.profileImage || "default-profile.png"
                      }`}
                      alt="Profile"
                      className="dropdown-profile-image"
                    />
                    <div>
                      <h6>{`${userData.firstName} ${userData.lastName}`}</h6>
                      <small>{userData.userEmail}</small>
                    </div>
                  </div>

                  <div className="dropdown position-relative">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        className={`dropdown-item ${
                          activeSection === item.label ? "active" : ""
                        }`}
                        onClick={() => {
                          setActiveSection(item.label);
                          setShowDropdown(false);
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <button
                    className="dropdown-logout"
                    onClick={() => {
                      localStorage.removeItem("token");
                      Navigate("/login");
                    }}
                  >
                    <HiOutlineLogout className="me-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="search-bar mt-3">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="content-container">
          {activeSection === "Dashboard" && (
            <div className="dashboard-content">
              <div className="d-none d-md-flex justify-content-between align-items-center mb-4">
                <h3 className="welcome-title">Welcome, {userData.firstName}</h3>
                <div className="search-bar" style={{ width: "300px" }}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div>

              <div className="row g-4 mb-4">
                {/* <InvestmentPerformanceCard /> */}
                <InvestmentPerformanceChat />
                {/* <ActivePlanSnapshot /> */}
              </div>
            </div>
          )}

          {/* {activeSection === "My Wallet" && <MyWallet />} */}
          {activeSection === "Research Analysis" && <ResearchAnalysis />}
          {activeSection === "My Plan" && <MyPlan />}
          {activeSection === "Transaction" && <TransactionHistory />}
          {activeSection === "Notifications" && <Notification />}
          {activeSection === "Settings" && <EditProfile />}
        </div>
      </main>

      {/* CSS Styles */}
      <style jsx>{`
        .sidebar {
          position: sticky;
          top: 0;
          height: 130vh;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #eaeaea;
        }

        .mobile-menu-btn {
          position: fixed;
          top: 15px;
          left: 15px;
          z-index: 1000;
          background: #00833d;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .mobile-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1050;
          display: flex;
        }

        .mobile-sidebar {
          width: 280px;
          height: 100%;
          background: white;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out;
        }

        .mobile-sidebar-header {
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        .close-btn {
          background: none;
          border: none;
          color: #6c757d;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .mobile-sidebar-overlay::before {
          content: "";
          flex: 1;
          height: 100%;
        }

        .profile-section {
          padding: 1.5rem 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .profile-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border: 4px solid #f8f9fa;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .profile-upload-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: #00833d;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .profile-upload-btn:hover {
          transform: scale(1.1);
        }

        .profile-name {
          font-weight: 600;
          color: #2d3748;
          font-size: 1.25rem;
        }

        .profile-email {
          font-size: 0.875rem;
          color: #718096;
        }

        .social-icon {
          color: #4a5568;
          transition: color 0.2s ease;
          font-size: 1.1rem;
        }

        .social-icon:hover {
          color: #00833d;
        }

        .menu-nav .nav-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 8px;
          color: #4a5568;
          transition: all 0.3s ease;
          background: none;
          border: none;
          text-align: left;
          width: 100%;
        }

        .menu-nav .nav-link:hover {
          background-color: #f7fafc;
          color: #00833d;
        }

        .menu-nav .nav-link.active {
          background: linear-gradient(135deg, #00833d, #000000);
          color: white;
          font-weight: 500;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          color: #e53e3e;
          border-radius: 8px;
          transition: all 0.3s ease;
          margin-top: auto;
          width: 100%;
        }

        .logout-btn:hover {
          background-color: #fff5f5;
        }

        .mobile-header {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .profile-image-sm {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f8f9fa;
        }

        .profile-dropdown {
          position: absolute;
          right: 0;
          top: 100%;
          width: 280px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          overflow: hidden;
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .dropdown-profile-image {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 1rem;
        }

        .dropdown-menu {
          padding: 0.5rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          color: #4a5568;
        }

        .dropdown-item:hover {
          background-color: #f8f9fa;
        }

        .dropdown-item.active {
          color: #00833d;
          font-weight: 500;
        }

        .dropdown-logout {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          color: #e53e3e;
          border-top: 1px solid #f0f0f0;
        }

        .search-bar {
          position: relative;
        }

        .search-bar .input-group-text {
          background: white;
          border-right: none;
          color: #a0aec0;
        }

        .search-bar .form-control {
          border-left: none;
          padding-left: 0;
        }

        .search-bar .form-control:focus {
          box-shadow: none;
          border-color: #ced4da;
        }

        .content-container {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 120px);
        }

        .welcome-title {
          color: #2d3748;
          font-weight: 600;
        }

        @media (max-width: 767.98px) {
          .content-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
