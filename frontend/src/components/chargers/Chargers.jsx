import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Chargers = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

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

  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 17.385044,
    lng: 78.486671,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBjUcM5mgA2y7eXso4V2Ar8QciVRP8VLHs">
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
        {stations.map((station) => (
          <Marker
            key={station._id}
            position={{ lat: station.location.coordinates[0], lng: station.location.coordinates[1] }}
            onClick={() => setSelectedStation(station)}
          />
        ))}
      </GoogleMap>
      {selectedStation && (
        <div>
          <h2>{selectedStation.name}</h2>
          <p>{selectedStation.address}</p>
          <p>{selectedStation.contact}</p>
        </div>
      )}
    </LoadScript>
  );
};

export default Chargers;
