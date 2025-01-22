import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function HealthBar({ currentHealth, maxHealth, isEnemy = false }) {
    const percentage = (currentHealth / maxHealth) * 100;
    
    return (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32">
            <div className="text-center mb-1 text-red-500 flex items-center justify-center gap-2 font-bold">
                <FaHeart className="animate-pulse" />
                <span>{currentHealth}/{maxHealth}</span>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full p-0.5">
                <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
