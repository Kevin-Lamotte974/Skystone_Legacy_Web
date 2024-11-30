import { useState, useEffect } from 'react';
import '../../styles/pages/Home.css';
import '../../styles/components/FloatingIslands.css';
import '../../styles/components/MenuButtons.css';
import skystone_logo from '../../assets/logo/Crystal_Skystone_Legacy.png';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [customAlert, setCustomAlert] = useState({ show: false, message: '' });

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

  const showCustomAlert = (message) => {
    setCustomAlert({ show: true, message });
    setTimeout(() => {
      setCustomAlert({ show: false, message: '' });
    }, 3000);
  };

  // Gestionnaires d'événements pour les boutons
  const handleStartGame = () => {
    console.log('Démarrage du jeu...');
    showCustomAlert('Démarrage d\'une nouvelle aventure !');
  };

  const handleContinueGame = () => {
    console.log('Chargement de la partie...');
    showCustomAlert('Chargement de la dernière sauvegarde...');
  };

  const handleOptions = () => {
    console.log('Ouverture des options...');
    showCustomAlert('Menu des options');
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    console.log('Son ' + (!isSoundOn ? 'activé' : 'désactivé'));
  };

  return (
    <div className="game-container">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-text">Chargement...</div>
          <img src={skystone_logo} alt="Skystone Legacy" className="loading-logo" />
        </div>
      ) : (
        <>
          <div className="animated-background">
            <div className="modern-grid"></div>
            <div className="particles"></div>
            <div className="background-waves"></div>
            <div className="light-effect"></div>
            <div className="crystals"></div>
          </div>

          <button className="info-button" onClick={() => setShowInfo(true)}>
            <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </button>

          {showInfo && (
            <div className="info-modal">
              <div className="info-content">
                <h2>
                  <svg className="title-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
                  </svg>
                  Bienvenue dans Skystone Legacy
                </h2>
                <div className="info-section">
                  <h3>
                    <svg className="section-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    L'Univers
                  </h3>
                  <p>Plongez dans un monde fantastique où des îles flottantes abritent une civilisation ancienne. 
                  Les vestiges d'une technologie oubliée et la magie s'entremêlent dans ce royaume céleste.</p>
                </div>
                <div className="info-section">
                  <h3>
                    <svg className="section-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Votre Rôle
                  </h3>
                  <p>En tant qu'aventurier, explorez les îles, découvrez des artefacts anciens, 
                  et dévoilez les mystères des Anciens. Développez vos compétences, forgez des alliances, 
                  et écrivez votre propre légende.</p>
                </div>
                <div className="info-section">
                  <h3>
                    <svg className="section-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
                    </svg>
                    Système de Jeu
                  </h3>
                  <ul>
                    <li>
                      <svg className="list-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Exploration libre des îles flottantes
                    </li>
                    <li>
                      <svg className="list-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Combats stratégiques au tour par tour
                    </li>
                    <li>
                      <svg className="list-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Système de craft et de progression
                    </li>
                    <li>
                      <svg className="list-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Quêtes dynamiques et histoire évolutive
                    </li>
                  </ul>
                </div>
                <button className="close-button" onClick={() => setShowInfo(false)}>
                  <svg className="close-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="content-wrapper">
            <div className="game-logo">
              <img src={skystone_logo} alt="Skystone Legacy" className="menu-logo" />
              <h1 className="title">Skystone Legacy</h1>
              <p className="subtitle">
                {isMobile ? "L'aventure commence" : "Un monde d'aventures vous attend"}
              </p>
            </div>

            <div className="menu-container">
              <button className="menu-button" onClick={handleStartGame}>
                Nouvelle Aventure
              </button>
              <button className="menu-button" onClick={handleContinueGame}>
                Continuer
              </button>
              <button className="menu-button" onClick={handleOptions}>
                Options
              </button>
            </div>
          </div>

          {customAlert.show && (
            <div className="custom-alert">
              <div className="alert-content">
                {customAlert.message}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
