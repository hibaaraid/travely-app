import React from 'react';
import './ReservationItem.css';
import { Link } from 'react-router-dom'; // 👈 INDISPENSABLE pour la navigation
// IMPORT DES ICÔNES
import { MdEvent, MdAttachMoney, MdInfoOutline, MdFlight } from 'react-icons/md';

const ReservationItem = ({ reservation }) => {
  const { 
    destination, 
    date_reservation, 
    statut = "En attente"
  } = reservation || {};

  // Fonction pour transformer le statut en classe CSS
  const statusClass = statut.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f9]/g, "").replace(/\s+/g, '-');

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
        
        {/* ✅ CORRECTION : On remplace <button> par <Link> pour activer la navigation */}
        <Link 
          to={`/destinations/${destination?.id}`} 
          className="btn-details-view"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <MdInfoOutline /> Détails
        </Link>
      </div>
    </div>
  );
};

export default ReservationItem;