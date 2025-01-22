import React from 'react';

export default function TurnIndicator({ turn, turnNumber }) {
    return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-purple-500/20">
            <div className="text-center">
                <span className="text-purple-300 font-bold">Tour {turnNumber}</span>
                <div className={`text-lg font-bold ${turn === 'player' ? 'text-blue-400' : 'text-red-400'}`}>
                    {turn === 'player' ? 'Votre Tour' : 'Tour Ennemi'}
                </div>
            </div>
        </div>
    );
}
