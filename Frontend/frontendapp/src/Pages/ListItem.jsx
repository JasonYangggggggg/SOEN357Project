import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListItem = () => {
  const navigate = useNavigate();

 
  const [formData, setFormData] = useState({
    name: '',
    new: '',
    province: '',
    area: '',
  });

  const [CurrentUserName, setCurrnetUserName] = useState('');

  
  const [statusMessage, setStatusMessage] = useState('');

  const [image, setImage] = useState(null); // Added state for image

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Added handler for image input
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data item", formData);
    const username = CurrentUserName;

    //FormData object for file upload
    const formDataObj = new FormData();
    formDataObj.append('formData', JSON.stringify(formData));
    formDataObj.append('username', username);
    formDataObj.append('image', image);
    
    try{
      const response = await axios.post(
        "http://localhost:3001/ListItems",
        formDataObj,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log(response.data);
      setStatusMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
   
  };


  const Gohome = () => {
    navigate('/');
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
useEffect(()=> {
    fetchData();

},[])

  return (
    <div>
      <h2>This is the List Item Page</h2>

      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="new">New:</label>
          <input
            type="text"
            id="new"
            name="new"
            value={formData.new}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="province">Province:</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="area">Area:</label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      
      {statusMessage && <p>{statusMessage}</p>}

     
      <button onClick={Gohome}>Home</button>
    </div>
  );
};

export default ListItem;
