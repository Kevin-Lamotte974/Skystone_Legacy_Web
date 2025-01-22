import React from 'react';
import Card from './Card';
import { useGameContext } from '../../context/GameContext';

export default function CardHand({ cards, onCardPlay }) {
    const { state } = useGameContext();

    return (
        <div className="fixed bottom-0 left-0 right-0 h-48">
            <div className="container mx-auto flex justify-center items-end h-full">
                <div className="hand-container flex justify-center items-end">
                    {cards.map((card) => (
                        <div key={card.id} className="card-in-hand">
                            <Card
                                card={card}
                                isPlayable={state.turn === 'player'}
                                onClick={() => onCardPlay(card)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
