import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const MainPage = () => {
    const navigate = useNavigate();
    const [CurrentUserName, setCurrnetUserName] = useState('');
    const [CurrentRole, setCurrentRole] = useState('');
    const [pendingApprovals, setPendingApprovals] = useState([]);

    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);  
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
    const BuyorReserve = async() => {
      const response = await axios.post('http://localhost:3001/CheckAuth', {
        CurrentUserName
      });
      console.log(response.data);
      if(response.data.message === "True"){
         console.log("you are here! you can buy or reserve anything now");
      }
      else{
        navigate("/VerifyForm");
       
      }
    }

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

    useEffect(()=> {
        fetchData();
        fetchListings();

    },[])
    console.log("test currentUser name: ", CurrentUserName);
    return (
        <div>
      <h1>This is the Main Page</h1>
      
      
      {CurrentRole === "admin" ? (
        <div>
          <h2>Welcome, {CurrentUserName}</h2>
          <button onClick={LogoutButton}>Logout</button>
          <button style={{ marginLeft: "20px" }} onClick={navigateToVerifyFormPage}>Go to Verify</button>
          <div>
        <h3>Pending Approvals</h3>
        {pendingApprovals.length === 0 ? (
          <p>No pending approvals</p>
        ) : (
          <table border="1" style={{ width: '100%', marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Form Data</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>
                    
                    <table style={{ width: '100%' }}>
                      <tbody>
                        {Object.keys(item.formData).map((key) => (
                          <tr key={key}>
                            <td><strong>{key}</strong></td>
                            <td>{item.formData[key]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    
                    <button onClick={() => handleApproval(item.username, 'approve')}>Approve</button>
                    <button 
                      style={{ marginLeft: '10px' }} 
                      onClick={() => handleApproval(item.username, 'reject')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
        </div>
      ) : (
        <div>
            <h2>Welcome, {CurrentUserName}</h2>
            <button onClick={LogoutButton}>Logout</button>
            <button style={{ marginLeft: "20px" }} onClick={navigateToVerifyFormPage}>Go to Verify</button>
            <button style={{ marginLeft: "30px" }} onClick={ListOrAwaitToApprove}>Add Item for Sale</button>

            <div>
             {error && <p style={{ color: 'red' }}>{error}</p>}

                {listings.length === 0 && !error ? (
                    <p>No listings available.</p>
                ) : (
                    <table border="1" style={{ width: "100%", marginTop: "20px" }}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>How New</th>
                                <th>Province</th>
                                <th>Area</th>
                                <th>Seller</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.image && <img src={`http://localhost:3001/uploads/${item.image}`} alt="Item" style={{ width: '100px' }} />}</td>
                                    <td>{item.ItemName}</td>
                                    <td>{item.HowNew}</td>
                                    <td>{item.Province}</td>
                                    <td>{item.Area}</td>
                                    <td>{item.username}</td>
                                    <td>
  
                                <button onClick={BuyorReserve} >Buy/Reserve</button>
                            </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
      )}
    </div>
    )
}

export default MainPage;