import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import './Dashboard.css';

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');
            const name = localStorage.getItem('user_name'); // Stocké lors du login
            setUserName(name || 'Voyageur');

            if (!userId) return;

            try {
                // Récupère les réservations avec les détails des destinations
                const response = await api.get(`/reservations?user_id=${userId}`);
                setReservations(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des réservations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div className="loader">Chargement de votre tableau de bord...</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Bienvenue, {userName} !</h1>
                <p>Voici l'historique de vos aventures.</p>
            </header>

            <div className="reservation-section">
                <h2>Mes Réservations</h2>
                {reservations.length > 0 ? (
                    <div className="reservation-list">
                        {reservations.map((res) => (
                            <div key={res.id} className="reservation-item">
                                <div className="res-info">
                                    {/* On utilise la relation destination définie dans Laravel */}
                                    <strong>{res.destination?.titre || 'Voyage'}</strong>
                                    <span>Statut : <span className={`status ${res.status?.toLowerCase()}`}>{res.status}</span></span>
                                </div>
                                <div className="res-actions">
                                    <button className="btn-view">Détails</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>Aucune réservation trouvée.</p>
                        <a href="/destinations" className="btn-link">Découvrir nos voyages</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;