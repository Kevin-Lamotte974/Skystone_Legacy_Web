import React from 'react';
import cards from '../../assets/data/cards.json';
import { FaBook, FaHandRock, FaHandshake, FaMapMarkedAlt } from 'react-icons/fa';
import '../../styles/CardList.css';

function getCardRarityStyles(rarity) {
    switch (rarity.toLowerCase()) {
        case 'commune':
            return 'bg-gray-300 text-gray-700 border-gray-400';
        case 'rare':
            return 'bg-blue-500 text-white border-blue-600';
        case 'légendaire':
            return 'bg-orange-500 text-white border-orange-600';
        case 'épique':
            return 'bg-purple-700 text-white border-purple-800';
        default:
            return 'bg-gray-200 text-gray-600 border-gray-300';
    }
}

function getCardRarity(rarity) {
    switch (rarity.toLowerCase()) {
        case 'commune':
            return 'common-card';
        case 'rare':
            return 'rare-card';
        case 'légendaire':
            return 'legendary-card';
        case 'épique':
            return 'epic-card';
        default:
            return 'bg-gray-200 text-gray-600 border-gray-300';
    }
}


function CardList() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.cards.map((card, index) => (
                    <>
                        <div
                            key={index}
                            className={`relative w-[320px] h-[480px] rounded-xl card ${getCardRarity(card.rarity)}`}
                        >
                            <div className="absolute top-4 right-4 flex items-center z-20">
                                <span className="text-sm bg-gray-700/80 text-white px-2 py-1 rounded-md uppercase font-bold">
                                    {card.class_association}
                                </span>
                                {/* <span className="text-sm font-bold">Lvl {card.level_requirement}</span> */}
                            </div>
                            {/* Rareté spécifique */}
                            {card.rarity.toLowerCase() === 'légendaire' && (
                                <div className="star-container">
                                    <span className="star star-small" style={{ top: '-2%', left: '5%' }}>✦</span>
                                    <span className="star star-medium" style={{ top: '4%', left: '2%' }}>✧</span>
                                    <span className="star star-large" style={{ bottom: '5%', left: '-4%' }}>✦</span>
                                    <span className="star star-small" style={{ bottom: '-2%', right: '5%' }}>✧</span>
                                    <span className="star star-sparkle" style={{ bottom: '2%', right: '0%' }}>✦</span>
                                    <span className="star shooting-star" style={{ top: '0%', right: '4%' }}>✧</span>
                                    <span className="star star-pulse" style={{ bottom: '-5%', left: '3%' }}>✦</span>
                                </div>
                            )}
                            {card.rarity.toLowerCase() === 'épique' && (
                                <div>
                                    <div className="crystal crystal-tl"></div>
                                    <div className="crystal crystal-tr"></div>
                                    <div className="crystal crystal-bl"></div>
                                    <div className="crystal crystal-br"></div>
                                </div>
                            )}

                            <div className='card-frame'>

                                {/* Image centrale */}
                                <div className="card-image-container h-1/2">
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                    />
                                </div>

                                {/* Infos principales */}
                                <div className=" bottom-4 left-4 right-4 text-center h-1/2">
                                    <div className='h-2/3'>
                                        <h2 className="card-name">{card.name}</h2>
                                        {/* <h2 className="card-description">{card.description}</h2> */}
                                        <h2 className="card-description">{card.special_effect}</h2>
                                    </div>
                                    <div className="w-full h-1/3 flex justify-around items-center text-xl mb-4">
                                        {card.stats.exploration > 0 && (
                                            <div className="text-green-500 flex flex-col items-center">
                                                <FaMapMarkedAlt />
                                                <span>{card.stats.exploration}</span>
                                            </div>
                                        )}
                                        {card.stats.combat > 0 && (
                                            <div className="text-red-500 flex flex-col items-center">
                                                <FaHandRock />
                                                <span>{card.stats.combat}</span>
                                            </div>
                                        )}
                                        {card.stats.diplomacy > 0 && (
                                            <div className="text-purple-500 flex flex-col items-center">
                                                <FaHandshake />
                                                <span>{card.stats.diplomacy}</span>
                                            </div>
                                        )}
                                        {card.stats.knowledge > 0 && (
                                            <div className="text-blue-500 flex flex-col items-center">
                                                <FaBook />
                                                <span>{card.stats.knowledge}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute top-[40%] left-0 flex w-full">
                                        <div className='absolute left-10'>
                                            <div className='bg-black/80 w-10 h-10 rounded-full flex justify-center items-center'>
                                                <span className='text-blue-500 font-bold'>{card.energy_cost}</span>
                                            </div>
                                        </div>
                                        <div className='absolute right-10'>
                                            <div className='bg-black/80 w-10 h-10 rounded-full flex justify-center items-center'>
                                                <span className={`${card.damage_base < 0 ? 'text-green-500' : 'text-red-400'} font-bold`}>{Math.abs(card.damage_base)}</span>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <span className="block font-bold">Bonus</span>
                                            <span>{card.damage_bonus.value}</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>))}
            </div>
        </div>
    );
}

export default CardList;
