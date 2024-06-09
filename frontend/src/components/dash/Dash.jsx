import React, { useState, useEffect } from 'react';
import Popup from '../popup/Popup';
import './dash.css';
import axios from 'axios';
import Navbar from '../navbar/Navbar';

const Dash = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/stations")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  }

  return (
    <div className='dash_container'>
        <div className='nav'>
            <Navbar />
        </div>
      {data.map((card, idx) => (
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
