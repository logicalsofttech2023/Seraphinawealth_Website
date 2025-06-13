import React, { useState, useRef, useEffect } from "react";
import "./Login.css"
import {Link} from "react-router-dom"
const Login = () => {
  const [step, setStep] = useState(1); // 1: Mobile input, 2: OTP verification, 3: Registration
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
    aadharNumber: "",
    panNumber: "",
    aadharFront: null,
    aadharBack: null,
    panFront: null,
    panBack: null,
    profileImage: null,
  });

  const [errors, setErrors] = useState({
    mobileNumber: "",
    otp: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    aadharNumber: "",
    panNumber: "",
    aadharFront: "",
    aadharBack: "",
    panFront: "",
    panBack: "",
    profileImage: "",
  });

  const [previewImages, setPreviewImages] = useState({
    profileImage: null,
    aadharFront: null,
    aadharBack: null,
    panFront: null,
    panBack: null,
  });

  const aadharFrontRef = useRef();
  const aadharBackRef = useRef();
  const panFrontRef = useRef();
  const panBackRef = useRef();
  const profileImageRef = useRef();

  const validateMobile = () => {
    const isValid = /^[0-9]{10}$/.test(mobileNumber);
    setErrors(prev => ({
      ...prev,
      mobileNumber: isValid ? "" : "Please enter a valid 10-digit mobile number"
    }));
    return isValid;
  };

  const validateOTP = () => {
    const isValid = /^[0-9]{6}$/.test(otp);
    setErrors(prev => ({
      ...prev,
      otp: isValid ? "" : "Please enter a valid 6-digit OTP"
    }));
    return isValid;
  };

  const validateStep3 = () => {
    let isValid = true;
    const newErrors = {...errors};

    // Validate required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    } else {
      newErrors.dob = "";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    } else {
      newErrors.gender = "";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    } else {
      newErrors.address = "";
    }

    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = "Aadhar number is required";
      isValid = false;
    } else if (!/^[0-9]{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = "Please enter a valid 12-digit Aadhar number";
      isValid = false;
    } else {
      newErrors.aadharNumber = "";
    }

    if (!formData.panNumber.trim()) {
      newErrors.panNumber = "PAN number is required";
      isValid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = "Please enter a valid PAN number";
      isValid = false;
    } else {
      newErrors.panNumber = "";
    }

    if (!formData.profileImage) {
      newErrors.profileImage = "Profile image is required";
      isValid = false;
    } else {
      newErrors.profileImage = "";
    }

    if (!formData.aadharFront) {
      newErrors.aadharFront = "Aadhar front image is required";
      isValid = false;
    } else {
      newErrors.aadharFront = "";
    }

    if (!formData.aadharBack) {
      newErrors.aadharBack = "Aadhar back image is required";
      isValid = false;
    } else {
      newErrors.aadharBack = "";
    }

    if (!formData.panFront) {
      newErrors.panFront = "PAN front image is required";
      isValid = false;
    } else {
      newErrors.panFront = "";
    }

    if (!formData.panBack) {
      newErrors.panBack = "PAN back image is required";
      isValid = false;
    } else {
      newErrors.panBack = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (validateMobile()) {
      setStep(2);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (validateOTP()) {
      setStep(3);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      // Clear error when file is selected
      if (errors[fieldName]) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: ""
        }));
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => ({
          ...prev,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      // Here you would typically submit all the form data including files
      console.log("Form data:", formData);
      alert("Registration successful! Documents uploaded.");
    }
  };

  const progressPercentage = ((step - 1) / 2) * 100;

  useEffect(() => {
    return () => {
      // Clean up preview URLs
      Object.values(previewImages).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previewImages]);

  return (
    <>
      <div>
      <section className="page_breadcrumb">
    <div className="page_breadcrumb_shape_one float-bob-x">
      <img src="/assets/images/icons/mouse-pointer.png" alt />
    </div>
    <div className="page_breadcrumb_shape_two float-bob-y">
      <img src="/assets/images/icons/shape_icon_1.png" alt />
    </div>    
    <div className="container">
      <div className="breadcrumb_content centred">
        <div className="breadcrumb_sutitle"><h6>LOGIN</h6></div>
        <h1 className="breadcrumb_title">Welcome To Seraphina</h1>
        <ul className="breadcrumb_menu">
          <li><Link to={"/"} >Home</Link></li>
          <li>/</li>
          <li>LOGIN</li>
        </ul>
      </div>
    </div>
  </section>

    

        <div className="login-area page-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="login-page">
                  <div className="login-form">
                    {/* Progress Bar */}
                    <div
                      className="progress-container"
                      style={{ marginBottom: "30px" }}
                    >
                      <div
                        className="progress"
                        style={{
                          height: "10px",
                          borderRadius: "5px",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${progressPercentage}%`,
                            backgroundColor: "rgb(159, 112, 253)",
                            borderRadius: "5px",
                            transition: "width 0.5s ease-in-out",
                          }}
                          aria-valuenow={progressPercentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div
                        className="progress-steps"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          className={`step ${step >= 1 ? "active" : ""}`}
                          style={{ textAlign: "center" }}
                        >
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background:
                                step >= 1 ? "linear-gradient(111deg, #E770C1 19.42%, #9F70FD 73.08%)" : "#f0f0f0",
                              color: step >= 1 ? "white" : "#666",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto 5px",
                            }}
                          >
                            1
                          </div>
                          <span
                            style={{
                              color: step >= 1 ? "#9F70FD" : "#666",
                              fontWeight: step >= 1 ? "bold" : "normal",
                            }}
                          >
                            Mobile
                          </span>
                        </div>
                        <div
                          className={`step ${step >= 2 ? "active" : ""}`}
                          style={{ textAlign: "center" }}
                        >
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background:
                                step >= 2 ? "linear-gradient(111deg, #E770C1 19.42%, #9F70FD 73.08%)" : "#f0f0f0",
                              color: step >= 2 ? "white" : "#666",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto 5px",
                            }}
                          >
                            2
                          </div>
                          <span
                            style={{
                              color: step >= 2 ? "#9F70FD" : "#666",
                              fontWeight: step >= 2 ? "bold" : "normal",
                            }}
                          >
                            OTP
                          </span>
                        </div>
                        <div
                          className={`step ${step >= 3 ? "active" : ""}`}
                          style={{ textAlign: "center" }}
                        >
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background:
                                step >= 3 ? "linear-gradient(111deg, #E770C1 19.42%, #9F70FD 73.08%)" : "#f0f0f0",
                              color: step >= 3 ? "white" : "#666",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto 5px",
                            }}
                          >
                            3
                          </div>
                          <span
                            style={{
                              color: step >= 3 ? "#9F70FD" : "#666",
                              fontWeight: step >= 3 ? "bold" : "normal",
                            }}
                          >
                            Register
                          </span>
                        </div>
                      </div>
                    </div>

                    <h4 className="login-title">
                      {step === 1
                        ? "ENTER MOBILE NUMBER"
                        : step === 2
                        ? "VERIFY OTP"
                        : "COMPLETE REGISTRATION"}
                    </h4>
                    <div className="row">
                      {step === 1 && (
                        <form
                          onSubmit={handleMobileSubmit}
                          className="log-form"
                        >
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="Mobile Number"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                            />
                            {errors.mobileNumber && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                {errors.mobileNumber}
                              </div>
                            )}
                          </div>
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <button type="submit" style={{ background: "linear-gradient(111deg, #E770C1 19.42%, #9F70FD 73.08%)"}} className="login-btn">
                              Send OTP
                            </button>
                          </div>
                        </form>
                      )}

                      {step === 2 && (
                        <form onSubmit={handleOtpSubmit} className="log-form">
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <p>OTP sent to {mobileNumber}</p>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "10px",
                                marginBottom: "20px",
                              }}
                            >
                              {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                  key={index}
                                  type="text"
                                  maxLength="1"
                                  style={{
                                    width: "40px",
                                    height: "50px",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                  }}
                                  value={otp[index] || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                      // Only allow numbers
                                      const newOtp = otp.split("");
                                      newOtp[index] = value;
                                      setOtp(newOtp.join(""));

                                      // Auto focus to next input
                                      if (value && index < 5) {
                                        const nextInput =
                                          e.target.parentElement.children[
                                            index + 1
                                          ];
                                        if (nextInput) nextInput.focus();
                                      }
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    // Handle backspace to move to previous input
                                    if (
                                      e.key === "Backspace" &&
                                      !otp[index] &&
                                      index > 0
                                    ) {
                                      const prevInput =
                                        e.target.parentElement.children[
                                          index - 1
                                        ];
                                      if (prevInput) prevInput.focus();
                                    }
                                  }}
                                />
                              ))}
                            </div>
                            {errors.otp && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "-15px", marginBottom: "10px", textAlign: "center" }}>
                                {errors.otp}
                              </div>
                            )}
                          </div>

                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <button type="submit" style={{ background: "linear-gradient(111deg, #E770C1 19.42%, #9F70FD 73.08%)"}} className="login-btn">
                              Verify OTP
                            </button>
                          </div>

                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setStep(1);
                                setOtp("");
                              }}
                              className="text-muted"
                            >
                              Change Mobile Number
                            </a>
                          </div>
                        </form>
                      )}

                      {step === 3 && (
                        <form
                          onSubmit={handleRegisterSubmit}
                          className="log-form"
                        >
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <input
                              type="text"
                              name="firstName"
                              className="form-control"
                              placeholder="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                            {errors.firstName && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                {errors.firstName}
                              </div>
                            )}
                          </div>

                          {/* Middle Name */}
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <input
                              type="text"
                              name="middleName"
                              className="form-control"
                              placeholder="Middle Name"
                              value={formData.middleName}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* Last Name */}
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <input
                              type="text"
                              name="lastName"
                              className="form-control"
                              placeholder="Last Name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                            {errors.lastName && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                {errors.lastName}
                              </div>
                            )}
                          </div>

                          {/* Email */}
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errors.email && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                {errors.email}
                              </div>
                            )}
                          </div>

                          {/* Date of Birth */}
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <input
                              type="date"
                              name="dob"
                              className="form-control"
                              value={formData.dob}
                              onChange={handleInputChange}
                            />
                            {errors.dob && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                {errors.dob}
                              </div>
                            )}
                          </div>

                          {/* Gender */}
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <select
                              name="gender"
                              className="form-control"
                              value={formData.gender}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                {errors.gender}
                              </div>
                            )}
                          </div>

                          {/* Address */}
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <textarea
                              name="address"
                              className="form-control"
                              placeholder="Address"
                              rows="3"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                            {errors.address && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                {errors.address}
                              </div>
                            )}
                          </div>

                          {/* Profile Image */}
                          <div
                            className="col-md-12 col-sm-12 col-xs-12"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              type="file"
                              ref={profileImageRef}
                              onChange={(e) =>
                                handleFileChange(e, "profileImage")
                              }
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              style={{ width: "100%" }}
                              onClick={() => profileImageRef.current.click()}
                            >
                              {formData.profileImage
                                ? formData.profileImage.name
                                : "Upload Profile Image"}
                            </button>
                            {errors.profileImage && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                {errors.profileImage}
                              </div>
                            )}
                            {previewImages.profileImage && (
                              <div
                                style={{
                                  marginTop: "10px",
                                  textAlign: "center",
                                }}
                              >
                                <img
                                  src={previewImages.profileImage}
                                  alt="Profile Preview"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "200px",
                                    borderRadius: "5px",
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {/* Aadhar Card Section */}
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <h5
                              style={{
                                marginTop: "20px",
                                marginBottom: "10px",
                              }}
                            >
                              Aadhar Card Details
                            </h5>
                            <input
                              type="text"
                              name="aadharNumber"
                              className="form-control"
                              placeholder="Aadhar Number"
                              value={formData.aadharNumber}
                              onChange={handleInputChange}
                              style={{ marginBottom: "10px" }}
                            />
                            {errors.aadharNumber && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "-5px", marginBottom: "10px" }}>
                                {errors.aadharNumber}
                              </div>
                            )}
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                marginBottom: "15px",
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <input
                                  type="file"
                                  ref={aadharFrontRef}
                                  onChange={(e) =>
                                    handleFileChange(e, "aadharFront")
                                  }
                                  accept="image/*"
                                  style={{ display: "none" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  style={{ width: "100%" }}
                                  onClick={() => aadharFrontRef.current.click()}
                                >
                                  {formData.aadharFront
                                    ? formData.aadharFront.name
                                    : "Upload Aadhar Front"}
                                </button>
                                {errors.aadharFront && (
                                  <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                    {errors.aadharFront}
                                  </div>
                                )}
                                {previewImages.aadharFront && (
                                  <div
                                    style={{
                                      marginTop: "10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <img
                                      src={previewImages.aadharFront}
                                      alt="Aadhar Front Preview"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "200px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              <div style={{ flex: 1 }}>
                                <input
                                  type="file"
                                  ref={aadharBackRef}
                                  onChange={(e) =>
                                    handleFileChange(e, "aadharBack")
                                  }
                                  accept="image/*"
                                  style={{ display: "none" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  style={{ width: "100%" }}
                                  onClick={() => aadharBackRef.current.click()}
                                >
                                  {formData.aadharBack
                                    ? formData.aadharBack.name
                                    : "Upload Aadhar Back"}
                                </button>
                                {errors.aadharBack && (
                                  <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                    {errors.aadharBack}
                                  </div>
                                )}
                                {previewImages.aadharBack && (
                                  <div
                                    style={{
                                      marginTop: "10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <img
                                      src={previewImages.aadharBack}
                                      alt="Aadhar Back Preview"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "200px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* PAN Card Section */}
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <h5
                              style={{
                                marginTop: "20px",
                                marginBottom: "10px",
                              }}
                            >
                              PAN Card Details
                            </h5>
                            <input
                              type="text"
                              name="panNumber"
                              className="form-control"
                              placeholder="PAN Number"
                              value={formData.panNumber}
                              onChange={handleInputChange}
                              style={{ marginBottom: "10px" }}
                            />
                            {errors.panNumber && (
                              <div className="text-danger" style={{ fontSize: "14px", marginTop: "-5px", marginBottom: "10px" }}>
                                {errors.panNumber}
                              </div>
                            )}
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                marginBottom: "15px",
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <input
                                  type="file"
                                  ref={panFrontRef}
                                  onChange={(e) =>
                                    handleFileChange(e, "panFront")
                                  }
                                  accept="image/*"
                                  style={{ display: "none" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  style={{ width: "100%" }}
                                  onClick={() => panFrontRef.current.click()}
                                >
                                  {formData.panFront
                                    ? formData.panFront.name
                                    : "Upload PAN Front"}
                                </button>
                                {errors.panFront && (
                                  <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                    {errors.panFront}
                                  </div>
                                )}
                                {previewImages.panFront && (
                                  <div
                                    style={{
                                      marginTop: "10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <img
                                      src={previewImages.panFront}
                                      alt="PAN Front Preview"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "200px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>

                              <div style={{ flex: 1 }}>
                                <input
                                  type="file"
                                  ref={panBackRef}
                                  onChange={(e) =>
                                    handleFileChange(e, "panBack")
                                  }
                                  accept="image/*"
                                  style={{ display: "none" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  style={{ width: "100%" }}
                                  onClick={() => panBackRef.current.click()}
                                >
                                  {formData.panBack
                                    ? formData.panBack.name
                                    : "Upload PAN Back"}
                                </button>
                                {errors.panBack && (
                                  <div className="text-danger" style={{ fontSize: "14px", marginTop: "5px" }}>
                                    {errors.panBack}
                                  </div>
                                )}
                                {previewImages.panBack && (
                                  <div
                                    style={{
                                      marginTop: "10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <img
                                      src={previewImages.panBack}
                                      alt="PAN Back Preview"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "200px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <button type="submit" style={{ background: "linear-gradient(111deg, #E770C1 19.42%, #9F70FD 73.08%)"}} className="login-btn">
                              Complete Registration
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;