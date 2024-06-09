import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [stations, setStations] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('/stations');
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/stations', formData);
      setFormData({});
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
      await axios.delete(`/stations/${id}`);
      fetchStations();
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  };

  return (
    <div className='admin_container'>
      <h1>Admin Page</h1>

      {/* Form to add new station */}
      <form onSubmit={handleFormSubmit}>
        <input type='text' name='area' placeholder='Area' onChange={handleInputChange} />
        <input type='text' name='name' placeholder='Name' onChange={handleInputChange} />
        <input type='text' name='address' placeholder='Address' onChange={handleInputChange} />
        <input type='text' name='contact' placeholder='Contact' onChange={handleInputChange} />
        <input type='text' name='image' placeholder='Image URL' onChange={handleInputChange} />
        <input type='text' name='logo' placeholder='Logo URL' onChange={handleInputChange} />
        <button type='submit'>Add Station</button>
      </form>

      {/* Display existing stations */}
      <div>
        {stations.map((station) => (
          <div key={station._id}>
            <p>{station.name}</p>
            <button onClick={() => handleDeleteStation(station._id)}>Delete</button>
            {/* Add update functionality here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
