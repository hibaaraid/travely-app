import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './ManageReservations.css';

const FILTRES = ['Toutes', 'attente', 'confirme', 'refuse'];

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filtre, setFiltre] = useState('Toutes');

  useEffect(() => {
    api.get('/admin/reservations').then(res => setReservations(res.data));
  }, []);

  const updateStatus = (id, newStatus) => {
    api.put(`/reservations/${id}`, { statut: newStatus }).then(() => {
      setReservations(reservations.map(r => r.id === id ? { ...r, statut: newStatus } : r));
    });
  };

  const filtrees = filtre === 'Toutes' ? reservations : reservations.filter(r => r.statut === filtre);

  const badgeClass = (statut) => {
    if (statut === 'confirme') return 'badge badge-confirme';
    if (statut === 'refuse')   return 'badge badge-refuse';
    return 'badge badge-attente';
  };

  const badgeLabel = (statut) => {
    if (statut === 'confirme') return 'Confirmée';
    if (statut === 'refuse')   return 'Refusée';
    return 'En attente';
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2 className="page-title">Gestion des réservations</h2>
        <span className="count-label">{filtrees.length} réservation(s)</span>
      </div>

      <div className="filters">
        {FILTRES.map(f => (
          <button
            key={f}
            className={`filter-btn ${filtre === f ? 'active' : ''}`}
            onClick={() => setFiltre(f)}
          >
            {f === 'Toutes' ? 'Toutes' : badgeLabel(f)}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Client</th>
              <th>Voyage</th>
              <th>Date départ</th>
              <th>Personnes</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtrees.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', color: '#aaa', padding: '2rem' }}>Aucune réservation</td></tr>
            ) : (
              filtrees.map(res => (
                <tr key={res.id}>
                  <td className="ref">#TRV-{res.id}</td>
                  <td>{res.user_name}</td>
                  <td>{res.destination_titre}</td>
                  <td>{res.date_depart}</td>
                  <td>{res.nombre_personnes}</td>
                  <td><span className={badgeClass(res.statut)}>{badgeLabel(res.statut)}</span></td>
                  <td>
                    <div className="actions">
                      {res.statut !== 'confirme' && (
                        <button className="btn-ok" onClick={() => updateStatus(res.id, 'confirme')}>Confirmer</button>
                      )}
                      {res.statut !== 'refuse' && (
                        <button className="btn-no" onClick={() => updateStatus(res.id, 'refuse')}>Refuser</button>
                      )}
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

export default ManageReservations;