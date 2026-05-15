import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import './AdminDashboard.css';
import { 
  MdBarChart, 
  MdFlight, 
  MdBookOnline, 
  MdPeople, 
  MdMail 
} from 'react-icons/md';

const AdminDashboard = () => {
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
                setStats({ voyages: 11, reservations: 3, utilisateurs: 2 });
            } catch (error) {
                console.error("Erreur lors du chargement des reservations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return (
        <div className="adb-loader">Chargement de votre tableau de bord...</div>
    );

    return (
        <div className="adb-wrap">
            <div className="adb-card">

                {/* Titre Statistiques */}
                <div className="adb-header">
                    <MdBarChart className="adb-header-icon" />
                    <h2 className="adb-header-title">Statistiques</h2>
                </div>
                <hr className="adb-divider" />

                {/* 3 cartes stats */}
                <div className="adb-stats-grid">
                    <div className="adb-stat-box">
                        <MdFlight className="adb-stat-icon" />
                        <div className="adb-stat-number">{stats.voyages}</div>
                        <div className="adb-stat-label">VOYAGES</div>
                    </div>
                    <div className="adb-stat-box">
                        <MdBookOnline className="adb-stat-icon" />
                        <div className="adb-stat-number">{stats.reservations}</div>
                        <div className="adb-stat-label">RESERVATIONS</div>
                    </div>
                    <div className="adb-stat-box">
                        <MdPeople className="adb-stat-icon" />
                        <div className="adb-stat-number">{stats.utilisateurs}</div>
                        <div className="adb-stat-label">UTILISATEURS</div>
                    </div>
                </div>

                {/* 4 boutons navigation */}
                <div className="adb-nav-grid">
                    <Link to="/admin/destinations" className="adb-nav-btn">
                        <MdFlight /> Destinations
                    </Link>
                    <Link to="/admin/reservations" className="adb-nav-btn">
                        <MdBookOnline /> Reservations
                    </Link>
                    <Link to="/admin/users" className="adb-nav-btn">
                        <MdPeople /> Utilisateurs
                    </Link>
                    <Link to="/admin/contacts" className="adb-nav-btn">
                        <MdMail /> Messages
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;