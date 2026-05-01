import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import './Accueil.css';

function CarteDestination({ destination }) {
  const imageUrl = destination.image
    ? `http://127.0.0.1:8000${destination.image}`
    : null;

  return (
    <div className="carte">
      <div className="carte-image" style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}>
        {!imageUrl && <div className="carte-image-placeholder">✈️</div>}
        <span className="carte-badge">{destination.categorie}</span>
      </div>
      <div className="carte-body">
        <h3>{destination.titre}</h3>
        <p className="description">{destination.description}</p>
        {destination.places_disponibles && (
          <p className="places">👥 {destination.places_disponibles} places disponibles</p>
        )}
        {destination.date_depart && (
          <p className="date">📅 Départ : {new Date(destination.date_depart).toLocaleDateString('fr-FR')}</p>
        )}
        <div className="carte-footer">
          <span className="carte-prix">{Number(destination.prix).toLocaleString()} DH</span>
          <Link to={`/destinations/${destination.id}`} className="carte-btn">Voir Détails →</Link>
        </div>
      </div>
    </div>
  );
}

function SectionCategorie({ titre, destinations }) {
  if (destinations.length === 0) return null;
  return (
    <div className="section-categorie">
      <h2>{titre}</h2>
      <div className="destinations-grille">
        {destinations.map(dest => (
          <CarteDestination key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  );
}

export default function Accueil() {
  const [destinations, setDestinations] = useState([]);
  const [recherche, setRecherche]       = useState('');
  const [loading, setLoading]           = useState(true);
  const [erreur, setErreur]             = useState('');

  useEffect(() => {
    api.get('/destinations')
      .then(res => { setDestinations(res.data); setLoading(false); })
      .catch(() => { setErreur('Impossible de charger les destinations.'); setLoading(false); });
  }, []);

  if (loading) return <div className="loading-screen">✈️ Chargement des voyages...</div>;
  if (erreur)  return <div className="error-screen">⚠️ {erreur}</div>;

  // Filtrage par recherche
  const filtrees = recherche.trim()
    ? destinations.filter(d => d.titre.toLowerCase().includes(recherche.toLowerCase()))
    : null;

  const dernieresOffres = [...destinations].reverse().slice(0, 6);
  const voyagesMaroc    = destinations.filter(d => d.categorie === 'maroc');
  const voyagesEtranger = destinations.filter(d => d.categorie === 'etranger');
  const voyagesPackages = destinations.filter(d => d.categorie === 'package');

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <h1>✈️ Découvrez le Monde avec Travely</h1>
        <p>Les meilleures offres de voyage au Maroc et à l'international</p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="🔍 Rechercher une destination..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
          />
          <button onClick={() => {
            if (recherche.trim()) {
              document.getElementById('nos-offres').scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Rechercher
          </button>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="accueil-contenu" id="nos-offres">
        {filtrees ? (
          <SectionCategorie titre={`🔍 Résultats pour "${recherche}"`} destinations={filtrees} />
        ) : (
          <>
            <SectionCategorie titre="🆕 Dernières Offres"   destinations={dernieresOffres} />
            <SectionCategorie titre="🇲🇦 Au Maroc"          destinations={voyagesMaroc} />
            <SectionCategorie titre="🌍 À l'Étranger"       destinations={voyagesEtranger} />
            <SectionCategorie titre="📦 Séjours & Packages" destinations={voyagesPackages} />
          </>
        )}
      </div>
    </div>
  );
}