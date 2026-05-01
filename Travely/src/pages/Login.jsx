import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailSaisi = e.target.email.value;
    const passSaisi = e.target.password.value;

    const userEnregistre = JSON.parse(localStorage.getItem('user_account'));

    if (userEnregistre && userEnregistre.email === emailSaisi && userEnregistre.password === passSaisi) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/mes-reservations');
    } else {
      alert("Email ou mot de passe incorrect (Vérifiez si vous avez créé un compte)");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion</h2>
        <p>Accédez à votre espace Travely</p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="votre@email.com" required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input name="password" type="password" placeholder="********" required />
          </div>
          <button type="submit" className="btn-primary">Se Connecter</button>
        </form>
        <div className="login-footer">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;