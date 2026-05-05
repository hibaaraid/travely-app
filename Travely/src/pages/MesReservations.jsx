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
      api.get(`/reservations?user_id=${userId}`)
        .then(res => {
          // res.data contient maintenant les réservations avec leurs destinations
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
    return <div className="loading">Chargement de vos voyages...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Mon Tableau de Bord</h1>
        <p>Bienvenue, {localStorage.getItem('user_name') || 'Voyageur'}</p>
      </div>

      <div className="reservation-list">
        {voyages.length > 0 ? (
          voyages.map(v => (
            /* On passe l'objet de réservation au composant corrigé */
            <ReservationItem key={v.id} reservation={v} />
          ))
        ) : (
          <div className="empty-state">
            <p>Aucune réservation trouvée.</p>
            <Link to="/reserver" className="btn-reserve-now">
              Réserver mon premier voyage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesReservations;