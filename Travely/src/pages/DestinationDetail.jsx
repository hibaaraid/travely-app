import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import './DestinationDetail.css';

const DestinationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [erreur, setErreur] = useState(false);

    const userRole = localStorage.getItem('role');

    useEffect(() => {
        api.get(`/destinations/${id}`)
            .then(res => setDestination(res.data))
            .catch(() => setErreur(true));
    }, [id]);

    if (erreur) return (
        <div className="detail-erreur">
            <span className="material-icons">warning</span>
            Destination introuvable.
            <Link to="/" className="detail-retour">
                <span className="material-icons">arrow_back</span>
                Retour a l'accueil
            </Link>
        </div>
    );

    if (!destination) return (
        <div className="detail-loading">
            <span className="material-icons detail-loading-icon">flight</span>
            Chargement...
        </div>
    );

    const handleReserver = () => {
        if (!localStorage.getItem('isLoggedIn')) {
            navigate('/login');
        } else {
            navigate('/reserver', { state: { destination } });
        }
    };

    const handleDelete = () => {
        if (window.confirm('Supprimer cette destination ?')) {
            api.delete(`/destinations/${id}`)
                .then(() => {
                    alert('Destination supprimee !');
                    navigate('/');
                });
        }
    };

    const imageUrl = destination.image
        ? `http://127.0.0.1:8000${destination.image}`
        : null;

    return (
        <div className="detail-page">

            {/* ── HERO ── */}
            <div
                className="detail-hero"
                style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
            >
                <div className="detail-hero-overlay">
                    <span className="detail-badge">
                        {destination.categorie === 'maroc'    && (
                            <><span className="material-icons">location_on</span> Maroc</>
                        )}
                        {destination.categorie === 'etranger' && (
                            <><span className="material-icons">public</span> Etranger</>
                        )}
                        {destination.categorie === 'package'  && (
                            <><span className="material-icons">card_travel</span> Package</>
                        )}
                    </span>
                    <h1 className="detail-titre">{destination.titre}</h1>
                </div>
            </div>

            {/* ── CONTENU ── */}
            <div className="detail-contenu">

                {/* COLONNE GAUCHE */}
                <div className="detail-gauche">

                    {/* Description */}
                    <div className="detail-section">
                        <h2>
                            <span className="material-icons">info</span>
                            A propos
                        </h2>
                        <p>
                            {destination.description_longue
                                || destination.description
                                || 'Aucune description disponible.'}
                        </p>
                    </div>

                    {/* Informations */}
                    <div className="detail-section">
                        <h2>
                            <span className="material-icons">list_alt</span>
                            Informations
                        </h2>
                        <div className="detail-infos-grille">

                            <div className="info-item">
                                <span className="info-label">
                                    <span className="material-icons">payments</span>
                                    Prix
                                </span>
                                <span className="info-valeur prix">
                                    {Number(destination.prix).toLocaleString()} DH
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">
                                    <span className="material-icons">people</span>
                                    Places disponibles
                                </span>
                                <span className="info-valeur">
                                    {destination.places_disponibles ?? 'Non precise'}
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">
                                    <span className="material-icons">calendar_today</span>
                                    Date de depart
                                </span>
                                <span className="info-valeur">
                                    {destination.date_depart
                                        ? new Date(destination.date_depart).toLocaleDateString('fr-FR')
                                        : 'A definir'}
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">
                                    <span className="material-icons">schedule</span>
                                    Duree
                                </span>
                                <span className="info-valeur">
                                    {destination.duree ?? 'Non definie'}
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* COLONNE DROITE : Actions */}
                <div className="detail-droite">
                    <div className="detail-carte-action">

                        <div className="action-prix">
                            <span className="action-prix-label">Prix par personne</span>
                            <span className="action-prix-valeur">
                                {Number(destination.prix).toLocaleString()} DH
                            </span>
                        </div>

                        <hr className="action-sep" />

                        {userRole === 'admin' ? (
                            <div className="action-btns">
                                <Link
                                    to="/admin/voyages"
                                    className="btn-action btn-modifier"
                                >
                                    <span className="material-icons">edit</span>
                                    Modifier
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="btn-action btn-supprimer"
                                >
                                    <span className="material-icons">delete</span>
                                    Supprimer
                                </button>
                            </div>
                        ) : (
                            <div className="action-btns">
                                <button
                                    onClick={handleReserver}
                                    className="btn-action btn-reserver"
                                >
                                    <span className="material-icons">flight_takeoff</span>
                                    Reserver maintenant
                                </button>
                                <p className="action-note">
                                    <span className="material-icons">lock</span>
                                    Reservation securisee
                                </p>
                            </div>
                        )}

                        <hr className="action-sep" />

                        <Link to="/" className="btn-retour">
                            <span className="material-icons">arrow_back</span>
                            Retour aux offres
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default DestinationDetail;