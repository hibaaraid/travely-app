import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reserver.css';

const Reserver = () => {
  const [nbPersonnes, setNbPersonnes] = useState(1);
  const navigate = useNavigate();
  const prixUnitaire = 1150;

  const handleBooking = (e) => {
    e.preventDefault();

    const nouvelleRes = {
      id: Date.now(),
      destination: "Circuit Grand Sud Maroc",
      date: e.target.date.value,
      prix: (prixUnitaire * nbPersonnes) + " DH",
      statut: "En attente",
      image: "https://www.olevoyages.ma/wp-content/uploads/2023/05/sud-maroc.jpg" // Image d'exemple
    };

    const anciennes = JSON.parse(localStorage.getItem('mes_voyages')) || [];
    localStorage.setItem('mes_voyages', JSON.stringify([...anciennes, nouvelleRes]));

    alert("Voyage réservé !");
    navigate('/mes-reservations');
  };

  return (
    <div className="reserver-page">
      <div className="reserver-container">
        <div className="reserver-form-section">
          <h2>Confirmer votre Réservation</h2>
          <form className="res-form" onSubmit={handleBooking}>
            <div className="form-section">
              <h3>1. Détails du Voyage</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input name="date" type="date" required />
                </div>
                <div className="form-group">
                  <label>Voyageurs</label>
                  <input type="number" min="1" value={nbPersonnes} onChange={(e) => setNbPersonnes(e.target.value)} />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-primary">Confirmer Travely</button>
          </form>
        </div>

        <div className="reserver-summary">
          <div className="summary-card">
            <h3>Total : {(prixUnitaire * nbPersonnes) + 150} DH</h3>
            <p>(Incluant 150 DH de frais)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserver;