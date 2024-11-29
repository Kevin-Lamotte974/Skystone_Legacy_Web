import { useState, useEffect } from 'react';
import '../../styles/pages/Home.css';
import '../../styles/components/FloatingIslands.css';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    // Gestion du chargement initial
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Gestion du responsive
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestionnaires d'événements pour les boutons
  const handleStartGame = () => {
    console.log('Démarrage du jeu...');
    alert('Démarrage d\'une nouvelle aventure !');
  };

  const handleContinueGame = () => {
    console.log('Chargement de la partie...');
    alert('Chargement de la dernière sauvegarde...');
  };

  const handleOptions = () => {
    console.log('Ouverture des options...');
    alert('Menu des options');
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    console.log('Son ' + (!isSoundOn ? 'activé' : 'désactivé'));
  };

  return (
    <div className="game-container">
      {isLoading ? (
        <div className="loading-screen">
          <div className="crystal-loader"></div>
          <p>Chargement de Skystone Legacy...</p>
        </div>
      ) : (
        <>
          <div className="animated-background">
            <div className="floating-islands">
              <div className="island island-1">
                <div className="island-shadow"></div>
                <div className="island-base"></div>
                <div className="island-grass"></div>
                <div className="island-vegetation">
                  <div className="vegetation-detail"></div>
                  <div className="vegetation-detail"></div>
                  <div className="tree"></div>
                  <div className="tree"></div>
                </div>
                <div className="island-crystal"></div>
              </div>

              <div className="island island-2">
                <div className="island-shadow"></div>
                <div className="island-base"></div>
                <div className="island-grass"></div>
                <div className="island-vegetation">
                  <div className="vegetation-detail"></div>
                  <div className="vegetation-detail"></div>
                  <div className="tree"></div>
                </div>
                <div className="island-crystal"></div>
              </div>

              <div className="island island-3">
                <div className="island-shadow"></div>
                <div className="island-base"></div>
                <div className="island-grass"></div>
                <div className="island-vegetation">
                  <div className="vegetation-detail"></div>
                  <div className="tree"></div>
                </div>
                <div className="island-crystal"></div>
              </div>
            </div>
            <div className="crystals"></div>
          </div>

          <div className="content-wrapper">
            <div className="game-logo">
              <h1 className="title">Skystone Legacy</h1>
              <p className="subtitle">
                {isMobile ? "L'aventure commence" : "Un monde d'aventures vous attend"}
              </p>
            </div>

            <div className="main-menu">
              <button 
                className="menu-button start-button"
                onClick={handleStartGame}
              >
                {isMobile ? "Jouer" : "Nouvelle Aventure"}
              </button>
              <button 
                className="menu-button load-button"
                onClick={handleContinueGame}
              >
                Continuer
              </button>
              <button 
                className="menu-button options-button"
                onClick={handleOptions}
              >
                Options
              </button>
            </div>

            {!isMobile && (
              <div className="info-panel">
                <div className="news-ticker">
                  <p>Dernières nouvelles : La mise à jour "Les Cristaux Perdus" arrive bientôt !</p>
                </div>
              </div>
            )}

            <div className="footer-controls">
              <button 
                className="sound-toggle"
                onClick={toggleSound}
              >
                {isSoundOn ? '🔊' : '🔈'}
              </button>
              <span className="credits">v1.0 | &copy; 2024 Skystone Legacy</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
