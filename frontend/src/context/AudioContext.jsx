import { createContext, useContext, useState, useEffect } from 'react';
import menuMusic from '../assets/sound/Brylie Christopher Oxley - Persist.mp3';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [musicVolume, setMusicVolume] = useState(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved ? parseFloat(saved) : 0.8;
  });
  const [audio] = useState(new Audio(menuMusic));

  useEffect(() => {
    audio.loop = true;
    audio.volume = musicVolume;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    audio.volume = musicVolume;
    localStorage.setItem('musicVolume', musicVolume);
  }, [musicVolume, audio]);

  const playMusic = () => {
    audio.play().catch(error => {
      console.log("Lecture automatique bloquée :", error);
    });
  };

  const pauseMusic = () => {
    audio.pause();
  };

  const setVolume = (volume) => {
    setMusicVolume(volume);
  };

  return (
    <AudioContext.Provider value={{ musicVolume, setVolume, playMusic, pauseMusic }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
