import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const MainPage = () => {
    const navigate = useNavigate();
    const [CurrentUserName, setCurrnetUserName] = useState('');
    const [CurrentRole, setCurrentRole] = useState('');
    const [pendingApprovals, setPendingApprovals] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);




    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);  
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const fetchData = async()=>{
        const response = await axios.get("http://localhost:3001/check-session", { withCredentials: true });
        console.log(response.data);
        if(response.data.message === "Invalid Login"){
            navigate("/Login")
        }
        else{
            console.log("Log in success");
            setCurrnetUserName(response.data.Data.username);
            setCurrentRole(response.data.Data.role);
            if(response.data.UserData){
            console.log("here is the", response.data.UserData.IfAdminPendingApprovalList);
            setPendingApprovals(response.data.UserData.IfAdminPendingApprovalList);
            }
            
        }
    }
    const LogoutButton = async() => {
        const response = await axios.post(
            "http://localhost:3001/logout", 
            {},
            { withCredentials: true }
          );
        if(response.data.message === "Logged out successfully"){
            navigate("/Login");
        }
        else{
            console.log("something is wrong");
        }

    }

   
  
    
    

    const navigateToVerifyFormPage = () => {
        navigate("/VerifyForm");
    }
    const handleApproval = async (username, action) => {
   
    const response = await axios.post('http://localhost:3001/approveOrReject', {
          username,
          action,
          CurrentUserName,
        });
      console.log(response.data);
      if(response.data.message === 'Approve Success'){
        fetchData();
        console.log("approve user");
      }
      else{
        fetchData();
        console.log("reject user");
      }
      
    };

    const BuyorReserve = async(itemlist) => {
      const response = await axios.post('http://localhost:3001/CheckAuth', {
        CurrentUserName
      });
      console.log(response.data);
      if(response.data.message === "True"){
         console.log("you are here! you can buy or reserve anything now");
         console.log(itemlist);
         if(CurrentUserName === itemlist.username){
           alert("You are not allow to reserve your own item");
         }
         else{
         
        setCurrentItem(itemlist);
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
  

    const ListOrAwaitToApprove = async() => {
      console.log("here is the currentUser");
      console.log(CurrentUserName);
      const response = await axios.post('http://localhost:3001/CheckAuth', {
        CurrentUserName
      });
      console.log(response.data);
      if(response.data.message === "True"){
        navigate("/ListItem");
      }
      else{
        navigate("/VerifyForm");
      }
    }
    const fetchListings = async () => {
      try {
          const response = await axios.get('http://localhost:3001/AllListing');
          setListings(response.data.listings);
      } catch (error) {
          console.error("Error fetching listings:", error);
          setError("Failed to load listings.");
      }
  };


  const GoToReservationPage = () => {

    navigate("/ReservationDetail");

  }

  const headToDataPage = (item) => {
    navigate("/DataPage", {
      state: { item }, 
    });
  }

    useEffect(()=> {
        fetchData();
        fetchListings();

    },[]);
    console.log("test currentUser name: ", CurrentUserName);
    return (
        <div>
        <h1 style={{
    fontFamily: "'Arial', sans-serif",
    fontSize: "2.5em",
    color: "#007BFF",
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)"
}}>
    Safe<span style={{ color: "#0056b3", fontWeight: "bold" }}>Trade</span>
</h1>

{CurrentRole === "admin" ? (
  <div>
    <h2>Welcome, {CurrentUserName}</h2>
    <button onClick={LogoutButton} style={{
        backgroundColor: '#007BFF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1em'
    }}>Logout</button>
    
    <div style={{ marginTop: '20px' }}>
      <h3>Pending Approvals</h3>
      {pendingApprovals.length === 0 ? (
        <p>No pending approvals</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          {pendingApprovals.map((item, index) => (
            <div 
              key={index} 
              style={{
                border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '15px', backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>Username: {item.username}</div>
              <div>
                <h4>Form Data:</h4>
                <div style={{ paddingLeft: '20px' }}>
                  {Object.keys(item.formData).map((key) => (
                    <div key={key} style={{ marginBottom: '10px' }}>
                      <strong>{key}:</strong> {item.formData[key]}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => handleApproval(item.username, 'approve')} 
                  style={{
                    backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1em', marginRight: '10px'
                  }}
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleApproval(item.username, 'reject')} 
                  style={{
                    backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1em'
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
      ) : (
        <div>
            <h2>Welcome, {CurrentUserName}</h2>
            <button
                onClick={LogoutButton}
                style={{
                  marginLeft:'1vh',
                  backgroundColor: '#007BFF', 
                  color: '#fff',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '1.1em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}
              >
                Logout
              </button>

              <button
                style={{
                  marginLeft: "68vh",
                  backgroundColor: '#28a745', 
                  color: '#fff',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '1.1em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                onClick={navigateToVerifyFormPage}
              >
                Go to Verify
              </button>

              <button
                style={{
                  marginLeft: "12vh",
                  backgroundColor: '#f39c12',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '1.1em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e67e22'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f39c12'}
                onClick={ListOrAwaitToApprove}
              >
                Add Item for Sale
              </button>

              <button
                    style={{
                      marginLeft: "45vh",
                      backgroundColor: '#e83e8c', 
                      color: '#fff',
                      border: 'none',
                      padding: '12px 25px',
                      borderRadius: '8px',
                      fontSize: '1.1em',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#d6336c'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#e83e8c'} 
                    onClick={GoToReservationPage}
                  >
                    Check Reservation
                  </button>

            <div>
             {error && <p style={{ color: 'red' }}>{error}</p>}

                {listings.length === 0 && !error ? (
                    <p>No listings available.</p>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
                        {listings.map((item, index) => (
                            <div onClick={()=>headToDataPage(item)}  key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", textAlign: "center" }}>
                                {item.image && (
                                    <img
                                        src={`http://localhost:3001/uploads/${item.image}`}
                                        alt="Item"
                                        style={{ width: "100%", maxHeight: "150px", objectFit: "cover", marginBottom: "10px" }}
                                    />
                                )}
                                <h3 style={{ margin: "10px 0" }}>{item.ItemName}</h3>
                                <p style={{ margin: "5px 0", }}>
                                    <strong>Seller:</strong> {item.username}
                                    {item.Authendicate === "True" && (
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
                                </p>
                                <p style={{fontSize: "14px", margin: "5px 0", }} ><strong>How New:</strong> {item.HowNew}</p>
                                <p style={{fontSize: "14px", margin: "5px 0", }} ><strong>Province:</strong> {item.Province}</p>
                                <p style={{fontSize: "14px", margin: "5px 0", }} ><strong>Area:</strong> {item.Area}</p>
                                <button onClick={(e) => {e.stopPropagation(); 
                                BuyorReserve(item);}}  
                                style={{
                                  marginTop: "10px",
                                  backgroundColor: '#007bff', 
                                  color: '#fff',
                                  border: 'none',
                                  padding: '12px 25px',
                                  borderRadius: '8px',
                                  fontSize: '1.1em',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = '#0056b3'; 
                                  e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = '#007bff'; 
                                  e.target.style.transform = 'scale(1)';
                                }}>Reserve</button>
                            </div>
                        ))}
                      
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
                )}
            </div>
        </div>
      )}
    </div>
    )
}

export default MainPage;