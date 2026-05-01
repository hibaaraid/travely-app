import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './ManageUsers.css';

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

  // Initiales pour l'avatar
  const initiales = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';

  if (loading) return <p className="loading-text">Chargement des utilisateurs...</p>;

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2 className="page-title">Gestion des utilisateurs</h2>
        <span className="count-label">{users.length} membre(s) inscrit(s)</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="4" className="empty-cell">Aucun utilisateur</td></tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar">{initiales(user.name)}</div>
                      {user.name}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={user.role === 'admin' ? 'badge-admin' : 'badge-user'}>
                      {user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className={`btn-role ${user.role === 'admin' ? 'btn-demote' : 'btn-promote'}`}
                        onClick={() => toggleRole(user.id, user.role)}
                      >
                        {user.role === 'admin' ? 'Retirer Admin' : 'Nommer Admin'}
                      </button>
                      <button className="btn-del" onClick={() => handleDelete(user.id)}>
                        Supprimer
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