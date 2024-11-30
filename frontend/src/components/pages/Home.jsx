import { useState, useEffect } from 'react';
import '../../styles/pages/Home.css';
import '../../styles/components/Buttons.css';
import '../../styles/components/Background.css';
import '../../styles/components/InfoModal.css';
import skystone_logo from '../../assets/logo/Crystal_Skystone_Legacy.png';

function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = (action) => {
    if (action === 'Info') {
      setShowInfo(true);
    } else {
      setAlertMessage(`${action} à venir !`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <img src={skystone_logo} alt="Loading..." className="loading-logo" />
        <div className="loading-text">Chargement...</div>
        <div className="loading-bar"></div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-background">
        <div className="crystal-stars"></div>
        <div className="crystal-grid"></div>
        <div className="crystal-particles"></div>
        <div className="crystal-glow"></div>
      </div>
      
      <div className="content-wrapper">
        <div className="game-logo">
          <img src={skystone_logo} alt="Skystone Legacy" className="menu-logo" />
          <h1 className="title">Skystone Legacy</h1>
          <p className="subtitle">
            <span className="subtitle-text">Forgez Votre Dynastie de Cristal</span>
            <span className="subtitle-decoration">✧</span>
          </p>
        </div>

        <div className="menu-container">
          <button 
            className="menu-button"
            data-action="new-game"
            onClick={() => handleMenuClick('New Game')}
          >
            Nouvelle Partie
          </button>
          <button 
            className="menu-button"
            data-action="continue"
            onClick={() => handleMenuClick('Continue')}
          >
            Continuer
          </button>
          <button 
            className="menu-button"
            data-action="options"
            onClick={() => handleMenuClick('Settings')}
          >
            Options
          </button>
        </div>
      </div>

      <button 
        className="info-button"
        onClick={() => handleMenuClick('Info')}
        aria-label="Informations"
      >
        <span className="info-icon">ⓘ</span>
      </button>

      {showInfo && (
        <div className="info-modal">
          <div className="info-modal-content">
            <button className="close-modal" onClick={() => setShowInfo(false)}>×</button>
            <h1>🌟 Skystone Legacy Web</h1>
            
            <section>
              <h2>📝 Description</h2>
              <p>
                <strong>Skystone Legacy Web</strong> est une application web interactive développée avec un backend en 
                <strong>Django</strong> et un frontend en <strong>React</strong>. Le projet repose sur une architecture moderne 
                et modulaire, offrant une base solide pour une expérience web fluide et scalable.
              </p>
            </section>

            <section>
              <h2>🌍 Histoire</h2>
              <p>
                Dans un monde fragmenté par un cataclysme inconnu, des îles volantes flottent dans le ciel, 
                chacune abritant des mystères, des créatures uniques et des vestiges d'une civilisation disparue. 
                Les joueurs incarnent des explorateurs de la guilde des <strong>"Fragments"</strong>, 
                voyageant entre les îles à bord de navires volants pour collecter des cristaux anciens. 
                Ces cristaux, dotés d'une énergie mystérieuse, pourraient détenir la clé pour restaurer 
                le monde ou découvrir les causes du cataclysme.
              </p>
            </section>

            <section>
              <h2>✨ Caractéristiques principales</h2>
              <ul>
                <li><strong>Frontend</strong> : Interface utilisateur dynamique créée avec React.js</li>
                <li><strong>Backend</strong> : API REST robuste gérée avec Django et Django REST Framework</li>
                <li><strong>Exploration</strong> : Parcourez des îles flottantes, relevez des défis uniques et affrontez des factions rivales</li>
              </ul>
            </section>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="custom-alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default Home;
