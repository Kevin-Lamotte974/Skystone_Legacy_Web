import React from 'react';

export default function StoryOverlay({ currentStory, onChoiceSelect }) {
    if (!currentStory) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col justify-end pointer-events-none">
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

            {currentStory.choices?.length > 0 ? (
                <div className="flex justify-center gap-4 mb-8 pointer-events-auto">
                    {currentStory.choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => onChoiceSelect(choice)}
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
                        onClick={() => onChoiceSelect({ next: currentStory.next })}
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
}
