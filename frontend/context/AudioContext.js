import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentTrack: null,
  });

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playMusic = (trackName) => {
    console.log('Playing music:', trackName); // Debug log
    if (audioRef.current) {
      audioRef.current.src = `/audio/${trackName}`;
      audioRef.current.play()
        .then(() => {
          setAudioState({
            isPlaying: true,
            currentTrack: trackName,
          });
        })
        .catch(error => console.error('Audio play error:', error));
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const value = {
    audioState,
    playMusic,
    pauseMusic,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};