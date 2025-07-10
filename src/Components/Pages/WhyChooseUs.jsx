// import {
//   FaChartLine,
//   FaBusinessTime,
//   FaUniversity,
//   FaShieldAlt,
//   FaRoad,
//   FaFileAlt,
//   FaPiggyBank,
//   FaCashRegister,
//   FaBalanceScale,
//   FaSearchDollar,
//   FaLeaf,
// } from "react-icons/fa";

// const WhyChooseUs = () => {
//   return (
//     <section
//       className="why_choose_us about_page aos-init aos-animate mt-5"
//       data-aos="fade-up"
//       data-aos-easing="linear"
//       data-aos-duration={500}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         padding: "80px 0",
//         backgroundColor: "#f9fafc",
//       }}
//     >
//       {/* Decorative elements */}
//       <div
//         className="shape_circle float-bob-y"
//         style={{
//           position: "absolute",
//           top: "20%",
//           left: "5%",
//           animation: "bobY 6s ease-in-out infinite",
//         }}
//       >
//         <img
//           src="/assets/images/icons/ring_shape.png"
//           alt="decorative circle"
//           style={{ width: "120px" }}
//         />
//       </div>
//       <div
//         className="mouse_pointer float-bob-x"
//         style={{
//           position: "absolute",
//           bottom: "15%",
//           right: "8%",
//           animation: "bobX 5s ease-in-out infinite",
//         }}
//       >
//         <img
//           src="/assets/images/icons/mouse-pointer.png"
//           alt="decorative pointer"
//           style={{ width: "80px" }}
//         />
//       </div>

//       <div
//         className="container"
//         style={{ maxWidth: "1200px", margin: "0 auto" }}
//       >
//         <div
//           className="border_top"
//           style={{
//             height: "2px",
//             background: "linear-gradient(135deg, #00833D, #000000)",
//             marginBottom: "40px",
//           }}
//         />

//         <div
//           className="section_title centred"
//           style={{ textAlign: "center", marginBottom: "60px" }}
//         >
//           <div
//             className="tag_text"
//             style={{
//               display: "inline-block",
//               marginBottom: "15px",
//               padding: "8px 20px",
//               background: "linear-gradient(135deg, #00833D, #000000)",
//               borderRadius: "30px",
//               color: "#ffffff",
//               fontSize: "14px",
//               fontWeight: "600",
//               textTransform: "uppercase",
//               letterSpacing: "1px",
//             }}
//           >
//             <h6 style={{ margin: 0 }}>Why Choose Us</h6>
//           </div>
//           <h3
//             style={{
//               fontSize: "36px",
//               fontWeight: "700",
//               background: "linear-gradient(135deg, #00833D, #000000)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               lineHeight: "1.3",
//               margin: "0 auto",
//               maxWidth: "800px",
//             }}
//           >
//             Your Holistic Financial Guide — Smarter Planning. Confident Growth.
//             Lasting Impact.
//           </h3>
//         </div>

