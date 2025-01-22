import React from 'react';

export default function Deck({ cardsCount }) {
    return (
        <div className="relative w-24 h-36 bg-purple-900/20 rounded-lg border-2 border-purple-500/30">
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-purple-300">
                    {cardsCount}
                </span>
            </div>
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-0 w-full h-full bg-purple-900/20 rounded-lg border-2 border-purple-500/30"
                    style={{ transform: `rotate(${i * 4}deg)` }}
                />
            ))}
        </div>
    );
}
