export interface StudySession {
  id: string;
  user_id: string;
  lesson_id: string;
  scheduled_start: string;
  scheduled_end: string;
  actual_start: string | null;
  actual_end: string | null;
  notes: string | null;
  lesson?: {
    id: string;
    title: string;
    study_plan_id: string;
  };
}

export interface CreateSessionInput {
  lesson_id: string;
  scheduled_start: string;
  scheduled_end: string;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource?: {
    lesson_id: string;
    study_plan_id: string;
  };
}
