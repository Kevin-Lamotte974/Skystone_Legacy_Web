export const shuffleDeck = (deck) => {
    return [...deck].sort(() => Math.random() - 0.5);
};

export const getCardRarity = (rarity) => {
    switch (rarity.toLowerCase()) {
        case 'commune':
            return 'common-card';
        case 'épique':
            return 'epic-card';
        default:
            return 'bg-gray-200 text-gray-600 border-gray-300';
    }
};

export const isCardPlayable = (card, player) => {
    if (card.energy_cost > player.energy) return false;
    const requiredStats = card.stats || {};
    return Object.entries(requiredStats).every(([stat, value]) =>
        player[stat.toLowerCase()] >= value
    );
};
