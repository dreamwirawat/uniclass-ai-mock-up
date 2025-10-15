export interface StudyPlan {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_template: boolean;
  is_public: boolean;
  category: string | null;
  price: number;
  created_at: string;
  updated_at?: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  study_plan_id: string;
  title: string;
  content: string | null;
  order_index: number;
  estimated_duration: number; // minutes
  resources: LessonResource[] | null;
  created_at: string;
  updated_at?: string;
}

export interface LessonResource {
  type: "link" | "file" | "video" | "document";
  title: string;
  url: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completion_date: string | null;
  notes: string | null;
}

export type StudyPlanCategory =
  | "IELTS"
  | "University Entrance"
  | "Programming"
  | "Mathematics"
  | "Science"
  | "Language"
  | "Business"
  | "Design"
  | "Other";

export interface CreateStudyPlanInput {
  title: string;
  description?: string;
  category?: string;
  is_public?: boolean;
  is_template?: boolean;
}

export interface CreateLessonInput {
  study_plan_id: string;
  title: string;
  content?: string;
  order_index: number;
  estimated_duration?: number;
  resources?: LessonResource[];
}
