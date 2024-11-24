import React from "react";
import { useNavigate } from "react-router-dom";



const Header = () => {
    
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/Login");
    }

    return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>SafeTrade</h1>
        <div style={searchContainerStyle}>
          <div style={searchWrapperStyle}>
            <i className="fas fa-search" style={searchIconStyle}></i>
            <input type="text" style={searchStyle} placeholder="Search for products..." />
          </div>
        </div>
        <div style={buttonContainerStyle}>
          <div style={verticalLineStyle}></div> {/* Vertical line */}
          <a href="/SignUp" style={linkStyle}>Sign Up</a>
          <button onClick={handleLoginClick} style={buttonStyle}>Login</button>
        </div>
      </div>
    </header>
  );
};

const headerStyle = {
  background: '#007BFF',
  textAlign: 'center',
  padding: '10px 20px',
  border: 'none',
  margin: '0',
  boxSizing: 'border-box',
  height: '150px', // Increase the height of the header

};

const titleStyle = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold',
  fontStyle: 'italic',
  textShadow: '2px 4px 4px rgba(0,0,0,0.5)',
  color: '#F0F0F0', // Lighter grey color for better visibility
  marginLeft: '-100px', // Remove default margin
  padding: '0' // Remove padding to adjust height
};



const containerStyle = {
  maxWidth: '1300px',
  margin: '0 auto',
  padding: '0', // Remove padding to adjust height
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', // Center align items vertically
  height: '100%' // Ensure the container takes the full height of the header
};

const searchContainerStyle = {
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0' // Remove padding to adjust height
};

const searchWrapperStyle = {
  position: 'relative',
  width: '550px',
  marginLeft: '20px' // Remove margin to adjust height
};

const searchIconStyle = {
  position: 'absolute',
  left: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#ccc',
  fontSize: '20px'
};

const searchStyle = {
  width: '100%',
  padding: '10px 10px 10px 50px', // Add padding to the left to make space for the icon
  borderRadius: '20px',
  border: '1px solid #ccc',
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
};

const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '0' // Remove padding to adjust height
};

const buttonStyle = {
  color: '#000',
  backgroundColor: '#CAF0F8',
  border: 'none',
  padding: '10px 30px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '10px',
  textDecoration: 'none',
  boxShadow: '2px 4px 4px rgba(0,0,0,0.5)',
  marginLeft: '20px' // Add margin to the left of the button
};

const linkStyle = {
  color: '#000',
  textDecoration: 'none',
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const verticalLineStyle = {
  borderLeft: '1px solid #000', // Vertical line style
  height: '50px', // Adjust height as needed
  margin: '0 10px' // Adjust margin to add space between elements
};

export default Header;