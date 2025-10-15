export interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  questions: QuizQuestion[];
  passing_score: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "interactive";
  question: string;
  options?: string[];
  correct_answer: string | string[];
  explanation?: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  answers: QuizAnswer[];
  completed_at: string;
}

export interface QuizAnswer {
  question_id: string;
  user_answer: string | string[];
  is_correct: boolean;
}

export interface CreateQuizInput {
  lesson_id: string;
  title: string;
  questions: Omit<QuizQuestion, "id">[];
  passing_score?: number;
}