//         <div
//           className="row"
//           style={{ display: "flex", flexWrap: "wrap", margin: "0 -15px" }}
//         >
//           {/* Personal Wealth Card */}
//           <div
//             className="col-xl-6 col-md-6 col-sm-12"
//             style={{ padding: "0 15px", marginBottom: "30px" }}
//           >
//             <div
//               className="why_choose_block_two mb_40 aos-init aos-animate"
//               data-aos="fade-right"
//               data-aos-easing="linear"
//               data-aos-duration={500}
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: "12px",
//                 padding: "40px 30px",
//                 height: "100%",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 borderTop: "4px solid #00833D",
//               }}
//             >
//               <div
//                 className="choose_icon"
//                 style={{
//                   width: "70px",
//                   height: "70px",
//                   background: "linear-gradient(135deg, #00833D, #000000)",
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: "25px",
//                 }}
//               >
//                 <FaChartLine style={{ color: "#ffffff", fontSize: "30px" }} />
//               </div>
//               <h4
//                 style={{
//                   fontSize: "22px",
//                   fontWeight: "700",
//                   marginBottom: "15px",
//                   color: "#1a1a1a",
//                 }}
//               >
//                 Grow and protect your personal wealth
//               </h4>
//               <p
//                 style={{
//                   color: "#666",
//                   lineHeight: "1.7",
//                   marginBottom: "20px",
//                 }}
//               >
//                 We help individuals and families make better financial decisions
//                 through expert guidance, customized planning, and goal-based
//                 strategies — without managing your money or selling investment
//                 products.
//               </p>
//               <ul
//                 className="benefit-list"
//                 style={{
//                   listStyleType: "none",
//                   paddingLeft: "0",
//                   marginTop: "20px",
//                 }}
//               >
//                 <li
//                   style={{
//                     position: "relative",
//                     paddingLeft: "35px",
//                     marginBottom: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <FaFileAlt
//                     style={{
//                       color: "#00833D",
//                       marginRight: "10px",
//                       fontSize: "18px",
//                     }}
//                   />
//                   <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                     Personalized financial plans to meet your goals
//                   </span>
//                 </li>
//                 <li
//                   style={{
//                     position: "relative",
//                     paddingLeft: "35px",
//                     marginBottom: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <FaSearchDollar
//                     style={{
//                       color: "#00833D",
//                       marginRight: "10px",
//                       fontSize: "18px",
//                     }}
//                   />
//                   <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                     Portfolio reviews and diagnostic reports
//                   </span>
//                 </li>
//                 <li
//                   style={{
//                     position: "relative",
//                     paddingLeft: "35px",
//                     marginBottom: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <FaShieldAlt
//                     style={{
//                       color: "#00833D",
//                       marginRight: "10px",
//                       fontSize: "18px",
//                     }}
//                   />
//                   <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                     Risk planning for health, life, and emergencies
//                   </span>
//                 </li>
//                 <li
//                   style={{
//                     position: "relative",
//                     paddingLeft: "35px",
//                     marginBottom: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <FaRoad
//                     style={{
//                       color: "#00833D",
//                       marginRight: "10px",
//                       fontSize: "18px",
//                     }}
//                   />
//                   <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                     Clear roadmap for saving, investing, and retiring smarter
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Business Finances Card */}
//           <div
//             className="col-xl-6 col-md-6 col-sm-12"
//             style={{ padding: "0 15px", marginBottom: "30px" }}
//           >
//             <div
//               className="why_choose_block_two mb_40 hover aos-init aos-animate"
//               data-aos="fade-up"
//               data-aos-easing="linear"
//               data-aos-duration={500}
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: "12px",
//                 padding: "40px 30px",
//                 height: "100%",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 borderTop: "4px solid #00833D",
//                 ":hover": {
//                   transform: "translateY(-5px)",
//                   boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
//                 },
//               }}
//             >
//               <div
//                 className="choose_icon"
//                 style={{
//                   width: "70px",
//                   height: "70px",
//                   background: "linear-gradient(135deg, #00833D, #000000)",
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: "25px",
//                 }}
//               >
//                 <FaBusinessTime
//                   style={{ color: "#ffffff", fontSize: "30px" }}
//                 />
//               </div>
//               <h4
//                 style={{
//                   fontSize: "22px",
//                   fontWeight: "700",
//                   marginBottom: "15px",
//                   color: "#1a1a1a",
//                 }}
//               >
//                 Make the most of your business finances
//               </h4>
//               <p
//                 style={{
//                   color: "#666",
//                   lineHeight: "1.7",
//                   marginBottom: "20px",
//                 }}
//               >
//                 We support entrepreneurs, founders, and business owners in
//                 managing their business and personal finances with confidence —
//                 through budgeting, cash flow planning, and strategic guidance.
//               </p>
//               <ul
//                 className="benefit-list"
//                 style={{
//                   listStyleType: "none",
//                   paddingLeft: "0",
//                   marginTop: "20px",
//                 }}
//               >
//                 <li
//                   style={{
//                     position: "relative",
//                     paddingLeft: "35px",
//                     marginBottom: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <FaBalanceScale
//                     style={{
//                       color: "#00833D",
//                       marginRight: "10px",
//                       fontSize: "18px",
//                     }}
//                   />
//                   <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                     Financial planning tailored to your business stage
//                   </span>
//                 </li>
//                 <li
//                   style={{
//                     position: "relative",
//                     paddingLeft: "35px",
//                     marginBottom: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <FaCashRegister
//                     style={{
//                       color: "#00833D",
//                       marginRight: "10px",
//                       fontSize: "18px",
//                     }}
//                   />
//                   <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                     Surplus and liquidity management strategies
//                   </span>
//                 </li>
//                 <li
//                   style={{
//                     position: "relative",
//                     paddingLeft: "35px",
//                     marginBottom: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <FaChartLine
//                     style={{
//                       color: "#00833D",
//                       marginRight: "10px",
//                       fontSize: "18px",
//                     }}
//                   />
//                   <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                     Cost control, budgeting, and forecasting support
//                   </span>
//                 </li>
//                 <li
//                   style={{
//                     position: "relative",
//                     paddingLeft: "35px",
//                     marginBottom: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <FaPiggyBank
//                     style={{
//                       color: "#00833D",
//                       marginRight: "10px",
//                       fontSize: "18px",
//                     }}
//                   />
//                   <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                     Aligning business finances with your personal goals
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Institutional Consulting Card */}
//           <div
//             className="col-xl-12 col-md-12 col-sm-12"
//             style={{ padding: "0 15px", marginBottom: "30px" }}
//           >
//             <div
//               className="why_choose_block_two mb_40 aos-init aos-animate"
//               data-aos="fade-left"
//               data-aos-easing="linear"
//               data-aos-duration={500}
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: "12px",
//                 padding: "40px 30px",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 borderTop: "4px solid #00833D",
//               }}
//             >
//               <div
//                 className="choose_icon"
//                 style={{
//                   width: "70px",
//                   height: "70px",
//                   background: "linear-gradient(135deg, #00833D, #000000)",
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: "25px",
//                 }}
//               >
//                 <FaUniversity style={{ color: "#ffffff", fontSize: "30px" }} />
//               </div>
//               <h4
//                 style={{
//                   fontSize: "22px",
//                   fontWeight: "700",
//                   marginBottom: "15px",
//                   color: "#1a1a1a",
//                 }}
//               >
//                 Strategic financial consulting for institutions
//               </h4>
//               <p
//                 style={{
//                   color: "#666",
//                   lineHeight: "1.7",
//                   marginBottom: "20px",
//                 }}
//               >
//                 We partner with companies, startups, and institutions to support
//                 long-term planning, fund strategy, and decision-making with
//                 data-backed financial insights.
//               </p>
//               <div
//                 style={{ display: "flex", flexWrap: "wrap", margin: "0 -10px" }}
//               >
//                 <ul
//                   className="benefit-list"
//                   style={{
//                     listStyleType: "none",
//                     paddingLeft: "0",
//                     marginTop: "20px",
//                     flex: "1",
//                     minWidth: "250px",
//                     padding: "0 10px",
//                   }}
//                 >
//                   <li
//                     style={{
//                       position: "relative",
//                       paddingLeft: "35px",
//                       marginBottom: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <FaUniversity
//                       style={{
//                         color: "#00833D",
//                         marginRight: "10px",
//                         fontSize: "18px",
//                       }}
//                     />
//                     <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                       Treasury and surplus fund planning
//                     </span>
//                   </li>
//                   <li
//                     style={{
//                       position: "relative",
//                       paddingLeft: "35px",
//                       marginBottom: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <FaChartLine
//                       style={{
//                         color: "#00833D",
//                         marginRight: "10px",
//                         fontSize: "18px",
//                       }}
//                     />
//                     <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                       Long-term capital planning and modeling
//                     </span>
//                   </li>
//                 </ul>
//                 <ul
//                   className="benefit-list"
//                   style={{
//                     listStyleType: "none",
//                     paddingLeft: "0",
//                     marginTop: "20px",
//                     flex: "1",
//                     minWidth: "250px",
//                     padding: "0 10px",
//                   }}
//                 >
//                   <li
//                     style={{
//                       position: "relative",
//                       paddingLeft: "35px",
//                       marginBottom: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <FaSearchDollar
//                       style={{
//                         color: "#00833D",
//                         marginRight: "10px",
//                         fontSize: "18px",
//                       }}
//                     />
//                     <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                       Feasibility studies and financial due diligence
//                     </span>
//                   </li>
//                   <li
//                     style={{
//                       position: "relative",
//                       paddingLeft: "35px",
//                       marginBottom: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <FaLeaf
//                       style={{
//                         color: "#00833D",
//                         marginRight: "10px",
//                         fontSize: "18px",
//                       }}
//                     />
//                     <span style={{ color: "#444", lineHeight: "1.5", textAlign: "start" }}>
//                       Integration of sustainability and purpose-driven finance
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add these keyframes for the animations */}
//       <style jsx>{`
//         @keyframes bobY {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }
//         @keyframes bobX {
//           0%,
//           100% {
//             transform: translateX(0);
//           }
//           50% {
//             transform: translateX(15px);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default WhyChooseUs;

