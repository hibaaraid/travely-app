import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ nb_voyages: 0, nb_reservations: 0, nb_users: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/admin/stats')
            .then(response => {
                setStats(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur stats", error);
                setLoading(false);
            });
    }, []);

    const navItems = [
        { icon: '✈', label: 'Destinations', desc: 'Ajouter, modifier, supprimer', path: '/admin/destinations', color: '#E6F1FB', textColor: '#185FA5' },
        { icon: '📋', label: 'Réservations', desc: 'Valider ou annuler', path: '/admin/reservations', color: '#EAF3DE', textColor: '#3B6D11' },
        { icon: '👥', label: 'Utilisateurs', desc: 'Gérer les comptes', path: '/admin/users', color: '#FAEEDA', textColor: '#854F0B' },
    ];

    const statCards = [
        { icon: '✈', number: stats.nb_voyages,      label: 'Voyages disponibles',  color: '#E6F1FB', textColor: '#185FA5' },
        { icon: '📋', number: stats.nb_reservations, label: 'Réservations totales', color: '#EAF3DE', textColor: '#3B6D11' },
        { icon: '👥', number: stats.nb_users,        label: 'Clients inscrits',     color: '#FAEEDA', textColor: '#854F0B' },
    ];

    return (
        <div className="admin-dashboard">
            <div className="dash-header">
                <div>
                    <h1 className="dash-title">Tableau de bord</h1>
                    <p className="dash-subtitle">Vue d'ensemble de Travely</p>
                </div>
                <span className="admin-badge">Admin</span>
            </div>

            <p className="section-label">Statistiques</p>
            <div className="stats-grid">
                {loading ? (
                    <p className="loading-text">Chargement...</p>
                ) : (
                    statCards.map((s, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-icon" style={{ background: s.color, color: s.textColor }}>{s.icon}</div>
                            <div className="stat-number">{s.number}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))
                )}
            </div>

            <p className="section-label">Gestion</p>
            <div className="nav-grid">
                {navItems.map((item, i) => (
                    <div className="nav-card" key={i} onClick={() => navigate(item.path)}>
                        <div className="nav-icon" style={{ background: item.color, color: item.textColor }}>{item.icon}</div>
                        <div>
                            <p className="nav-title">{item.label}</p>
                            <p className="nav-desc">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;