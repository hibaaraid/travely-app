import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './ManageUsers.css';

// IMPORT DES ICÔNES (SVG)
import { 
  MdPeople, 
  MdAdminPanelSettings, 
  MdPerson, 
  MdDelete, 
  MdEmail, 
  MdSecurity 
} from 'react-icons/md';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users')
      .then(res => { setUsers(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleRole = (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    api.put(`/admin/users/${id}/role`, { role: newRole }).then(() => {
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      api.delete(`/admin/users/${id}`).then(() => {
        setUsers(users.filter(u => u.id !== id));
      });
    }
  };

  const initiales = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';

  if (loading) return (
    <div className="admin-container">
      <div className="loading-state">
        <MdPeople className="spin-slow" size={40} />
        <p>Chargement des membres...</p>
      </div>
    </div>
  );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-text">
          <h2 className="page-title">Gestion des Utilisateurs</h2>
          <p className="page-subtitle">Gérez les accès et les rôles de la plateforme</p>
        </div>
        <div className="count-chip">
          <MdPeople /> {users.length} Membres
        </div>
      </div>

      <div className="table-card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Contact</th>
              <th>Rôle / Niveau</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-row">Aucun utilisateur inscrit pour le moment.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-profile-cell">
                      <div className="avatar-circle">{initiales(user.name)}</div>
                      <span className="user-name-text">{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <MdEmail size={14} /> {user.email}
                    </div>
                  </td>
                  <td>
                    <span className={user.role === 'admin' ? 'badge-role admin' : 'badge-role member'}>
                      {user.role === 'admin' ? <MdAdminPanelSettings /> : <MdPerson />}
                      {user.role === 'admin' ? 'Administrateur' : 'Membre'}
                    </span>
                  </td>
                  <td>
                    <div className="actions-btns">
                      <button
                        className={`btn-action-role ${user.role === 'admin' ? 'demote' : 'promote'}`}
                        onClick={() => toggleRole(user.id, user.role)}
                        title={user.role === 'admin' ? 'Rétrograder en membre' : 'Nommer administrateur'}
                      >
                        <MdSecurity /> {user.role === 'admin' ? 'Retirer Admin' : 'Nommer Admin'}
                      </button>
                      <button className="btn-action-delete" onClick={() => handleDelete(user.id)} title="Supprimer">
                        <MdDelete /> Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;