import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center relative overflow-hidden px-4">
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-black/50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${skystone_logo})` }}
        ></div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <img
              src={skystone_logo}
              alt="Skystone Legacy"
              className="relative w-32 h-32 rounded-full border-2 border-purple-500/50"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              Skystone Legacy
            </span>
          </h1>
        </div>

        {/* Formulaire */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-8 border border-purple-500/20">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-lg transition-all ${
                isLogin
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-400 hover:bg-purple-600/10'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-lg transition-all ${
                !isLogin
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-400 hover:bg-purple-600/10'
              }`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-purple-300 mb-1">Pseudo</label>
                <input
                  type="text"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-purple-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-purple-300 mb-1">Mot de passe</label>
              <input
                type="password"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-purple-300 mb-1">Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="confirmerMotDePasse"
                  value={formData.confirmerMotDePasse}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium
                       hover:from-purple-500 hover:to-blue-500 transform hover:scale-[1.02] transition-all
                       focus:ring-2 focus:ring-purple-500/20"
            >
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
