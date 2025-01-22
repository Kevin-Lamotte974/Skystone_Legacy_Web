import { useState, useEffect } from 'react';

export function useMusic(shouldPlay) {
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        if (shouldPlay && !audio) {
            const newAudio = new Audio('/assets/audio/tense_pulse_theme.mp3');
            newAudio.loop = true;
            newAudio.volume = 0.5;
            setAudio(newAudio);
        }

        if (shouldPlay && audio) {
            audio.play().catch(error => {
                console.log("Erreur de lecture audio:", error);
            });
        }

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [shouldPlay, audio]);

    return audio;
}
