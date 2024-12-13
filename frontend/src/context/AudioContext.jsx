import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import menuMusic from '../assets/sound/Brylie Christopher Oxley - Persist.mp3';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [musicVolume, setMusicVolume] = useState(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved ? parseFloat(saved) : 0.5;
  });
  const [audio] = useState(() => {
    const newAudio = new Audio(menuMusic);
    newAudio.loop = true;
    return newAudio;
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const setVolume = useCallback((volume) => {
    const newVolume = Math.max(0, Math.min(1, volume));
    setMusicVolume(newVolume);
    audio.volume = newVolume;
    localStorage.setItem('musicVolume', newVolume.toString());
  }, [audio]);

  useEffect(() => {
    audio.volume = musicVolume;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, musicVolume]);

  const playMusic = useCallback(() => {
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(error => {
      console.log("Lecture automatique bloquée :", error);
      setIsPlaying(false);
    });
  }, [audio]);

  const pauseMusic = useCallback(() => {
    audio.pause();
    setIsPlaying(false);
  }, [audio]);

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  return (
    <AudioContext.Provider value={{ 
      musicVolume, 
      setVolume, 
      playMusic, 
      pauseMusic,
      isPlaying 
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
