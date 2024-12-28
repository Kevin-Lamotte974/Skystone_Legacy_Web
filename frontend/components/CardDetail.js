import React from 'react';
import { 
    FaInternetExplorer,
    FaBalanceScale,
    FaTimes
} from 'react-icons/fa';
import { GiBroadsword, GiClassicalKnowledge } from "react-icons/gi";

const CardDetail = ({ card, onClose }) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!card) return null;

  const getStatColor = (statType) => {
    switch (statType) {
      case 'exploration': return 'text-green-500';
      case 'combat': return 'text-red-500';
      case 'diplomacy': return 'text-purple-500';
      case 'knowledge': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 relative"
        onClick={handleModalClick}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <div className="relative pb-[100%] rounded-lg overflow-hidden">
              <img 
                src={card.image} 
                alt={card.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{card.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${
                card.rarity === 'Légendaire' ? 'bg-orange-500' :
                card.rarity === 'Épique' ? 'bg-purple-700' :
                card.rarity === 'Rare' ? 'bg-blue-500' :
                'bg-gray-500'
              }`}>
                {card.rarity}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-gray-300">{card.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.entries(card.stats).map(([stat, value]) => (
                value > 0 && (
                  <div key={stat} className="flex items-center gap-2">
                    {stat === 'exploration' && <FaInternetExplorer className={getStatColor(stat)} />}
                    {stat === 'combat' && <GiBroadsword className={getStatColor(stat)} />}
                    {stat === 'diplomacy' && <FaBalanceScale className={getStatColor(stat)} />}
                    {stat === 'knowledge' && <GiClassicalKnowledge className={getStatColor(stat)} />}
                    <span className={getStatColor(stat)}>{value}</span>
                  </div>
                )
              ))}
            </div>

            {/* Combat Info */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Coût en énergie</span>
                <span className="text-blue-400">{card.energy_cost}</span>
              </div>
              <div className="flex justify-between">
                <span>Dégâts de base</span>
                <span className={card.damage_base >= 0 ? 'text-red-400' : 'text-green-400'}>
                  {Math.abs(card.damage_base)}
                </span>
              </div>
            </div>

            {/* Effect */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Effet spécial</h3>
              <p className="text-gray-300">{card.special_effect}</p>
            </div>

            {/* Additional Info */}
            <div className="mt-4 text-sm text-gray-400">
              <div>Niveau requis: {card.level_requirement}</div>
              {card.class_association && (
                <div>Classe: {card.class_association}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
