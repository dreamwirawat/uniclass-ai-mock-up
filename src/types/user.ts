export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface UserProgress {
  total_lessons: number;
  completed_lessons: number;
  total_study_time: number; // minutes
  current_streak: number; // days
  longest_streak: number; // days
  quiz_average_score: number;
}
