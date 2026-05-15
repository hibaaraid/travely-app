import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import './Accueil.css';

// Import des icônes
import { 
  MdFlight, MdPeople, MdCalendarToday, MdArrowForward, 
  MdSearch, MdFiberNew, MdLocationOn, MdPublic, 
  MdCardTravel, MdWarning, MdFlightTakeoff 
} from 'react-icons/md';

function CarteDestination({ destination }) {
  const imageUrl = destination.image ? `http://127.0.0.1:8000${destination.image}` : null;

  return (
    <div className="carte">
      <div className="carte-image" style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}>
        {!imageUrl && (
          <div className="carte-image-placeholder">
            <MdFlight size={56} />
          </div>
        )}
        <span className="carte-badge">{destination.categorie}</span>
      </div>
      <div className="carte-body">
        <h3>{destination.titre}</h3>
        <p className="description">{destination.description}</p>
        
        {destination.places_disponibles && (
          <p className="places">
            <MdPeople /> {destination.places_disponibles} places disponibles
          </p>
        )}
        
        {destination.date_depart && (
          <p className="date">
            <MdCalendarToday /> Depart : {new Date(destination.date_depart).toLocaleDateString('fr-FR')}
          </p>
        )}

        <div className="carte-footer">
          <span className="carte-prix">{Number(destination.prix).toLocaleString()} DH</span>
          <Link to={`/destinations/${destination.id}`} className="carte-btn">
            Voir Details <MdArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionCategorie({ titre, icon, destinations }) {
  if (destinations.length === 0) return null;

  // On gère l'icône de section
  const renderIcon = (name) => {
    switch(name) {
      case 'fiber_new': return <MdFiberNew />;
      case 'location_on': return <MdLocationOn />;
      case 'public': return <MdPublic />;
      case 'card_travel': return <MdCardTravel />;
      case 'search': return <MdSearch />;
      default: return null;
    }
  };

  return (
    <div className="section-categorie">
      <h2>
        {renderIcon(icon)} {titre}
      </h2>
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
  const [recherche, setRecherche] = useState('');
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    api.get('/destinations')
      .then(res => { setDestinations(res.data); setLoading(false); })
      .catch(() => { setErreur('Impossible de charger les destinations.'); setLoading(false); });
  }, []);

  if (loading) return <div className="loading-screen"><MdFlight className="loading-icon" /> Chargement...</div>;
  if (erreur) return <div className="error-screen"><MdWarning /> {erreur}</div>;

  const filtrees = recherche.trim()
    ? destinations.filter(d => d.titre.toLowerCase().includes(recherche.toLowerCase()))
    : null;

  const dernieresOffres = [...destinations].reverse().slice(0, 6);
  const voyagesMaroc    = destinations.filter(d => d.categorie === 'maroc');
  const voyagesEtranger = destinations.filter(d => d.categorie === 'etranger');
  const voyagesPackages = destinations.filter(d => d.categorie === 'package');

  return (
    <div className="accueil-page">
      <div className="hero">
        <h1><MdFlightTakeoff className="hero-icon" /> Decouvrez le Monde avec Travely</h1>
        <p>Les meilleures offres de voyage au Maroc et a l'international</p>
        <div className="hero-search">
          <div className="hero-search-input-wrap">
            <MdSearch className="hero-search-icon" />
            <input
              type="text"
              placeholder="Rechercher une destination..."
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
            />
          </div>
          <button onClick={() => document.getElementById('nos-offres').scrollIntoView({ behavior: 'smooth' })}>
            <MdSearch /> Rechercher
          </button>
        </div>
      </div>

      <div className="accueil-contenu" id="nos-offres">
        {filtrees ? (
          <SectionCategorie icon="search" titre={`Resultats pour "${recherche}"`} destinations={filtrees} />
        ) : (
          <>
            <SectionCategorie icon="fiber_new" titre="Dernieres Offres" destinations={dernieresOffres} />
            <SectionCategorie icon="location_on" titre="Au Maroc" destinations={voyagesMaroc} />
            <SectionCategorie icon="public" titre="A l'Etranger" destinations={voyagesEtranger} />
            <SectionCategorie icon="card_travel" titre="Sejours et Packages" destinations={voyagesPackages} />
          </>
        )}
      </div>
    </div>
  );
}