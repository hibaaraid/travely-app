import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await api.post('/login', credentials);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.user.id);
      localStorage.setItem('user_name', res.data.user.name); // ✅ name pas nom
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user_email', res.data.user.email); // ✅ Ajoute ça
      // ✅ Redirection selon le rôle
      if (res.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      alert("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Connexion</h1>
        <p className="subtitle">Accédez à votre espace Travely</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="votre@email.com" required />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input name="password" type="password" placeholder="********" required />
          </div>

          <button type="submit" className="btn-submit">Se Connecter</button>
        </form>
        
        <div className="auth-footer">
          <Link to="/register">Pas encore de compte ? S'inscrire</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;