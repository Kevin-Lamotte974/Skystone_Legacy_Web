import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';
import '../../styles/pages/Home.css';
import '../../styles/components/Buttons.css';
import '../../styles/components/Background.css';
import '../../styles/components/InfoModal.css';
import skystone_logo from '../../assets/logo/Crystal_Skystone_Legacy.png';

function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showDroidModal, setShowDroidModal] = useState(false);
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { playMusic } = useAudio();

  useEffect(() => {
    // Démarrer la musique
    playMusic();
    
    // Charger les données du personnage
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    }

    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [playMusic]);

  const handleMenuClick = (action) => {
    if (action === 'Info') {
      setShowInfo(true);
    } else {
      setAlertMessage(`${action} à venir !`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleDroidClick = () => {
    if (character) {
      setShowDroidModal(true);
    } else {
      setAlertMessage('Aucun droïde créé. Commencez une nouvelle partie !');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const getClassDescription = (className) => {
    const classes = {
      warrior: 'Maître du combat rapproché',
      mage: 'Manipulateur des arcanes',
      archer: 'Expert du combat à distance',
      rogue: 'Maître de la furtivité'
    };
    return classes[className] || '';
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
        </div>

        <div className="home-content">
          <div 
            className="droid-icon-container"
            onClick={handleDroidClick}
            style={{ cursor: 'pointer' }}
          >
            <svg 
              className="droid-icon"
              viewBox="0 0 100 100" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fond lumineux */}
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                className="droid-glow"
              />
              {/* Corps principal */}
              <circle 
                cx="50" 
                cy="50" 
                r="35" 
                className="droid-body"
              />
              {/* Antennes */}
              <line 
                x1="35" 
                y1="15" 
                x2="35" 
                y2="5" 
                className="droid-antenna"
              />
              <line 
                x1="65" 
                y1="15" 
                x2="65" 
                y2="5" 
                className="droid-antenna"
              />
              {/* Œil principal */}
              <circle 
                cx="50" 
                cy="40" 
                r="12" 
                className="droid-eye"
              />
              {/* Œil interne */}
              <circle 
                cx="50" 
                cy="40" 
                r="6" 
                className="droid-eye-inner"
              />
              {/* Détails du corps */}
              <path 
                d="M30 60 Q50 80 70 60" 
                className="droid-detail"
                fill="none"
              />
              <line 
                x1="30" 
                y1="50" 
                x2="70" 
                y2="50" 
                className="droid-detail"
              />
            </svg>
          </div>

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
            onClick={() => navigate('/character-creation')}
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
            data-action="join-game"
            onClick={() => handleMenuClick('Join Game')}
          >
            Rejoindre une partie
          </button>
          <button 
            className="menu-button"
            data-action="options"
            onClick={() => navigate('/options')}
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

      {showAlert && (
        <div className="custom-alert">
          {alertMessage}
        </div>
      )}

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

      {showDroidModal && character && (
        <div className="droid-modal">
          <div className="droid-modal-content">
            <button className="close-modal" onClick={() => setShowDroidModal(false)}>×</button>
            <h2>Profil du Droïde</h2>
            <div className="droid-info">
              <div className="droid-name">
                <span className="info-label">Nom:</span>
                <span className="info-value">{character.name}</span>
              </div>
              <div className="droid-class">
                <span className="info-label">Classe:</span>
                <span className="info-value">
                  {character.class.charAt(0).toUpperCase() + character.class.slice(1)}
                </span>
              </div>
              <div className="droid-description">
                <span className="info-label">Spécialisation:</span>
                <span className="info-value">{getClassDescription(character.class)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
