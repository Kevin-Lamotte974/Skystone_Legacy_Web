import React from 'react';
import Image from 'next/image';

export default function EnergyDisplay({ currentEnergy, maxEnergy }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-1">
                <Image
                    src="/assets/images/crystal.png"
                    alt="energy"
                    width={20}
                    height={20}
                />
                <span className="text-blue-400 font-bold">
                    {currentEnergy}/{maxEnergy}
                </span>
            </div>
            <div className="flex flex-wrap gap-1">
                {Array(maxEnergy).fill().map((_, index) => (
                    <div
                        key={index}
                        className={`relative w-8 h-8 transition-all duration-300 transform 
                            ${index < currentEnergy ? 'opacity-100 scale-100' : 'opacity-50 scale-90'}`}
                    >
                        <Image
                            src="/assets/images/crystal.png"
                            alt="crystal"
                            width={32}
                            height={32}
                            className={index < currentEnergy ? 'filter-none' : 'grayscale'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
