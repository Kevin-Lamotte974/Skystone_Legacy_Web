import React, { useState, useEffect } from 'react';
import {
    FaInternetExplorer,
    FaBalanceScale,
} from 'react-icons/fa';
import { GiBroadsword, GiClassicalKnowledge } from "react-icons/gi";
import CardDetail from './CardDetail';
import Image from 'next/image';

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

const CostDamageIndicator = ({ cost, damage }) => {
    const isHealing = damage < 0;

    return (
        <div className="absolute -top-4 left-0 w-full flex justify-between px-2" style={{ zIndex: 50 }}>
            <div className="stat-orb cost-orb relative" style={{ transform: 'translateY(0)' }}>
                <div className="stat-inner">
                    <span className="stat-value">{cost}</span>
                </div>
            </div>

            <div className={`stat-orb ${isHealing ? 'heal-orb' : 'damage-orb'} relative`} style={{ transform: 'translateY(0)' }}>
                <div className="stat-inner">
                    <span className="stat-value">{Math.abs(damage)}</span>
                </div>
            </div>
        </div>
    );
};

function CardList() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterRarity, setFilterRarity] = useState('');
    const [filterClass, setFilterClass] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        async function fetchCards() {
            try {
                const response = await fetch('/assets/data/cards.json');
                const data = await response.json();
                setCards(data.cards);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCards();
    }, []);

    const handleFilterRarity = (event) => {
        setFilterRarity(event.target.value);
    };

    const handleFilterClass = (event) => {
        setFilterClass(event.target.value);
    };

    const handleSortOption = (event) => {
        setSortOption(event.target.value);
    };

    const filteredCards = cards
        .filter(card => (filterRarity ? card.rarity.toLowerCase() === filterRarity.toLowerCase() : true))
        .filter(card => (filterClass ? card.class_association === filterClass : true))
        .sort((a, b) => {
            if (sortOption === 'rarity') {
                const rarityOrder = ['commune', 'rare', 'épique', 'légendaire'];
                return rarityOrder.indexOf(a.rarity.toLowerCase()) - rarityOrder.indexOf(b.rarity.toLowerCase());
            } else if (sortOption === 'class') {
                return (a.class_association || '').localeCompare(b.class_association || '');
            }
            return 0;
        });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between mb-4">
                <div>
                    <label htmlFor="rarity-filter" className="mr-2">Filter by Rarity:</label>
                    <select id="rarity-filter" value={filterRarity} onChange={handleFilterRarity} className="mr-4">
                        <option value="">All</option>
                        <option value="commune">Commune</option>
                        <option value="rare">Rare</option>
                        <option value="épique">Épique</option>
                        <option value="légendaire">Légendaire</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="class-filter" className="mr-2">Filter by Class:</label>
                    <select id="class-filter" value={filterClass} onChange={handleFilterClass} className="mr-4">
                        <option value="">All</option>
                        <option value="Éclaireur des Vents">Éclaireur des Vents</option>
                        <option value="Cristallomancien">Cristallomancien</option>
                        <option value="Négociant des Cieux">Négociant des Cieux</option>
                        <option value="Archéologue des Ruines">Archéologue des Ruines</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort-option" className="mr-2">Sort by:</label>
                    <select id="sort-option" value={sortOption} onChange={handleSortOption}>
                        <option value="">None</option>
                        <option value="rarity">Rarity</option>
                        <option value="class">Class</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {filteredCards.map((card) => (
                    <div
                        key={card.id}
                        className={`relative w-full pb-[150%] rounded-xl card ${getCardRarity(card.rarity)} cursor-pointer hover:scale-105 transition-transform duration-200`}
                        onClick={() => setSelectedCard(card)}
                    >
                        <div className="absolute inset-0">
                            <CostDamageIndicator cost={card.energy_cost} damage={card.damage_base} />

                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center z-20">
                                {card.class_association && (
                                    <span className="text-sm bg-gray-900/90 text-white px-3 py-1 rounded-full uppercase font-bold text-center">
                                        {card.class_association}
                                    </span>
                                )}
                            </div>

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
                                <div className="card-image-container h-1/2">
                                    <Image
                                        src={card.image}
                                        alt={card.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority
                                        onError={(e) => {
                                            console.error('Error loading image:', card.image);
                                        }}
                                        onLoadingComplete={(result) => {
                                            console.log('Image loaded successfully:', card.image);
                                        }}
                                    />
                                </div>
                                <div className="bottom-4 left-4 right-4 text-center h-1/2">
                                    <div className='h-2/3'>
                                        <h2 className={card.rarity.toLowerCase() + '-card card-name'}>{card.name}</h2>
                                        <h2 className="card-description hidden">{card.special_effect}</h2>
                                    </div>
                                    <div className="flex mt-2">
                                        {card.stats.exploration > 0 && (
                                            <div className="stat-circle exploration-stat">
                                                <div className="stat-inner">
                                                    <FaInternetExplorer className="stat-icon text-emerald-400" />
                                                    <span className="stat-number">{card.stats.exploration}</span>
                                                </div>
                                            </div>
                                        )}
                                        {card.stats.combat > 0 && (
                                            <div className="stat-circle combat-stat">
                                                <div className="stat-inner">
                                                    <GiBroadsword className="stat-icon text-red-400" />
                                                    <span className="stat-number">{card.stats.combat}</span>
                                                </div>
                                            </div>
                                        )}
                                        {card.stats.diplomacy > 0 && (
                                            <div className="stat-circle diplomacy-stat">
                                                <div className="stat-inner">
                                                    <FaBalanceScale className="stat-icon text-purple-400" />
                                                    <span className="stat-number">{card.stats.diplomacy}</span>
                                                </div>
                                            </div>
                                        )}
                                        {card.stats.knowledge > 0 && (
                                            <div className="stat-circle knowledge-stat">
                                                <div className="stat-inner">
                                                    <GiClassicalKnowledge className="stat-icon text-blue-400" />
                                                    <span className="stat-number">{card.stats.knowledge}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCard && (
                <div className="fixed inset-0 z-50">
                    <CardDetail
                        card={selectedCard}
                        onClose={() => setSelectedCard(null)}
                    />
                </div>
            )}
        </div>
    );
}

export default CardList;