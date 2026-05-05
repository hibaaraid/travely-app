import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import './Reserver.css';

const Reserver = () => {
    const [destinations, setDestinations] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/destinations').then(res => {
            setDestinations(res.data);
            if (res.data.length > 0) {
                // On s'assure de stocker l'ID comme une chaîne pour le <select>
                setSelectedId(res.data[0].id.toString());
            }
        });
    }, []);

    const handleConfirm = async () => {
        const userId = localStorage.getItem('user_id');
        
        // Sécurité : Vérifier si l'userId existe
        if (!userId) {
            alert("Erreur : Utilisateur non connecté.");
            return;
        }

        try {
            await api.post('/reservations', {
                user_id: parseInt(userId),
                destination_id: parseInt(selectedId),
                statut: 'en attente'
            });
            alert("Voyage réservé !");
            navigate('/mes-reservations');
        } catch (err) {
            // Affiche l'erreur précise dans la console pour le debug
            console.error("Erreur détails:", err.response?.data);
            alert("Erreur lors de la réservation : " + (err.response?.data?.message || "Erreur serveur"));
        }
    };

    // Trouver la destination sélectionnée
    const selectedDest = destinations.find(d => d.id.toString() === selectedId.toString());

    return (
        <div className="reserver-page">
            <div className="reserver-card">
                <h2>Confirmer votre Voyage</h2>
                
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

                {/* SÉCURITÉ : On n'accède aux propriétés que si l'objet existe */}
                {selectedDest ? (
                    <div className="dest-details">
                        <p className="price-tag">Prix : <strong>{selectedDest.prix} DH</strong></p>
                        <p className="dest-info">Destination : {selectedDest.titre}</p>
                    </div>
                ) : (
                    <p>Chargement des détails...</p>
                )}

                <div className="status-info">Statut : <strong>En attente</strong></div>
                
                <button 
                    onClick={handleConfirm} 
                    className="btn-confirm"
                    disabled={!selectedId}
                >
                    Confirmer
                </button>
            </div>
        </div>
    );
};

export default Reserver;