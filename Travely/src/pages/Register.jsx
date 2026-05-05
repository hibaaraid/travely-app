import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig'; // Ton instance Axios pointant vers http://127.0.0.1:8000/api
import './Login.css'; // On réutilise le CSS de centrage

const Register = () => {
    const navigate = useNavigate();
    
    // État pour gérer les erreurs éventuelles du serveur
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Réinitialise l'erreur à chaque tentative

        // Préparation des données pour Laravel
        // Note : On envoie 'name' car ton AuthController fait le mapping vers 'nom'
        const newUser = {
            name: e.target.nom.value, 
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            // Envoi de la requête POST vers /api/register
            const response = await api.post('/register', newUser);

            if (response.status === 201) {
                alert("Compte Travely créé avec succès !");
                navigate('/login'); // Redirection vers la page de connexion
            }
        } catch (err) {
            // Gestion des erreurs (ex: email déjà utilisé ou serveur éteint)
            console.error("Détails de l'erreur :", err.response?.data);
            const message = err.response?.data?.message || "Erreur lors de l'inscription. Vérifiez vos informations.";
            setError(message);
        }
    };

    return (
        <div className="auth-page"> {/* Conteneur Flexbox pour centrer au milieu */}
            <div className="auth-card">
                <h1>Inscription Travely</h1>
                <p className="subtitle">Créez votre compte pour explorer le monde</p>

                {/* Affichage d'un message d'erreur si l'inscription échoue */}
                {error && <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="nom">Nom complet</label>
                        <input 
                            id="nom"
                            name="nom" 
                            type="text" 
                            placeholder="Ex: Ahmed Alami" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Adresse Email</label>
                        <input 
                            id="email"
                            name="email" 
                            type="email" 
                            placeholder="votre@email.com" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            id="password"
                            name="password" 
                            type="password" 
                            placeholder="******** (min. 6 caractères)" 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-submit">
                        Créer mon compte
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;