// components/Map.js
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

const Map = () => {
  const apiKey = import.meta.env.VITE_REACT_MAPS_KEY;
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>

      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
