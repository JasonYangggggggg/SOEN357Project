import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ReservationDetail = () => {
    const navigate = useNavigate();
    const [CurrentUserName, setCurrnetUserName] = useState('');
    const [ReservationList, setReservationList] = useState([]);
    const fetchData = async()=>{
        const response = await axios.get("http://localhost:3001/check-session", { withCredentials: true });
        console.log(response.data);
        if(response.data.message === "Invalid Login"){
            navigate("/Login")
        }
        else{
            console.log("Log in success");
            setCurrnetUserName(response.data.Data.username);
            const NameCurrent = response.data.Data.username;

            const responseReservation = await axios.post("http://localhost:3001/getReservationDetail",{NameCurrent}, { withCredentials: true });
            console.log(responseReservation.data.Data);
            setReservationList(responseReservation.data.Data);
            
            
  
            
        }
    }

    const HomePageBack = () => {
        navigate("/");
    }

    useEffect(()=> {
        fetchData();

    },[]);
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <button 
        onClick={HomePageBack} 
        style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Home
      </button>

      <h2 style={{ marginTop: '20px', fontSize: '24px', color: '#333' }}>Reservation Details</h2>

      {ReservationList.length > 0 ? (
  <div style={{ marginTop: '20px' }}>
    {ReservationList.map((reservation, index) => {
      console.log("here is: ",reservation['Reservation Object']); 
      return (
        <div 
          key={index} 
          style={{
            backgroundColor: '#f9f9f9',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            marginBottom: '15px',
          }}
        >
          <h3 style={{ margin: '0', color: '#333' }}>{reservation.ReserveUser}</h3>
          <p style={{ margin: '5px 0', color: '#777', fontSize: '14px' }}>
            <strong>Time:</strong> {reservation.time}
          </p>
          <p style={{ margin: '5px 0', color: '#777', fontSize: '14px' }}>
            <strong>Item:</strong> {reservation['Reservation Object'].Item}
          </p>
          <p style={{ margin: '5px 0', color: '#777', fontSize: '14px' }}>
            <strong>Province:</strong> {reservation['Reservation Object'].Province || 'Not Available'}
          </p>
          <p style={{ margin: '5px 0', color: '#777', fontSize: '14px' }}>
            <strong>Area:</strong> {reservation['Reservation Object'].Area || 'Not Available'}
          </p>
        </div>
      );
    })}
        </div>
      ) : (
        <p>No reservations available.</p>
      )}
    </div>
    )
}

export default ReservationDetail;