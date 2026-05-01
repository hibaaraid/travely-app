import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // On vérifie si la clé 'isLoggedIn' est à 'true' dans le navigateur
  const auth = localStorage.getItem('isLoggedIn');

  // Si l'utilisateur est connecté, on affiche la page demandée (children)
  // Sinon, on le redirige vers la page de connexion
  return auth === 'true' ? children : <Navigate to="/login" />;
};

// TRÈS IMPORTANT : L'export default pour éviter l'erreur "Element type is invalid"
export default PrivateRoute;