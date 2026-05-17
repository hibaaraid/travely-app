import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import ReservationItem from '../components/ReservationItem';
import './Dashboard.css';

const MesReservations = () => {
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      // On s'assure que l'API renvoie bien la relation 'destination'
      api.get(`/reservations?user_id=${userId}`)
        .then(res => {
          setVoyages(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération :", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Chargement de vos aventures...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Mon Tableau de Bord</h1>
        <p className="welcome-msg">
          Ravi de vous revoir, <span>{localStorage.getItem('user_name') || 'Voyageur'}</span> !
        </p>
      </div>

      <div className="reservation-list">
        {voyages.length > 0 ? (
          voyages.map(v => (
            // On vérifie que v.destination existe pour éviter les crashs
            <ReservationItem key={v.id} reservation={v} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🏝️</div>
            <p>Vous n'avez pas encore de voyage prévu.</p>
            <Link to="/" className="btn-reserve-now">
              Explorer les destinations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesReservations;