import { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

export function useStory() {
    const { state, dispatch } = useGameContext();
    const [currentStory, setCurrentStory] = useState(null);

    useEffect(() => {
        loadStory();
    }, []);

    const loadStory = async () => {
        try {
            const response = await fetch('/assets/data/story.json');
            const data = await response.json();
            setCurrentStory(data[0]);
            dispatch({ 
                type: 'SET_GAME_DATA', 
                payload: { 
                    storyData: data,
                    showStory: true
                } 
            });
        } catch (error) {
            console.error('Erreur lors du chargement de l\'histoire:', error);
        }
    };

    const handleChoice = (choice) => {
        if (choice.fight) {
            // Initialiser le combat
            dispatch({ 
                type: 'SET_GAME_DATA', 
                payload: { 
                    showStory: false,
                    isCombatStarted: true,
                    // Réinitialiser l'énergie pour le début du combat
                    player: {
                        ...state.player,
                        energy: 3
                    },
                    enemy: {
                        ...state.enemy,
                        energy: 3
                    }
                } 
            });
            return;
        }

        const nextScene = state.storyData.find(scene => scene.id === choice.next);
        if (nextScene) {
            setCurrentStory(nextScene);
        }
    };

    return {
        currentStory,
        handleChoice,
        loadStory
    };
}
