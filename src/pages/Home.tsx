import React, { useState } from 'react';
import { useGame } from '../store/GameContext';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelButton } from '../components/ui/PixelButton';

export const Home: React.FC = () => {
    const { startGame, gameState, error } = useGame();
    const [inputName, setInputName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputName.trim()) {
            startGame(inputName.trim());
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] leading-tight">
                    PIXEL<br />QUIZ
                </h1>
                <p className="text-neutral-400 text-sm md:text-base animate-pulse">
                    PRESS START TO BEGIN
                </p>
            </div>

            <PixelCard className="w-full max-w-md bg-neutral-100 text-black">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="userId" className="text-base font-bold uppercase tracking-wider">
                            Enter Player ID
                        </label>
                        <input
                            id="userId"
                            type="text"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                            className="w-full border-4 border-black p-4 font-pixel text-lg focus:outline-none focus:bg-yellow-100"
                            placeholder="PLAYER-1"
                            autoComplete="off"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    )}

                    <PixelButton
                        type="submit"
                        disabled={!inputName.trim() || gameState === 'LOADING'}
                        className="w-full justify-center"
                    >
                        {gameState === 'LOADING' ? 'LOADING...' : 'START GAME'}
                    </PixelButton>
                </form>
            </PixelCard>
        </div>
    );
};
