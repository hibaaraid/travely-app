import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoTravely from '../images/logo.png';
// Si tu as ton logo dans le dossier src, tu peux l'importer comme ceci :
// import logoTravely from '../assets/logo.png'; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'À propos de nous', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header>

      {/* ===== TOP BAR ===== */}
      <div className="top-bar">
        <div className="brand">
          {/* On enveloppe le logo dans un Link pour que cliquer dessus ramène à l'accueil */}
          <Link to="/">
            <img 
              src={logoTravely} /* Remplace par ton image (ex: {logoTravely}) */
              alt="Logo Travely" 
              className="logo-img" 
            />
          </Link>
        </div>
        <div className="contact-info">
          <span>✉ contact@travely.com</span>
          <span className="divider">|</span>
          <span>📞 +212 600 123 456</span>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
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
        
        {/* Affichage dynamique du bouton selon l'état de connexion */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn-auth btn-logout">
            Déconnexion
          </button>
        ) : (
          <button onClick={handleLogin} className="btn-auth btn-login">
            Connexion
          </button>
        )}
      </nav>

    </header>
  );
};

export default Navbar;