import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoTravely from '../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Vérification de l'état de connexion
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('token');

  const handleLogout = () => {
    // Nettoyage complet du stockage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Liste mise à jour avec les accès aux fonctionnalités de réservation
  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Réserver', path: '/reserver' }, // Lien vers la sélection
    { label: 'Mes Réservations', path: '/mes-reservations' }, // Lien vers le dashboard
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="main-header">
      {/* ===== TOP BAR (Emails & Tel) ===== */}
      <div className="top-bar">
        <div className="brand">
          <Link to="/">
            <img src={logoTravely} alt="Logo Travely" className="logo-img" />
          </Link>
        </div>
        <div className="contact-info">
          <span>✉ contact@travely.com</span>
          <span className="divider">|</span>
          <span>📞 +212 600 123 456</span>
        </div>
      </div>

      {/* ===== NAVBAR PRINCIPALE ===== */}
      <nav className="navbar">
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="auth-container">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-auth btn-logout">
              Déconnexion
            </button>
          ) : (
            <button onClick={handleLogin} className="btn-auth btn-login">
              Connexion
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;