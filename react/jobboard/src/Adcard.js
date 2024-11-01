// File: AdCard.js
import React, { useState } from 'react';

// Fonction "show more"
import './style.css'; 




// AdCard Component
const AdCard = ({ title, shortDescription, fullDescription, wages, place, workingTime, onApplyClick }) => {
  // State to manage the visibility of the additional information
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  // Function to toggle visibility
  const toggleDetailsVisibility = () => {
    setIsDetailsVisible(prevState => !prevState);
  };

  return (
    <div className="adContainer">
      <h2>{title}</h2>
      <p>{shortDescription}</p>
      <button onClick={toggleDetailsVisibility} className='btn-connexion'>
        {isDetailsVisible ? 'Show Less' : 'Learn More'}
      </button>

      {/* Conditional rendering of ad details */}
      {isDetailsVisible && (
        <div className="ad-details">
          <p><strong>Full Description:</strong> {fullDescription}</p>
          <p><strong>Wages:</strong> {wages}</p>
          <p><strong>Place:</strong> {place}</p>
          <p><strong>Working Time:</strong> {workingTime}</p>
        </div>
      )}
      <button onClick={onApplyClick} className='btn-connexion'>Postuler</button>
    </div>
  );
};





export default AdCard;
