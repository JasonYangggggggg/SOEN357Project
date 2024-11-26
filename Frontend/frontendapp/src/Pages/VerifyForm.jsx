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
        <div>
            <button onClick={goHome}>Home</button>
        <h2>Verify Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>SIN Code:</label>
            <input
              type="text"
              name="sin"
              value={formData.sin}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>ID Number:</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
}
export default VerifyForm;