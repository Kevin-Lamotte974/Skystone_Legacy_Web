import { ANIMATION_DURATIONS } from './constants';

export const calculateDamage = (card, attacker, defender) => {
    let damage = card.damage_base;
    // Ajouter ici la logique pour les bonus/malus basés sur les stats
    return damage;
};

export const applyCardEffect = async (card, source, target, dispatch) => {
    if (card.damage_base > 0) {
        const damage = calculateDamage(card, source, target);
        const newHealth = Math.max(0, target.health - damage);
        
        dispatch({
            type: 'UPDATE_CHARACTER',
            payload: {
                id: target.id,
                health: newHealth
            }
        });

        return newHealth <= 0;
    } else if (card.damage_base < 0) {
        // Healing logic
        const healing = Math.abs(card.damage_base);
        dispatch({
            type: 'UPDATE_CHARACTER',
            payload: {
                id: source.id,
                health: Math.min(source.maxHealth, source.health + healing)
            }
        });
    }

    return false;
};

export const animateCardPlay = async (cardId) => {
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement) {
        cardElement.classList.add('card-vanishing');
        await new Promise(resolve => 
            setTimeout(resolve, ANIMATION_DURATIONS.CARD_VANISH)
        );
    }
};

export const findPlayableCards = (hand, energy) => {
    return hand.filter(card => card.energy_cost <= energy);
};
