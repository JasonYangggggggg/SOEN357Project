import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>SafeTrade</h1>
        <nav style={navStyle}>
          <a href="/MainPage" style={linkStyle}>Main</a>
          <a href="/About" style={linkStyle}>About</a>
          <a href="/Contact" style={linkStyle}>Contact</a>
        </nav>
        <button onClick={() => window.location.href='/Login'} style={buttonStyle}>Login</button>
      </div>
    </header>
  );
};

const titleStyle ={
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadow:'2px 4px 4px rgba(0,0,0,0.5)',
    color: '#fff'
}


const headerStyle = {
  background: 'linear-gradient(to bottom,#007BFF,#fff)',
  textAlign: 'center',
  padding: '10px 20px',
  border: 'none',
  margin: '0',
  boxSize: 'border-box',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navStyle = {
  flex: '1',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '30px',
  marginLeft: '600px'
};

const linkStyle = {
  color: '#000',
  textDecoration: 'none',
  padding: '10px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold'
};

const buttonStyle = {
  color: '#000',
  backgroundColor: '#CAF0F8',
  border: 'none',
  padding: '10px 30px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '10px',
  textDecoration: 'none',
  marginLeft: 'auto',
  boxShadow:'2px 4px 4px rgba(0,0,0,0.5)'
};

export default Header;
