import React, { createContext, useContext, useState } from 'react';
import { Question, GameResult } from '../types';
import { api } from '../services/api';

type GameState = 'ID_INPUT' | 'LOADING' | 'PLAYING' | 'SUBMITTING' | 'RESULT' | 'ERROR';

interface GameContextType {
    userId: string;
    gameState: GameState;
    questions: Question[];
    currentQuestionIndex: number;
    answers: { questionId: string; selectedOption: string }[];
    result: GameResult | null;
    error: string | null;

    startGame: (id: string) => Promise<void>;
    selectAnswer: (option: string) => void;
    nextQuestion: () => void; // or combined with selectAnswer?
    restartGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [gameState, setGameState] = useState<GameState>('ID_INPUT');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ questionId: string; selectedOption: string }[]>([]);
    const [result, setResult] = useState<GameResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startGame = async (id: string) => {
        setUserId(id);
        setGameState('LOADING');
        setError(null);
        try {
            const count = Number(import.meta.env.VITE_QUESTION_COUNT) || 5;
            const data = await api.fetchQuestions(count);
            setQuestions(data);
            setCurrentQuestionIndex(0);
            setAnswers([]);
            setResult(null);
            setGameState('PLAYING');
        } catch (err) {
            console.error(err);
            setError('Failed to load questions. Please try again.');
            setGameState('ID_INPUT'); // Return to start
        }
    };

    const selectAnswer = async (option: string) => {
        if (gameState === 'SUBMITTING') return;

        const currentQ = questions[currentQuestionIndex];
        if (!currentQ) return;

        const newAnswers = [...answers, { questionId: currentQ.id, selectedOption: option }];
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Game Over
            setGameState('SUBMITTING');
            try {
                const res = await api.submitScore(userId, newAnswers);
                // Map any generic response to GameResult structure if needed, or assume API returns matching shape
                // Our API mock returns { success, score, totalQuestions }
                // We might want more details like 'passed' from server or calc locally.
                const passed = (res as any).score >= (Number(import.meta.env.VITE_PASS_THRESHOLD) || 3);

                setResult({
                    score: (res as any).score,
                    totalQuestions: (res as any).totalQuestions,
                    passed: passed,
                    details: (res as any).details
                });
                setGameState('RESULT');
            } catch (err) {
                console.error(err);
                setError('Failed to submit score. Your result might not be saved.');
                // Still show result if possible? Or error state.
                setGameState('RESULT'); // Show result screen anyway but with warning?
                // simple fallback
                const score = newAnswers.length; // Just dummy
                setResult({ score, totalQuestions: questions.length, passed: false });
            }
        }
    };

    const nextQuestion = () => {
        // handled in selectAnswer for immediate transition, or separate if we want "Confirm" button
    };

    const restartGame = () => {
        setGameState('ID_INPUT');
        setQuestions([]);
        setAnswers([]);
        setResult(null);
        setUserId(''); // Reset ID or keep it? Requirement: 首頁需輸入 ID. Maybe keep it for UX?
        // "首頁：使用者需輸入「ID」才能開始遊戲" -> implies going back to home page.
        // If "Replay" means same user, maybe skip ID input?
        // Let's go to ID_INPUT to be safe and allow changing ID.
    };

    return (
        <GameContext.Provider value={{
            userId, gameState, questions, currentQuestionIndex, answers, result, error,
            startGame, selectAnswer, nextQuestion, restartGame
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};
