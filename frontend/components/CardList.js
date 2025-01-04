import React, { useState, useEffect } from 'react';
import {
    FaFistRaised,
} from 'react-icons/fa';
import {
    GiLeatherBoot,
    GiWhiteBook,
    GiMoai,
    GiHealthNormal,
    GiBroadsword
} from "react-icons/gi";
import CardDetail from './CardDetail';
import Image from 'next/image';

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
        <div className="container mx-auto py-8">
            <div className="flex justify-between mb-4">
                <div>
                    <label htmlFor="rarity-filter" className="mr-2 text-white">Filter by Rarity:</label>
                    <select id="rarity-filter" value={filterRarity} onChange={handleFilterRarity} className="mr-4">
                        <option value="">All</option>
                        <option value="commune">Commune</option>
                        <option value="rare">Rare</option>
                        <option value="épique">Épique</option>
                        <option value="légendaire">Légendaire</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="class-filter" className="mr-2 text-white">Filter by Class:</label>
                    <select id="class-filter" value={filterClass} onChange={handleFilterClass} className="mr-4">
                        <option value="">All</option>
                        <option value="Éclaireur des Vents">Éclaireur des Vents</option>
                        <option value="Cristallomancien">Cristallomancien</option>
                        <option value="Négociant des Cieux">Négociant des Cieux</option>
                        <option value="Archéologue des Ruines">Archéologue des Ruines</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort-option" className="mr-2 text-white">Sort by:</label>
                    <select id="sort-option" value={sortOption} onChange={handleSortOption}>
                        <option value="">None</option>
                        <option value="rarity">Rarity</option>
                        <option value="class">Class</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${getCardRarity(card.rarity)} cursor-pointer hover:scale-105 transition-transform duration-200`}
                        onClick={() => setSelectedCard(card)}
                    >
                        <div className="card-frame">
                            <div className="rare-emblem">
                                <div className="emblem-frame">
                                    <Image
                                        src={`/assets/images/classes/${card.class_association?.toLowerCase().replace(/ /g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}_logo.svg`}
                                        alt={`emblème ${card.class_association}`}
                                        className="emblem-image"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            </div>

                            <div class="energy-notch">
                                <Image src="/assets/images/crystal.png" alt="crystal" class="energy-crystal" width={50} height={50}/>
                                <span class="energy-value">{card.energy_cost}</span>
                            </div>

                            {card.damage_base != 0 && (
                                <div class={`damage-container ${card.damage_base < 0 ? "heal" : "attack"}`}>
                                    {card.damage_base < 0 ? <GiHealthNormal color='green' /> : <GiBroadsword />}
                                    <span class="damage-value">{Math.abs(card.damage_base)}</span>
                                </div>
                            )}

                            <div className="card-stats">
                                {card.stats.force > 0 && (
                                    <span className="stat" title="force">
                                        {card.stats.force}<FaFistRaised className="inline ml-1" />
                                    </span>
                                )}
                                {card.stats.agilite > 0 && (
                                    <span className="stat" title="agilite">
                                        {card.stats.agilite}<GiLeatherBoot className="inline ml-1" />
                                    </span>
                                )}
                                {card.stats.intelligence > 0 && (
                                    <span className="stat" title="intelligence">
                                        {card.stats.intelligence}<GiWhiteBook className="inline ml-1" />
                                    </span>
                                )}
                                {card.stats.charisme > 0 && (
                                    <span className="stat" title="charisme">
                                        {card.stats.charisme}<GiMoai className="inline ml-1" />
                                    </span>
                                )}
                            </div>

                            <div className="card-name">{card.name}</div>

                            <div className="inner-frame">
                                <div className="crystal-container">
                                    <img src="/assets/images/crystal.png" alt="crystal" class="crystal crystal-tl" />
                                    <img src="/assets/images/crystal.png" alt="crystal" class="crystal crystal-tr" />
                                    <img src="/assets/images/crystal.png" alt="crystal" class="crystal crystal-bl" />
                                    <img src="/assets/images/crystal.png" alt="crystal" class="crystal crystal-br" />
                                </div>

                                <div className="card-image-container">
                                    <Image
                                        src={card.image}
                                        alt={card.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority
                                    />
                                </div>

                                <div className="special-effect">
                                    {card.special_effect}
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