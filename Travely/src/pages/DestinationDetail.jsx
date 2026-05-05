import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import './DestinationDetail.css'; // Nom respecté selon ton image

const DestinationDetail = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await api.get(`/destinations/${id}`);
                setDestination(response.data);
            } catch (error) {
                console.error("Erreur detail:", error);
            }
        };
        fetchDetail();
    }, [id]);

    if (!destination) return <div>Chargement...</div>;

    return (
        <div className="detail-container">
            <img src={destination.image} alt={destination.titre} />
            <h1>{destination.titre}</h1>
            <p>{destination.description}</p>
            <span className="price">{destination.prix} DH</span>
        </div>
    );
};

export default DestinationDetail;