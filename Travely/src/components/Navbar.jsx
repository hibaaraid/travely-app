import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoTravely from '../images/logo.png';

// Import des icônes SVG
import { 
  MdEmail, MdPhone, MdLogout, MdLogin, 
  MdMenu, MdClose, MdAdminPanelSettings 
} from 'react-icons/md';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOuvert, setMenuOuvert] = useState(false);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('token');
  const role       = localStorage.getItem('role');
  const userName   = localStorage.getItem('user_name');
  const isAdmin    = role === 'admin';

  const initiale = isAdmin ? 'A' : (userName?.charAt(0).toUpperCase() || '?');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    navigate('/login');
  };

  const fermerMenu = () => setMenuOuvert(false);

  const userLinks = [
    { label: 'Accueil',          path: '/' },
    { label: 'Réserver',         path: '/reserver' },
    { label: 'Mes Réservations', path: '/mes-reservations' },
    { label: 'Contact',          path: '/contact' },
  ];

  const adminLinks = [
    { label: 'Dashboard',    path: '/admin/dashboard' },
    { label: 'Destinations', path: '/admin/destinations' },
    { label: 'Réservations', path: '/admin/reservations' },
    { label: 'Utilisateurs', path: '/admin/users' },
    { label: 'Contacts',     path: '/admin/contacts' },
  ];

  const navLinks = isAdmin ? adminLinks : userLinks;

  return (
    <header className="main-header">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="brand">
          <Link to={isAdmin ? '/admin/dashboard' : '/'}>
            <img src={logoTravely} alt="Logo Travely" className="logo-img" />
          </Link>
        </div>
        <div className="contact-info">
          {isAdmin ? (
            <span className="contact-item">Admin Travely</span>
          ) : (
            <>
              <span className="contact-item">
                <MdEmail size={16} /> contact@travely.com
              </span>
              <span className="divider">|</span>
              <span className="contact-item">
                <MdPhone size={16} /> +212 600 123 456
              </span>
            </>
          )}
        </div>
      </div>

      {/* NAVBAR PRINCIPALE */}
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
            <>
              <Link to="/profile" className="profile-btn">
                <div className="profile-avatar-small">{initiale}</div>
                <span className="profile-name">
                  {isAdmin ? 'Admin' : (userName || 'Mon Profil')}
                </span>
              </Link>
              <button onClick={handleLogout} className="btn-auth btn-logout">
                <MdLogout size={18} /> Déconnexion
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-auth btn-login">
              <MdLogin size={18} /> Connexion
            </button>
          )}
        </div>

        {/* Burger menu utilisant les icônes SVG */}
        <button className="burger-btn" onClick={() => setMenuOuvert(!menuOuvert)}>
          {menuOuvert ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </nav>

      {/* MENU MOBILE */}
      {menuOuvert && (
        <div className="mobile-menu">
          <ul className="mobile-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="mobile-link" onClick={fermerMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-divider" />
          {isLoggedIn ? (
            <div className="mobile-auth">
              <Link to="/profile" className="mobile-profile" onClick={fermerMenu}>
                <div className="profile-avatar-small">{initiale}</div>
                <span>{isAdmin ? 'Admin' : (userName || 'Profil')}</span>
              </Link>
              <button onClick={handleLogout} className="mobile-logout">
                <MdLogout size={18} /> Déconnexion
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="mobile-login">
              <MdLogin size={18} /> Connexion
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;