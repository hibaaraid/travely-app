import React from 'react';
import './ReservationItem.css';

const ReservationItem = ({ reservation }) => {
  // CORRECTION : On extrait les données selon la structure réelle de ton API Laravel
  // reservation.destination est un objet, reservation.date_reservation est une chaîne
  const { 
    destination, 
    date_reservation, 
    statut = "En attente"
  } = reservation || {};

  return (
    <div className="reservation-item">
      {/* On utilise l'image de la destination ou un placeholder */}
      <img 
        src={destination?.image ? `http://127.0.0.1:8000${destination.image}` : "https://via.placeholder.com/150"}
        alt={destination?.titre} 
        className="res-image" 
      />
      
      <div className="res-info">
        {/* ✅ IMPORTANT : On affiche .titre et non l'objet destination complet */}
        <h3>{destination?.titre || "Destination Travely"}</h3>
        
        <p className="res-date">📅 {date_reservation || "Date non définie"}</p>
        
        {/* ✅ IMPORTANT : On affiche .prix venant de l'objet destination */}
        <p className="res-price">{destination?.prix ? `${destination.prix} DH` : "Prix non défini"}</p>
      </div>

      <div className="res-status">
        <span className={`status-badge ${statut.toLowerCase().replace(/\s+/g, '-')}`}>
          {statut}
        </span>
        <button className="btn-details">Voir détails</button>
      </div>
    </div>
  );
};

export default ReservationItem;