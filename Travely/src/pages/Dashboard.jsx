import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import './Dashboard.css';

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ voyages: 0, reservations: 0, utilisateurs: 0 });

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');
            const name = localStorage.getItem('user_name');
            setUserName(name || 'Voyageur');

            if (!userId) { setLoading(false); return; }

            try {
                const response = await api.get(`/reservations?user_id=${userId}`);
                setReservations(response.data);

                // Optionnel : récupérer les stats globales si tu as un endpoint admin
                // const statsRes = await api.get('/stats');
                // setStats(statsRes.data);

                // Valeurs statiques en attendant l'API
                setStats({ voyages: 11, reservations: 3, utilisateurs: 2 });
            } catch (error) {
                console.error("Erreur lors du chargement des réservations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return (
        <div className="db-loader">Chargement de votre tableau de bord...</div>
    );

    return (
        <div className="db-wrap">
            <div className="db-card">

                {/* Bienvenue */}
                <div className="db-welcome">
                    <h1>Bienvenue, {userName} !</h1>
                    <p>Voici l'historique de vos aventures.</p>
                </div>

                {/* Statistiques */}
                <div className="db-stats-title">
                    <span>📊</span> Statistiques
                </div>
                <hr className="db-divider" />

                <div className="db-stats-grid">
                    <div className="db-stat-box">
                        <div className="db-stat-number">{stats.voyages}</div>
                        <div className="db-stat-label">Voyages</div>
                    </div>
                    <div className="db-stat-box">
                        <div className="db-stat-number">{stats.reservations}</div>
                        <div className="db-stat-label">Réservations</div>
                    </div>
                    <div className="db-stat-box">
                        <div className="db-stat-number">{stats.utilisateurs}</div>
                        <div className="db-stat-label">Utilisateurs</div>
                    </div>
                </div>

                {/* Boutons de navigation */}
                <div className="db-nav-grid">
                    <button className="db-nav-btn">
                        <span>📊</span> Dashboard
                    </button>
                    <button className="db-nav-btn">
                        <span>✈️</span> Destinations
                    </button>
                    <button className="db-nav-btn">
                        <span>📋</span> Réservations
                    </button>
                    <button className="db-nav-btn">
                        <span>👥</span> Utilisateurs
                    </button>
                </div>

                {/* Mes Réservations */}
                <h2 className="db-section-title">Mes Réservations</h2>

                {reservations.length > 0 ? (
                    <div className="db-res-list">
                        {reservations.map((res) => (
                            <div key={res.id} className="db-res-item">
                                <div>
                                    <div className="db-res-name">
                                        {res.destination?.titre || 'Voyage'}
                                    </div>
                                    <div className="db-res-status">
                                        Statut :&nbsp;
                                        <span className={`db-status-badge ${res.status?.toLowerCase()}`}>
                                            {res.status}
                                        </span>
                                    </div>
                                </div>
                                <button className="db-btn-view">Détails</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="db-empty">
                        <p>Aucune réservation trouvée.</p>
                        <a href="/destinations" className="db-btn-link">
                            Découvrir nos voyages
                        </a>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;


