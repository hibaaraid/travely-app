import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import './Reserver.css';

const Reserver = () => {
    // --- 1. DÉCLARATION DES VARIABLES D'ÉTAT ---
    const [destinations, setDestinations] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [nbPersonnes, setNbPersonnes] = useState(1); // Plus de dateDepart ici !
    
    const navigate = useNavigate();

    // --- 2. CHARGEMENT DES DESTINATIONS ---
    useEffect(() => {
        api.get('/destinations').then(res => {
            setDestinations(res.data);
            if (res.data.length > 0) {
                setSelectedId(res.data[0].id.toString());
            }
        }).catch(err => console.error("Erreur API:", err));
    }, []);

    // --- 3. FONCTION DE SOUMISSION ---
    const handleConfirm = async () => {
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
            alert("Erreur : Utilisateur non connecté.");
            return;
        }

        try {
            await api.post('/reservations', {
                user_id: parseInt(userId),
                destination_id: parseInt(selectedId),
                // On n'envoie plus la date d'ici, Laravel s'en occupe !
                nombre_personnes: parseInt(nbPersonnes), 
                statut: 'en attente'
            });
            alert("Voyage réservé avec succès !");
            navigate('/mes-reservations');
        } catch (err) {
            console.error("Erreur détails:", err.response?.data);
            alert("Erreur lors de la réservation : " + (err.response?.data?.message || "Erreur serveur"));
        }
    };

    // Trouver la destination pour afficher les détails en direct
    const selectedDest = destinations.find(d => d.id.toString() === selectedId.toString());

    // --- 4. L'AFFICHAGE DU FORMULAIRE (JSX) ---
    return (
        <div className="reserver-page">
            <div className="reserver-card">
                <h2>Confirmer votre Voyage</h2>
                
                <label>Sélectionnez un voyage :</label>
                <select 
                    value={selectedId} 
                    onChange={(e) => setSelectedId(e.target.value)} 
                    className="custom-select"
                >
                    {destinations.map(d => (
                        <option key={d.id} value={d.id}>
                            {d.titre}
                        </option>
                    ))}
                </select>

                <div className="input-group" style={{ marginTop: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Nombre de personnes :</label>
                    <input 
                        type="number" 
                        className="custom-input"
                        min="1"
                        value={nbPersonnes} 
                        onChange={(e) => setNbPersonnes(e.target.value)} 
                        required 
                    />
                </div>

                {selectedDest ? (
                    <div className="dest-details" style={{ marginTop: '20px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                        <p className="dest-info">Date prévue : <strong>{selectedDest.date_depart || "Non spécifiée"}</strong></p>
                        <p className="price-tag">Prix unitaire : <strong>{selectedDest.prix} DH</strong></p>
                        <p className="price-tag" style={{ color: '#2ecc71' }}>Total estimé : <strong>{selectedDest.prix * nbPersonnes} DH</strong></p>
                    </div>
                ) : (
                    <p>Chargement des détails...</p>
                )}

                <div className="status-info" style={{ marginTop: '15px', marginBottom: '15px' }}>
                    Statut : <strong>En attente</strong>
                </div>
                
                <button 
                    onClick={handleConfirm} 
                    className="btn-confirm"
                    disabled={!selectedId} // Sécurité pour empêcher un clic à vide
                >
                    Confirmer la réservation
                </button>
            </div>
        </div>
    );
};

export default Reserver;