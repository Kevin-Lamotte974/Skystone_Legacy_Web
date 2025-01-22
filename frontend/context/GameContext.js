import { createContext, useContext, useReducer } from 'react';

const initialState = {
    playerCards: [],
    deckCards: [],
    isLoading: true,
    player: null,
    enemy: null,
    enemyDeck: [],
    enemyHand: [],
    turn: 'player',
    turnNumber: 1,
    selectedCard: null,
    isCombatStarted: false,
    isVictory: false,
    currentStory: null,
    showStory: true,
    storyData: []
};

const GameContext = createContext();

export function useGameContext() {
    return useContext(GameContext);
}

function gameReducer(state, action) {
    switch (action.type) {
        case 'SET_GAME_DATA':
            return { ...state, ...action.payload };
            
        case 'UPDATE_PLAYER':
            return {
                ...state,
                player: { ...state.player, ...action.payload }
            };
            
        case 'UPDATE_ENEMY':
            return {
                ...state,
                enemy: { ...state.enemy, ...action.payload }
            };
            
        case 'PLAY_CARD':
            const { card } = action.payload;
            return {
                ...state,
                playerCards: state.playerCards.filter(c => c.id !== card.id),
                player: {
                    ...state.player,
                    energy: state.player.energy - card.energy_cost
                }
            };

        case 'DRAW_CARD':
            if (state.deckCards.length === 0) return state;
            return {
                ...state,
                playerCards: [...state.playerCards, ...state.deckCards.slice(0, action.payload)],
                deckCards: state.deckCards.slice(action.payload)
            };

        case 'DRAW_ENEMY_CARD':
            if (state.enemyDeck.length === 0) return state;
            return {
                ...state,
                enemyHand: [...state.enemyHand, ...state.enemyDeck.slice(0, action.payload)],
                enemyDeck: state.enemyDeck.slice(action.payload)
            };

        case 'PLAY_ENEMY_CARD':
            return {
                ...state,
                enemyHand: state.enemyHand.filter(c => c.id !== action.payload.id),
                enemy: {
                    ...state.enemy,
                    energy: state.enemy.energy - action.payload.energy_cost
                }
            };
            
        default:
            return state;
    }
}

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}
