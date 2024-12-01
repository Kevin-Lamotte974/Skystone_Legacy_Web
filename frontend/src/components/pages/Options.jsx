import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';
import '../../styles/pages/Options.css';

function Options() {
  const navigate = useNavigate();
  const { musicVolume, setVolume } = useAudio();
  const [settings, setSettings] = useState({
    sfxVolume: 100,
    graphicsQuality: 'high',
    language: 'fr',
    difficulty: 'normal'
  });

  const handleVolumeChange = (type, value) => {
    if (type === 'musicVolume') {
      setVolume(value / 100);
    } else {
      setSettings(prev => ({
        ...prev,
        [type]: value
      }));
    }
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    navigate('/');
  };

  return (
    <div className="options-container">
      <div className="options-background">
        <div className="crystal-stars"></div>
        <div className="crystal-grid"></div>
        <div className="crystal-particles"></div>
        <div className="crystal-glow"></div>
      </div>

      <div className="options-content">
        <h1 className="options-title">Options</h1>

        <div className="options-section">
          <h2>Audio</h2>
          <div className="option-item">
            <label>Musique</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={musicVolume * 100}
              onChange={(e) => handleVolumeChange('musicVolume', parseInt(e.target.value))}
              className="slider"
            />
            <span>{Math.round(musicVolume * 100)}%</span>
          </div>

          <div className="option-item">
            <label>Effets Sonores</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.sfxVolume}
              onChange={(e) => handleVolumeChange('sfxVolume', parseInt(e.target.value))}
              className="slider"
            />
            <span>{settings.sfxVolume}%</span>
          </div>
        </div>

        <div className="options-section">
          <h2>Graphismes</h2>
          <div className="option-item">
            <label>Qualité</label>
            <select 
              value={settings.graphicsQuality}
              onChange={(e) => handleSettingChange('graphicsQuality', e.target.value)}
              className="select-box"
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </div>
        </div>

        <div className="options-section">
          <h2>Jeu</h2>
          <div className="option-item">
            <label>Langue</label>
            <select 
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="select-box"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="option-item">
            <label>Difficulté</label>
            <select 
              value={settings.difficulty}
              onChange={(e) => handleSettingChange('difficulty', e.target.value)}
              className="select-box"
            >
              <option value="easy">Facile</option>
              <option value="normal">Normal</option>
              <option value="hard">Difficile</option>
            </select>
          </div>
        </div>

        <div className="options-buttons">
          <button className="option-button save-button" onClick={handleSave}>
            Sauvegarder
          </button>
          <button className="option-button back-button" onClick={() => navigate('/')}>
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default Options;
