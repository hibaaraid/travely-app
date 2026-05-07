import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import './DestinationDetail.css';

const DestinationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [erreur, setErreur] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await api.get(`/destinations/${id}`);
                setDestination(response.data);
            } catch (error) {
                console.error("Erreur detail:", error);
                setErreur(true);
            }
        };
        fetchDetail();
    }, [id]);

    if (erreur) return <div>Erreur lors du chargement.</div>;
    if (!destination) return <div>Chargement...</div>;

    const handleReserver = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/reserver', { state: { destination } });
        }
    };

    return (
        <div className="detail-container">

            {/* ✅ Image corrigée avec l'URL complète du backend */}
            <img 
                src={`http://localhost:8000${destination.image}`}
                alt={destination.titre}
                onError={(e) => e.target.src = '/placeholder.jpg'}
            />

            <h1>{destination.titre}</h1>

            <div>
                <h3>À propos</h3>
                <p>{destination.description}</p>
            </div>

            <div>
                <h3>Points forts</h3>
                {/* ✅ duree est null dans ta DB, on affiche un message par défaut */}
                <p>Durée : {destination.duree ?? 'Non définie'}</p>
                <span className="price">{destination.prix} DH</span>
            </div>

            <div>
                {/* ✅ date_depart au lieu de date */}
                <h3>Date de départ</h3>
                <p>{destination.date_depart 
                    ? new Date(destination.date_depart).toLocaleDateString('fr-FR')
                    : 'Non définie'}
                </p>

                {/* ✅ places_disponibles au lieu de nbrPlaces */}
                <h3>Places disponibles</h3>
                <p>{destination.places_disponibles}</p>

                <button onClick={handleReserver}>
                    Réserver maintenant
                </button>
            </div>
        </div>
    );
};

export default DestinationDetail;