import React from 'react';
import { useGameContext } from '../context/GameContext';
import { useGameState } from '../hooks/useGameState';
import { useCombat } from '../hooks/useCombat';
import { useMusic } from '../hooks/useMusic';
import { useStory } from '../hooks/useStory';

import TurnIndicator from './game/TurnIndicator';
import PlayerStats from './game/PlayerStats';
import CardHand from './game/CardHand';
import HealthBar from './game/HealthBar';
import Deck from './game/Deck';
import StoryOverlay from './game/StoryOverlay';
import VictoryOverlay from './game/VictoryOverlay';
import Character from './game/Character';

const Game = () => {
    const { state } = useGameContext();
    const { gamePhase, initializeGame } = useGameState();
    const { playCard, endPlayerTurn } = useCombat();
    const { currentStory, handleChoice } = useStory();
    useMusic(state.isCombatStarted);

    React.useEffect(() => {
        initializeGame();
    }, []);

    // Ajout d'une vérification de débogage
    React.useEffect(() => {
        console.log('Story state:', { currentStory, showStory: state.showStory });
    }, [currentStory, state.showStory]);

    if (state.isLoading || !state.player) {
        return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            Chargement du jeu...
        </div>;
    }

    // Modification de la condition pour afficher l'histoire
    if (!state.isCombatStarted && (state.showStory || currentStory)) {
        return (
            <div className="min-h-screen bg-gray-900 text-white relative">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(/assets/images/background/intro_bg.png)',
                        opacity: '0.8',
                        zIndex: 0
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80"
                    style={{ zIndex: 1 }}
                />
                <StoryOverlay currentStory={currentStory} onChoiceSelect={handleChoice} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white relative">
            {state.isVictory && <VictoryOverlay />}
            {state.showStory && currentStory && 
                <StoryOverlay currentStory={currentStory} onChoiceSelect={handleChoice} />}

            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/assets/images/background/intro_bg.png)',
                    opacity: '0.8',
                    zIndex: 0
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80"
                style={{ zIndex: 1 }}
            />

            <div className="relative z-10">
                <TurnIndicator turn={state.turn} turnNumber={state.turnNumber} />

                <div className="h-[calc(100vh-120px)] relative">
                    {/* Player */}
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 transform">
                        <HealthBar currentHealth={state.player.health} maxHealth={state.player.maxHealth} />
                        <Character 
                            isPlayer={true}
                            health={state.player.health}
                            maxHealth={state.player.maxHealth}
                            state={state.playerState}
                        />
                    </div>

                    {/* Enemy */}
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 transform">
                        <HealthBar currentHealth={state.enemy.health} maxHealth={state.enemy.maxHealth} isEnemy />
                        <Character 
                            isPlayer={false}
                            health={state.enemy.health}
                            maxHealth={state.enemy.maxHealth}
                            state={state.enemyState}
                        />
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0">
                    <PlayerStats 
                        player={state.player}
                        cardsInHand={state.playerCards.length}
                        maxHandSize={10}
                    />

                    <CardHand 
                        cards={state.playerCards}
                        onCardPlay={playCard}
                    />
                </div>

                {state.turn === 'player' && (
                    <div className="fixed bottom-4 right-0 flex justify-center items-center w-48 gap-10">
                        <div className='flex flex-col items-center'>
                            <Deck cardsCount={state.deckCards.length} />
                            <button
                                onClick={endPlayerTurn}
                                className="w-36 px-6 py-3 mt-4 bg-purple-600 text-white rounded-lg 
                                         hover:bg-purple-500 transition-all duration-300 transform hover:scale-105
                                         border-2 border-purple-400"
                            >
                                Fin du Tour
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;
