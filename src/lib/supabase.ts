import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      study_plans: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          is_template: boolean;
          is_public: boolean;
          category: string | null;
          price: number;
          created_at: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          study_plan_id: string;
          title: string;
          content: string | null;
          order_index: number;
          estimated_duration: number;
          resources: Record<string, unknown> | null;
          created_at: string;
        };
      };
    };
  };
};
