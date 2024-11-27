import { useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const DataIndividual = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const item = location.state?.item;
    const [CurrentUserName, setCurrnetUserName] = useState('');
    const fetchData = async()=>{
        const response = await axios.get("http://localhost:3001/check-session", { withCredentials: true });
        console.log(response.data);
        if(response.data.message === "Invalid Login"){
            navigate("/Login")
        }
        else{
            console.log("Log in success");
            setCurrnetUserName(response.data.Data.username);
        }
    }




    const ReserveFunction = async() => {
        const response = await axios.post('http://localhost:3001/CheckAuth', {
          CurrentUserName
        });
        console.log(response.data);
        if(response.data.message === "True"){
           console.log("you are here! you can buy or reserve anything now");
           if(CurrentUserName === item.username){
             alert("You are not allow to reserve your own item");
           }
           else{
           
          setCurrentItem(item);
          setIsModalOpen(true);
          }
        }
        else{
          navigate("/VerifyForm");
         
        }
      }
      const handleConfirmReserve = async () => {
        if (!selectedDateTime) {
          alert("Please select a time");
          return;
        }
    
        const time = selectedDateTime;
        const dataobject = currentItem;
        const username = CurrentUserName;
    
        try {
          const responseReserveTime = await axios.post('http://localhost:3001/ReserveTime', {
            dataobject,
            username,
            time,
          });
          console.log(responseReserveTime);
          alert("Reservation successful!");
        } catch (error) {
          console.error("Error reserving time:", error);
          alert("Failed to reserve time. Please try again.");
        } finally {
          
          setIsModalOpen(false);
          setSelectedDateTime('');
          setCurrentItem(null);
        }
      };
    const BackHome = () => {
        navigate("/");
    }
    useEffect(()=> {
        fetchData();

    },[]);

    const imageSrc = item.image ? `http://localhost:3001/uploads/${item.image}` : "No image available"; 
    const isAuthenticated = item.Authendicate === "True";
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
        <button
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '12px 25px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            borderRadius: '30px',
            display: 'block',
            
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width:'20vh'
          }}
          onClick={() => BackHome()}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Back to Home
        </button>
      
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto' }}>
        
          <div style={{ flex: '1', padding: '20px', textAlign: 'center' }}>
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt="Item Image" 
                style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '10px', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)' }} 
              />
            ) : (
              <span style={{ color: '#777', fontStyle: 'italic' }}>No image available</span>
            )}
          </div>
      
        
          <div style={{ flex: '2', padding: '20px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)', marginLeft: '20px' }}>
            <h1 style={{ textAlign: 'left', color: '#333', fontSize: '2.8rem', marginBottom: '20px' }}>Item Details</h1>
            
            <div style={{ marginBottom: '15px' }}>
             
              <div style={{ display: 'flex', padding: '6px 0' }}>
                <strong style={{ fontWeight: 'bold', color: '#555', width: '40%' }}>Username:</strong> 
                <span style={{ color: '#777', fontStyle: 'italic', display: 'flex', alignItems: 'center' }}>
                  {item.username || "N/A"}
                  {isAuthenticated && (
                    <span style={{
                      display: "inline-block",
                      marginLeft: "10px",
                      padding: "2px 6px",
                      backgroundColor: "lightgreen",
                      color: "black",
                      borderRadius: "4px",
                      fontSize: "12px",
                      }}>
                      Verified
                  </span>
                  )}
                </span>
              </div>
      
            
              <div style={{ display: 'flex', padding: '6px 0' }}>
                <strong style={{ fontWeight: 'bold', color: '#555', width: '40%' }}>Item Name:</strong> 
                <span style={{ color: '#777', fontStyle: 'italic' }}>{item.ItemName || "N/A"}</span>
              </div>
              <div style={{ display: 'flex', padding: '6px 0' }}>
                <strong style={{ fontWeight: 'bold', color: '#555', width: '40%' }}>How New:</strong> 
                <span style={{ color: '#777', fontStyle: 'italic' }}>{item.HowNew || "N/A"}</span>
              </div>
              <div style={{ display: 'flex', padding: '6px 0' }}>
                <strong style={{ fontWeight: 'bold', color: '#555', width: '40%' }}>Province:</strong> 
                <span style={{ color: '#777', fontStyle: 'italic' }}>{item.Province || "N/A"}</span>
              </div>
              <div style={{ display: 'flex', padding: '6px 0' }}>
                <strong style={{ fontWeight: 'bold', color: '#555', width: '40%' }}>Area:</strong> 
                <span style={{ color: '#777', fontStyle: 'italic' }}>{item.Area || "N/A"}</span>
              </div>
              <div style={{ display: 'flex', padding: '6px 0' }}>
                <button style={{marginLeft:'90vh',width:"16vh", backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 25px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    borderRadius: '30px',
                    display: 'block',
                    
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',}}  
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                        e.target.style.transform = 'scale(1)';
                    }} onClick={()=>ReserveFunction()}>Reserve</button>
              </div>
            </div>
            {isModalOpen && (
                      <div
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          zIndex: 999,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            background: '#fff',
                            padding: '30px',
                            borderRadius: '8px',
                            width: '90%',
                            maxWidth: '400px',
                            boxSizing: 'border-box',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                          }}
                        >
                          <h2 style={{ marginTop: 0 }}>Select a Date and Time for Reservation</h2>
                          <input
                            type="datetime-local"
                            value={selectedDateTime}
                            onChange={(e) => setSelectedDateTime(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '10px',
                              fontSize: '16px',
                              marginTop: '10px',
                              boxSizing: 'border-box',
                            }}
                          />
                          <div
                            style={{
                              marginTop: "20px",
                              textAlign: "right",
                            }}
                          >
                            <button
                              onClick={handleConfirmReserve}
                              style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setIsModalOpen(false)}
                              style={{
                                padding: '10px 20px',
                                backgroundColor: '#6c757d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginLeft: '10px',
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
          </div>
        </div>
        
      </div>
    )
}

export default DataIndividual;