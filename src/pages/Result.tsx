import React, { useState } from 'react';
import { useGame } from '../store/GameContext';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelButton } from '../components/ui/PixelButton';
import { ReviewList } from '../components/ReviewList';
import { cn } from '../utils';

export const Result: React.FC = () => {
    const { result, restartGame } = useGame();
    const [showReview, setShowReview] = useState(false);

    if (!result) return null;

    const isSuccess = result.passed;

    if (showReview) {
        return (
            <div className="flex flex-col items-center gap-6 w-full animate-fade-in">
                <h1 className="text-2xl md:text-4xl font-bold text-yellow-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                    MISSION REVIEW
                </h1>
                <ReviewList />
                <PixelButton onClick={() => setShowReview(false)} variant="secondary">
                    BACK TO RESULT
                </PixelButton>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-8 text-center animate-fade-in text-white">
            <div className="space-y-2">
                <h1 className={cn(
                    "text-4xl md:text-6xl font-bold drop-shadow-[4px_4px_0_rgba(0,0,0,1)]",
                    isSuccess ? "text-green-400" : "text-red-500"
                )}>
                    {isSuccess ? 'MISSION COMPLETE' : 'GAME OVER'}
                </h1>
                <p className="text-neutral-400 text-lg">
                    {isSuccess ? 'Congratulations! You defied gravity.' : 'Try again to conquer the pixels.'}
                </p>
            </div>

            <PixelCard className="w-full max-w-sm bg-neutral-800 border-neutral-600 text-white">
                <div className="flex flex-col gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400 uppercase">Score</span>
                            <span className="text-2xl text-yellow-400">{result.score}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400 uppercase">Attempts</span>
                            <span className="text-2xl text-blue-400">{result.attempts || 1}</span>
                        </div>
                    </div>

                    <div className="border-t-2 border-dashed border-neutral-600 my-2" />

                    <div className="text-base leading-loose">
                        <p>Total Questions: {result.totalQuestions}</p>
                        <p>Status: <span className={isSuccess ? "text-green-400" : "text-red-400"}>{isSuccess ? "CLEARED" : "FAILED"}</span></p>
                    </div>
                </div>
            </PixelCard>

            <div className="flex gap-4">
                <PixelButton onClick={() => setShowReview(true)} variant="secondary">
                    REVIEW
                </PixelButton>
                <PixelButton onClick={restartGame} variant={isSuccess ? "primary" : "danger"}>
                    PLAY AGAIN
                </PixelButton>
            </div>
        </div>
    );

};
