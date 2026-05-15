import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ── Colonne 1 : Logo + contact ── */}
        <div className="footer-col footer-col-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-text">Travely</span>
          </Link>
          <p className="footer-tagline">
            Votre agence de voyage au Maroc. Des séjours inoubliables, des prix accessibles.
          </p>
          <ul className="footer-contact">
            <li>
              <span className="footer-contact-icon">
                <MdLocationOn size={16} />
              </span>
              Casablanca, Maroc
            </li>
            <li>
              <span className="footer-contact-icon">
                <MdPhone size={16} />
              </span>
              +212 6 00 00 00 00
            </li>
            <li>
              <span className="footer-contact-icon">
                <MdEmail size={16} />
              </span>
              contact@travely.ma
            </li>
          </ul>

          {/* Réseaux sociaux */}
          <div className="footer-socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Facebook"
            >
              <FaFacebook size={15} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Instagram"
            >
              <FaInstagram size={15} />
            </a>

            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={15} />
            </a>
          </div>
        </div>

        {/* ── Colonne 2 : Destinations ── */}
        <div className="footer-col">
          <h3 className="footer-col-title">Destinations</h3>
          <ul className="footer-links">
            <li><Link to="/?categorie=maroc"    className="footer-link">Au Maroc</Link></li>
            <li><Link to="/?categorie=etranger" className="footer-link">À l'étranger</Link></li>
            <li><Link to="/?categorie=package"  className="footer-link">Séjours &amp; Packages</Link></li>
            <li><Link to="/"                    className="footer-link">Dernières offres</Link></li>
          </ul>
        </div>

        {/* ── Colonne 3 : Mon compte ── */}
        <div className="footer-col">
          <h3 className="footer-col-title">Mon compte</h3>
          <ul className="footer-links">
            <li><Link to="/login"            className="footer-link">Se connecter</Link></li>
            <li><Link to="/register"         className="footer-link">Créer un compte</Link></li>
            <li><Link to="/mes-reservations" className="footer-link">Mes réservations</Link></li>
          </ul>
        </div>

      </div>

      {/* ── Barre du bas ── */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <p className="footer-copy">© {annee} Travely — Tous droits réservés</p>
          <p className="footer-made">Fait avec ❤️ au Maroc</p>
        </div>
      </div>
    </footer>
  );
}