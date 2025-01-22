import React from 'react';
import Image from 'next/image';

export default function Character({ isPlayer, state }) {
    return (
        <div className={`relative ${isPlayer ? '' : ''}`}>
            <div className="w-64 h-64 relative"> {/* Augmenté la taille du conteneur */}
                <Image
                    src={isPlayer ? "/assets/images/character.png" : "/assets/images/enemy.png"}
                    alt={isPlayer ? "Player" : "Enemy"}
                    fill
                    className={`character-image ${state}`}
                    style={{
                        objectFit: 'contain',
                        transform: `scale(${isPlayer ? 1 : 1})`,
                        filter: isPlayer ? 'none' : 'hue-rotate(180deg)'
                    }}
                    priority
                />
            </div>
        </div>
    );
}
