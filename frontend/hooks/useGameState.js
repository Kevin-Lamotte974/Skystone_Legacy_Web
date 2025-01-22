import { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import { GAME_PHASES } from '../utils/constants';
import { shuffleDeck } from '../utils/cardUtils';

export function useGameState() {
    const { state, dispatch } = useGameContext();
    const [gamePhase, setGamePhase] = useState(GAME_PHASES.LOADING);

    const initializeGame = async () => {
        try {
            const [playerData, enemyData, cardsData] = await Promise.all([
                fetch('/assets/data/player_deck.json').then(r => r.json()),
                fetch('/assets/data/enemy_deck.json').then(r => r.json()),
                fetch('/assets/data/cards.json').then(r => r.json())
            ]);

            const cardsById = cardsData.cards.reduce((acc, card) => {
                acc[card.id] = card;
                return acc;
            }, {});

            const playerDeck = shuffleDeck(
                playerData.initial_deck.map(id => cardsById[id]).filter(Boolean)
            );
            const enemyDeck = shuffleDeck(
                enemyData.initial_deck.map(id => cardsById[id]).filter(Boolean)
            );

            dispatch({
                type: 'SET_GAME_DATA',
                payload: {
                    playerCards: playerDeck.slice(0, 5),
                    deckCards: playerDeck.slice(5),
                    enemyHand: enemyDeck.slice(0, 5),
                    enemyDeck: enemyDeck.slice(5),
                    player: playerData.player_stats,
                    enemy: enemyData.enemy_stats,
                    isLoading: false
                }
            });

            setGamePhase(GAME_PHASES.STORY);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            dispatch({ type: 'SET_GAME_DATA', payload: { isLoading: false } });
        }
    };

    const startCombat = () => {
        // Distribution initiale des cartes au début du combat
        dispatch({
            type: 'SET_GAME_DATA',
            payload: {
                isCombatStarted: true,
                showStory: false,
                playerCards: state.deckCards.slice(0, 5),
                deckCards: state.deckCards.slice(5),
                enemyHand: state.enemyDeck.slice(0, 5),
                enemyDeck: state.enemyDeck.slice(5),
                turn: 'player',
                turnNumber: 1,
                player: {
                    ...state.player,
                    energy: 1
                },
                enemy: {
                    ...state.enemy,
                    energy: 1
                }
            }
        });
    };

    const endGame = (isVictory) => {
        setGamePhase(isVictory ? GAME_PHASES.VICTORY : GAME_PHASES.DEFEAT);
        dispatch({
            type: 'SET_GAME_DATA',
            payload: { isVictory }
        });
    };

    return {
        gamePhase,
        initializeGame,
        startCombat,
        endGame
    };
}
