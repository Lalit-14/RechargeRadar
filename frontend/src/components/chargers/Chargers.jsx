import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import './chargers.css';
import Navbar from '../navbar/Navbar';

const Chargers = () => {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/stations');
      setStations(response.data);
      setFilteredStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = stations.filter(station =>
      station.area.toLowerCase().includes(searchTerm) ||
      station.name.toLowerCase().includes(searchTerm) ||
      station.address.toLowerCase().includes(searchTerm)
    );
    setFilteredStations(filtered);
  };

  const mapStyles = {
    height: '80vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 17.385044,
    lng: 78.486671,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBjUcM5mgA2y7eXso4V2Ar8QciVRP8VLHs',
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div className="chargers_container">
        <Navbar />
      <input
        type="text"
        placeholder="Search by area, name, or address"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="stations-list">
        {filteredStations.map(station => (
          <div
            key={station._id}
            className="station-item"
            onClick={() => setSelectedStation(station)}
          >
            <h3>{station.name}</h3>
            <p>{station.address}</p>
            <p>{station.area}</p>
          </div>
        ))}
      </div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={defaultCenter}
      >
        {filteredStations.map(station => (
          <Marker
            key={station._id}
            position={{ lat: station.location.coordinates[0], lng: station.location.coordinates[1] }}
            onClick={() => setSelectedStation(station)}
          />
        ))}
        {selectedStation && (
          <div className="station-info">
            <h2>{selectedStation.name}</h2>
            <p>{selectedStation.address}</p>
            <p>{selectedStation.contact}</p>
          </div>
        )}
      </GoogleMap>
    </div>
  );
};

export default Chargers;
