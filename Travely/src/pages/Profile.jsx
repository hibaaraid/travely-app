import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdPerson, MdEmail, MdAdminPanelSettings, 
  MdLogout, MdAirplaneTicket,
  MdBookOnline, MdGroup, MdTravelExplore
} from 'react-icons/md';
import api from '../api/axiosConfig';
import './Profile.css';

const Profile = () => {
  const navigate  = useNavigate();
  const role      = localStorage.getItem('role');
  const userName  = localStorage.getItem('user_name');
  const userEmail = localStorage.getItem('user_email');

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (role === 'admin') {
      api.get('/admin/stats')
        .then(res => setStats(res.data))
        .catch(() => {});
    }
  }, [role]);

  const handleLogout = async () => {
    try { await api.post('/logout'); } catch {}
    localStorage.clear();
    navigate('/login');
  };

  const initiale = userName?.charAt(0).toUpperCase() || '?';

  return (
    <div className="profile-page">

      <h1 className="profile-page-title">Mon Profil</h1>

      {/* ── AVATAR CARD ─────────────────────────────────────── */}
      <div className="profile-card profile-avatar-card">
        <div className="profile-avatar">{initiale}</div>
        <div className="profile-avatar-info">
          <span className="profile-name">{userName || 'Utilisateur'}</span>
          <span className="profile-role-text">
            {role === 'admin' ? (
              <><MdAdminPanelSettings size={15} /> Administrateur</>
            ) : (
              <><MdTravelExplore size={15} /> Voyageur</>
            )}
          </span>
          <span className="profile-email-text">
            <MdEmail size={14} /> {userEmail || '—'}
          </span>
        </div>
      </div>

      {/* ── STATS ADMIN uniquement ───────────────────────────── */}
      {role === 'admin' && stats && (
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Statistiques</h2>
          </div>
          <div className="profile-card-body">
            <div className="stats-grille">
              <div className="stat-item">
                <MdAirplaneTicket size={22} className="stat-icon" />
                <span className="stat-nombre">{stats.nb_voyages}</span>
                <span className="stat-label">Voyages</span>
              </div>
              <div className="stat-item">
                <MdBookOnline size={22} className="stat-icon" />
                <span className="stat-nombre">{stats.nb_reservations}</span>
                <span className="stat-label">Réservations</span>
              </div>
              <div className="stat-item">
                <MdGroup size={22} className="stat-icon" />
                <span className="stat-nombre">{stats.nb_users}</span>
                <span className="stat-label">Utilisateurs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── INFORMATIONS PERSONNELLES ────────────────────────── */}
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Informations personnelles</h2>
        </div>
        <div className="profile-card-body">
          <div className="fields-grid">
            <div className="field">
              <span className="field-label">
                <MdPerson size={15} /> Nom
              </span>
              <span className="field-value">{userName || '—'}</span>
            </div>
            <div className="field">
              <span className="field-label">
                <MdEmail size={15} /> Email
              </span>
              <span className="field-value">{userEmail || '—'}</span>
            </div>
            <div className="field">
              <span className="field-label">
                <MdAdminPanelSettings size={15} /> Rôle
              </span>
              <span className="field-value">
                {role === 'admin' ? 'Administrateur' : 'Utilisateur'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── DÉCONNEXION ──────────────────────────────────────── */}
      <button onClick={handleLogout} className="btn-logout">
        <MdLogout size={18} /> Se déconnecter
      </button>

    </div>
  );
};

export default Profile;