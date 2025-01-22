import React from 'react';
import HealthBar from './HealthBar';
import EnergyDisplay from './EnergyDisplay';

export default function PlayerStats({ player, cardsInHand, maxHandSize }) {
    return (
        <div className="absolute left-8 bottom-24 bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
            <div className="mb-4">
                <HealthBar currentHealth={player.health} maxHealth={player.maxHealth} />
            </div>
            
            <EnergyDisplay currentEnergy={player.energy} maxEnergy={player.maxEnergy} />

            <div className="mt-2 text-sm text-gray-300">
                Cartes en main: 
                <span className={`font-bold ${cardsInHand === maxHandSize ? 'text-red-400' : 'text-blue-400'}`}>
                    {cardsInHand}/{maxHandSize}
                </span>
            </div>
        </div>
    );
}
