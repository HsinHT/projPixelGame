import React from 'react';
import { useGame } from '../store/GameContext';
import { PixelCard } from './ui/PixelCard';
import { cn } from '../utils';

export const ReviewList: React.FC = () => {
    const { questions, answers, result } = useGame();

    if (!result || !result.details) {
        return <div className="text-white text-center">No review details available.</div>;
    }

    // Map answers for easy lookup
    const myAnswers = answers.reduce((acc, ans) => {
        acc[ans.questionId] = ans.selectedOption;
        return acc;
    }, {} as Record<string, string>);

    const correctAnswers = result.details;

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl max-h-[60vh] overflow-y-auto px-2 custom-scrollbar">
            {questions.map((q, idx) => {
                const myAns = myAnswers[q.id];
                const correctAns = correctAnswers[q.id];
                const isCorrect = String(myAns).trim() === String(correctAns).trim();

                return (
                    <PixelCard key={q.id} className={cn("border-2 p-4", isCorrect ? "bg-green-100 border-green-800" : "bg-red-50 border-red-800")}>
                        <div className="flex flex-col gap-2 relative">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-bold bg-neutral-800 text-white px-2 py-1">Q{idx + 1}</span>
                                <span className={cn("text-xs font-bold px-2 py-1", isCorrect ? "text-green-600" : "text-red-500")}>
                                    {isCorrect ? "CORRECT" : "WRONG"}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-neutral-900 mt-2">{q.text}</h3>

                            <div className="mt-2 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className={cn("p-2 border-2", isCorrect ? "border-green-600 bg-green-200" : "border-red-400 bg-red-100")}>
                                    <span className="block font-bold mb-1 text-neutral-900">YOUR ANSWER:</span>
                                    <span className="text-neutral-900">{myAns}</span>
                                </div>
                                {!isCorrect && (
                                    <div className="p-2 border-2 border-green-600 bg-green-200">
                                        <span className="block font-bold mb-1 text-neutral-900">CORRECT ANSWER:</span>
                                        <span className="text-neutral-900">{correctAns}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </PixelCard>
                );
            })}
        </div>
    );
};
