import React from 'react';
import { Navigate } from 'react-router-dom';

// Protection pour les utilisateurs connectés
const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('isLoggedIn');
  return auth === 'true' ? children : <Navigate to="/login" />;
};

// ✅ Protection pour les admins uniquement
export const AdminRoute = ({ children }) => {
  const auth = localStorage.getItem('isLoggedIn');
  const role = localStorage.getItem('role');

  if (!auth) return <Navigate to="/login" />;
  if (role !== 'admin') return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;