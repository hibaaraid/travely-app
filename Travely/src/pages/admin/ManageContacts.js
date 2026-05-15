import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import './ManageContacts.css';

const ManageContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtre, setFiltre] = useState('tous'); // tous | non-lu | lu

    useEffect(() => {
        api.get('/admin/contacts')
            .then(res => { setContacts(res.data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    const marquerLu = async (id) => {
        await api.put(`/admin/contacts/${id}/lu`);
        setContacts(contacts.map(c =>
            c.id === id ? { ...c, lu: true } : c
        ));
    };

    const supprimer = async (id) => {
        if (window.confirm('Supprimer ce message ?')) {
            await api.delete(`/admin/contacts/${id}`);
            setContacts(contacts.filter(c => c.id !== id));
        }
    };

    const contactsFiltres = contacts.filter(c => {
        if (filtre === 'non-lu') return !c.lu;
        if (filtre === 'lu') return c.lu;
        return true;
    });

    const nbNonLus = contacts.filter(c => !c.lu).length;

    if (loading) return (
        <div className="mc-loader">
            <span className="material-icons mc-loader-icon">mail</span>
            Chargement des messages...
        </div>
    );

    return (
        <div className="mc-wrap">

            {/* ── Header ── */}
            <div className="mc-header">
                <div className="mc-header-left">
                    <span className="material-icons mc-header-icon">mail</span>
                    <div>
                        <h1 className="mc-title">Messages de Contact</h1>
                        <p className="mc-subtitle">
                            {nbNonLus > 0
                                ? <><span className="material-icons">mark_email_unread</span> {nbNonLus} message(s) non lu(s)</>
                                : <><span className="material-icons">mark_email_read</span> Tous les messages sont lus</>
                            }
                        </p>
                    </div>
                </div>

                {/* Stats rapides */}
                <div className="mc-stats">
                    <div className="mc-stat-box">
                        <span className="mc-stat-number">{contacts.length}</span>
                        <span className="mc-stat-label">Total</span>
                    </div>
                    <div className="mc-stat-box mc-stat-box--orange">
                        <span className="mc-stat-number">{nbNonLus}</span>
                        <span className="mc-stat-label">Non lus</span>
                    </div>
                    <div className="mc-stat-box mc-stat-box--green">
                        <span className="mc-stat-number">{contacts.length - nbNonLus}</span>
                        <span className="mc-stat-label">Lus</span>
                    </div>
                </div>
            </div>

            {/* ── Filtres ── */}
            <div className="mc-filtres">
                <button
                    className={`mc-filtre-btn ${filtre === 'tous' ? 'actif' : ''}`}
                    onClick={() => setFiltre('tous')}
                >
                    <span className="material-icons">all_inbox</span>
                    Tous
                </button>
                <button
                    className={`mc-filtre-btn ${filtre === 'non-lu' ? 'actif' : ''}`}
                    onClick={() => setFiltre('non-lu')}
                >
                    <span className="material-icons">mark_email_unread</span>
                    Non lus
                </button>
                <button
                    className={`mc-filtre-btn ${filtre === 'lu' ? 'actif' : ''}`}
                    onClick={() => setFiltre('lu')}
                >
                    <span className="material-icons">mark_email_read</span>
                    Lus
                </button>
            </div>

            {/* ── Liste messages ── */}
            {contactsFiltres.length === 0 ? (
                <div className="mc-empty">
                    <span className="material-icons mc-empty-icon">inbox</span>
                    <p>Aucun message trouve.</p>
                </div>
            ) : (
                <div className="mc-list">
                    {contactsFiltres.map(contact => (
                        <div key={contact.id} className={`mc-card ${contact.lu ? 'mc-card--lu' : 'mc-card--nonlu'}`}>

                            {/* Indicateur non lu */}
                            {!contact.lu && <div className="mc-card-dot" />}

                            <div className="mc-card-content">

                                {/* Avatar */}
                                <div className="mc-avatar">
                                    {contact.nom?.charAt(0).toUpperCase() || 'U'}
                                </div>

                                {/* Infos */}
                                <div className="mc-card-info">
                                    <div className="mc-card-top">
                                        <h3 className="mc-card-sujet">
                                            {contact.sujet}
                                            {!contact.lu && (
                                                <span className="mc-badge-nouveau">
                                                    <span className="material-icons">fiber_new</span>
                                                    Nouveau
                                                </span>
                                            )}
                                        </h3>
                                        <span className="mc-card-date">
                                            <span className="material-icons">schedule</span>
                                            {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>

                                    <div className="mc-card-expediteur">
                                        <span className="material-icons">person</span>
                                        <strong>{contact.nom}</strong>
                                        <span className="material-icons">mail</span>
                                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                    </div>

                                    <p className="mc-card-message">
                                        <span className="material-icons">chat</span>
                                        {contact.message}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mc-card-actions">
                                    {!contact.lu && (
                                        <button
                                            onClick={() => marquerLu(contact.id)}
                                            className="mc-btn mc-btn--lu"
                                            title="Marquer comme lu"
                                        >
                                            <span className="material-icons">done</span>
                                            Marquer lu
                                        </button>
                                    )}
                                    <button
                                        onClick={() => supprimer(contact.id)}
                                        className="mc-btn mc-btn--supprimer"
                                        title="Supprimer"
                                    >
                                        <span className="material-icons">delete</span>
                                        Supprimer
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageContacts;