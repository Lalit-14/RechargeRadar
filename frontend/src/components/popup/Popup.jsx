import React from "react";
import "./popup.css";
import { useNavigate } from 'react-router-dom'

const Popup = ({ onClose, data }) => {
  const navigate = useNavigate();
  const handleBook=()=>{
    navigate('/login',{state:{station:data}});
  }
  return (
    <div className="popup-container">
      <div className="popup-box">
        <div>
          <img className="ev" src={`/assets/${data.image}`} alt={data.name} />
          <h2>{data.name}</h2>
          <p>Area: {data.area}</p>
          <p>Address: {data.address}</p>
          <p>Contact: {data.contact}</p>
        </div>
        <button onClick={handleBook}>Book</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
