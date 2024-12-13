import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import skystone_logo from '../../assets/logo/Crystal_Skystone_Legacy.png';
import eclaireurImage from '../../assets/class/Éclaireur des Vents.png';
import cristallomancienImage from '../../assets/class/Cristallomancien.png';
import negociantImage from '../../assets/class/Négociant des Cieux.png';
import archeologueImage from '../../assets/class/Archéologue des Ruines.png';
import { useAudio } from '../../context/AudioContext';
import '../../styles/Home.css';

function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);
  const navigate = useNavigate();
  const { playMusic } = useAudio();

  const [formData, setFormData] = useState({
    pseudo: '',
    classe: '',
    difficulty: ''
  });

  const handleLogout = () => {
    // Ici vous pouvez ajouter la logique de déconnexion (clear token, etc.)
    navigate('/auth');
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    playMusic();
  }, [playMusic]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white relative overflow-hidden">
      {/* Bouton de déconnexion */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 
                 border border-purple-500/50 rounded-lg text-purple-300 hover:from-purple-600/30 
                 hover:to-blue-600/30 hover:text-purple-200 transition-all duration-300 
                 backdrop-blur-sm flex items-center gap-2 z-20 group"
      >
        <span>Déconnexion</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>

      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-black/50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${skystone_logo})` }}
        ></div>
      </div>

      {/* Îles flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${10 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * -2}s`
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl"></div>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <main className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          {/* Section héros */}
          <div className="text-center mb-16">
            <div className="relative mb-8 group logo-container">
              <div className="logo-glow"></div>
              <img
                src={skystone_logo}
                alt="Skystone Legacy"
                className="relative w-48 h-48 rounded-full border-2 border-purple-500/50"
              />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 animate-text-shine">
                Skystone Legacy
              </span>
            </h1>
            
            <div className="typewriter-container">
              <p className="typewriter-text text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                Plongez dans un univers mystique où les îles flottantes abritent des secrets millénaires. 
                Devenez le héros d'une légende où chaque cristal raconte une histoire.
              </p>
            </div>
          </div>

          {/* Grille des fonctionnalités */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl w-full">
            {[
              {
                title: "Exploration",
                desc: "Découvrez des îles mystérieuses et des ruines anciennes",
                icon: "🗺️"
              },
              {
                title: "Combat",
                desc: "Affrontez des créatures légendaires",
                icon: "⚔️"
              },
              {
                title: "Magie",
                desc: "Maîtrisez les pouvoirs des cristaux ancestraux",
                icon: "✨"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-purple-500/20
                         hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => setShowNewGame(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold
                       hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform
                       hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group flex items-center gap-2"
            >
              Nouvelle Partie
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button
              onClick={() => navigate('/options')}
              className="px-8 py-4 border-2 border-purple-500 text-purple-400 rounded-lg font-bold
                       hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm"
            >
              Options
            </button>

            <button
              onClick={() => setShowInfo(true)}
              className="px-8 py-4 border-2 border-purple-500 text-purple-400 rounded-lg font-bold
                       hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm"
            >
              À propos
            </button>
          </div>
        </div>
      </main>

      {/* Modal Nouvelle Partie */}
      {showNewGame && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-xl p-8 max-w-4xl w-full border border-purple-500/20 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">Nouvelle Partie</h2>
            
            <div className="space-y-8">
              <div>
                <label className="block text-purple-200 mb-2">Pseudo</label>
                <input
                  type="text"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleInputChange}
                  className="w-full bg-[#2a2a2a] border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Entrez votre pseudo..."
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2 text-xl font-bold">Choisissez votre classe</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                  {[
                    {
                      name: "Éclaireur des Vents",
                      description: "Expert en navigation et exploration des îles flottantes. Capable de repérer les routes les plus sûres et de découvrir des passages secrets.",
                      image: eclaireurImage,
                      stats: {
                        exploration: 90,
                        combat: 60,
                        diplomatie: 40,
                        connaissance: 50
                      }
                    },
                    {
                      name: "Cristallomancien",
                      description: "Maître dans l'art de comprendre et manipuler les cristaux. Possède une connexion unique avec les artefacts anciens.",
                      image: cristallomancienImage,
                      stats: {
                        exploration: 50,
                        combat: 70,
                        diplomatie: 40,
                        connaissance: 80
                      }
                    },
                    {
                      name: "Négociant des Cieux",
                      description: "Expert en négociation et diplomatie. Dispose d'un vaste réseau de contacts et excelle dans les interactions sociales.",
                      image: negociantImage,
                      stats: {
                        exploration: 40,
                        combat: 30,
                        diplomatie: 90,
                        connaissance: 60
                      }
                    },
                    {
                      name: "Archéologue des Ruines",
                      description: "Spécialiste des civilisations anciennes. Capable de déchiffrer les vestiges et de percer les mystères du passé.",
                      image: archeologueImage,
                      stats: {
                        exploration: 70,
                        combat: 40,
                        diplomatie: 50,
                        connaissance: 90
                      }
                    }
                  ].map((classe) => (
                    <button
                      key={classe.name}
                      onClick={() => setFormData(prev => ({ ...prev, classe: classe.name }))}
                      className={`relative group perspective-1000 transform transition-transform duration-500 hover:scale-105 ${
                        formData.classe === classe.name ? 'ring-4 ring-purple-500/50' : ''
                      }`}
                    >
                      {/* Carte */}
                      <div className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden transform transition-transform duration-500
                        ${formData.classe === classe.name ? 'shadow-xl shadow-purple-500/30' : 'shadow-lg shadow-black/20'}
                        group-hover:shadow-xl group-hover:shadow-purple-500/20`}>
                        
                        {/* Bordure animée */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Fond avec motif */}
                        <div className="absolute inset-0 bg-[#1a1a1a] border-2 border-purple-500/30">
                          {/* Motif géométrique */}
                          <div className="absolute inset-0 opacity-10 bg-repeat"
                               style={{
                                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%239C27B0' fill-opacity='0.4'/%3E%3C/svg%3E")`
                               }} />
                        </div>

                        {/* Image de la classe */}
                        <div className="absolute inset-0">
                          <img
                            src={classe.image}
                            alt={classe.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                          />
                          {/* Overlay dégradé */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>

                        {/* Contenu */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          {/* En-tête */}
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white text-center py-2 px-3 bg-black/50 rounded-lg backdrop-blur-sm inline-block">
                              {classe.name}
                            </h3>
                          </div>

                          {/* Stats et description */}
                          <div className="space-y-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg">
                            {/* Stats en barres */}
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {Object.entries(classe.stats).map(([stat, value]) => (
                                <div key={stat} className="space-y-1">
                                  <div className="flex justify-between text-gray-300 capitalize">
                                    <span>{stat}</span>
                                    <span>{value}%</span>
                                  </div>
                                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                                      style={{ width: `${value}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-gray-300 line-clamp-3">
                              {classe.description}
                            </p>
                          </div>
                        </div>

                        {/* Effet de sélection */}
                        {formData.classe === classe.name && (
                          <div className="absolute inset-0 border-4 border-purple-500 rounded-xl">
                            <div className="absolute inset-0 bg-purple-500/10 animate-pulse" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-purple-200 mb-2">Difficulté</label>
                <div className="flex gap-4">
                  {['Normal', 'Difficile', 'Expert'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setFormData(prev => ({ ...prev, difficulty: diff }))}
                      className={`px-4 py-2 border rounded-lg transition-all duration-300
                        ${formData.difficulty === diff
                          ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                          : 'border-purple-500/30 text-gray-300 hover:border-purple-500/60 hover:bg-purple-500/5'}`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowNewGame(false)}
                className="flex-1 px-6 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
              >
                Annuler
              </button>
              <button
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                onClick={() => {
                  // Ici, vous pouvez ajouter la logique pour démarrer une nouvelle partie
                  console.log('Nouvelle partie :', formData);
                  setShowNewGame(false);
                }}
              >
                Commencer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'information */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-xl p-8 max-w-lg w-full border border-purple-500/20">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">À propos de Skystone Legacy</h2>
            <p className="text-gray-300 mb-6">
              Skystone Legacy est un jeu de rôle fantastique où vous explorez un monde d'îles flottantes,
              découvrez des cristaux magiques et forgez votre propre légende.
            </p>
            <button
              onClick={() => setShowInfo(false)}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
