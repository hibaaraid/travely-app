import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './ManageReservations.css';

// IMPORT DES ICÔNES (SVG)
import { 
  MdCheckCircle, 
  MdCancel, 
  MdHourglassEmpty, 
  MdFilterList, 
  MdPerson, 
  MdEvent, 
  MdConfirmationNumber 
} from 'react-icons/md';

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

  const getStatusIcon = (statut) => {
    if (statut === 'confirme') return <MdCheckCircle />;
    if (statut === 'refuse')   return <MdCancel />;
    return <MdHourglassEmpty />;
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-text">
          <h2 className="page-title">Gestion des Réservations</h2>
          <p className="page-subtitle">Validez ou refusez les demandes des clients</p>
        </div>
        <div className="count-chip">
          <MdConfirmationNumber /> {filtrees.length} Réservations
        </div>
      </div>

      <div className="filters-card">
        <div className="filter-label">
          <MdFilterList /> Filtrer par statut :
        </div>
        <div className="filters-group">
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
      </div>

      <div className="table-card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Client / Voyage</th>
              <th>Date départ</th>
              <th>Personnes</th>
              <th>Statut</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtrees.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  Aucune réservation trouvée pour ce filtre.
                </td>
              </tr>
            ) : (
              filtrees.map(res => (
                <tr key={res.id}>
                  <td className="ref-text">#TRV-{res.id}</td>
                  <td>
                    <div className="client-info">
                      <span className="client-name"><MdPerson size={14}/> {res.user_name}</span>
                      <span className="voyage-title">{res.destination_titre}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <MdEvent /> {res.date_depart}
                    </div>
                  </td>
                  <td className="count-cell">{res.nombre_personnes} pers.</td>
                  <td>
                    <span className={badgeClass(res.statut)}>
                      {getStatusIcon(res.statut)} {badgeLabel(res.statut)}
                    </span>
                  </td>
                  <td>
                    <div className="actions-btns">
                      {res.statut !== 'confirme' && (
                        <button className="btn-status confirm" onClick={() => updateStatus(res.id, 'confirme')} title="Confirmer">
                          <MdCheckCircle /> Confirmer
                        </button>
                      )}
                      {res.statut !== 'refuse' && (
                        <button className="btn-status reject" onClick={() => updateStatus(res.id, 'refuse')} title="Refuser">
                          <MdCancel /> Refuser
                        </button>
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