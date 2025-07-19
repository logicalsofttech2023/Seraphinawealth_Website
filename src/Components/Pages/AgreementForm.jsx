import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const AgreementForm = () => {
  const navigate = useNavigate();
  const [baseAmount, setBaseAmount] = useState({
    individual: 0,
    business: 0,
    institutional: 0,
  });
  const [serviceChoice, setServiceChoice] = useState("free");
  const [freeServices, setFreeServices] = useState([]);
  const [individualBusinessServices, setIndividualBusinessServices] = useState(
    []
  );
  const [businessServices, setBusinessServices] = useState([]);
  const [institutionalServices, setInstitutionalServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalWithGST, setTotalWithGST] = useState(0);
  const [deliveryPreference, setDeliveryPreference] = useState("both");
  const [loading, setLoading] = useState({
    free: false,
    individual: false,
    business: false,
    institutional: false,
  });
  const [hasTakenPlan, setHasTakenPlan] = useState([]);
  const [error, setError] = useState(null);
  const [planAmount, setPlanAmount] = useState({});
  const [plans, setPlans] = useState([]);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const [studentStatus, setStudentStatus] = useState("no");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFreeServices();
    fetchIndividualBusinessServices();
    fetchBusinessServices();
    fetchInstitutionalServices();
    hasUserTakenPlan();
  }, []);

  useEffect(() => {
    const fetchPlanAmount = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}getPlanAmountInUser`
        );
        setPlanAmount(response.data.data);
      } catch (err) {
        setError("Failed to fetch plan amount");
      }
    };

    fetchPlanAmount();
  }, [serviceChoice]);

  useEffect(() => {
    calculateTotalAmount();
  }, [selectedServices, serviceChoice, baseAmount, planAmount]);

  const calculateTotalAmount = () => {
    // Initialize tieredPrices with default values
    let tieredPrices = [];
    let tieredPercentages = [100, 60, 40, 40]; // Default percentages

    // Special pricing for individual plan
    if (serviceChoice === "individual") {
      if (studentStatus === "yes") {
        tieredPrices = [150000, 100000, 100000, 100000];
      } else {
        // Get tiered percentages from planAmount or use defaults
        tieredPercentages = planAmount?.selectPercentage || [100, 60, 40, 40];

        // Get base price from planAmount or use default (250000)
        const basePrice = planAmount?.basePrice || 250000;

        // Calculate tiered prices based on base price and percentages
        tieredPrices = tieredPercentages.map((percent) =>
          Math.round(basePrice * (percent / 100))
        );
      }
    } else {
      // For non-individual plans, set default prices if needed
      const basePrice = planAmount?.basePrice || 100000; // Default base price for other plans
      tieredPrices = tieredPercentages.map((percent) =>
        Math.round(basePrice * (percent / 100))
      );
    }

    // Calculate total base amount based on order of selected services
    let calculatedTotal = selectedServices.reduce((sum, _, index) => {
      return sum + (tieredPrices[index] || 0);
    }, 0);

    // Add platform fee if enabled
    let platformFeeAmount = 0;
    if (planAmount?.platformFeeStatus) {
      platformFeeAmount = calculatedTotal * (planAmount.platformFee / 100);
      calculatedTotal += platformFeeAmount;
    }

    // Calculate GST if enabled
    let gstAmount = 0;
    if (planAmount?.gstStatus) {
      gstAmount = calculatedTotal * (planAmount.gst / 100);
    }

    setTotalAmount(calculatedTotal);
    setTotalWithGST(calculatedTotal + gstAmount);
  };
  const fetchFreeServices = async () => {
    try {
      setLoading((prev) => ({ ...prev, free: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getAllFreeOfferingsInUser`
      );
      setFreeServices(response.data.data);
      setLoading((prev) => ({ ...prev, free: false }));
    } catch (err) {
      setError("Failed to fetch free services");
      setLoading((prev) => ({ ...prev, free: false }));
    }
  };

  const fetchIndividualBusinessServices = async () => {
    try {
      setLoading((prev) => ({ ...prev, individual: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getAllIndividualBusinessServicesInUser`
      );
      setIndividualBusinessServices(response.data.data);
      setLoading((prev) => ({ ...prev, individual: false }));
    } catch (err) {
      setError("Failed to fetch individual business services");
      setLoading((prev) => ({ ...prev, individual: false }));
    }
  };

  const fetchBusinessServices = async () => {
    try {
      setLoading((prev) => ({ ...prev, business: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getAllBusinessServicesInUser`
      );
      setBusinessServices(response.data.data);
      setLoading((prev) => ({ ...prev, business: false }));
    } catch (err) {
      setError("Failed to fetch business services");
      setLoading((prev) => ({ ...prev, business: false }));
    }
  };

  const fetchInstitutionalServices = async () => {
    try {
      setLoading((prev) => ({ ...prev, institutional: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}getAllInstitutionalServicesInUser`
      );
      setInstitutionalServices(response.data.data);
      setLoading((prev) => ({ ...prev, institutional: false }));
    } catch (err) {
      setError("Failed to fetch institutional services");
      setLoading((prev) => ({ ...prev, institutional: false }));
    }
  };

  const handleServiceChoice = (choice) => {
    setServiceChoice(choice);
    setSelectedServices([]); // Reset selected services when changing plan

    // Fetch services when a plan is selected
    switch (choice) {
      case "individual":
        if (individualBusinessServices.length === 0) {
          fetchIndividualBusinessServices();
        }
        break;
      case "business":
        if (businessServices.length === 0) {
          fetchBusinessServices();
        }
        break;
      case "institutional":
        if (institutionalServices.length === 0) {
          fetchInstitutionalServices();
        }
        break;
      default:
        // Free services are already fetched in useEffect
        break;
    }
  };

  const handleServiceSelection = (serviceId) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      } else {
        if (prev.length < 4) {
          return [...prev, serviceId];
        }
        return prev;
      }
    });
  };

  const renderServicesCheckboxes = () => {
    let services = [];
    let loadingState = false;

    switch (serviceChoice) {
      case "free":
        services = freeServices;
        loadingState = loading.free;
        break;
      case "individual":
        services = individualBusinessServices;
        loadingState = loading.individual;
        break;
      case "business":
        services = businessServices;
        loadingState = loading.business;
        break;
      case "institutional":
        services = institutionalServices;
        loadingState = loading.institutional;
        break;
      default:
        services = [];
    }

    if (loadingState) {
      return (
        <Box sx={{ width: "100%", padding: "10px" }}>
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={60} />
            </Box>
          ))}
        </Box>
      );
    }

    if (services.length === 0) {
      return (
        <div style={{ padding: "10px", textAlign: "center" }}>
          No services available
        </div>
      );
    }

    // Initialize tieredPrices and tieredPercentages with default values
    let tieredPrices = [];
    let tieredPercentages = [100, 60, 40, 40]; // Default percentages

    // Get tiered prices and percentages - special case for individual plan
    if (serviceChoice === "individual") {
      if (studentStatus === "yes") {
        tieredPrices = [150000, 100000, 100000, 100000];
        tieredPercentages = [100, 67, 67, 67];
      } else {
        // Get tiered percentages from planAmount or use defaults
        tieredPercentages = planAmount?.selectPercentage || [100, 60, 40, 40];

        // Get base price from planAmount or use default (250000)
        const basePrice = planAmount?.basePrice || 250000;

        // Calculate tiered prices based on base price and percentages
        tieredPrices = tieredPercentages.map((percent) =>
          Math.round(basePrice * (percent / 100))
        );
      }
    } else {
      // For non-individual plans, set default prices if needed
      // You might want to set these differently based on your business logic
      const basePrice = planAmount?.basePrice || 100000; // Default base price for other plans
      tieredPrices = tieredPercentages.map((percent) =>
        Math.round(basePrice * (percent / 100))
      );
    }

    // Calculate total base amount based on order of selected services
    let calculatedTotal = selectedServices.reduce((sum, _, index) => {
      return sum + (tieredPrices[index] || 0);
    }, 0);

    // Add platform fee if enabled
    let platformFeeAmount = 0;
    if (planAmount?.platformFeeStatus) {
      platformFeeAmount = calculatedTotal * (planAmount.platformFee / 100);
      calculatedTotal += platformFeeAmount;
    }

    // Calculate GST if enabled
    let gstAmount = 0;
    if (planAmount?.gstStatus) {
      gstAmount = calculatedTotal * (planAmount.gst / 100);
    }

    const totalWithGST = calculatedTotal + gstAmount;

    // Determine which services are disabled (already purchased)
    const disabledServices = services.filter((service) =>
      hasTakenPlan.some(
        (plan) =>
          (plan.individualBusinessServices || []).some(
            (s) => s._id === service._id
          ) ||
          (plan.businessServices || []).some((s) => s._id === service._id) ||
          (plan.institutionalServices || []).some((s) => s._id === service._id)
      )
    );

    // Calculate the number of already purchased services
    const purchasedServicesCount = disabledServices.length;

    // Calculate the effective position for new selections
    const getEffectivePosition = (indexInSelected) => {
      return indexInSelected + purchasedServicesCount;
    };

    return (
      <div style={{ marginTop: "20px" }}>
        {services.map((service) => {
          const isSelected = selectedServices.includes(service._id);
          const isDisabled =
            disabledServices.some((s) => s._id === service._id) ||
            (selectedServices.length >= 4 - purchasedServicesCount &&
              !isSelected);
          const indexInSelected = selectedServices.indexOf(service._id);

          // Calculate base price based on effective position in the tier
          const effectivePosition = isSelected
            ? getEffectivePosition(indexInSelected)
            : getEffectivePosition(selectedServices.length);
          const basePrice = tieredPrices[effectivePosition] || 0;

          // Calculate platform fee for this service if enabled
          let servicePlatformFee = 0;
          if (planAmount?.platformFeeStatus) {
            servicePlatformFee = basePrice * (planAmount.platformFee / 100);
          }

          const serviceSubtotal = basePrice + servicePlatformFee;

          // Calculate GST for this service if enabled
          let serviceGst = 0;
          if (planAmount?.gstStatus) {
            serviceGst = serviceSubtotal * (planAmount.gst / 100);
          }

          const serviceTotal = serviceSubtotal + serviceGst;

          const isPurchased = disabledServices.some(
            (s) => s._id === service._id
          );

          return (
            <div
              key={service._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
                padding: "10px 14px",
                backgroundColor: isSelected
                  ? "rgba(0, 131, 61, 0.05)"
                  : isPurchased
                  ? "rgba(0, 0, 0, 0.03)"
                  : "#f9f9f9",
                borderRadius: "8px",
                border: isSelected
                  ? "1px solid rgba(0, 131, 61, 0.2)"
                  : isPurchased
                  ? "1px solid rgba(0, 0, 0, 0.05)"
                  : "1px solid #eee",
                opacity: isPurchased ? 0.7 : 1,
                position: "relative",
              }}
            >
              {isPurchased && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "10px",
                    background: "linear-gradient(135deg, #00833D, #000000)",
                    color: "white",
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Already Purchased
                </div>
              )}

              <input
                type="checkbox"
                id={`service-${service._id}`}
                checked={isSelected}
                onChange={() => handleServiceSelection(service._id)}
                disabled={isDisabled}
                style={{
                  width: "18px",
                  height: "18px",
                  marginRight: "12px",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  accentColor: "#00833D",
                }}
              />

              <label
                htmlFor={`service-${service._id}`}
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: isDisabled ? "#95a5a6" : "#34495e",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  fontWeight: isSelected ? "600" : "400",
                }}
              >
                <div>
                  {service.name}
                  {isDisabled && !isPurchased && (
                    <div style={{ fontSize: "12px", color: "#e74c3c" }}>
                      Maximum selection reached
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  {!isPurchased && (
                    <>
                      <div
                        style={{
                          fontWeight: "bold",
                          color: isDisabled ? "#95a5a6" : "#00833D",
                        }}
                      >
                        ₹{basePrice.toLocaleString("en-IN")}
                        {planAmount?.platformFeeStatus && (
                          <span>
                            {" "}
                            + ₹{servicePlatformFee.toLocaleString("en-IN")}{" "}
                            platform fee
                          </span>
                        )}
                        {planAmount?.gstStatus && (
                          <span>
                            {" "}
                            + ₹{serviceGst.toLocaleString("en-IN")} GST
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: isDisabled ? "#bdc3c7" : "#666",
                        }}
                      >
                        (Total ₹{serviceTotal.toLocaleString("en-IN")})
                      </div>
                      {isSelected && (
                        <div
                          style={{
                            fontSize: "10px",
                            color: isDisabled ? "#bdc3c7" : "#888",
                          }}
                        >
                          {serviceChoice === "individual"
                            ? "Fixed price"
                            : `${tieredPercentages[effectivePosition]}% of base price`}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </label>
            </div>
          );
        })}

        {selectedServices.length > 0 && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              borderLeft: `4px solid #00833D`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: "600", color: "#2c3e50" }}>
                Total Amount
              </div>
              <div style={{ fontSize: "12px", color: "#7f8c8d" }}>
                {selectedServices.length} service
                {selectedServices.length !== 1 ? "s" : ""} selected
                {disabledServices.length > 0 && (
                  <span>, {disabledServices.length} already purchased</span>
                )}
              </div>
              {serviceChoice !== "individual" && (
                <>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#7f8c8d",
                      marginTop: "4px",
                    }}
                  >
                    Tier percentages applied:{" "}
                    {tieredPercentages
                      .slice(
                        purchasedServicesCount,
                        purchasedServicesCount + selectedServices.length
                      )
                      .join("%, ")}
                    %
                  </div>
                  {purchasedServicesCount + selectedServices.length < 4 && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#7f8c8d",
                        marginTop: "4px",
                      }}
                    >
                      Next{" "}
                      {4 - (purchasedServicesCount + selectedServices.length)}{" "}
                      services at{" "}
                      {tieredPercentages
                        .slice(
                          purchasedServicesCount + selectedServices.length,
                          4
                        )
                        .join("%, ")}
                      %
                    </div>
                  )}
                </>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "16px", color: "#666" }}>
                Base: ₹
                {(
                  calculatedTotal -
                  gstAmount -
                  platformFeeAmount
                ).toLocaleString("en-IN")}
              </div>
              {planAmount?.platformFeeStatus && (
                <div style={{ fontSize: "16px", color: "#666" }}>
                  Platform Fee ({planAmount.platformFee}%): ₹
                  {platformFeeAmount.toLocaleString("en-IN")}
                </div>
              )}
              {planAmount?.gstStatus && (
                <div style={{ fontSize: "16px", color: "#666" }}>
                  GST ({planAmount.gst}%): ₹{gstAmount.toLocaleString("en-IN")}
                </div>
              )}
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#00833D",
                }}
              >
                Total: ₹{totalWithGST.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getCardStyle = (choice) => ({
    flex: "1 1 300px",
    minWidth: "300px",
    maxWidth: "400px",
    padding: "28px 24px",
    border:
      serviceChoice === choice
        ? `2px solid ${getColor(choice)}`
        : "1px solid #e0e0e0",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    backgroundColor:
      serviceChoice === choice ? `${getBackgroundColor(choice)}` : "#ffffff",
    transform: serviceChoice === choice ? "translateY(-4px)" : "none",
    boxShadow:
      serviceChoice === choice
        ? `0 8px 24px rgba(${getRGBColor(choice)}, 0.2)`
        : "0 4px 12px rgba(0, 0, 0, 0.08)",
    position: "relative",
    overflow: "hidden",
  });

  const getColor = (choice) => {
    switch (choice) {
      case "free":
        return "#28a745";
      case "individual":
        return "#4b6cb7";
      case "business":
        return "#9b59b6";
      case "institutional":
        return "#e67e22";
      default:
        return "#4b6cb7";
    }
  };

  const getBackgroundColor = (choice) => {
    switch (choice) {
      case "free":
        return "#f5fff7";
      case "individual":
        return "#f8faff";
      case "business":
        return "#f9f5ff";
      case "institutional":
        return "#fff5f0";
      default:
        return "#f8faff";
    }
  };

  const getRGBColor = (choice) => {
    switch (choice) {
      case "free":
        return "40, 167, 69";
      case "individual":
        return "75, 108, 183";
      case "business":
        return "155, 89, 182";
      case "institutional":
        return "230, 126, 34";
      default:
        return "75, 108, 183";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("token") === null) {
      Swal.fire("Error", "Please login to continue", "error");
      navigate("/login");
      return;
    }

    try {
      if (
        serviceChoice === "individual" ||
        serviceChoice === "business" ||
        serviceChoice === "institutional"
      ) {
        if (selectedServices.length === 0) {
          Swal.fire("Error", "Please select at least one service", "error");
          return;
        }
      }

      // Get service details for the selected services
      let serviceDetails = [];
      switch (serviceChoice) {
        case "free":
          serviceDetails = freeServices.filter((service) =>
            freeServices.some((s) => s._id === service._id)
          );
          break;
        case "individual":
          serviceDetails = individualBusinessServices.filter((service) =>
            selectedServices.includes(service._id)
          );
          break;
        case "business":
          serviceDetails = businessServices.filter((service) =>
            selectedServices.includes(service._id)
          );
          break;
        case "institutional":
          serviceDetails = institutionalServices.filter((service) =>
            selectedServices.includes(service._id)
          );
          break;
        default:
          serviceDetails = [];
      }

      // Create the new plan object with service IDs and details
      const newPlan = {
        deliveryPreference,
        serviceChoice,
        startDate: new Date().toISOString(),
        endDate: new Date(
          new Date().setMonth(new Date().getMonth() + 6)
        ).toISOString(),
        totalPrice: totalWithGST,
        serviceDetails, // Add service details here
      };

      // Add only service IDs based on the selected plan
      if (serviceChoice === "free") {
        newPlan.freeOfferings = freeServices.map((service) => service._id);
      } else if (serviceChoice === "individual") {
        newPlan.individualBusinessServices = selectedServices;
      } else if (serviceChoice === "business") {
        newPlan.businessServices = selectedServices;
      } else if (serviceChoice === "institutional") {
        newPlan.institutionalServices = selectedServices;
      }

      // Check for duplicate plans
      const isDuplicate = plans.some((plan) => {
        if (plan.serviceChoice !== newPlan.serviceChoice) return false;
        if (plan.deliveryPreference !== newPlan.deliveryPreference)
          return false;

        const existingServices =
          plan.freeOfferings ||
          plan.individualBusinessServices ||
          plan.businessServices ||
          plan.institutionalServices ||
          [];

        const newServices =
          newPlan.freeOfferings ||
          newPlan.individualBusinessServices ||
          newPlan.businessServices ||
          newPlan.institutionalServices ||
          [];

        return (
          JSON.stringify(existingServices.sort()) ===
          JSON.stringify(newServices.sort())
        );
      });

      if (isDuplicate) {
        Swal.fire(
          "Error",
          "This plan configuration already exists in your selection",
          "error"
        );
        return;
      }

      // Add the new plan to the plans array
      const updatedPlans = [...plans, newPlan];
      setPlans(updatedPlans);

      const result = await Swal.fire({
        title: "Plan Added",
        text: "Would you like to add another plan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Add Another Plan",
        cancelButtonText: "Proceed to Payment",
        customClass: {
          confirmButton: "confirm-gradient-button",
          cancelButton: "cancel-gradient-button",
        },
      });

      if (result.isConfirmed) {
        // Reset form for new plan
        setServiceChoice("free");
        setSelectedServices([]);
        setCurrentPlanIndex(updatedPlans.length);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Only proceed to API call if user clicks "Proceed to Payment"
        await submitAllPlans(updatedPlans);
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  const submitAllPlans = async (plansToSubmit) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}createPlan`,
        { plans: plansToSubmit },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "All plans created successfully", "success");
        navigate("/profile");
      } else {
        throw new Error(response.data.message || "Failed to create plans");
      }
    } catch (error) {
      console.error("Plan submission error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to create plans",
        "error"
      );
    }
  };

  const removePlan = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
    if (currentPlanIndex >= updatedPlans.length) {
      setCurrentPlanIndex(updatedPlans.length - 1);
    }
  };

  const editPlan = (index) => {
    const planToEdit = plans[index];
    setServiceChoice(planToEdit.serviceChoice);
    setDeliveryPreference(planToEdit.deliveryPreference);
    setSelectedServices(
      planToEdit.individualBusinessServices ||
        planToEdit.businessServices ||
        planToEdit.institutionalServices ||
        []
    );
    setCurrentPlanIndex(index);

    // Remove the plan being edited from the plans array
    removePlan(index);
  };

  const hasUserTakenPlan = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}hasUserTakenPlan`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      setHasTakenPlan(response.data.activePlans);

      // Extract all service IDs with their positions
      let takenServices = [];
      response.data.activePlans.forEach((plan) => {
        if (plan.serviceChoice === "individual") {
          plan.individualBusinessServices.forEach((s, idx) => {
            takenServices.push({ id: s._id, position: idx });
          });
        } else if (plan.serviceChoice === "business") {
          plan.businessServices.forEach((s, idx) => {
            takenServices.push({ id: s._id, position: idx });
          });
        } else if (plan.serviceChoice === "institutional") {
          plan.institutionalServices.forEach((s, idx) => {
            takenServices.push({ id: s._id, position: idx });
          });
        }
      });

      // Sort by position to maintain tier order
      takenServices.sort((a, b) => a.position - b.position);

      // Set selected services in correct order
      setSelectedServices(takenServices.map((s) => s.id));
    }
  };

  const renderLoadingCards = () => {
    return [...Array(4)].map((_, index) => (
      <Box
        key={index}
        sx={{
          flex: "1 1 300px",
          minWidth: "300px",
          maxWidth: "400px",
          padding: "28px 24px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Skeleton variant="circular" width={48} height={48} />
          <Box sx={{ ml: 2 }}>
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={200} height={20} />
          </Box>
        </Box>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={80}
          sx={{ mb: 3 }}
        />
        <Box sx={{ mb: 3 }}>
          {[...Array(3)].map((_, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 2 }}
              />
              <Skeleton variant="text" width="70%" height={20} />
            </Box>
          ))}
        </Box>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Box>
    ));
  };

  const formatToIndianCurrencyShort = (amount) => {
    const num = Number(amount);
    if (isNaN(num)) return amount;

    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`; // Crores
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`; // Lakhs
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`; // Thousands

    return num.toFixed(2);
  };

  const hasTakenFreePlan = hasTakenPlan?.some(
    (plan) => plan.serviceChoice === "free"
  );
  const hasTakenIndividualPlan = hasTakenPlan?.some(
    (plan) => plan.serviceChoice === "individual"
  );
  const hasTakenBusinessPlan = hasTakenPlan?.some(
    (plan) => plan.serviceChoice === "business"
  );
  const hasTakenInstitutionalPlan = hasTakenPlan?.some(
    (plan) => plan.serviceChoice === "institutional"
  );

  return (
    <div
      style={{
        width: "100%",
        margin: "30px auto",
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {error && (
        <div
          style={{
            color: "#e74c3c",
            backgroundColor: "#fdecea",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          textAlign: "center",
          marginBottom: "32px",
          paddingBottom: "16px",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <h2
          style={{
            color: "#2c3e50",
            fontWeight: "700",
            fontSize: "28px",
            marginBottom: "12px",
          }}
        >
          Choose Your Service
        </h2>
        <div
          style={{
            width: "80px",
            height: "4px",
            background:
              "linear-gradient(135deg, rgb(0, 131, 61), rgb(0, 0, 0))",
            margin: "0 auto",
            borderRadius: "2px",
          }}
        ></div>
      </div>

      {/* Service Type Selection */}
      <div
        style={{
          marginBottom: "32px",
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "24px",
              background:
                "linear-gradient(135deg, rgb(0, 131, 61), rgb(0, 0, 0))",
              borderRadius: "2px",
              marginRight: "12px",
            }}
          ></div>
          <h5
            style={{
              margin: 0,
              color: "#2c3e50",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            Select Your Service Plan
          </h5>
        </div>

        {/* Cards Container */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
            background: "#fff", // White background for the container
          }}
        >
          {/* Show loading skeletons if all services are loading */}
          {loading.free &&
          loading.individual &&
          loading.business &&
          loading.institutional ? (
            renderLoadingCards()
          ) : (
            <>
              {/* Free Card */}
              <div
                style={getCardStyle("free")}
                onClick={() => handleServiceChoice("free")}
              >
                {/* Card Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background:
                        hasTakenFreePlan || serviceChoice === "free"
                          ? "linear-gradient(135deg, #00833D, #000000)"
                          : "#e0e0e0",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 10V14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 10V14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 10V14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5
                      style={{
                        margin: 0,
                        color:
                          hasTakenFreePlan || serviceChoice === "free"
                            ? "#00833D"
                            : "#2c3e50",
                        fontSize: "20px",
                        fontWeight: "700",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Free Newsletter
                    </h5>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#7f8c8d",
                        fontSize: "14px",
                      }}
                    >
                      Basic updates for casual users
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 131, 61, 0.1), rgba(0, 0, 0, 0.1))",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#00833D",
                    }}
                  >
                    FREE
                  </span>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "12px",
                      color: "#00833D",
                    }}
                  >
                    {hasTakenFreePlan
                      ? "Already Subscribed"
                      : "No credit card required"}
                  </p>
                </div>

                {/* Features List */}
                {loading.free ? (
                  <Box sx={{ mb: 3 }}>
                    {[...Array(3)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Skeleton
                          variant="circular"
                          width={20}
                          height={20}
                          sx={{ mr: 1 }}
                        />
                        <Skeleton variant="text" width="70%" height={20} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 20px",
                    }}
                  >
                    {freeServices.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "12px",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            width: "20px",
                            height: "20px",
                            backgroundColor: index < 2 ? "#00833D" : "#e74c3c",
                            color: "white",
                            borderRadius: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "12px",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ color: "#34495e", lineHeight: "1.5" }}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <div
                  style={{
                    background:
                      hasTakenFreePlan || serviceChoice === "free"
                        ? "linear-gradient(135deg, #00833D, #000000)"
                        : "transparent",
                    color:
                      hasTakenFreePlan || serviceChoice === "free"
                        ? "white"
                        : "#00833D",
                    border:
                      hasTakenFreePlan || serviceChoice === "free"
                        ? "none"
                        : `1px solid #00833D`,
                    padding: "12px",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {hasTakenFreePlan
                    ? "Your Current Plan"
                    : serviceChoice === "free"
                    ? "Current Selection"
                    : "Choose Free"}
                </div>
              </div>

              {/* Individual Business Card */}
              <div
                style={getCardStyle("individual")}
                onClick={() => handleServiceChoice("individual")}
              >
                {/* Ribbon for Popular Tag */}
                {(hasTakenIndividualPlan || serviceChoice === "individual") && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "-30px",
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      color: "white",
                      padding: "4px 32px",
                      fontSize: "12px",
                      fontWeight: "600",
                      transform: "rotate(45deg)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                {/* Card Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background:
                        hasTakenIndividualPlan || serviceChoice === "individual"
                          ? "linear-gradient(135deg, #00833D, #000000)"
                          : "#e0e0e0",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5
                      style={{
                        margin: 0,
                        color:
                          hasTakenIndividualPlan ||
                          serviceChoice === "individual"
                            ? "#00833D"
                            : "#2c3e50",
                        fontSize: "20px",
                        fontWeight: "700",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Individual Families
                    </h5>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#7f8c8d",
                        fontSize: "14px",
                      }}
                    >
                      For professionals and consultants
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 131, 61, 0.1), rgba(0, 0, 0, 0.1))",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#00833D",
                        fontWeight: "600",
                      }}
                    >
                      Starting From
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        marginTop: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "28px",
                          fontWeight: "700",
                          color: "#00833D",
                        }}
                      >
                        ₹
                        {formatToIndianCurrencyShort(
                          planAmount.basePrice || 250000
                        )}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#7f8c8d",
                          marginLeft: "4px",
                        }}
                      >
                        + taxes
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    SAVE 20%
                  </div>
                </div>

                {/* Features List */}
                {loading.individual ? (
                  <Box sx={{ mb: 3 }}>
                    {[...Array(3)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Skeleton
                          variant="circular"
                          width={20}
                          height={20}
                          sx={{ mr: 1 }}
                        />
                        <Skeleton variant="text" width="70%" height={20} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 20px",
                    }}
                  >
                    {individualBusinessServices.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "12px",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            width: "20px",
                            height: "20px",
                            background:
                              "linear-gradient(135deg, #00833D, #000000)",
                            color: "white",
                            borderRadius: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "12px",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ color: "#34495e", lineHeight: "1.5" }}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <div
                  style={{
                    background:
                      hasTakenIndividualPlan || serviceChoice === "individual"
                        ? "linear-gradient(135deg, #00833D, #000000)"
                        : "transparent",
                    color:
                      hasTakenIndividualPlan || serviceChoice === "individual"
                        ? "white"
                        : "#00833D",
                    border:
                      hasTakenIndividualPlan || serviceChoice === "individual"
                        ? "none"
                        : `1px solid #00833D`,
                    padding: "12px",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {hasTakenIndividualPlan
                    ? "Your Current Plan"
                    : serviceChoice === "individual"
                    ? "Current Selection"
                    : "Choose Individual/Family Services"}
                </div>
              </div>

              {/* Business Services Card */}
              <div
                style={getCardStyle("business")}
                onClick={() => handleServiceChoice("business")}
              >
                {/* Ribbon for Popular Tag */}
                {(hasTakenBusinessPlan || serviceChoice === "business") && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "-30px",
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      color: "white",
                      padding: "4px 32px",
                      fontSize: "12px",
                      fontWeight: "600",
                      transform: "rotate(45deg)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    RECOMMENDED
                  </div>
                )}

                {/* Card Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background:
                        hasTakenBusinessPlan || serviceChoice === "business"
                          ? "linear-gradient(135deg, #00833D, #000000)"
                          : "#e0e0e0",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 21H21"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 21V5C5 4.47 5.21 3.96 5.59 3.59C5.96 3.21 6.47 3 7 3H17C17.53 3 18.04 3.21 18.41 3.59C18.79 3.96 19 4.47 19 5V21"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 21V13H15V21"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5
                      style={{
                        margin: 0,
                        color:
                          hasTakenBusinessPlan || serviceChoice === "business"
                            ? "#00833D"
                            : "#2c3e50",
                        fontSize: "20px",
                        fontWeight: "700",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Business Services
                    </h5>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#7f8c8d",
                        fontSize: "14px",
                      }}
                    >
                      For small and medium businesses
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div
                  style={{
                    background: `linear-gradient(135deg, rgba(0, 131, 61, 0.1), rgba(0, 0, 0, 0.1))`,
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#00833D",
                        fontWeight: "600",
                      }}
                    >
                      Starting From
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        marginTop: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "28px",
                          fontWeight: "700",
                          color: "#00833D",
                        }}
                      >
                        ₹
                        {formatToIndianCurrencyShort(
                          planAmount.basePrice || 250000
                        )}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#7f8c8d",
                          marginLeft: "4px",
                        }}
                      >
                        + taxes
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    SAVE 15%
                  </div>
                </div>

                {/* Features List */}
                {loading.business ? (
                  <Box sx={{ mb: 3 }}>
                    {[...Array(3)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Skeleton
                          variant="circular"
                          width={20}
                          height={20}
                          sx={{ mr: 1 }}
                        />
                        <Skeleton variant="text" width="70%" height={20} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 20px",
                    }}
                  >
                    {businessServices.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "12px",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            width: "20px",
                            height: "20px",
                            background:
                              "linear-gradient(135deg, #00833D, #000000)",
                            color: "white",
                            borderRadius: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "12px",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ color: "#34495e", lineHeight: "1.5" }}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <div
                  style={{
                    background:
                      hasTakenBusinessPlan || serviceChoice === "business"
                        ? "linear-gradient(135deg, #00833D, #000000)"
                        : "transparent",
                    color:
                      hasTakenBusinessPlan || serviceChoice === "business"
                        ? "white"
                        : "#00833D",
                    border:
                      hasTakenBusinessPlan || serviceChoice === "business"
                        ? "none"
                        : `1px solid #00833D`,
                    padding: "12px",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {hasTakenBusinessPlan
                    ? "Your Current Plan"
                    : serviceChoice === "business"
                    ? "Current Selection"
                    : "Choose Business Services"}
                </div>
              </div>

              {/* Institutional Services Card */}
              <div
                style={getCardStyle("institutional")}
                onClick={() => handleServiceChoice("institutional")}
              >
                {/* Recommended Ribbon */}
                {(hasTakenInstitutionalPlan ||
                  serviceChoice === "institutional") && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "-30px",
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      color: "white",
                      padding: "4px 32px",
                      fontSize: "12px",
                      fontWeight: "600",
                      transform: "rotate(45deg)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    RECOMMENDED
                  </div>
                )}

                {/* Card Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background:
                        hasTakenInstitutionalPlan ||
                        serviceChoice === "institutional"
                          ? "linear-gradient(135deg, #00833D, #000000)"
                          : "#e0e0e0",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 21V5C19 4.47 18.79 3.96 18.41 3.59C18.04 3.21 17.53 3 17 3H7C6.47 3 5.96 3.21 5.59 3.59C5.21 3.96 5 4.47 5 5V21M19 21H5M19 21H21V22H3V21H5M9 7H15M9 11H15M9 15H15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5
                      style={{
                        margin: 0,
                        color:
                          hasTakenInstitutionalPlan ||
                          serviceChoice === "institutional"
                            ? "#00833D"
                            : "#2c3e50",
                        fontSize: "20px",
                        fontWeight: "700",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Institutional Services
                    </h5>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#7f8c8d",
                        fontSize: "14px",
                      }}
                    >
                      For large organizations and enterprises
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div
                  style={{
                    background: `linear-gradient(135deg, rgba(0, 131, 61, 0.1), rgba(0, 0, 0, 0.1))`,
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#00833D",
                        fontWeight: "600",
                      }}
                    >
                      Starting From
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        marginTop: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "28px",
                          fontWeight: "700",
                          color: "#00833D",
                        }}
                      >
                        ₹
                        {formatToIndianCurrencyShort(
                          planAmount.basePrice || 250000
                        )}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#7f8c8d",
                          marginLeft: "4px",
                        }}
                      >
                        + taxes
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    SAVE 15%
                  </div>
                </div>

                {/* Features List */}
                {loading.institutional ? (
                  <Box sx={{ mb: 3 }}>
                    {[...Array(3)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Skeleton
                          variant="circular"
                          width={20}
                          height={20}
                          sx={{ mr: 1 }}
                        />
                        <Skeleton variant="text" width="70%" height={20} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 20px",
                    }}
                  >
                    {institutionalServices.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "12px",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            width: "20px",
                            height: "20px",
                            background:
                              "linear-gradient(135deg, #00833D, #000000)",
                            color: "white",
                            borderRadius: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "12px",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ color: "#34495e", lineHeight: "1.5" }}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <div
                  style={{
                    background:
                      hasTakenInstitutionalPlan ||
                      serviceChoice === "institutional"
                        ? "linear-gradient(135deg, #00833D, #000000)"
                        : "transparent",
                    color:
                      hasTakenInstitutionalPlan ||
                      serviceChoice === "institutional"
                        ? "white"
                        : "#00833D",
                    border:
                      hasTakenInstitutionalPlan ||
                      serviceChoice === "institutional"
                        ? "none"
                        : `1px solid #00833D`,
                    padding: "12px",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {hasTakenInstitutionalPlan
                    ? "Your Current Plan"
                    : serviceChoice === "institutional"
                    ? "Current Selection"
                    : "Choose Institutional Services"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {serviceChoice && serviceChoice === "individual" && (
        <div
          style={{
            marginBottom: "32px",
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "24px",
                background: "linear-gradient(135deg, #00833D, #000000)",
                borderRadius: "2px",
                marginRight: "12px",
              }}
            ></div>
            <h5
              style={{
                margin: 0,
                color: "#2c3e50",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.5px",
              }}
            >
              Student
            </h5>
          </div>

          <div style={{ marginTop: "16px" }}>
            <label
              htmlFor="student"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#2c3e50",
              }}
            >
              Are you a student?
            </label>
            <select
              id="student"
              value={studentStatus}
              onChange={(e) => setStudentStatus(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                fontSize: "16px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      )}

      {/* Services Checkboxes Section */}
      {serviceChoice && serviceChoice !== "free" && (
        <div
          style={{
            marginBottom: "32px",
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "24px",
                background: "linear-gradient(135deg, #00833D, #000000)",
                borderRadius: "2px",
                marginRight: "12px",
              }}
            ></div>
            <h5
              style={{
                margin: 0,
                color: "#2c3e50",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.5px",
              }}
            >
              Select Additional Services (
              {serviceChoice === "individual" && studentStatus === "yes" ? (
                <>₹1,50,000</>
              ) : (
                <>
                  ₹
                  {planAmount?.basePrice?.toLocaleString("en-IN") || "2,50,000"}
                </>
              )}
              {planAmount?.gstStatus ? ` + ${planAmount?.gst}% GST` : ""} each)
            </h5>
          </div>

          {renderServicesCheckboxes()}
        </div>
      )}

      {/* Delivery Preferences Dropdown */}
      <div
        style={{
          marginBottom: "32px",
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "24px",
              background: "linear-gradient(135deg, #00833D, #000000)",
              borderRadius: "2px",
              marginRight: "12px",
            }}
          ></div>
          <h5
            style={{
              margin: 0,
              color: "#2c3e50",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            Delivery Preferences
          </h5>
        </div>

        <div style={{ marginTop: "16px" }}>
          <label
            htmlFor="deliveryPreference"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#2c3e50",
            }}
          >
            How would you like to receive your services?
          </label>
          <select
            id="deliveryPreference"
            value={deliveryPreference}
            onChange={(e) => setDeliveryPreference(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              fontSize: "16px",
              backgroundColor: "#f9f9f9",
              ":focus": {
                outline: "none",
                borderColor: "#00833D",
                boxShadow: "0 0 0 2px rgba(0, 131, 61, 0.2)",
              },
            }}
          >
            <option value="email">Email Only</option>
            <option value="dashboard">Dashboard Only</option>
            <option value="both">Both Email and Dashboard</option>
          </select>
        </div>
      </div>

      {plans.length > 0 && (
        <div
          style={{
            marginBottom: "32px",
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "24px",
                background: "linear-gradient(135deg, #00833D, #000000)",
                borderRadius: "2px",
                marginRight: "12px",
              }}
            ></div>
            <h5
              style={{
                margin: 0,
                color: "#2c3e50",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.5px",
              }}
            >
              Selected Plans ({plans.length})
            </h5>
          </div>

          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                borderLeft: "4px solid #00833D",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      margin: "0 0 8px 0",
                      color: "#2c3e50",
                      textTransform: "capitalize",
                    }}
                  >
                    {plan.serviceChoice} Plan
                  </h4>
                  <p style={{ margin: "0 0 4px 0", color: "#7f8c8d" }}>
                    <strong>Delivery:</strong> {plan.deliveryPreference}
                  </p>

                  {/* Services list with remove buttons */}
                  <div style={{ margin: "12px 0" }}>
                    <strong style={{ color: "#7f8c8d" }}>Services:</strong>
                    {plan.serviceDetails.map((service, serviceIndex) => (
                      <div
                        key={service._id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px",
                          backgroundColor: "white",
                          borderRadius: "4px",
                          margin: "8px 0",
                          border: "1px solid #eee",
                        }}
                      >
                        <span>{service.name}</span>
                      </div>
                    ))}
                  </div>

                  <p style={{ margin: "0", color: "#7f8c8d" }}>
                    <strong>Total:</strong> ₹
                    {plan.totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => editPlan(index)}
                    style={{
                      background: "transparent",
                      border: "1px solid #00833D",
                      color: "#00833D",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removePlan(index)}
                    style={{
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      border: "none",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Update the submit button text based on context */}
        <div
          style={{
            marginTop: "32px",
            textAlign: "center",
          }}
        >
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #00833D, #000000)",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0, 131, 61, 0.2)",
              ":hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0, 131, 61, 0.3)",
              },
              ":disabled": {
                background: "#e0e0e0",
                color: "#95a5a6",
                cursor: "not-allowed",
                boxShadow: "none",
                transform: "none",
              },
            }}
          >
            {plans.length > 0
              ? "Add Another Plan"
              : serviceChoice === "free"
              ? "Get Free Plan"
              : "Add Plan"}
          </button>

          {/* Add a separate button to submit all plans */}
          {plans.length > 0 && (
            <button
              type="button"
              onClick={() => submitAllPlans(plans)}
              style={{
                background: "linear-gradient(135deg, #000000, #00833D)",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 131, 61, 0.2)",
                marginLeft: "16px",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(0, 131, 61, 0.3)",
                },
              }}
            >
              Proceed to Payment (₹
              {plans
                .reduce((sum, plan) => sum + plan.totalPrice, 0)
                .toLocaleString("en-IN")}
              )
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AgreementForm;
