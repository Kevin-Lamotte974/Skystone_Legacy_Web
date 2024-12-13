import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';
import './Options.css';

function Options() {
  const navigate = useNavigate();
  const { musicVolume, setVolume, isPlaying, playMusic, pauseMusic } = useAudio();

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <div className="options-container">
      <div className="options-content">
        <h1>Options</h1>
        
        <div className="options-section">
          <h2>Audio</h2>
          <div className="audio-controls">
            <button 
              onClick={toggleMusic}
              className="music-toggle-button"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <div className="volume-control">
              <label htmlFor="volume">Volume de la musique</label>
              <input
                type="range"
                id="volume"
                min="0"
                max="1"
                step="0.01"
                value={musicVolume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
              <span>{Math.round(musicVolume * 100)}%</span>
            </div>
          </div>
        </div>

        <button className="back-button" onClick={() => navigate('/home')}>
          Retour
        </button>
      </div>
    </div>
  );
}

export default Options;
