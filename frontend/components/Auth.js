import { React, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    motDePasse: '',
    confirmerMotDePasse: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await fetch(`http://localhost:8000/api/auth/${endpoint}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.motDePasse,
          ...(isLogin ? {} : { pseudo: formData.pseudo })
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        if (isLogin) {
          toast.success('Connexion réussie !');
          localStorage.setItem('token', data.access);
          router.push('/');
        } else {
          toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          setIsLogin(true);
          setFormData({
            pseudo: '',
            email: '',
            motDePasse: '',
            confirmerMotDePasse: ''
          });
        }
      } else {
        // Gérer les différents types d'erreurs
        if (data.email) {
          const emailError = data.email[0].toLowerCase();
          if (emailError.includes('already exists')) {
            toast.error('Cette adresse email est déjà utilisée');
          } else if (emailError.includes('valid email')) {
            toast.error('Veuillez entrer une adresse email valide');
          } else if (emailError.includes('required')) {
            toast.error('L\'adresse email est requise');
          } else {
            toast.error('Erreur avec l\'adresse email');
          }
        }
        if (data.pseudo) {
          const pseudoError = data.pseudo[0].toLowerCase();
          if (pseudoError.includes('already exists')) {
            toast.error('Ce pseudo est déjà utilisé');
          } else if (pseudoError.includes('required')) {
            toast.error('Le pseudo est requis');
          } else {
            toast.error('Erreur avec le pseudo');
          }
        }
        if (data.password) {
          const passwordError = data.password[0].toLowerCase();
          if (passwordError.includes('too common')) {
            toast.error('Le mot de passe est trop simple');
          } else if (passwordError.includes('too short')) {
            toast.error('Le mot de passe doit contenir au moins 8 caractères');
          } else if (passwordError.includes('numeric')) {
            toast.error('Le mot de passe ne peut pas être uniquement numérique');
          } else if (passwordError.includes('required')) {
            toast.error('Le mot de passe est requis');
          } else {
            toast.error('Le mot de passe n\'est pas assez sécurisé');
          }
        }
        if (data.detail) {
          if (data.detail.includes('No active account') || data.detail.includes('Invalid credentials')) {
            toast.error('Email ou mot de passe incorrect');
          } else {
            toast.error('Une erreur est survenue avec vos identifiants');
          }
        }
        if (!data.email && !data.pseudo && !data.password && !data.detail) {
          toast.error('Une erreur est survenue. Veuillez réessayer.');
        }
      }
    } catch (error) {
      toast.error('Erreur de connexion au serveur');
      console.error('Erreur:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleForm = (newState) => {
    if (newState === isLogin) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(newState);
      setFormData({
        pseudo: '',
        email: '',
        motDePasse: '',
        confirmerMotDePasse: ''
      });
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-black/80 backdrop-blur-sm border border-purple-500/20 rounded-xl"
        progressClassName="bg-gradient-to-r from-purple-500 to-blue-500"
      />
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center relative overflow-hidden px-4">
      
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-black/50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(/assets/logo/Crystal_Skystone_Legacy.png)` }}
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
              src={"/assets/logo/Crystal_Skystone_Legacy.png"}
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
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-8 border border-purple-500/20 relative">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => toggleForm(true)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 relative ${
                isLogin
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-400 hover:bg-purple-600/10'
              }`}
            >
              Connexion
              {isLogin && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-500 transform scale-x-100 transition-transform duration-300" />
              )}
            </button>
            <button
              onClick={() => toggleForm(false)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 relative ${
                !isLogin
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-400 hover:bg-purple-600/10'
              }`}
            >
              Inscription
              {!isLogin && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-500 transform scale-x-100 transition-transform duration-300" />
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} 
                className={`space-y-4 transition-all duration-300 transform ${
                  isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}>
            {!isLogin && (
              <div className="transform transition-all duration-300 ease-out">
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
              <div className="transform transition-all duration-300 ease-out">
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
                       hover:from-purple-500 hover:to-blue-500 transform hover:scale-[1.02] transition-all duration-300
                       focus:ring-2 focus:ring-purple-500/20"
            >
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          {/* Indicateur de progression */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500/10 rounded-b-xl overflow-hidden">
            <div className={`h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out
                          ${isLogin ? 'w-1/2 translate-x-0' : 'w-1/2 translate-x-full'}`} />
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default Auth;