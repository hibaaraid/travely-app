import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoTravely from '../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    navigate('/login');
  };

  // ===== Liens USER =====
  const userLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Réserver', path: '/reserver' },
    { label: 'Mes Réservations', path: '/mes-reservations' },
    { label: 'Contact', path: '/contact' },
  ];

  // ===== Liens ADMIN =====
  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Destinations', path: '/admin/destinations' },
    { label: 'Réservations', path: '/admin/reservations' },
    { label: 'Utilisateurs', path: '/admin/users' },
    { label: 'Contacts', path: '/admin/contacts' },
  ];

  const navLinks = isAdmin ? adminLinks : userLinks;

  return (
    <header className="main-header">
      {/* ===== TOP BAR ===== */}
      <div className="top-bar">
        <div className="brand">
          <Link to={isAdmin ? '/admin/dashboard' : '/'}>
            <img src={logoTravely} alt="Logo Travely" className="logo-img" />
          </Link>
        </div>
        <div className="contact-info">
          {isAdmin ? (
            <span>👤 Admin Travely</span>
          ) : (
            <>
              <span>✉ contact@travely.com</span>
              <span className="divider">|</span>
              <span>📞 +212 600 123 456</span>
            </>
          )}
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
            <button onClick={() => navigate('/login')} className="btn-auth btn-login">
              Connexion
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;