import {
  FaChartLine,
  FaBusinessTime,
  FaUniversity,
  FaShieldAlt,
  FaRoad,
  FaFileAlt,
  FaPiggyBank,
  FaCashRegister,
  FaBalanceScale,
  FaSearchDollar,
  FaLeaf,
} from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section
      className="why_choose_us about_page aos-init aos-animate mt-5"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration={500}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "60px 0",
        backgroundColor: "#f9fafc",
      }}
    >
      {/* Decorative elements */}
      <div
        className="shape_circle float-bob-y"
        style={{
          position: "absolute",
          top: "20%",
          left: "5%",
          animation: "bobY 6s ease-in-out infinite",
        }}
      >
        
      </div>
      <div
        className="mouse_pointer float-bob-x"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          animation: "bobX 5s ease-in-out infinite",
        }}
      >
       
      </div>

      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >

        <div
          className="section_title centred"
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <div
            className="tag_text"
            style={{
              display: "inline-block",
              marginBottom: "12px",
              padding: "6px 16px",
              background: "linear-gradient(135deg, #00833D, #000000)",
              borderRadius: "25px",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            <h6 style={{ margin: 0 }}>Why Choose Us</h6>
          </div>
          <h3
            style={{
              fontSize: "28px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #00833D, #000000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1.3",
              margin: "0 auto",
              maxWidth: "800px",
            }}
          >
            Your Holistic Financial Guide — Smarter Planning. Confident Growth.
            Lasting Impact.
          </h3>
        </div>

        <div
          className="row"
          style={{ display: "flex", flexWrap: "wrap", margin: "0 -15px" }}
        >
          {/* Personal Wealth Card */}
          <div
            className="col-xl-6 col-md-6 col-sm-12"
            style={{ padding: "0 15px", marginBottom: "25px" }}
          >
            <div
              className="why_choose_block_two mb_40 aos-init aos-animate"
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration={500}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
                boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                transition: "all 0.6s ease",
                borderTop: "3px solid #00833D",
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="choose_icon"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "15px",
                      flexShrink: 0,
                    }}
                  >
                    <FaChartLine
                      style={{ color: "#ffffff", fontSize: "20px" }}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      margin: 0,
                    }}
                  >
                    Grow and protect your personal wealth
                  </h4>
                </div>
                <div
                  className="arrow-icon"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: "rotate(0deg)",
                    color: "#00833D",
                    fontSize: "20px",
                    marginLeft: "10px",
                  }}
                >
                  <FaChevronDown />
                </div>
              </div>

              <div
                style={{
                  maxHeight: "0",
                  overflow: "hidden",
                  transition:
                    "max-height 0.6s ease, opacity 0.6s ease, margin-top 0.6s ease",
                  opacity: "0",
                  marginTop: "0",
                }}
                className="hover-content"
              >
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.6",
                    margin: "15px 0 0 0",
                    fontSize: "14px",
                  }}
                >
                  We help individuals and families make better financial
                  decisions through expert guidance, customized planning, and
                  goal-based strategies — without managing your money or selling
                  investment products.
                </p>
                <ul
                  className="benefit-list"
                  style={{
                    listStyleType: "none",
                    paddingLeft: "0",
                    marginTop: "15px",
                  }}
                >
                  <li
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <FaFileAlt
                      style={{
                        color: "#00833D",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <span
                      style={{
                        color: "#444",
                        lineHeight: "1.5",
                        textAlign: "start",
                      }}
                    >
                      Personalized financial plans to meet your goals
                    </span>
                  </li>
                  <li
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <FaSearchDollar
                      style={{
                        color: "#00833D",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <span
                      style={{
                        color: "#444",
                        lineHeight: "1.5",
                        textAlign: "start",
                      }}
                    >
                      Portfolio reviews and diagnostic reports
                    </span>
                  </li>
                  <li
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <FaShieldAlt
                      style={{
                        color: "#00833D",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <span
                      style={{
                        color: "#444",
                        lineHeight: "1.5",
                        textAlign: "start",
                      }}
                    >
                      Risk planning for health, life, and emergencies
                    </span>
                  </li>
                  <li
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <FaRoad
                      style={{
                        color: "#00833D",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <span
                      style={{
                        color: "#444",
                        lineHeight: "1.5",
                        textAlign: "start",
                      }}
                    >
                      Clear roadmap for saving, investing, and retiring smarter
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Business Finances Card */}
          <div
            className="col-xl-6 col-md-6 col-sm-12"
            style={{ padding: "0 15px", marginBottom: "25px" }}
          >
            <div
              className="why_choose_block_two mb_40 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration={500}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
                boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                transition: "all 0.6s ease",
                borderTop: "3px solid #00833D",
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="choose_icon"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "15px",
                      flexShrink: 0,
                    }}
                  >
                    <FaBusinessTime
                      style={{ color: "#ffffff", fontSize: "20px" }}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      margin: 0,
                    }}
                  >
                    Make the most of your business finances
                  </h4>
                </div>
                <div
                  className="arrow-icon"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: "rotate(0deg)",
                    color: "#00833D",
                    fontSize: "20px",
                    marginLeft: "10px",
                  }}
                >
                  <FaChevronDown />
                </div>
              </div>

              <div
                style={{
                  maxHeight: "0",
                  overflow: "hidden",
                  transition:
                    "max-height 0.6s ease, opacity 0.6s ease, margin-top 0.6s ease",
                  opacity: "0",
                  marginTop: "0",
                }}
                className="hover-content"
              >
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.6",
                    margin: "15px 0 0 0",
                    fontSize: "14px",
                  }}
                >
                  We support entrepreneurs, founders, and business owners in
                  managing their business and personal finances with confidence
                  — through budgeting, cash flow planning, and strategic
                  guidance.
                </p>
                <ul
                  className="benefit-list"
                  style={{
                    listStyleType: "none",
                    paddingLeft: "0",
                    marginTop: "15px",
                  }}
                >
                  <li
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <FaBalanceScale
                      style={{
                        color: "#00833D",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <span
                      style={{
                        color: "#444",
                        lineHeight: "1.5",
                        textAlign: "start",
                      }}
                    >
                      Financial planning tailored to your business stage
                    </span>
                  </li>
                  <li
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <FaCashRegister
                      style={{
                        color: "#00833D",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <span
                      style={{
                        color: "#444",
                        lineHeight: "1.5",
                        textAlign: "start",
                      }}
                    >
                      Surplus and liquidity management strategies
                    </span>
                  </li>
                  <li
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <FaChartLine
                      style={{
                        color: "#00833D",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <span
                      style={{
                        color: "#444",
                        lineHeight: "1.5",
                        textAlign: "start",
                      }}
                    >
                      Cost control, budgeting, and forecasting support
                    </span>
                  </li>
                  <li
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <FaPiggyBank
                      style={{
                        color: "#00833D",
                        marginRight: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <span
                      style={{
                        color: "#444",
                        lineHeight: "1.5",
                        textAlign: "start",
                      }}
                    >
                      Aligning business finances with your personal goals
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Institutional Consulting Card */}
          <div
            className="col-xl-12 col-md-12 col-sm-12"
            style={{ padding: "0 15px", marginBottom: "25px" }}
          >
            <div
              className="why_choose_block_two mb_40 aos-init aos-animate"
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration={500}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                transition: "all 0.6s ease",
                borderTop: "3px solid #00833D",
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="choose_icon"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "linear-gradient(135deg, #00833D, #000000)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "15px",
                      flexShrink: 0,
                    }}
                  >
                    <FaUniversity
                      style={{ color: "#ffffff", fontSize: "20px" }}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      margin: 0,
                    }}
                  >
                    Strategic financial consulting for institutions
                  </h4>
                </div>
                <div
                  className="arrow-icon"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: "rotate(0deg)",
                    color: "#00833D",
                    fontSize: "20px",
                    marginLeft: "10px",
                  }}
                >
                  <FaChevronDown />
                </div>
              </div>

              <div
                style={{
                  maxHeight: "0",
                  overflow: "hidden",
                  transition:
                    "max-height 0.6s ease, opacity 0.6s ease, margin-top 0.6s ease",
                  opacity: "0",
                  marginTop: "0",
                }}
                className="hover-content"
              >
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.6",
                    margin: "15px 0 0 0",
                    fontSize: "14px",
                  }}
                >
                  We partner with companies, startups, and institutions to
                  support long-term planning, fund strategy, and decision-making
                  with data-backed financial insights.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 -10px",
                  }}
                >
                  <ul
                    className="benefit-list"
                    style={{
                      listStyleType: "none",
                      paddingLeft: "0",
                      marginTop: "15px",
                      flex: "1",
                      minWidth: "250px",
                      padding: "0 10px",
                    }}
                  >
                    <li
                      style={{
                        position: "relative",
                        paddingLeft: "30px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <FaUniversity
                        style={{
                          color: "#00833D",
                          marginRight: "8px",
                          fontSize: "16px",
                        }}
                      />
                      <span
                        style={{
                          color: "#444",
                          lineHeight: "1.5",
                          textAlign: "start",
                        }}
                      >
                        Treasury and surplus fund planning
                      </span>
                    </li>
                    <li
                      style={{
                        position: "relative",
                        paddingLeft: "30px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <FaChartLine
                        style={{
                          color: "#00833D",
                          marginRight: "8px",
                          fontSize: "16px",
                        }}
                      />
                      <span
                        style={{
                          color: "#444",
                          lineHeight: "1.5",
                          textAlign: "start",
                        }}
                      >
                        Long-term capital planning and modeling
                      </span>
                    </li>
                  </ul>
                  <ul
                    className="benefit-list"
                    style={{
                      listStyleType: "none",
                      paddingLeft: "0",
                      marginTop: "15px",
                      flex: "1",
                      minWidth: "250px",
                      padding: "0 10px",
                    }}
                  >
                    <li
                      style={{
                        position: "relative",
                        paddingLeft: "30px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <FaSearchDollar
                        style={{
                          color: "#00833D",
                          marginRight: "8px",
                          fontSize: "16px",
                        }}
                      />
                      <span
                        style={{
                          color: "#444",
                          lineHeight: "1.5",
                          textAlign: "start",
                        }}
                      >
                        Feasibility studies and financial due diligence
                      </span>
                    </li>
                    <li
                      style={{
                        position: "relative",
                        paddingLeft: "30px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <FaLeaf
                        style={{
                          color: "#00833D",
                          marginRight: "8px",
                          fontSize: "16px",
                        }}
                      />
                      <span
                        style={{
                          color: "#444",
                          lineHeight: "1.5",
                          textAlign: "start",
                        }}
                      >
                        Integration of sustainability and purpose-driven finance
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these keyframes for the animations */}
      <style jsx global>{`
        @keyframes bobY {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes bobX {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(12px);
          }
        }

        .why_choose_block_two {
          height: auto !important;
          min-height: 150px !important;
        }

        .why_choose_block_two:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1) !important;
          min-height: auto !important;
          height: auto !important;
        }

        .why_choose_block_two:hover .hover-content {
          max-height: 1000px !important;
          opacity: 1 !important;
          margin-top: 15px !important;
        }

        .why_choose_block_two:hover .arrow-icon {
          transform: rotate(180deg) !important;
        }

        /* Equal height for all cards */
        .row {
          display: flex;
          flex-wrap: wrap;
        }

        .col-xl-6,
        .col-md-6,
        .col-sm-12,
        .col-xl-12 {
          display: flex;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
