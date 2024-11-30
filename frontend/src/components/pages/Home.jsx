import { useState, useEffect } from 'react';
import '../../styles/pages/Home.css';
import '../../styles/components/MenuButtons.css';
import '../../styles/components/ModernBackground.css';
import skystone_logo from '../../assets/logo/Crystal_Skystone_Legacy.png';

function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleMenuClick = (action) => {
    setAlertMessage(`${action} coming soon!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="game-container">
      <div className="game-background">
        <div className="crystal-overlay"></div>
      </div>
      
      <div className="content-wrapper">
        <div className="game-logo">
          <img src={skystone_logo} alt="Skystone Legacy" className="menu-logo" />
          <h1 className="title">Skystone Legacy</h1>
          <p className="subtitle">A Crystal Adventure</p>
        </div>

        <div className="menu-container">
          <button 
            className="menu-button"
            onClick={() => handleMenuClick('New Game')}
          >
            New Game
          </button>
          <button 
            className="menu-button"
            onClick={() => handleMenuClick('Continue')}
          >
            Continue
          </button>
          <button 
            className="menu-button"
            onClick={() => handleMenuClick('Settings')}
          >
            Settings
          </button>
          <button 
            className="menu-button"
            onClick={() => handleMenuClick('Credits')}
          >
            Credits
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="custom-alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default Home;
