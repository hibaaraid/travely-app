import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import './ManageContacts.css';

const ManageContacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        api.get('/admin/contacts')
            .then(res => setContacts(res.data))
            .catch(err => console.error(err));
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

    return (
        <div className="manage-contacts">
            <h1>Messages de Contact</h1>
            <p className="non-lus">
                {contacts.filter(c => !c.lu).length} message(s) non lu(s)
            </p>

            {contacts.length === 0 ? (
                <p className="aucun-message">Aucun message reçu.</p>
            ) : (
                contacts.map(contact => (
                    <div key={contact.id} className={`contact-card ${contact.lu ? 'lu' : 'non-lu'}`}>
                        <div className="contact-card-content">
                            <div className="contact-card-info">
                                <h3>{contact.sujet} {!contact.lu && <span className="badge">🔵 Nouveau</span>}</h3>
                                <p><strong>De :</strong> {contact.nom} ({contact.email})</p>
                                <p><strong>Message :</strong> {contact.message}</p>
                                <small>{new Date(contact.created_at).toLocaleDateString('fr-FR')}</small>
                            </div>
                            <div className="contact-card-actions">
                                {!contact.lu && (
                                    <button 
                                        onClick={() => marquerLu(contact.id)} 
                                        className="btn-lu"
                                    >
                                        Marquer lu
                                    </button>
                                )}
                                <button 
                                    onClick={() => supprimer(contact.id)} 
                                    className="btn-supprimer"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageContacts;