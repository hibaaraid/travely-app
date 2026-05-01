import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- COMPOSANTS DE STRUCTURE ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// --- PAGES PUBLIQUES ---
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import Register from './pages/Register';
import DestinationDetail from './pages/DestinationDetail';

// --- PAGES UTILISATEUR (Binôme) ---
import MesReservations from './pages/MesReservations';
import Reserver from './pages/Reserver';

// --- VOS PAGES ADMIN ---
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageVoyages from './pages/admin/ManageDestinations';
import ManageReservations from './pages/admin/ManageReservations';
import ManageUsers from './pages/admin/ManageUsers';

// Import du CSS global
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

            {/* 2. ROUTES PROTÉGÉES USER */}
            <Route 
              path="/mes-reservations" 
              element={<PrivateRoute><MesReservations /></PrivateRoute>} 
            />
            <Route 
              path="/reserver" 
              element={<PrivateRoute><Reserver /></PrivateRoute>} 
            />

            {/* 3. VOS ROUTES ADMIN */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

            {/* CORRECTION ICI : On enlève la balise <Route> qui entourait vos composants */}
            <Route 
              path="/admin/dashboard" 
              element={<AdminDashboard />} 
            />
            <Route 
              path="/admin/voyages" 
              element={<ManageVoyages />} 
            />
            <Route 
              path="/admin/reservations" 
              element={<ManageReservations />} 
            />
            <Route 
              path="/admin/users" 
              element={<ManageUsers />} 
            />

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