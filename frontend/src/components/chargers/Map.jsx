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
  return (
    <LoadScript googleMapsApiKey="AIzaSyBjUcM5mgA2y7eXso4V2Ar8QciVRP8VLHs">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* No markers, just the map */}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
