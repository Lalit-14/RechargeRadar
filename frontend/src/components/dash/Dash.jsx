import React, { useState, useEffect } from 'react';
import Popup from '../popup/Popup';
import './dash.css';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchArea, setSearchArea] = useState('');
  const navigate =useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/stations")
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  }

  const handleSearchChange = (event) => {
    setSearchArea(event.target.value);
  }

  const handleSearchSubmit = () => {
    const filtered = data.filter(station => station.area.toLowerCase().includes(searchArea.toLowerCase()));
    setFilteredData(filtered);
  }

  const handleMapClick = () => {
    navigate("/chargers")
  }

  const uniqueAreaNames = [...new Set(data.map(station => station.area))];

  return (
    <div className='dash_container'>
        <div className='nav'>
            <Navbar />
        </div>
        <div className="search-container">
          <button className='map_button' onClick={handleMapClick}>Locate on Maps</button>
          <input 
            type="text" 
            value={searchArea} 
            onChange={handleSearchChange} 
            placeholder="Search" 
            list="areaOptions" 
          />
          <datalist id="areaOptions">
            {uniqueAreaNames.map((area, idx) => (
              <option key={idx} value={area} />
            ))}
          </datalist>
          <button onClick={handleSearchSubmit}>Search</button>

        </div>
        <div className='data'>
      {filteredData.map((card, idx) => (
        <div key={idx} className='card' onClick={() => handleCardClick(card)}>
          <img src={`/assets/${card.logo}`} alt={card.name} />
          <h2>{card.name}</h2>
          <p>{card.area}</p>
        </div>
      ))}</div>
      {showModal && (
        <Popup onClose={() => setShowModal(false)} data={selectedCard}/>
      )}
    </div>
  );
}

export default Dash;
