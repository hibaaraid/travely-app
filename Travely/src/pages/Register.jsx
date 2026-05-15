import React, { useState, useEffect } from 'react'; // Ne pas oublier useEffect
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import './Reserver.css';

const Reserver = () => {
    const [destinations, setDestinations] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [dateDepart, setDateDepart] = useState('');
    const [nbPersonnes, setNbPersonnes] = useState(1);
    const navigate = useNavigate();

    // Récupération des destinations au chargement
    useEffect(() => {
        api.get('/destinations').then(res => {
            setDestinations(res.data);
            if (res.data.length > 0) {
                setSelectedId(res.data[0].id.toString());
            }
        }).catch(err => console.error("Erreur chargement destinations:", err));
    }, []);

    const handleConfirm = async () => {
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
            alert("Erreur : Utilisateur non connecté.");
            return;
        }

        // Vérification locale avant envoi
        if (!dateDepart || !selectedId) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        try {
            await api.post('/reservations', {
                user_id: parseInt(userId),
                destination_id: parseInt(selectedId),
                date_depart: dateDepart,
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

    // Trouver la destination sélectionnée pour l'affichage du prix
    const selectedDest = destinations.find(d => d.id.toString() === selectedId.toString());

    return (
        <div className="reserver-page">
            <div className="reserver-card">
                <h2>Confirmer votre Voyage</h2>
                
                <label>Choisir une destination :</label>
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

                <div className="input-group">
                    <label>Date de départ :</label>
                    <input 
                        type="date" 
                        value={dateDepart} 
                        onChange={(e) => setDateDepart(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Nombre de personnes :</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={nbPersonnes} 
                        onChange={(e) => setNbPersonnes(e.target.value)} 
                        required 
                    />
                </div>

                {selectedDest && (
                    <div className="dest-details">
                        <p className="price-tag">Prix : <strong>{selectedDest.prix} DH</strong></p>
                        <p className="dest-info">Total estimé : <strong>{selectedDest.prix * nbPersonnes} DH</strong></p>
                    </div>
                )}

                <button 
                    onClick={handleConfirm} 
                    className="btn-confirm" 
                    disabled={!selectedId || !dateDepart}
                >
                    Confirmer la réservation
                </button>
            </div>
        </div>
    );
};

export default Reserver;