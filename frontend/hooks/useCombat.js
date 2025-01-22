import { useGameContext } from '../context/GameContext';
import { TURN_STATES, ANIMATION_DURATIONS } from '../utils/constants';
import { applyCardEffect, findPlayableCards, animateCardPlay } from '../utils/combatUtils';
import { isCardPlayable } from '../utils/cardUtils';

export function useCombat() {
    const { state, dispatch } = useGameContext();

    const startPlayerTurn = () => {
        // Pioche une carte à chaque tour sauf le premier
        if (state.turnNumber >= 1) {
            dispatch({ type: 'DRAW_CARD', payload: 1 });
        }

        dispatch({
            type: 'SET_GAME_DATA',
            payload: {
                turn: 'player',
                turnNumber: state.turnNumber + 1,
                player: {
                    ...state.player,
                    energy: Math.min(state.player.maxEnergy, state.player.energy + 1)
                }
            }
        });
    };

    const playCard = async (card) => {
        // Vérifier si la carte est jouable
        if (!isCardPlayable(card, state.player)) {
            console.log("Carte non jouable: énergie insuffisante ou stats requises non atteintes");
            return;
        }

        // Set attacking animation
        dispatch({
            type: 'SET_GAME_DATA',
            payload: { playerState: 'attacking' }
        });

        // Animation de la carte
        const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);
        if (cardElement) {
            cardElement.classList.add('card-vanishing');
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Appliquer les dégâts/soins
        if (card.damage_base > 0) {
            // Set enemy hurt animation
            dispatch({
                type: 'SET_GAME_DATA',
                payload: { enemyState: 'hurt' }
            });

            const newHealth = Math.max(0, state.enemy.health - card.damage_base);
            dispatch({
                type: 'SET_GAME_DATA',
                payload: {
                    enemy: { ...state.enemy, health: newHealth },
                    isVictory: newHealth <= 0,
                    enemyState: 'idle'
                }
            });
        } else if (card.damage_base < 0) {
            const healing = Math.abs(card.damage_base);
            dispatch({
                type: 'SET_GAME_DATA',
                payload: {
                    player: {
                        ...state.player,
                        health: Math.min(state.player.maxHealth, state.player.health + healing)
                    }
                }
            });
        }

        // Déduire l'énergie et retirer la carte
        dispatch({
            type: 'SET_GAME_DATA',
            payload: {
                player: {
                    ...state.player,
                    energy: state.player.energy - card.energy_cost
                },
                playerCards: state.playerCards.filter(c => c.id !== card.id)
            }
        });
    };

    const endPlayerTurn = () => {
        dispatch({ type: 'SET_GAME_DATA', payload: { turn: TURN_STATES.ENEMY } });
        setTimeout(executeEnemyTurn, ANIMATION_DURATIONS.TURN_TRANSITION);
    };

    const executeEnemyTurn = async () => {
        // Augmenter l'énergie de l'ennemi
        dispatch({
            type: 'UPDATE_ENEMY',
            payload: {
                energy: Math.min(state.enemy.maxEnergy, state.enemy.energy + 1)
            }
        });

        // Piocher une carte sauf au premier tour
        if (state.turnNumber > 1) {
            dispatch({ type: 'DRAW_ENEMY_CARD', payload: 1 });
        }

        await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATIONS.ENEMY_TURN));

        // Trouver et jouer une carte si possible
        const playableCards = state.enemyHand.filter(card => card.energy_cost <= state.enemy.energy);
        if (playableCards.length > 0) {
            await playEnemyCard(playableCards[0]);
        }

        // Passer au tour du joueur
        setTimeout(startPlayerTurn, ANIMATION_DURATIONS.TURN_TRANSITION);
    };

    const playEnemyCard = async (card) => {
        // Set enemy attacking animation
        dispatch({
            type: 'SET_GAME_DATA',
            payload: { enemyState: 'attacking' }
        });

        // Animation de la carte ennemie
        await new Promise(resolve => setTimeout(resolve, 500));

        if (card.damage_base > 0) {
            // Set player hurt animation
            dispatch({
                type: 'SET_GAME_DATA',
                payload: { playerState: 'hurt' }
            });

            const newHealth = Math.max(0, state.player.health - card.damage_base);
            dispatch({
                type: 'SET_GAME_DATA',
                payload: {
                    player: { 
                        ...state.player, 
                        health: newHealth,
                        playerState: 'idle'
                    }
                }
            });
        }

        // Retirer la carte et l'énergie
        dispatch({ 
            type: 'PLAY_ENEMY_CARD', 
            payload: card 
        });
    };

    return {
        startPlayerTurn,
        playCard,
        endPlayerTurn,
        executeEnemyTurn
    };
}
