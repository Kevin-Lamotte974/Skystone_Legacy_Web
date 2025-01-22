import React from 'react';

export default function VictoryOverlay() {
    return (
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
}
