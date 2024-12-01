import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Auth.css';
import skystone_logo from '../../assets/logo/Crystal_Skystone_Legacy.png';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    motDePasse: '',
    confirmerMotDePasse: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pour l'instant, on simule juste une connexion réussie
    navigate('/home');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      pseudo: '',
      email: '',
      motDePasse: '',
      confirmerMotDePasse: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="game-background">
        <div className="crystal-overlay"></div>
      </div>
      
      <div className="auth-content">
        <div className="auth-logo">
          <img src={skystone_logo} alt="Skystone Legacy" className="auth-logo-img" />
        </div>

        <div className="auth-form-container">
          <h2 className="auth-title">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <input
                  type="text"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleInputChange}
                  placeholder="Pseudo"
                  className="auth-input"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Adresse e-mail"
                className="auth-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleInputChange}
                placeholder="Mot de passe"
                className="auth-input"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmerMotDePasse"
                  value={formData.confirmerMotDePasse}
                  onChange={handleInputChange}
                  placeholder="Confirmer le mot de passe"
                  className="auth-input"
                  required
                />
              </div>
            )}

            <button type="submit" className="auth-button">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isLogin 
                ? "Vous n'avez pas encore de compte ?" 
                : "Vous avez déjà un compte ?"}
              <button 
                onClick={toggleForm}
                className="switch-button"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>

          {/* Message d'erreur éventuel */}
          {formData.error && (
            <div className="auth-error">
              {formData.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
