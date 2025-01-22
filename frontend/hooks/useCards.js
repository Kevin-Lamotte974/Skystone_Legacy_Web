import { useGameContext } from '../context/GameContext';
import { isCardPlayable, shuffleDeck } from '../utils/cardUtils';

export function useCards() {
    const { state, dispatch } = useGameContext();
    const MAX_HAND_SIZE = 10;

    const drawCards = (amount) => {
        if (state.deckCards.length === 0) return;
        
        const spaceInHand = MAX_HAND_SIZE - state.playerCards.length;
        const cardsToDraw = Math.min(amount, state.deckCards.length, spaceInHand);

        if (cardsToDraw <= 0) return;

        dispatch({
            type: 'SET_GAME_DATA',
            payload: {
                playerCards: [...state.playerCards, ...state.deckCards.slice(0, cardsToDraw)],
                deckCards: state.deckCards.slice(cardsToDraw)
            }
        });
    };

    const playCard = async (card) => {
        if (!isCardPlayable(card, state.player)) return;
        
        dispatch({
            type: 'PLAY_CARD',
            payload: card
        });
        
        // Gérer les effets de la carte
        if (card.damage_base > 0) {
            const newHealth = Math.max(0, state.enemy.health - card.damage_base);
            dispatch({
                type: 'SET_GAME_DATA',
                payload: {
                    enemy: { ...state.enemy, health: newHealth },
                    isVictory: newHealth <= 0
                }
            });
        }
    };

    return {
        drawCards,
        playCard,
        shuffleDeck,
        isCardPlayable: (card) => isCardPlayable(card, state.player)
    };
}
