import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Link, useNavigate } from "react-router-dom";

const options = {
  loop: true,
  margin: 20,
  nav: true,
  dots: false,
  autoplay: true,
  autoplayTimeout: 2500,
  responsive: {
    0: { items: 1 },
    600: { items: 3 },
    1000: { items: 4 },
  },
  navText: [
    "<div style='background:linear-gradient(135deg, #00833D, #000000); color:#fff; padding:5px 10px; border-radius:50%; box-shadow:0 2px 5px rgba(0,0,0,0.1);'><i class='fas fa-chevron-left'></i></div>",
    "<div style='background:linear-gradient(135deg, #00833D, #000000); color:#fff; padding:5px 10px; border-radius:50%; box-shadow:0 2px 5px rgba(0,0,0,0.1);'><i class='fas fa-chevron-right'></i></div>"
  ]
};

const gradientColors = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ffc3a0 0%, #ffafbd 100%)",
  "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)"
];

const Categoryslider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}getAllCategory`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const categoriesWithColors = response.data.data.map((category, index) => ({
          ...category,
          color: gradientColors[index % gradientColors.length]
        }));
        setCategories(categoriesWithColors);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <OwlCarousel className="owl-theme" {...options}>
      {[...Array(4)].map((_, index) => (
        <div key={index} style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "25px 20px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          height: "90%",
          margin: "10px 0",
          border: "1px solid rgba(0,0,0,0.03)"
        }}>
          <Skeleton 
            variant="circular" 
            width={70} 
            height={70} 
            style={{ margin: "0 auto 20px" }} 
          />
          <Skeleton 
            variant="text" 
            width="80%" 
            height={30} 
            style={{ margin: "0 auto 10px" }} 
          />
          <Skeleton 
            variant="text" 
            width="90%" 
            height={60} 
            style={{ margin: "0 auto" }} 
          />
        </div>
      ))}
    </OwlCarousel>
  );

  if (error) {
    return (
      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "60px 0",
        background: "#f8f9fa",
        textAlign: "center",
        color: "red"
      }}>
        <div>Error: {error}</div>
      </section>
    );
  }

  const handleCategoryClick = (category) => {
    console.log("Selected category:", category);
    navigate(`/investmentplans`, { state: { category } });
  };

  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      padding: "60px 0",
      background: "#f8f9fa"

    }}>
      {/* Background circles */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(233,236,239,0.8) 0%, rgba(233,236,239,0) 70%)",
        top: "-300px",
        left: "-300px"
      }} />
      <div style={{
        position: "absolute",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(233,236,239,0.6) 0%, rgba(233,236,239,0) 70%)",
        bottom: "-400px",
        right: "-400px"
      }} />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 15px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: "40px"
        }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #00833D, #000000)",
            padding: "5px 15px",
            borderRadius: "30px",
            marginBottom: "15px"
          }}>
            <h6 style={{
              margin: 0,
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "1px"
            }}>CATEGORY</h6>
          </div>
          <h2 style={{
            margin: 0,
            fontSize: "36px",
            fontWeight: 700,
            color: "#2c3e50",
            lineHeight: 1.3
          }}>Our Premium Service Categories</h2>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : categories.length > 0 ? (
          <OwlCarousel className="owl-theme" {...options}>
            {categories.map((category) => (
              <div key={category._id} style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "25px 20px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                height: "220px",
                margin: "10px 0",
                border: "1px solid rgba(0,0,0,0.03)",
                ":hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                },
                cursor: "pointer"
              }}
            
onClick={() => handleCategoryClick(category._id)}              >
                <div style={{
                  width: "70px",
                  height: "70px",
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: category.color,
                  color: "#fff",
                  fontSize: "28px",
                  boxShadow: `0 5px 15px ${category.color.split('0%')[1].split(')')[0]}50)`
                }}>
                  <img 
                    src={`${import.meta.env.VITE_FILE_URL}${category.icon}`} 
                    alt={category.name} 
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
                <h4 style={{
                  margin: "0 0 10px",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#2c3e50"
                }}>
                  <Link to={`/investmentplans`} state={{ category: category._id }} style={{
                    color: "inherit",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      color: category.color.split('0%')[0].split('#')[1]
                    }
                  }}>{category.name}</Link>
                </h4>
                {/* <p style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#7f8c8d",
                  lineHeight: 1.5
                }}>{category.description}</p> */}
              </div>
            ))}
          </OwlCarousel>
        ) : (
          <Box sx={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            maxWidth: "500px",
            margin: "0 auto"
          }}>
            <SentimentDissatisfiedIcon sx={{
              fontSize: "60px",
              color: "#bdc3c7",
              marginBottom: "20px"
            }} />
            <h3 style={{
              margin: "0 0 10px",
              color: "#2c3e50",
              fontSize: "24px"
            }}>No Categories Found</h3>
            <p style={{
              margin: 0,
              color: "#7f8c8d",
              fontSize: "16px"
            }}>We couldn't find any investment categories at the moment.</p>
          </Box>
        )}
      </div>
    </section>
  );
};

export default Categoryslider;