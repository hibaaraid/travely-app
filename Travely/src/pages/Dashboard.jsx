import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig'; // Importez votre fichier Axios

const Dashboard = () => {
  const [messageServeur, setMessageServeur] = useState("En attente de Laravel...");

  useEffect(() => {
    // React appelle la route /test-connexion de Laravel
    api.get('/test-connexion')
      .then(response => {
        // Si ça marche, on met à jour le message !
        setMessageServeur(response.data.message);
      })
      .catch(error => {
        console.error("Erreur :", error);
        setMessageServeur("Échec de la connexion. Regardez la console.");
      });
  }, []);

  return (
    <div>
      <h1>Test de Connexion</h1>
      {/* C'est ici que le message de Laravel va s'afficher */}
      <div style={{ padding: '20px', backgroundColor: '#e0ffe0', border: '1px solid green' }}>
        <strong>Statut : </strong> {messageServeur}
      </div>
    </div>
  );
};

export default Dashboard;