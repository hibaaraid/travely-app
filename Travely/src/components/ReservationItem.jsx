import React from 'react';
import './ReservationItem.css';

const ReservationItem = ({ reservation }) => {
  // On extrait les données ou on met des valeurs par défaut pour éviter les crashs
  const { 
    destination = "Destination Travely", 
    date = "Date non définie", 
    prix = "0 DH", 
    statut = "En attente",
    image = "https://via.placeholder.com/150" 
  } = reservation || {};

  return (
    <div className="reservation-item">
      <img src={image} alt={destination} className="res-image" />
      
      <div className="res-info">
        <h3>{destination}</h3>
        <p className="res-date">📅 {date}</p>
        <p className="res-price">{prix}</p>
      </div>

      <div className="res-status">
        {/* On applique une classe dynamique selon le statut (confirmée ou en-attente) */}
        <span className={`status-badge ${statut.toLowerCase().replace(/\s+/g, '-')}`}>
          {statut}
        </span>
        <button className="btn-details">Voir détails</button>
      </div>
    </div>
  );
};

// LA LIGNE LA PLUS IMPORTANTE :
export default ReservationItem;