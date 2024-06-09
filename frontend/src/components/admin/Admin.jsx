import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./admin.css";
import Navbar from '../navbar/Navbar';

const Admin = () => {
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({
    area: '',
    name: '',
    address: '',
    contact: '',
    image: '',
    logo: ''
  });

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/stations');
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8000/stations', formData);
      setFormData({
        area: '',
        name: '',
        address: '',
        contact: '',
        image: '',
        logo: ''
      });
      fetchStations();
    } catch (error) {
      console.error('Error creating station:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteStation = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/stations/${id}`);
      fetchStations();
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  };

  return (
    <div className='outer_container'>
      <div className='nav'>
        <Navbar />
      </div>
    <div className='admin_container'>
      <h1>Admin Page</h1>

      {/* Form to add new station */}
      <form onSubmit={handleFormSubmit} className='form_container'>
        <input type='text' name='area' placeholder='Area' value={formData.area} onChange={handleInputChange} required />
        <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleInputChange} required />
        <input type='text' name='address' placeholder='Address' value={formData.address} onChange={handleInputChange} required />
        <input type='text' name='contact' placeholder='Contact' value={formData.contact} onChange={handleInputChange} required />
        <input type='text' name='image' placeholder='Image URL' value={formData.image} onChange={handleInputChange} required />
        <input type='text' name='logo' placeholder='Logo URL' value={formData.logo} onChange={handleInputChange} required />
        <button type='submit'>Add Station</button>
      </form>

      {/* Display existing stations */}
      <div className='stations_container'>
        {stations.map((station) => (
          <div key={station._id} className='station_card'>
            <p><strong>{station.name}</strong></p>
            <p>{station.area}</p>
            <button onClick={() => handleDeleteStation(station._id)}>Delete</button>
            {/* Add update functionality here */}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Admin;
