export interface ChatMessage {
  id: string;
  user_id: string;
  lesson_id: string | null;
  role: "user" | "assistant";
  content: string;
  context: string | null; // highlighted text
  created_at: string;
}

export interface ChatSession {
  id: string;
  lesson_id: string | null;
  messages: ChatMessage[];
}

export interface CreateMessageInput {
  lesson_id?: string;
  content: string;
  context?: string;
}

export interface AISettings {
  user_id: string;
  model: "gpt-4" | "gpt-4-turbo-preview" | "gpt-3.5-turbo";
  teaching_style: "strict" | "encouraging" | "socratic" | "friendly";
  character_avatar: string | null;
  preferences: Record<string, unknown> | null;
}
