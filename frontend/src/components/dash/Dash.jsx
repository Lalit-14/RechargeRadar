import React, { useState, useEffect } from 'react';
import Popup from '../popup/Popup';
import './dash.css';
import axios from 'axios';
import Navbar from '../navbar/Navbar';

const Dash = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchArea, setSearchArea] = useState('');

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

  // Extract unique area names for datalist
  const uniqueAreaNames = [...new Set(data.map(station => station.area))];

  return (
    <div className='dash_container'>
        <div className='nav'>
            {/* <Navbar /> */}
        </div>
        <div className="search-container">
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
      {filteredData.map((card, idx) => (
        <div key={idx} className='card' onClick={() => handleCardClick(card)}>
          <img src={`/assets/${card.logo}`} alt={card.name} />
          <h2>{card.name}</h2>
          <p>{card.area}</p>
        </div>
      ))}
      {showModal && (
        <Popup onClose={() => setShowModal(false)} data={selectedCard}/>
      )}
    </div>
  );
}

export default Dash;
