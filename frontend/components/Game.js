import React, { useState, useEffect } from 'react';
import {
    FaFistRaised,
    FaHeart
} from 'react-icons/fa';
import {
    GiLeatherBoot,
    GiWhiteBook,
    GiMoai,
    GiHealthNormal,
    GiBroadsword
} from "react-icons/gi";
import Image from 'next/image';
import StarEffect from '../utils/starEffect';

const Game = () => {
    const [playerCards, setPlayerCards] = useState([]); // Cartes en main
    const [deckCards, setDeckCards] = useState([]); // Cartes dans le deck
    const [isLoading, setIsLoading] = useState(true);
    const [player, setPlayer] = useState(null); // Initialisation à null au lieu d'un objet avec des valeurs arbitraires
    const [enemy, setEnemy] = useState(null);
    const [enemyDeck, setEnemyDeck] = useState([]); // Deck de l'ennemi
    const [enemyHand, setEnemyHand] = useState([]); // Main de l'ennemi
    const [turn, setTurn] = useState('player'); // 'player' ou 'enemy'
    const [turnNumber, setTurnNumber] = useState(1);
    const [selectedCard, setSelectedCard] = useState(null);
    const MAX_HAND_SIZE = 10;
    const [currentStory, setCurrentStory] = useState(null);
    const [showStory, setShowStory] = useState(true);
    const [storyData, setStoryData] = useState([]);
    const [isCombatStarted, setIsCombatStarted] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const typingSpeed = 30;
    const [isVictory, setIsVictory] = useState(false);
    const [bgMusic, setBgMusic] = useState(null);

    function getCardRarity(rarity) {
        switch (rarity.toLowerCase()) {
            case 'commune':
                return 'common-card';
                return 'legendary-card';
            case 'épique':
                return 'epic-card';
            default:
                return 'bg-gray-200 text-gray-600 border-gray-300';
        }
    }

    // Fonction pour mélanger le deck
    const shuffleDeck = (deck) => {
        return [...deck].sort(() => Math.random() - 0.5);
    };

    // Fonction pour piocher des cartes
    const drawCards = (amount) => {
        if (deckCards.length === 0) return;

        // Calcul du nombre de cartes que le joueur peut réellement piocher
        const spaceInHand = MAX_HAND_SIZE - playerCards.length;
        const cardsToDraw = Math.min(amount, deckCards.length, spaceInHand);

        if (cardsToDraw <= 0) {
            console.log("Main pleine ! Maximum 10 cartes.");
            return;
        }

        const newHand = [...playerCards, ...deckCards.slice(0, cardsToDraw)];
        const newDeck = deckCards.slice(cardsToDraw);

        setPlayerCards(newHand);
        setDeckCards(newDeck);
    };

    // Fonction pour piocher des cartes pour l'ennemi
    const drawEnemyCards = (amount) => {
        if (enemyDeck.length === 0) return;

        const cardsToDraw = Math.min(amount, enemyDeck.length);
        const newHand = [...enemyHand, ...enemyDeck.slice(0, cardsToDraw)];
        const newDeck = enemyDeck.slice(cardsToDraw);

        setEnemyHand(newHand);
        setEnemyDeck(newDeck);
    };

    // Modifions startPlayerTurn pour accepter un paramètre isFirstTurn
    const startPlayerTurn = () => {
        // Pioche une carte seulement si ce n'est pas le premier tour
        if (turnNumber >= 1) {
            drawCards(1);
        }
        setPlayer(prev => ({
            ...prev,
            energy: Math.min(prev.energy + 1, prev.maxEnergy)
        }));
        setTurn('player');
        setTurnNumber(prev => prev + 1);
    };

    // Fonction pour gérer la fin du tour du joueur
    const endPlayerTurn = () => {
        setTurn('enemy');
        setTimeout(async () => {
            // L'ennemi pioche et gagne de l'énergie seulement après le premier tour
            if (turnNumber > 1) {
                drawEnemyCards(1);
            }
            setEnemy(prev => ({
                ...prev,
                energy: Math.min(prev.energy + 1, prev.maxEnergy)
            }));

            // L'ennemi joue ses cartes
            await new Promise(resolve => setTimeout(resolve, 1000));
            playEnemyCard();

            // Fin du tour ennemi
            setTimeout(() => {
                startPlayerTurn();
            }, 1000);
        }, 1000);
    };

    // Fonction pour vérifier si une carte est jouable
    const isCardPlayable = (card) => {
        // Vérifie l'énergie
        if (card.energy_cost > player.energy) return false;

        // Vérifie les stats requises
        const requiredStats = card.stats || {};
        return Object.entries(requiredStats).every(([stat, value]) =>
            player[stat.toLowerCase()] >= value
        );
    };

    // Fonction pour jouer une carte modifiée
    const playCard = async (card) => {
        if (!isCardPlayable(card)) return;

        // Animation de disparition
        const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);
        if (cardElement) {
            cardElement.classList.add('card-vanishing');
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Appliquer les effets
        if (card.damage_base > 0) {
            const newHealth = Math.max(0, enemy.health - card.damage_base);
            setEnemy(prev => ({
                ...prev,
                health: newHealth
            }));
            
            // Vérifier la victoire
            if (newHealth <= 0) {
                setIsVictory(true);
            }
        } else if (card.damage_base < 0) {
            setPlayer(prev => ({
                ...prev,
                health: Math.min(prev.maxHealth, prev.health - card.damage_base)
            }));
        }

        // Déduire l'énergie
        setPlayer(prev => ({
            ...prev,
            energy: prev.energy - card.energy_cost
        }));

        // Retirer la carte de la main
        setPlayerCards(prev => prev.filter(c => c.id !== card.id));
    };

    // Fonction pour que l'ennemi joue une carte
    const playEnemyCard = () => {
        if (enemyHand.length === 0) return;

        // Logique simple : jouer la première carte jouable
        const playableCards = enemyHand.filter(card => card.energy_cost <= enemy.energy);
        if (playableCards.length > 0) {
            const cardToPlay = playableCards[0];

            // Appliquer les effets de la carte
            if (cardToPlay.damage_base > 0) {
                setPlayer(prev => ({
                    ...prev,
                    health: Math.max(0, prev.health - cardToPlay.damage_base)
                }));
            } else if (cardToPlay.damage_base < 0) {
                setEnemy(prev => ({
                    ...prev,
                    health: Math.min(prev.maxHealth, prev.health - cardToPlay.damage_base)
                }));
            }

            // Déduire l'énergie
            setEnemy(prev => ({
                ...prev,
                energy: prev.energy - cardToPlay.energy_cost
            }));

            // Retirer la carte de la main
            setEnemyHand(prev => prev.filter(c => c.id !== cardToPlay.id));
        }
    };

    // Ajouter cette fonction pour gérer la musique
    const initializeMusic = () => {
        const audio = new Audio('/assets/audio/tense_pulse_theme.mp3');
        audio.loop = true;
        audio.volume = 0.5;
        setBgMusic(audio);
    };

    // Ajouter ce useEffect pour la gestion de la musique
    useEffect(() => {
        if (isCombatStarted && !bgMusic) {
            initializeMusic();
        }
        
        // Démarrer la musique quand le combat commence
        if (isCombatStarted && bgMusic) {
            bgMusic.play().catch(error => {
                console.log("Erreur de lecture audio:", error);
            });
        }

        // Cleanup function
        return () => {
            if (bgMusic) {
                bgMusic.pause();
                bgMusic.currentTime = 0;
            }
        };
    }, [isCombatStarted, bgMusic]);

    useEffect(() => {
        // Initialiser l'effet d'étoiles pour les cartes légendaires
        const legendaryCards = document.querySelectorAll('.legendary-card .card-frame');
        legendaryCards.forEach(card => {
            const canvas = document.createElement('canvas');
            canvas.classList.add('star-effect');
            card.appendChild(canvas);

            // Ajuster la taille du canvas à la carte
            const resizeCanvas = () => {
                canvas.width = card.offsetWidth;
                canvas.height = card.offsetHeight;
            };

            resizeCanvas();
            new StarEffect(canvas, 400);

            window.addEventListener('resize', resizeCanvas);
        });
    }, [playerCards]);

    useEffect(() => {
        const loadGameData = async () => {
            try {
                // Charger les données du joueur
                const playerDeckResponse = await fetch('/assets/data/player_deck.json');
                const playerData = await playerDeckResponse.json();

                // Charger les données de l'ennemi
                const enemyDeckResponse = await fetch('/assets/data/enemy_deck.json');
                const enemyData = await enemyDeckResponse.json();

                // Charger toutes les cartes disponibles
                const cardsResponse = await fetch('/assets/data/cards.json');
                const cardsData = await cardsResponse.json();

                const cardsById = cardsData.cards.reduce((acc, card) => {
                    acc[card.id] = card;
                    return acc;
                }, {});

                // Initialiser le deck du joueur
                const playerFullDeck = playerData.initial_deck.map(id => cardsById[id]).filter(Boolean);
                const shuffledPlayerDeck = shuffleDeck(playerFullDeck);

                // Initialiser le deck de l'ennemi
                const enemyFullDeck = enemyData.initial_deck.map(id => cardsById[id]).filter(Boolean);
                const shuffledEnemyDeck = shuffleDeck(enemyFullDeck);

                // Distribuer les cartes initiales
                setPlayerCards(shuffledPlayerDeck.slice(0, 5));
                setDeckCards(shuffledPlayerDeck.slice(5));
                setEnemyHand(shuffledEnemyDeck.slice(0, 5));
                setEnemyDeck(shuffledEnemyDeck.slice(5));

                // Initialiser les stats
                setPlayer(playerData.player_stats);
                setEnemy(enemyData.enemy_stats);

                setIsLoading(false);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                setIsLoading(false);
            }
        };

        const initGame = async () => {
            await loadStory();
            await loadGameData();
        };

        initGame();
    }, []);

    // Fonction pour charger l'histoire
    const loadStory = async () => {
        try {
            const response = await fetch('/assets/data/story.json');
            const data = await response.json();
            setStoryData(data);
            setCurrentStory(data[0]); // Commencer avec la première scène
        } catch (error) {
            console.error('Erreur lors du chargement de l\'histoire:', error);
        }
    };

    // Fonction pour gérer les choix de l'histoire
    const handleStoryChoice = (choice) => {
        if (choice.fight) {
            setShowStory(false);
            setIsCombatStarted(true);
            // La musique démarrera automatiquement grâce au useEffect
            return;
        }

        const nextScene = storyData.find(scene => scene.id === choice.next);
        if (nextScene) {
            setCurrentStory(nextScene);
        }
    };

    // Fonction pour rendre les cristaux d'énergie
    const renderEnergyCrystals = () => {
        return Array(player.maxEnergy).fill().map((_, index) => (
            <div
                key={index}
                className={`relative w-8 h-8 transition-all duration-300 transform ${index < player.energy ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
                    }`}
            >
                <Image
                    src="/assets/images/crystal.png"
                    alt="crystal"
                    width={32}
                    height={32}
                    className={`${index < player.energy ? 'filter-none' : 'grayscale'}`}
                />
            </div>
        ));
    };

    const renderCard = (card) => (
        <div
            key={card.id}
            data-card-id={card.id}
            className={`card ${getCardRarity(card.rarity)} cursor-pointer 
                       ${!isCardPlayable(card) ? 'unplayable' : ''}`}
            onClick={() => turn === 'player' && playCard(card)}
        >
            <div className="card-frame">
                <div class="energy-notch">
                    <Image src="/assets/images/crystal.png" alt="crystal" class="energy-crystal" width={50} height={50} />
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
    );

    // Composant pour afficher l'histoire
    const StoryOverlay = () => (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col justify-end pointer-events-none">
            {/* Boîte de dialogue */}
            <div className="bg-black/80 backdrop-blur-sm p-6 mx-auto mb-4 max-w-4xl w-full pointer-events-auto 
                          border border-purple-500/20 rounded-lg shadow-lg">
                {currentStory.speaker && (
                    <div className="text-purple-400 font-bold text-xl mb-3">
                        {currentStory.speaker}
                    </div>
                )}
                <p className="text-white text-lg mb-4 leading-relaxed">
                    {currentStory.text}
                </p>
            </div>

            {/* Zone des choix */}
            {currentStory.choices && currentStory.choices.length > 0 ? (
                <div className="flex justify-center gap-4 mb-8 pointer-events-auto">
                    {currentStory.choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => handleStoryChoice(choice)}
                            className="px-8 py-4 bg-purple-900/80 text-white rounded-lg 
                                     hover:bg-purple-800/90 transition-all duration-300
                                     border-2 border-purple-500/50 backdrop-blur-sm
                                     min-w-[200px] text-lg shadow-lg hover:shadow-purple-500/20"
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center mb-8 pointer-events-auto">
                    <button
                        onClick={() => handleStoryChoice({ next: currentStory.next })}
                        className="px-8 py-3 bg-purple-900/80 text-white rounded-lg 
                                 hover:bg-purple-800/90 transition-all duration-300
                                 border-2 border-purple-500/50 backdrop-blur-sm
                                 min-w-[150px] text-lg shadow-lg hover:shadow-purple-500/20"
                    >
                        Continuer
                    </button>
                </div>
            )}
        </div>
    );

    const VictoryOverlay = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <video
                autoPlay
                muted
                className="inset-0 w-96 object-cover"
                src="/assets/audio/victory.mp4"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <h1 className="absolute text-9xl font-bold text-yellow-400 z-10 animate-bounce shadow-2xl"
                style={{
                    textShadow: '0 0 20px rgba(234, 179, 8, 0.5)',
                    fontFamily: 'fantasy'
                }}>
                VICTORY
            </h1>
        </div>
    );

    // Modification du rendu conditionnel pour vérifier si player existe
    if (isLoading || !player) {
        return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            Chargement du jeu...
        </div>;
    }

    // Si le combat n'est pas encore commencé, ne montrer que l'histoire
    if (!isCombatStarted) {
        return (
            <div className="min-h-screen bg-gray-900 text-white relative">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(/assets/images/background/intro_bg.png)',
                        opacity: '0.8',
                        zIndex: 0
                    }}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80"
                    style={{ zIndex: 1 }}
                />
                {showStory && currentStory && <StoryOverlay />}
            </div>
        );
    }

    // Rendu du combat uniquement après que isCombatStarted est true
    return (
        <div className="min-h-screen bg-gray-900 text-white relative">
            {isVictory && <VictoryOverlay />}
            {showStory && currentStory && <StoryOverlay />}
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/assets/images/background/intro_bg.png)',
                    opacity: '0.8',
                    zIndex: 0
                }}
            />

            {/* Overlay gradient pour améliorer la lisibilité */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80"
                style={{ zIndex: 1 }}
            />

            {/* Contenu du jeu (avec un z-index plus élevé) */}
            <div className="relative z-10">
                {/* Indicateur de tour */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-purple-500/20">
                    <div className="text-center">
                        <span className="text-purple-300 font-bold">Tour {turnNumber}</span>
                        <div className={`text-lg font-bold ${turn === 'player' ? 'text-blue-400' : 'text-red-400'}`}>
                            {turn === 'player' ? 'Votre Tour' : 'Tour Ennemi'}
                        </div>
                    </div>
                </div>

                {/* Zone de jeu principale */}
                <div className="h-[calc(100vh-120px)] relative">
                    {/* Joueur */}
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 transform">
                        {/* Barre de vie du joueur */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32">
                            <div className="text-center mb-1 text-red-500 flex items-center justify-center gap-2 font-bold">
                                <FaHeart className="animate-pulse" />
                                <span>{player.health}/{player.maxHealth}</span>
                            </div>
                            <div className="w-full h-3 bg-gray-700 rounded-full p-0.5">
                                <div
                                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300"
                                    style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
                                />
                            </div>
                        </div>
                        {/* Carré du joueur */}
                        <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-lg 
                                    shadow-blue-500/50 border-2 border-blue-400">
                        </div>
                    </div>

                    {/* Ennemi */}
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 transform">
                        {/* Barre de vie de l'ennemi */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32">
                            <div className="text-center mb-1 text-red-500 flex items-center justify-center gap-2 font-bold">
                                <FaHeart className="animate-pulse" />
                                <span>{enemy.health}/{enemy.maxHealth}</span>
                            </div>
                            <div className="w-full h-3 bg-gray-700 rounded-full p-0.5">
                                <div
                                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300"
                                    style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
                                />
                            </div>
                        </div>
                        {/* Carré de l'ennemi */}
                        <div className="w-16 h-16 bg-red-500 rounded-lg shadow-lg 
                                    shadow-red-500/50 border-2 border-red-400">
                        </div>
                    </div>
                </div>

                {/* Zone des stats du joueur et des cartes */}
                <div className="fixed bottom-0 left-0 right-0">
                    {/* Stats du joueur */}
                    <div className="absolute left-8 bottom-24 bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
                        {/* Barre de vie */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <FaHeart className="text-red-500" />
                                <span className="text-red-400 font-bold">
                                    {player.health}/{player.maxHealth}
                                </span>
                            </div>
                            <div className="w-48 h-3 bg-gray-700 rounded-full p-0.5">
                                <div
                                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300"
                                    style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Cristaux d'énergie */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Image
                                    src="/assets/images/crystal.png"
                                    alt="energy"
                                    width={20}
                                    height={20}
                                />
                                <span className="text-blue-400 font-bold">
                                    {player.energy}/{player.maxEnergy}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {renderEnergyCrystals()}
                            </div>
                        </div>

                        {/* Indicateur du nombre de cartes */}
                        <div className="mt-2 text-sm text-gray-300">
                            Cartes en main: <span className={`font-bold ${playerCards.length === MAX_HAND_SIZE ? 'text-red-400' : 'text-blue-400'}`}>
                                {playerCards.length}/{MAX_HAND_SIZE}
                            </span>
                        </div>
                    </div>

                    {/* Zone des cartes du joueur et du deck */}
                    <div className="fixed bottom-0 left-0 right-0 h-48">
                        <div className="container mx-auto flex justify-center items-end h-full">
                            {/* Main du joueur */}
                            <div className="hand-container flex justify-center items-end">
                                {playerCards.map((card) => (
                                    <div
                                        key={card.id}
                                        className="card-in-hand"
                                    >
                                        {renderCard(card)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bouton de fin de tour */}
                {turn === 'player' && (
                    <div className="fixed bottom-4 right-0 flex justify-center items-center w-48 gap-10">
                        <div className='flex flex-col items-center'>
                            {/* Pile du deck */}
                            <div className="relative w-24 h-36 bg-purple-900/20 rounded-lg border-2 border-purple-500/30">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-bold text-purple-300">
                                        {deckCards.length}
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
                            <button
                                onClick={endPlayerTurn}
                                className="w-36 px-6 py-3 mt-4 bg-purple-600 text-white rounded-lg 
                                 hover:bg-purple-500 transition-all duration-300 transform hover:scale-105
                                 border-2 border-purple-400"
                            >
                                Fin du Tour
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Game;
