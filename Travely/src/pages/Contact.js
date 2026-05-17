import React, { useState } from 'react';
import './Contact.css';
import api from '../api/axiosConfig';
import BlogSection from './BlogSection';

const Contact = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        sujet: '',
        message: ''
    });
    const [envoye, setEnvoye] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/contact', formData);
            setEnvoye(true);
            setFormData({ nom: '', email: '', sujet: '', message: '' });
        } catch (err) {
            alert("Erreur lors de l'envoi, réessayez.");
        }
    };

    return (
        <div className="contact-page">

            {/* ===== EN-TÊTE ===== */}
            <div className="contact-header">
                <h1>Contactez-nous</h1>
                <p>Une question ? Une demande spéciale ? On vous répond rapidement !</p>
            </div>

            <div className="contact-container">

                {/* ===== INFOS À GAUCHE ===== */}
                <div className="contact-page-info">
                    <h2>Nos coordonnées</h2>

                    <div className="info-item">
                        <span className="info-icon">📍</span>
                        <div>
                            <h4>Adresse</h4>
                            <p>123 Rue du Voyage, Casablanca, Maroc</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="info-icon">📞</span>
                        <div>
                            <h4>Téléphone</h4>
                            <p>+212 6 00 00 00 00</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="info-icon">✉️</span>
                        <div>
                            <h4>Email</h4>
                            <p>contact@travely.ma</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span className="info-icon">🕐</span>
                        <div>
                            <h4>Horaires</h4>
                            <p>Lun - Ven : 9h00 - 18h00</p>
                        </div>
                    </div>
                </div>

                {/* ===== FORMULAIRE À DROITE ===== */}
                <div className="contact-form-card">
                    <h2>Envoyer un message</h2>

                    {envoye && (
                        <div className="success-message">
                            ✅ Message envoyé avec succès ! On vous répond bientôt.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nom complet</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    placeholder="Votre nom"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Sujet</label>
                            <input
                                type="text"
                                name="sujet"
                                value={formData.sujet}
                                onChange={handleChange}
                                placeholder="Ex: Question sur une réservation"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Écrivez votre message ici..."
                                rows="5"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-submit">
                            Envoyer le message 🚀
                        </button>
                    </form>
                </div>
            </div>

            {/* ===== 👈 2. SECTION BLOG INTÉGRÉE JUSTE ICI EN BAS ===== */}
            <BlogSection />

        </div>
    );
};

export default Contact;