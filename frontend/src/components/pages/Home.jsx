import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';
import skystone_logo from '../../assets/logo/Crystal_Skystone_Legacy.png';

function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);
  const navigate = useNavigate();
  const { playMusic } = useAudio();

  const handleLogout = () => {
    // Ici vous pouvez ajouter la logique de déconnexion (clear token, etc.)
    navigate('/auth');
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
            <div className="relative mb-8 group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
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
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Plongez dans un univers mystique où les îles flottantes abritent des secrets millénaires. 
              Devenez le héros d'une légende où chaque cristal raconte une histoire.
            </p>
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
              onClick={() => setShowOptions(true)}
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

      {/* Modal Options */}
      {showOptions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-xl p-8 max-w-lg w-full border border-purple-500/20">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Options</h2>
            
            {/* Options de jeu */}
            <div className="space-y-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-3">Audio</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Musique</span>
                    <input type="range" className="w-48 accent-purple-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Effets sonores</span>
                    <input type="range" className="w-48 accent-purple-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-3">Graphismes</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Qualité des effets</span>
                    <select className="bg-[#2a2a2a] border border-purple-500/30 rounded-lg px-4 py-2 text-gray-300">
                      <option>Basse</option>
                      <option>Moyenne</option>
                      <option>Haute</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowOptions(false)}
                className="flex-1 px-6 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
              >
                Fermer
              </button>
              <button
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nouvelle Partie */}
      {showNewGame && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-xl p-8 max-w-lg w-full border border-purple-500/20">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Nouvelle Partie</h2>
            
            <div className="space-y-6 mb-6">
              <div>
                <label className="block text-purple-200 mb-2">Nom du personnage</label>
                <input
                  type="text"
                  className="w-full bg-[#2a2a2a] border border-purple-500/30 rounded-lg px-4 py-2 text-gray-300 focus:border-purple-500 focus:outline-none"
                  placeholder="Entrez le nom de votre héros"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2">Classe</label>
                <select className="w-full bg-[#2a2a2a] border border-purple-500/30 rounded-lg px-4 py-2 text-gray-300">
                  <option>Guerrier</option>
                  <option>Mage</option>
                  <option>Archer</option>
                  <option>Assassin</option>
                </select>
              </div>

              <div>
                <label className="block text-purple-200 mb-2">Difficulté</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Normal', 'Difficile', 'Expert'].map((diff) => (
                    <button
                      key={diff}
                      className="px-4 py-2 border border-purple-500/30 rounded-lg text-gray-300 hover:bg-purple-500/10 transition-colors"
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowNewGame(false)}
                className="flex-1 px-6 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
              >
                Annuler
              </button>
              <button
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-colors"
              >
                Commencer l'aventure
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
