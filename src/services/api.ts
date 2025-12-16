import axios from 'axios';
import { Question, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;

// Mock data for development
const MOCK_QUESTIONS: Question[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `q-${i + 1}`,
    text: `Pixel Question ${i + 1}: What acts as the pixel of a Quantum computer?`,
    options: ['Bit', 'Qubit', 'Byte', 'Nibble']
}));

export const api = {
    fetchQuestions: async (count: number = 5): Promise<Question[]> => {
        if (!API_URL || API_URL.includes('YOUR_DEPLOYMENT_ID')) {
            console.warn('API URL not set, using mock data');
            return new Promise(resolve => setTimeout(() => resolve(MOCK_QUESTIONS.slice(0, count)), 800));
        }

        try {
            // GAS requires 'text/plain' for proper CORS handling sometimes or content-type checks
            // Usually simple GET is fine.
            const response = await axios.get<ApiResponse>(API_URL, {
                params: { action: 'getQuestions', count }
            });

            if (response.data.questions) {
                return response.data.questions;
            }
            throw new Error(response.data.error || 'Failed to fetch questions');
        } catch (error) {
            console.error('API getQuestions error:', error);
            throw error;
        }
    },

    submitScore: async (userId: string, answers: { questionId: string, selectedOption: string }[]) => {
        if (!API_URL || API_URL.includes('YOUR_DEPLOYMENT_ID')) {
            console.warn('API URL not set, mocking submission');
            const score = Math.floor(Math.random() * answers.length);
            return new Promise(resolve => setTimeout(() => resolve({
                success: true,
                score,
                totalQuestions: answers.length
            }), 800));
        }

        try {
            // GAS often needs POST data as stringified body to avoid complex CORS preflight issues or formatting
            // `axios` sends JSON by default.
            // We'll use specific header if needed, but standard axios post usually works with the helper function `doPost` we wrote.
            // However, sometimes sending as text/plain is safer for avoiding CORS preflights if the server is strict. 
            // But we enabled CORS in backend (conceptually).
            // Let's stick with simple JSON.
            const payload = {
                action: 'submitScore',
                payload: {
                    userId,
                    answers,
                    threshold: Number(import.meta.env.VITE_PASS_THRESHOLD) || 3
                }
            };

            const response = await axios.post(API_URL, JSON.stringify(payload), {
                headers: { 'Content-Type': 'text/plain;charset=utf-8' } // 'text/plain' prevents preflight
            });

            return response.data;
        } catch (error) {
            console.error('API submitScore error:', error);
            throw error;
        }
    }
};
