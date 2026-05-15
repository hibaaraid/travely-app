import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Contact from './pages/Contact';
import ManageContacts from './pages/admin/ManageContacts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute, { AdminRoute } from './components/PrivateRoute';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import Register from './pages/Register';
import DestinationDetail from './pages/DestinationDetail';
import MesReservations from './pages/MesReservations';
import Reserver from './pages/Reserver';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageVoyages from './pages/admin/ManageDestinations';
import ManageReservations from './pages/admin/ManageReservations';
import ManageUsers from './pages/admin/ManageUsers';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* 1. ROUTES PUBLIQUES */}
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/contact" element={<Contact />} />

            {/* 2. ROUTES PROTÉGÉES USER */}
            <Route path="/mes-reservations" element={<PrivateRoute><MesReservations /></PrivateRoute>} />
            <Route path="/reserver" element={<PrivateRoute><Reserver /></PrivateRoute>} />

            {/* 3. ROUTES ADMIN PROTÉGÉES */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/destinations" element={<AdminRoute><ManageVoyages /></AdminRoute>} />
            <Route path="/admin/reservations" element={<AdminRoute><ManageReservations /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
            <Route path="/admin/contacts" element={<AdminRoute><ManageContacts /></AdminRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            {/* 4. GESTION DES ERREURS D'URL */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;