import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const VerifyForm = () => {
    const navigate = useNavigate();
    const [CurrentUserName, setCurrnetUserName] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        sin: '',
        company: '',
        idNumber: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
   
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        const username = CurrentUserName;
        const response = await axios.post(
            "http://localhost:3001/SendToVerify", 
            { username, formData},
            { withCredentials: true }
          );
        console.log(response.data);
        if(response.data.message === 'Form data sent success'){
          alert("Request sent!");
        }
        else{
          alert("Failed sent");
        }
       
      };

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



    const goHome = () => {
        navigate("/");
    }
    useEffect(()=> {
        fetchData();

    },[])
    return (
    
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <button
            onClick={goHome}
            style={{
              backgroundColor: '#28a745', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              fontSize: '1em', 
              cursor: 'pointer', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Home
          </button>
          
          <h2 style={{ textAlign: 'center', marginTop: '20px', color: '#333' }}>Verify Form</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ fontWeight: '600', fontSize: '1.1em', marginBottom: '5px' }}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1em',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: '600', fontSize: '1.1em', marginBottom: '5px' }}>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1em',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: '600', fontSize: '1.1em', marginBottom: '5px' }}>SIN Code:</label>
              <input
                type="text"
                name="sin"
                value={formData.sin}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1em',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: '600', fontSize: '1.1em', marginBottom: '5px' }}>Company:</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1em',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
              />
            </div>

            <div>
              <label style={{ fontWeight: '600', fontSize: '1.1em', marginBottom: '5px' }}>ID Number:</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '1em',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '1.1em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
    )
}
export default VerifyForm;