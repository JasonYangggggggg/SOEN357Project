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

  const [image, setImage] = useState(null); 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data item", formData);
    const username = CurrentUserName;

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
      if(response.data.message === "Item successfully added!" ){
        alert("Item list successful");
      }
      else{
        alert("Item list unsuccessful");
      }
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

    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
  
  <button onClick={Gohome} style={{
    position: 'absolute', 
    top: '10px', 
    left: '10px', 
    padding: '0.8em 1.5em', 
    backgroundColor: '#f2b600', 
    color: '#fff', 
    fontSize: '1.2em', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s'
  }}>
    Home
  </button>

  <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2em', marginBottom: '1.5em' }}>
    This is the List Item Page
  </h2>

  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ marginBottom: '1.2em' }}>
      <label htmlFor="name" style={{ display: 'block', fontSize: '1em', color: '#333', marginBottom: '0.5em' }}>Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{
          width: '95%', 
          padding: '0.8em', 
          fontSize: '1em', 
          border: '1px solid #f2b600', 
          borderRadius: '4px', 
          backgroundColor: '#fff', 
          color: '#333'
        }}
      />
    </div>

    <div style={{ marginBottom: '1.2em' }}>
      <label htmlFor="new" style={{ display: 'block', fontSize: '1em', color: '#333', marginBottom: '0.5em' }}>New:</label>
      <input
        type="text"
        id="new"
        name="new"
        value={formData.new}
        onChange={handleChange}
        required
        style={{
          width: '95%', 
          padding: '0.8em', 
          fontSize: '1em', 
          border: '1px solid #f2b600', 
          borderRadius: '4px', 
          backgroundColor: '#fff', 
          color: '#333'
        }}
      />
    </div>

    <div style={{ marginBottom: '1.2em' }}>
      <label htmlFor="province" style={{ display: 'block', fontSize: '1em', color: '#333', marginBottom: '0.5em' }}>Province:</label>
      <input
        type="text"
        id="province"
        name="province"
        value={formData.province}
        onChange={handleChange}
        required
        style={{
          width: '95%', 
          padding: '0.8em', 
          fontSize: '1em', 
          border: '1px solid #f2b600', 
          borderRadius: '4px', 
          backgroundColor: '#fff', 
          color: '#333'
        }}
      />
    </div>

    <div style={{ marginBottom: '1.2em' }}>
      <label htmlFor="area" style={{ display: 'block', fontSize: '1em', color: '#333', marginBottom: '0.5em' }}>Area:</label>
      <input
        type="text"
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange}
        required
        style={{
          width: '95%', 
          padding: '0.8em', 
          fontSize: '1em', 
          border: '1px solid #f2b600', 
          borderRadius: '4px', 
          backgroundColor: '#fff', 
          color: '#333'
        }}
      />
    </div>

    <div style={{ marginBottom: '1.2em' }}>
      <label htmlFor="image" style={{ display: 'block', fontSize: '1em', color: '#333', marginBottom: '0.5em' }}>Upload Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        required
        style={{
          width: '95%', 
          padding: '0.8em', 
          fontSize: '1em', 
          border: '1px solid #f2b600', 
          borderRadius: '4px', 
          backgroundColor: '#fff', 
          color: '#333'
        }}
      />
    </div>

    <div style={{ marginBottom: '1.2em' }}>
      <button type="submit" style={{
        padding: '1em 2em', 
        backgroundColor: '#f2b600', 
        color: '#fff', 
        fontSize: '1.2em', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        transition: 'background-color 0.3s'
      }}>
        Submit
      </button>
    </div>
  </form>

  {statusMessage && <p style={{ textAlign: 'center', color: '#333', marginTop: '1em' }}>{statusMessage}</p>}
</div>
  );
};

export default ListItem;
