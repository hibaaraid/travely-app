import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const nom = e.target.nom.value;

    // Simulation de sauvegarde
    const newUser = { nom, email, password };
    localStorage.setItem('user_account', JSON.stringify(newUser));

    alert("Compte Travely créé ! Veuillez vous connecter.");
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Inscription Travely</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input name="nom" type="text" placeholder="Votre nom" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="votre@email.com" required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input name="password" type="password" placeholder="********" required />
          </div>
          <button type="submit" className="btn-primary">Créer mon compte</button>
        </form>
        <div className="login-footer">
          <Link to="/login">Déjà inscrit ? Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;