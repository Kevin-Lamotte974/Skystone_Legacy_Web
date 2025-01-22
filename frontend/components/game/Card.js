import Image from 'next/image';
import { FaFistRaised } from 'react-icons/fa';
import { GiLeatherBoot, GiWhiteBook, GiMoai, GiHealthNormal, GiBroadsword } from "react-icons/gi";
import { getCardRarity, isCardPlayable } from '../../utils/cardUtils';
import { useGameContext } from '../../context/GameContext';

export default function Card({ card, isPlayable, onClick }) {
    const { state } = useGameContext();
    const actuallyPlayable = isPlayable && isCardPlayable(card, state.player);
    
    return (
        <div
            data-card-id={card.id}
            className={`card ${getCardRarity(card.rarity)} cursor-pointer 
                       ${!actuallyPlayable ? 'unplayable opacity-80' : ''}`}
            onClick={() => actuallyPlayable && onClick()}
        >
            <div className="card-frame">
                <div className="energy-notch">
                    <Image src="/assets/images/crystal.png" alt="crystal" className="energy-crystal" width={50} height={50} />
                    <span className="energy-value">{card.energy_cost}</span>
                </div>

                {card.damage_base != 0 && (
                    <div className={`damage-container ${card.damage_base < 0 ? "heal" : "attack"}`}>
                        {card.damage_base < 0 ? <GiHealthNormal color='green' /> : <GiBroadsword />}
                        <span className="damage-value">{Math.abs(card.damage_base)}</span>
                    </div>
                )}

                <div className="card-stats">
                    {/* Stats de la carte */}
                    {Object.entries(card.stats).map(([stat, value]) => value > 0 && (
                        <span key={stat} className="stat" title={stat}>
                            {value}
                            {stat === 'force' && <FaFistRaised className="inline ml-1" />}
                            {stat === 'agilite' && <GiLeatherBoot className="inline ml-1" />}
                            {stat === 'intelligence' && <GiWhiteBook className="inline ml-1" />}
                            {stat === 'charisme' && <GiMoai className="inline ml-1" />}
                        </span>
                    ))}
                </div>

                <div className="card-name">{card.name}</div>
                <div className="inner-frame">
                    <div className="card-image-container">
                        <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>
                    <div className="special-effect">{card.special_effect}</div>
                </div>
            </div>
        </div>
    );
}
