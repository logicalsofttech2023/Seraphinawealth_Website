import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Pricing from "./Components/Pages/Pricing";
import About from "./Components/Pages/About";
import Login from "./Components/Login";
import Faq from "./Components/Pages/Faq";
import Profile from "./Components/Pages/Profile";
import Loader from "./Components/Loader"; // ✅ Loader Component

import "./index.css";
import Investmentplans from "./Components/Pages/Investmentplans";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ✅ Example: hide header/footer on login page
  const hiddenRoutes = ["/login"];
  const shouldHideHeaderFooter = !hiddenRoutes.includes(location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2s loader
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/investmentplans" element={<Investmentplans />} />

      </Routes>
      {shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
