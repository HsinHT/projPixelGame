import React, { useMemo } from 'react';
import { useGame } from '../store/GameContext';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelButton } from '../components/ui/PixelButton';

export const Game: React.FC = () => {
    const { questions, currentQuestionIndex, selectAnswer, gameState } = useGame();

    const question = questions[currentQuestionIndex];

    // Generate a consistent seed for the avatar based on question ID
    const avatarSeed = useMemo(() => {
        return question ? `boss-${question.id}-${currentQuestionIndex}` : 'loading';
    }, [question, currentQuestionIndex]);

    const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${avatarSeed}&scale=120&radius=0`;

    if (!question) return <div>Loading Question...</div>;

    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl">
            {/* Header Info */}
            <div className="flex justify-between items-end px-2">
                <div className="text-sm md:text-base text-neutral-400">
                    STAGE {currentQuestionIndex + 1} / {questions.length}
                </div>
                <div className="text-sm md:text-base text-yellow-400 animate-pulse">
                    BATTLE START!
                </div>
            </div>

            {/* Main Game Area */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">

                {/* Avatar Card (The "Boss") */}
                <div className="flex flex-col items-center justify-center">
                    <PixelCard className="w-full aspect-square flex items-center justify-center bg-blue-100 p-0 overflow-hidden relative group">
                        <img
                            src={avatarUrl}
                            alt="Pixel Avatar"
                            className="w-full h-full object-cover rendering-pixelated group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 w-full bg-black/50 text-white text-[10px] text-center py-1">
                            TARGET LOCKED
                        </div>
                    </PixelCard>
                </div>

                {/* Question Card */}
                <PixelCard title={`Q${currentQuestionIndex + 1}`} className="flex flex-col gap-6 justify-between min-h-[300px]">
                    <h2 className="text-lg md:text-2xl leading-relaxed font-bold text-neutral-800">
                        {question.text}
                    </h2>

                    <div className="grid grid-cols-1 gap-3">
                        {question.options.map((option, idx) => (
                            <PixelButton
                                key={idx}
                                variant="secondary"
                                onClick={() => selectAnswer(option)}
                                disabled={gameState === 'SUBMITTING'}
                                className="w-full text-left justify-start text-base md:text-lg normal-case py-6 h-auto"
                            >
                                <span className="bg-black text-white px-2 py-1 mr-3 text-[10px]">{String.fromCharCode(65 + idx)}</span>
                                {option}
                            </PixelButton>
                        ))}
                    </div>
                </PixelCard>
            </div>
        </div>
    );
};
