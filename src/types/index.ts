export interface Question {
    id: string;
    text: string;
    options: string[]; // [A, B, C, D]
}

export interface GameResult {
    score: number;
    passed: boolean;
    totalQuestions: number;
    attempts?: number;
    details?: Record<string, string>;
}

export interface ApiResponse {
    success?: boolean;
    error?: string;
    questions?: Question[];
    score?: number;
    totalQuestions?: number;
    details?: Record<string, string>; // questionId -> correctAnswer
}
