import React, { useState, useEffect } from "react";
import {
  BsCashCoin,
  BsGraphUp,
  BsShieldCheck,
  BsExclamationTriangle,
  BsMegaphone,
} from "react-icons/bs";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const iconMap = {
    "cash-coin": <BsCashCoin />,
    "graph-up": <BsGraphUp />,
    "shield-check": <BsShieldCheck />,
    "exclamation-triangle": <BsExclamationTriangle />,
    megaphone: <BsMegaphone />,
  };

  const categoryMap = {
    "Wallet Withdrawal Successful": "Transaction",
    "New investment opportunity": "Investment",
    "KYC documents verified": "Account",
    "Deposit failed": "Transaction",
    "New feature added": "System",
  };

  const iconTypeMap = {
    "Transaction": "cash-coin",
    "Investment": "graph-up",
    "Account": "shield-check",
    "System": "megaphone",
  };

  const notificationTypeMap = {
    "Transaction": "success",
    "Investment": "info",
    "Account": "success",
    "System": "info",
    "failed": "warning",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}getNotificationsByUserId`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data.success) {
          const processedNotifications = response.data.data.map(notification => {
            // Determine category based on title
            let category = "System";
            Object.keys(categoryMap).forEach(key => {
              if (notification.title.includes(key)) {
                category = categoryMap[key];
              }
            });

            // Determine if notification is about failure
            const isFailure = notification.body.toLowerCase().includes("fail");

            return {
              id: notification._id,
              message: `${notification.title}: ${notification.body}`,
              category: category,
              icon: iconTypeMap[category],
              time: formatTime(notification.createdAt),
              isRead: false,
              type: isFailure ? "warning" : notificationTypeMap[category],
            };
          });

          setNotifications(processedNotifications);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  const formatTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <section
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              margin: 0,
              color: "#000000",
            }}
          >
            Notifications
          </h2>
        </div>

        <div className="notification-list">
          {paginatedNotifications.length > 0 ? (
            paginatedNotifications.map((notification) => {
              const bgColor = notification.isRead ? "#fff" : "#f6f6f6";
              const colorMap = {
                success: "#00833D",
                info: "#00833D",
                warning: "#f59e0b",
              };
              const badgeBgMap = {
                success: "rgba(0,131,61,0.1)",
                info: "rgba(0,0,0,0.05)",
                warning: "rgba(245,158,11,0.1)",
              };

              return (
                <div
                  key={notification.id}
                  className="notification-item mb-3"
                  style={{
                    padding: "1rem",
                    borderRadius: "12px",
                    borderLeft: `4px solid ${colorMap[notification.type]}`,
                    backgroundColor: bgColor,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div className="d-flex align-items-start">
                    <div
                      className="icon-circle me-3"
                      style={{
                        backgroundColor: badgeBgMap[notification.type],
                        color: colorMap[notification.type],
                      }}
                    >
                      {iconMap[notification.icon]}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <p
                          className={`mb-1 ${
                            !notification.isRead ? "fw-semibold" : ""
                          }`}
                          style={{ color: "#000000" }}
                        >
                          {notification.message}
                        </p>
                        <small className="text-muted">{notification.time}</small>
                      </div>
                      
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4">No notifications found</div>
          )}
        </div>

        {notifications.length > itemsPerPage && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                background: "#fff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>

            {Array.from(
              {
                length: Math.ceil(notifications.length / itemsPerPage),
              },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    background:
                      currentPage === i + 1
                        ? "linear-gradient(135deg, #00833D, #000000)"
                        : "#fff",
                    color: currentPage === i + 1 ? "#fff" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  {i + 1}
                </button>
              )
            ).slice(
              Math.max(0, currentPage - 2),
              Math.min(
                Math.ceil(notifications.length / itemsPerPage),
                currentPage + 1
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(notifications.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(notifications.length / itemsPerPage)
              }
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                background: "#fff",
                cursor:
                  currentPage === Math.ceil(notifications.length / itemsPerPage)
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  currentPage === Math.ceil(notifications.length / itemsPerPage)
                    ? 0.5
                    : 1,
              }}
            >
              Next
            </button>
          </div>
        )}

        <style jsx>{`
          .notification-item:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transform: translateY(-1px);
          }
          .icon-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Notification;