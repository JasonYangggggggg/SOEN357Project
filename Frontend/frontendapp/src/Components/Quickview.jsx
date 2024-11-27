import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import profileLogo from '../Pictures/profileLogo.png'; // Adjust the path as needed
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductQuickView = ({ product, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirmDate = () => {
    if (selectedDate) {
      alert(`Meet-up scheduled for: ${selectedDate.toLocaleDateString()}`);
      onClose(); // Close the quick view after confirming the date
    } else {
      alert('Please select a date.');
    }
  };

  if (!product) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        <div style={contentStyle}>
          <img src={product.imageSrc} alt={product.imageAlt} style={overviewImageStyle} />
          <div style={infoStyle}>
            <h1 style={infoTitleStyle}>{product.name}</h1>
            <p style={infoPriceStyle}>{product.price}</p>
            <p style={infoDescriptionStyle}>{product.description}</p>
            <div style={ownerContainerStyle}>
              <img src={profileLogo} alt="Profile Logo" style={profileLogoStyle} />
              <p style={infoOwnerStyle}>Owner: {product.owner}</p>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={pinIconStyle} />
              <p style={infoLocationStyle}>{product.location}</p>
            </div>
            <div style={calendarContainerStyle}>
              <label style={calendarLabelStyle}>Schedule a Meet-Up:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                style={calendarStyle}
              />
              <button onClick={handleConfirmDate} style={confirmButtonStyle}>Confirm Date</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  width: '80%',
  maxWidth: '800px', 
  textAlign: 'center',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
};

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const overviewImageStyle = {
  width: '50%', 
  height: 'auto',
  borderRadius: '10px'
};

const infoStyle = {
  width: '50%', 
  paddingLeft: '20px', 
  textAlign: 'left'
};

const infoTitleStyle = {
  fontSize: '24px', 
  fontWeight: 'bold'
};

const infoPriceStyle = {
  fontSize: '20px', 
  color: '#555'
};

const infoDescriptionStyle = {
  fontSize: '16px', 
  color: '#777'
};

const ownerContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px' 
};

const profileLogoStyle = {
  width: '30px', 
  height: '30px', 
  borderRadius: '50%', 
  marginRight: '10px' 
};

const infoOwnerStyle = {
  fontSize: '16px', 
  color: '#333',
  marginRight: '10px' 
};

const pinIconStyle = {
  marginRight: '10px', 
  color: '#ff0000' 
};

const infoLocationStyle = {
  fontSize: '16px', 
  color: '#333'
};

const calendarContainerStyle = {
  marginTop: '20px' 
};

const calendarLabelStyle = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '16px',
  fontWeight: 'bold'
};

const calendarStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px'
};

const confirmButtonStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '50px', 
  cursor: 'pointer'
};

export default ProductQuickView;