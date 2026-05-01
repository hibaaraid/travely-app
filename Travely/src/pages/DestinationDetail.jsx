import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import './DestinationDetail.css';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading]         = useState(true);
  const [erreur, setErreur]           = useState('');

  const userRole = localStorage.getItem('role') || 'user';

  useEffect(() => {
    api.get(`/destinations/${id}`)
      .then(res => {
        setDestination(res.data);
        setLoading(false);
      })
      .catch(() => {
        setErreur('Destination introuvable.');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Supprimer cette destination ?')) {
      api.delete(`/destinations/${id}`)
        .then(() => {
          alert('Destination supprimée !');
          navigate('/');
        })
        .catch(() => alert('Erreur lors de la suppression.'));
    }
  };

  if (loading) return <div className="detail-loading">✈️ Chargement...</div>;
  if (erreur)  return <div className="detail-erreur">⚠️ {erreur}</div>;

  return (
    <div className="detail-page">

      {/* ── HERO IMAGE ─────────────────────────────────── */}
      <div
        className="detail-hero"
        style={{
          backgroundImage: destination.image
            ? `url(${destination.image})`
            : 'linear-gradient(135deg, #1d3557, #457b9d)'
        }}
      >
        <div className="detail-hero-overlay">
          <span className="detail-badge">{destination.type_offre}</span>
          <h1 className="detail-titre">{destination.titre}</h1>
          <span className="detail-categorie">
            {destination.categorie === 'maroc'    && '🇲🇦 Au Maroc'}
            {destination.categorie === 'etranger' && '🌍 À l\'Étranger'}
            {destination.categorie === 'package'  && '📦 Séjour & Package'}
          </span>
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ──────────────────────────── */}
      <div className="detail-contenu">

        {/* COLONNE GAUCHE : Infos */}
        <div className="detail-gauche">

          <div className="detail-section">
            <h2>📋 Description</h2>
            <p>{destination.description}</p>
          </div>

          <div className="detail-section">
            <h2>ℹ️ Informations</h2>
            <div className="detail-infos-grille">

              <div className="detail-info-item">
                <span className="info-label">💰 Prix</span>
                <span className="info-valeur prix">
                  {Number(destination.prix).toLocaleString()} DH
                </span>
              </div>

              <div className="detail-info-item">
                <span className="info-label">🏷️ Type d'offre</span>
                <span className="info-valeur">{destination.type_offre}</span>
              </div>

              <div className="detail-info-item">
                <span className="info-label">👥 Places disponibles</span>
                <span className="info-valeur">
                  {destination.places_disponibles ?? 'Non précisé'}
                </span>
              </div>

              <div className="detail-info-item">
                <span className="info-label">📅 Date de départ</span>
                <span className="info-valeur">
                  {destination.date_depart
                    ? new Date(destination.date_depart).toLocaleDateString('fr-FR')
                    : 'À définir'}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* COLONNE DROITE : Actions */}
        <div className="detail-droite">
          <div className="detail-carte-action">

            <div className="action-prix">
              <span className="action-prix-label">Prix total</span>
              <span className="action-prix-valeur">
                {Number(destination.prix).toLocaleString()} DH
              </span>
              <span className="action-prix-note">par personne</span>
            </div>

            <hr className="action-separateur" />

            {userRole === 'admin' ? (
              /* ── BOUTONS ADMIN ── */
              <div className="action-admin">
                <Link
                  to={`/admin/voyages`}
                  className="btn-action btn-modifier"
                >
                  ✏️ Modifier cette offre
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn-action btn-supprimer"
                >
                  🗑️ Supprimer cette offre
                </button>
              </div>
            ) : (
              /* ── BOUTON USER ── */
              <div className="action-user">
                <Link
                  to={`/reserver?destination=${destination.id}`}
                  className="btn-action btn-reserver"
                >
                  ✈️ Réserver maintenant
                </Link>
                <p className="action-note">
                  🔒 Paiement sécurisé — Annulation gratuite
                </p>
              </div>
            )}

            <hr className="action-separateur" />

            {/* Retour */}
            <Link to="/" className="btn-retour">
              ← Retour aux offres
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}