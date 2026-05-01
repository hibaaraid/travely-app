import React, { useState, useEffect } from 'react';
import ReservationItem from '../components/ReservationItem'; // Import par défaut (sans {})

const MesReservations = () => {
  const [voyages, setVoyages] = useState([]);

  useEffect(() => {
    // On récupère les données stockées localement
    const data = JSON.parse(localStorage.getItem('mes_voyages')) || [];
    setVoyages(data);
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--travely-blue)', marginBottom: '30px' }}>
        Mon Tableau de Bord / Mes Réservations
      </h2>
      
      <div className="list-container">
        {voyages.length > 0 ? (
          voyages.map((v) => (
            <ReservationItem key={v.id} reservation={v} />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '8px' }}>
            <p>Vous n'avez pas encore de réservations Travely.</p>
            <a href="/reserver" style={{ color: 'var(--travely-orange)', fontWeight: 'bold' }}>
              Réserver mon premier voyage
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesReservations;