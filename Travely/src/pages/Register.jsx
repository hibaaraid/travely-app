import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { FaUser, FaEnvelope, FaLock, FaGlobeAmericas } from 'react-icons/fa';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nom: '', email: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError("Les mots de passe ne correspondent pas");
        }

        try {
            await api.post('/register', {
                nom: formData.nom,
                email: formData.email,
                password: formData.password
            });
            alert("Inscription réussie !");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription");
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-header">
                    <FaGlobeAmericas className="logo-icon" />
                    <h2>Créer un compte</h2>
                    <p>Rejoignez l'aventure Travely</p>
                </div>

                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <FaUser className="icon" />
                        <input type="text" placeholder="Nom complet" required 
                            onChange={(e) => setFormData({...formData, nom: e.target.value})} />
                    </div>
                    <div className="input-box">
                        <FaEnvelope className="icon" />
                        <input type="email" placeholder="Email" required 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="input-box">
                        <FaLock className="icon" />
                        <input type="password" placeholder="Mot de passe" required 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <div className="input-box">
                        <FaLock className="icon" />
                        <input type="password" placeholder="Confirmer mot de passe" required 
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                    </div>
                    <button type="submit" className="btn-register">S'inscrire</button>
                </form>
                <p className="footer-text">Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
            </div>
        </div>
    );
};

export default Register;