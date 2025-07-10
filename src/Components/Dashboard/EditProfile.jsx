import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const EditProfile = () => {
  const Navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
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
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isAadharFrontBroken, setIsAadharFrontBroken] = useState(false);
  const [isAadharBackBroken, setIsAadharBackBroken] = useState(false);
  const [isPanFrontBroken, setIsPanFrontBroken] = useState(false);
  const [isPanBackBroken, setIsPanBackBroken] = useState(false);
    const [errors, setErrors] = useState({});


  // Fetch user data on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!userData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!userData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!userData.userEmail?.trim()) {
      newErrors.userEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.userEmail)) {
      newErrors.userEmail = "Please enter a valid email address";
    }

    if (!userData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!userData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!userData.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (!userData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(userData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!userData.aadharNumber?.trim()) {
      newErrors.aadharNumber = "Aadhar number is required";
    } else if (!/^[0-9]{12}$/.test(userData.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar number must be 12 digits";
    }

    if (!userData.aadharFrontImage) {
      newErrors.aadharFrontImage = "Aadhar front image is required";
    }

    if (!userData.aadharBackImage) {
      newErrors.aadharBackImage = "Aadhar back image is required";
    }

    if (!userData.panNumber?.trim()) {
      newErrors.panNumber = "PAN number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(userData.panNumber)) {
      newErrors.panNumber = "Please enter a valid PAN number";
    }

    if (!userData.panFrontImage) {
      newErrors.panFrontImage = "PAN front image is required";
    }

    if (!userData.panBackImage) {
      newErrors.panBackImage = "PAN back image is required";
    }

    return newErrors;
  };


  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Assuming you store token in localStorage

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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancel = () => {
    fetchUserData(); // Re-fetch original data
    setIsEditing(false);
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (
          key !== "aadharFrontImage" &&
          key !== "aadharBackImage" &&
          key !== "panFrontImage" &&
          key !== "panBackImage"
        ) {
          formData.append(key, userData[key]);
        }
      });

      if (userData.aadharFrontImage instanceof File) {
        formData.append("aadharFrontImage", userData.aadharFrontImage);
      }
      if (userData.aadharBackImage instanceof File) {
        formData.append("aadharBackImage", userData.aadharBackImage);
      }
      if (userData.panFrontImage instanceof File) {
        formData.append("panFrontImage", userData.panFrontImage);
      }
      if (userData.panBackImage instanceof File) {
        formData.append("panBackImage", userData.panBackImage);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        setSubmitting(false);
        fetchUserData();
        setIsEditing(false);
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update profile",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        [key]: file, // Store the File object
      }));

      // Reset broken image flags
      if (key === "aadharFrontImage") setIsAadharFrontBroken(false);
      if (key === "aadharBackImage") setIsAadharBackBroken(false);
      if (key === "panFrontImage") setIsPanFrontBroken(false);
      if (key === "panBackImage") setIsPanBackBroken(false);
    }
  };

  const handleRemoveImage = (fieldName) => {
    setUserData((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  if (loading) {
    return (
      <section
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          marginBottom: "2rem",
        }}
      >
        <Stack spacing={2}>
          {/* Header Skeleton */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton variant="text" width={150} height={40} />
            <Skeleton variant="rounded" width={120} height={40} />
          </div>

          {/* Personal Info Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
          </div>

          <Skeleton variant="rounded" height={120} />

          {/* Aadhar Card Section */}
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rounded" height={80} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            <Skeleton variant="rounded" height={250} />
            <Skeleton variant="rounded" height={250} />
          </div>

          {/* PAN Card Section */}
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rounded" height={80} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            <Skeleton variant="rounded" height={250} />
            <Skeleton variant="rounded" height={250} />
          </div>

          {/* Action Buttons */}
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <Skeleton variant="rounded" width={100} height={40} />
            <Skeleton variant="rounded" width={150} height={40} />
          </div>
        </Stack>
      </section>
    );
  }
  return (
    <>
      <section
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            gap: "1rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#2d3748",
              margin: 0,
            }}
          >
            Settings
          </h3>
          {!isEditing && (
            <button
              style={{
                background: "linear-gradient(135deg, #00833D, #000000)",
                borderRadius: "20px",
                color: "white",
                border: "none",
                padding: "0.5rem 1.5rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(151, 70, 253, 0.3)",
                whiteSpace: "nowrap",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(151, 70, 253, 0.4)",
                },
              }}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        <form>
          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#4a5568",
                  }}
                >
                  First Name *
                </label>
                <input
                  type="text"
                   id="firstName"
                  name="firstName"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: `1px solid ${
                      errors.firstName
                        ? "#e53e3e"
                        : isEditing
                        ? "#e2e8f0"
                        : "#f7fafc"
                    }`,
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                    transition: "all 0.2s ease",
                  }}
                  value={userData.firstName || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
                {errors.firstName && (
                  <p
                    style={{
                      color: "#e53e3e",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#4a5568",
                  }}
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: `1px solid ${isEditing ? "#e2e8f0" : "#f7fafc"}`,
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                    transition: "all 0.2s ease",
                  }}
                  value={userData.middleName || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#4a5568",
                  }}
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: `1px solid ${
                      errors.lastName
                        ? "#e53e3e"
                        : isEditing
                        ? "#e2e8f0"
                        : "#f7fafc"
                    }`,
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                    transition: "all 0.2s ease",
                  }}
                  value={userData.lastName || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <p
                    style={{
                      color: "#e53e3e",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#4a5568",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: `1px solid ${
                      errors.userEmail
                        ? "#e53e3e"
                        : isEditing
                        ? "#e2e8f0"
                        : "#f7fafc"
                    }`,
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                    transition: "all 0.2s ease",
                  }}
                  value={userData.userEmail || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
                {errors.userEmail && (
                  <p
                    style={{
                      color: "#e53e3e",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.userEmail}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#4a5568",
                  }}
                >
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: `1px solid ${
                      errors.dob ? "#e53e3e" : isEditing ? "#e2e8f0" : "#f7fafc"
                    }`,
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                    transition: "all 0.2s ease",
                    color: userData.dob ? "#1a202c" : "#a0aec0",
                  }}
                  value={userData.dob || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
                {errors.dob && (
                  <p
                    style={{
                      color: "#e53e3e",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.dob}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#4a5568",
                  }}
                >
                  Gender *
                </label>
                {isEditing ? (
                  <>
                    <select
                      name="gender"
                      id="gender"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: `1px solid ${
                          errors.gender ? "#e53e3e" : "#e2e8f0"
                        }`,
                        backgroundColor: "#fff",
                        transition: "all 0.2s ease",
                        color: userData.gender ? "#1a202c" : "#a0aec0",
                        cursor: "pointer",
                      }}
                      value={userData.gender || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <p
                        style={{
                          color: "#e53e3e",
                          fontSize: "0.75rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {errors.gender}
                      </p>
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: "1px solid #f7fafc",
                      backgroundColor: "#f8fafc",
                      transition: "all 0.2s ease",
                    }}
                    value={userData.gender || ""}
                    readOnly
                  />
                )}
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#4a5568",
                }}
              >
                Address *
              </label>
              <textarea
                name="address"
                id="address"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: `1px solid ${
                    errors.address
                      ? "#e53e3e"
                      : isEditing
                      ? "#e2e8f0"
                      : "#f7fafc"
                  }`,
                  backgroundColor: isEditing ? "#fff" : "#f8fafc",
                  transition: "all 0.2s ease",
                  minHeight: "100px",
                  resize: "vertical",
                }}
                value={userData.address || ""}
                readOnly={!isEditing}
                onChange={handleInputChange}
              ></textarea>
              {errors.address && (
                <p
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.address}
                </p>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#4a5568",
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: `1px solid ${
                      errors.phone
                        ? "#e53e3e"
                        : isEditing
                        ? "#e2e8f0"
                        : "#f7fafc"
                    }`,
                    backgroundColor: isEditing ? "#fff" : "#f8fafc",
                    transition: "all 0.2s ease",
                  }}
                  value={userData.phone || ""}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <p
                    style={{
                      color: "#e53e3e",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Aadhar Card Section */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                backgroundColor: "#f1f5f9",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <h5
                style={{
                  margin: 0,
                  fontWeight: "600",
                  color: "#2d3748",
                }}
              >
                Aadhar Card Details
              </h5>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#4a5568",
                    }}
                  >
                    Aadhar Number *
                  </label>
                  <input
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: `1px solid ${
                        errors.aadharNumber
                          ? "#e53e3e"
                          : isEditing
                          ? "#e2e8f0"
                          : "#f7fafc"
                      }`,
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      transition: "all 0.2s ease",
                    }}
                    value={userData.aadharNumber || ""}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                  />
                  {errors.aadharNumber && (
                    <p
                      style={{
                        color: "#e53e3e",
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.aadharNumber}
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#4a5568",
                    }}
                  >
                    Aadhar Front Image *
                  </label>
                  {userData.aadharFrontImage && !isAadharFrontBroken ? (
                    <>
                      <img
                        src={
                          typeof userData.aadharFrontImage === "string"
                            ? `${import.meta.env.VITE_FILE_URL}${
                                userData.aadharFrontImage
                              }`
                            : URL.createObjectURL(userData.aadharFrontImage)
                        }
                        alt="Aadhar Front"
                        onError={() => setIsAadharFrontBroken(true)}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          border: `1px solid ${
                            errors.aadharFrontImage ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          marginBottom: "0.75rem",
                          backgroundColor: "#fff",
                        }}
                      />
                      {isEditing && (
                        <div style={{ display: "flex", gap: "0.75rem" }}>
                          <input
                            type="file"
                            id="aadharFrontInput"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, "aadharFrontImage")
                            }
                            style={{ display: "none" }}
                          />
                          
                          <label
                            htmlFor="aadharFrontInput"
                            style={{
                              flex: "1",
                              padding: "0.5rem",
                              textAlign: "center",
                              borderRadius: "8px",
                              border: "1px solid #00833D",
                              color: "black",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            Change Front
                          </label>
                          <button
                            type="button"
                            style={{
                              padding: "0.5rem",
                              borderRadius: "8px",
                              border: "1px solid #e53e3e",
                              color: "#e53e3e",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                            }}
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
                      <div
                        style={{
                          border: `1px dashed ${
                            errors.aadharFrontImage ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          padding: "2rem",
                          textAlign: "center",
                          color: "#a0aec0",
                          marginBottom: "0.75rem",
                          backgroundColor: "#f8fafc",
                        }}
                      >
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
                            style={{ display: "none" }}
                          />
                          
                          <label
                            htmlFor="aadharFrontInput"
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "0.75rem",
                              textAlign: "center",
                              borderRadius: "8px",
                              background:
                                "linear-gradient(135deg, #00833D, #000000)",
                              color: "white",
                              cursor: "pointer",
                            }}
                          >
                            Upload Front
                          </label>
                        </>
                      )}
                    </>
                  )}
                  {errors.aadharFrontImage && (
                    <p
                      style={{
                        color: "#e53e3e",
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.aadharFrontImage}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#4a5568",
                    }}
                  >
                    Aadhar Back Image *
                  </label>
                  {userData.aadharBackImage && !isAadharBackBroken ? (
                    <>
                      <img
                        src={
                          typeof userData.aadharBackImage === "string"
                            ? `${import.meta.env.VITE_FILE_URL}${
                                userData.aadharBackImage
                              }`
                            : URL.createObjectURL(userData.aadharBackImage)
                        }
                        alt="Aadhar Back"
                        onError={() => setIsAadharBackBroken(true)}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          border: `1px solid ${
                            errors.aadharBackImage ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          marginBottom: "0.75rem",
                          backgroundColor: "#fff",
                        }}
                      />
                      {isEditing && (
                        <div
                          style={{
                            display: "flex",
                            gap: "0.75rem",
                          }}
                        >
                          <input
                            type="file"
                            id="aadharBackInput"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, "aadharBackImage")
                            }
                            style={{ display: "none" }}
                          />
                          
                          <label
                            htmlFor="aadharBackInput"
                            style={{
                              flex: "1",
                              padding: "0.5rem",
                              textAlign: "center",
                              borderRadius: "8px",
                              border: "1px solid #00833D",
                              color: "black",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#f3f0ff",
                              },
                            }}
                          >
                            Change Back
                          </label>
                          <button
                            type="button"
                            style={{
                              padding: "0.5rem",
                              borderRadius: "8px",
                              border: "1px solid #e53e3e",
                              color: "#e53e3e",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#fff5f5",
                              },
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
                      <div
                        style={{
                          border: `1px dashed ${
                            errors.aadharBackImage ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          padding: "2rem",
                          textAlign: "center",
                          color: "#a0aec0",
                          marginBottom: "0.75rem",
                          backgroundColor: "#f8fafc",
                        }}
                      >
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
                            style={{ display: "none" }}
                          />
                          
                          <label
                            htmlFor="aadharBackInput"
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "0.75rem",
                              textAlign: "center",
                              borderRadius: "8px",
                              background:
                                "linear-gradient(135deg, #00833D, #000000)",
                              color: "white",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#8c5cf6",
                              },
                            }}
                          >
                            Upload Back
                          </label>
                        </>
                      )}
                    </>
                  )}
                  {errors.aadharBackImage && (
                    <p
                      style={{
                        color: "#e53e3e",
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.aadharBackImage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PAN Card Section */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                backgroundColor: "#f1f5f9",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <h5
                style={{
                  margin: 0,
                  fontWeight: "600",
                  color: "#2d3748",
                }}
              >
                PAN Card Details
              </h5>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#4a5568",
                    }}
                  >
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    id="panNumber"
                    name="panNumber"

                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: `1px solid ${
                        errors.panNumber
                          ? "#e53e3e"
                          : isEditing
                          ? "#e2e8f0"
                          : "#f7fafc"
                      }`,
                      backgroundColor: isEditing ? "#fff" : "#f8fafc",
                      transition: "all 0.2s ease",
                    }}
                    value={userData.panNumber || ""}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                  />
                  {errors.panNumber && (
                    <p
                      style={{
                        color: "#e53e3e",
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.panNumber}
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#4a5568",
                    }}
                  >
                    PAN Front Image *
                  </label>
                  {userData.panFrontImage && !isPanFrontBroken ? (
                    <>
                      <img
                        src={
                          typeof userData.panFrontImage === "string"
                            ? `${import.meta.env.VITE_FILE_URL}${
                                userData.panFrontImage
                              }`
                            : URL.createObjectURL(userData.panFrontImage)
                        }
                        alt="PAN Front"
                        onError={() => setIsPanFrontBroken(true)}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          border: `1px solid ${
                            errors.panFrontImage ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          marginBottom: "0.75rem",
                          backgroundColor: "#fff",
                        }}
                      />
                      {isEditing && (
                        <div
                          style={{
                            display: "flex",
                            gap: "0.75rem",
                          }}
                        >
                          <input
                            type="file"
                            id="panFrontInput"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, "panFrontImage")
                            }
                            style={{ display: "none" }}
                          />
                          {
                            errors.panFrontImage && (
                              <p
                                style={{
                                  color: "#e53e3e",
                                  fontSize: "0.75rem",
                                  marginTop: "0.25rem",
                                }}
                              >
                                {errors.panFrontImage}
                              </p>
                            )
                          }
                          <label
                            htmlFor="panFrontInput"
                            style={{
                              flex: "1",
                              padding: "0.5rem",
                              textAlign: "center",
                              borderRadius: "8px",
                              border: "1px solid #00833D",
                              color: "black",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#f3f0ff",
                              },
                            }}
                          >
                            Change Front
                          </label>
                          <button
                            type="button"
                            style={{
                              padding: "0.5rem",
                              borderRadius: "8px",
                              border: "1px solid #e53e3e",
                              color: "#e53e3e",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#fff5f5",
                              },
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
                      <div
                        style={{
                          border: `1px dashed ${
                            errors.panFrontImage ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          padding: "2rem",
                          textAlign: "center",
                          color: "#a0aec0",
                          marginBottom: "0.75rem",
                          backgroundColor: "#f8fafc",
                        }}
                      >
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
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor="panFrontInput"
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "0.75rem",
                              textAlign: "center",
                              borderRadius: "8px",
                              background:
                                "linear-gradient(135deg, #00833D, #000000)",
                              color: "white",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#8c5cf6",
                              },
                            }}
                          >
                            Upload Front
                          </label>
                        </>
                      )}
                    </>
                  )}
                  {errors.panFrontImage && (
                    <p
                      style={{
                        color: "#e53e3e",
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.panFrontImage}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#4a5568",
                    }}
                  >
                    PAN Back Image *
                  </label>
                  {userData.panBackImage && !isPanBackBroken ? (
                    <>
                      <img
                        src={
                          typeof userData.panBackImage === "string"
                            ? `${import.meta.env.VITE_FILE_URL}${
                                userData.panBackImage
                              }`
                            : URL.createObjectURL(userData.panBackImage)
                        }
                        alt="PAN Back"
                        onError={() => setIsPanBackBroken(true)}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          border: `1px solid ${
                            errors.panBackImage ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          marginBottom: "0.75rem",
                          backgroundColor: "#fff",
                        }}
                      />
                      {isEditing && (
                        <div
                          style={{
                            display: "flex",
                            gap: "0.75rem",
                          }}
                        >
                          <input
                            type="file"
                            id="panBackInput"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, "panBackImage")
                            }
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor="panBackInput"
                            style={{
                              flex: "1",
                              padding: "0.5rem",
                              textAlign: "center",
                              borderRadius: "8px",
                              border: "1px solid #00833D",
                              color: "black",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#f3f0ff",
                              },
                            }}
                          >
                            Change Back
                          </label>
                          <button
                            type="button"
                            style={{
                              padding: "0.5rem",
                              borderRadius: "8px",
                              border: "1px solid #e53e3e",
                              color: "#e53e3e",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#fff5f5",
                              },
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
                      <div
                        style={{
                          border: `1px dashed ${
                            errors.panBackImage ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          padding: "2rem",
                          textAlign: "center",
                          color: "#a0aec0",
                          marginBottom: "0.75rem",
                          backgroundColor: "#f8fafc",
                        }}
                      >
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
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor="panBackInput"
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "0.75rem",
                              textAlign: "center",
                              borderRadius: "8px",
                              background:
                                "linear-gradient(135deg, #00833D, #000000)",
                              color: "white",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              ":hover": {
                                backgroundColor: "#8c5cf6",
                              },
                            }}
                          >
                            Upload Back
                          </label>
                        </>
                      )}
                    </>
                  )}
                  {errors.panBackImage && (
                    <p
                      style={{
                        color: "#e53e3e",
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.panBackImage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "transparent",
                    color: "#4a5568",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    ":hover": {
                      backgroundColor: "#f7fafc",
                    },
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(135deg, #00833D, #000000)",
                    color: "white",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(151, 70, 253, 0.3)",
                    ":hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(151, 70, 253, 0.4)",
                    },
                  }}
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default EditProfile;
