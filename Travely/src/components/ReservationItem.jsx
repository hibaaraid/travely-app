import React from 'react';
import './ReservationItem.css';
// IMPORT DES ICÔNES
import { MdEvent, MdAttachMoney, MdInfoOutline, MdFlight } from 'react-icons/md';

const ReservationItem = ({ reservation }) => {
  const { 
    destination, 
    date_reservation, 
    statut = "En attente"
  } = reservation || {};

  // Fonction pour transformer le statut en classe CSS (ex: "En attente" -> "en-attente")
  const statusClass = statut.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');

  return (
    <div className="reservation-card-item">
      <div className="res-image-container">
        {destination?.image ? (
          <img 
            src={`http://127.0.0.1:8000${destination.image}`} 
            alt={destination.titre} 
            className="res-img" 
          />
        ) : (
          <div className="res-placeholder"><MdFlight size={30} /></div>
        )}
      </div>
      
      <div className="res-details-main">
        <h3 className="res-dest-title">{destination?.titre || "Destination Travely"}</h3>
        
        <div className="res-meta">
          <span className="res-meta-item">
            <MdEvent size={16} /> {date_reservation || "Date non définie"}
          </span>
          <span className="res-meta-item price">
            <MdAttachMoney size={16} /> {destination?.prix ? `${Number(destination.prix).toLocaleString()} DH` : "---"}
          </span>
        </div>
      </div>

      <div className="res-status-zone">
        <span className={`res-badge ${statusClass}`}>
          {statut}
        </span>
        <button className="btn-details-view">
          <MdInfoOutline /> Détails
        </button>
      </div>
    </div>
  );
};

export default ReservationItem;