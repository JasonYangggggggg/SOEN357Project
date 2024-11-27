import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Header from '../Components/Header';
import QuickView from '../Components/Quickview';
import { products, electronics } from '../Data/products'; // Adjust the import path as needed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const MainPage = () => {
  const navigate = useNavigate();
  const [CurrentUserName, setCurrnetUserName] = useState("");
  const [CurrentRole, setCurrentRole] = useState("");
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState("browseAll");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/check-session", {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.message === "Invalid Login") {
        navigate("/Login");
      } else {
        console.log("Log in success");
        setCurrnetUserName(response.data.Data.username);
        setCurrentRole(response.data.Data.role);
        if (response.data.UserData) {
          console.log(
            "here is the",
            response.data.UserData.IfAdminPendingApprovalList
          );
          setPendingApprovals(
            response.data.UserData.IfAdminPendingApprovalList
          );
        }
      }
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  const fetchListings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/listings");
      setListings(response.data);
    } catch (error) {
      setError("Failed to fetch listings");
    }
  };

  useEffect(() => {
    fetchData();
    fetchListings();
  }, []);

  const settings = {
    dots: true,
    infinite: false, // Disable infinite scrolling
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false, // Disable infinite scrolling
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: false, // Disable infinite scrolling
        },
      },
    ],
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };


  const renderContent = () => {
    switch (activeView) {
      case "browseAll":
        return (
          <>
            <h1 style={welcomeStyle}>Welcome to SafeTrade</h1>
            {CurrentRole === "admin" && (
              <div>
                <h2>Welcome, {CurrentUserName}</h2>
                <button
                  onClick={async () => {
                    try {
                      const response = await axios.post(
                        "http://localhost:3001/Logout",
                        {},
                        { withCredentials: true }
                      );
                      if (response.data.message === "Logged out successfully") {
                        navigate("/Login");
                      } else {
                        console.error("Logout failed");
                      }
                    } catch (error) {
                      console.error("Error during logout:", error);
                    }
                  }}
                >
                  Logout
                </button>

                <button
                  style={{ marginLeft: "20px" }}
                  onClick={() => navigate("/VerifyFormPage")}
                >
                  Go to Verify
                </button>
                <div>
                  <h3>Pending Approvals</h3>
                  {pendingApprovals.length === 0 ? (
                    <p>No pending approvals</p>
                  ) : (
                    <table
                      border="1"
                      style={{ width: "100%", marginTop: "20px" }}
                    >
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Form Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingApprovals.map((approval, index) => (
                          <tr key={index}>
                            <td>{approval.username}</td>
                            <td>{approval.formData}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
            <h2 style={categoryTitleStyle}>Product Listings</h2>
            {products.length === 0 ? (
              <p>No listings available</p>
            ) : (
              <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id} style={productLinkStyle}>
                  <button
                    onClick={() => handleProductClick(product)}
                    style={{
                      ...productContentStyle,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      style={productImageStyle}
                    />
                    <p style={productPriceStyle}>{product.price}</p>
                    <h3 style={productNameStyle}>{product.name}</h3>
                  </button>
                </div>
              ))}
            </Slider>
          )}
            <h2 style={{ ...categoryTitleStyle, marginTop: "40px" }}>
              Electronics
            </h2>{" "}
            {/* Add marginTop to create gap */}
            {electronics.length === 0 ? (
              <p>No electronics available</p>
            ) : (
              <Slider {...settings}>
              {electronics.map((product) => (
                <div key={product.id} style={productLinkStyle}>
                  <button
                    onClick={() => handleProductClick(product)}
                    style={{
                      ...productContentStyle,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      style={productImageStyle}
                    />
                    <p style={productPriceStyle}>{product.price}</p>
                    <h3 style={productNameStyle}>{product.name}</h3>
                  </button>
                </div>
              ))}
            </Slider>
            )}
            {error && <p style={errorStyle}>{error}</p>}
          </>
        );
      case "addItem":
      case "sellingList":
        return (
          <div>
            <h2 style={welcomeStyle}>
              {activeView === "addItem"
                ? "Add Item for Sale"
                : "Your Selling List"}
            </h2>
            {/* Placeholder for future functionality */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={mainPageStyle}>
      <Header />
      <div style={containerStyle}>
        {/* Left Content */}
        <div style={contentStyle}>{renderContent()}</div>

        {/* Right Navigation */}
        <div style={navigationStyle}>
          <button
            style={navButtonStyle}
            onClick={() => setActiveView("browseAll")}
          >
            Browse All
          </button>
          <button
            style={navButtonStyle}
            onClick={() => setActiveView("addItem")}
          >
            Add Item for Sale
          </button>
          <button
            style={navButtonStyle}
            onClick={() => setActiveView("sellingList")}
          >
            Selling List
          </button>
        </div>
      </div>
      {selectedProduct && (<QuickView product={selectedProduct} onClose={handleCloseQuickView} />)}
    </div>
  );
};

const mainPageStyle = {
  background: "#fff",
  minHeight: "100vh", // Ensure it covers the full viewport height
  margin: "0",
  padding: "0",
  boxSizing: "border-box",
};

const containerStyle = {
  display: "flex",
  flexDirection: "row", // left and right sections
  minHeight: "calc(100vh - 60px)", // minus the header height
};

const navigationStyle = {
  //right part
  width: "150px",
  padding: "10px",
  backgroundColor: "#f4f4f4", // Light gray background
  borderLeft: "1px solid #ddd",
  position: "fixed", // Fixed position
  right: "0",
  top: "60px", // Align with the header height
  height: "calc(100vh - 60px)", // minus the header height
};

const navButtonStyle = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  textAlign: "center",
};

const contentStyle = {
  //left part
  flex: 1,
  padding: "20px", // Add padding to the content
  color: "#000", // Ensure text color is readable
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "hidden", // Prevent horizontal overflow
  marginRight: "150px", // Respect the space taken by navigation
};

const welcomeStyle = {
  textAlign: 'center',
  padding: '20px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold',
};

const categoryTitleStyle = {
  fontSize: '24px', // Increase the font size for category titles
  fontWeight: 'bold',
  marginTop: '40px', // Add margin to create gap
  marginBottom:'40px',
  textAlign: 'left',
  textDecoration:'underline'
};

const productLinkStyle = {
  display: 'block',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'inherit',
  padding: '10px',
  outline: 'none', // Remove outline on focus
  userSelect: 'none', // Prevent text selection
  WebkitTapHighlightColor: 'transparent', // Remove highlight color on mobile devices
  backgroundColor: 'transparent', // Ensure background color does not change
  border: 'none', // Ensure no border is shown on focus
  boxShadow: 'none' // Remove any box shadow on focus
};

const productContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  userSelect: 'none', // Prevent text selection
  textDecoration: 'none' // Remove underline
};

const productImageStyle = {
  width: '100%',
  height: '300px', // Set a fixed height for the images
  borderRadius: '20px',
  objectFit: 'contain', // Ensure the image fits within the container
  userSelect: 'none', // Prevent text selection
  textDecoration: 'none' // Remove underline
};

const productNameStyle = {
  marginTop: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#000',
  userSelect: 'none', // Prevent text selection
  textDecoration: 'none' // Remove underline
};

const productPriceStyle = {
  marginTop: '5px',
  fontSize: '14px',
  color: '#555',
  userSelect: 'none', // Prevent text selection
  textDecoration: 'none' // Remove underline
};

const errorStyle = {
  color: 'red',
  marginTop: '20px'
};

export default MainPage;