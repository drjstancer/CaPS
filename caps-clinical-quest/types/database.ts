export type UserRole = 'student' | 'faculty' | 'admin';

export interface Profession {
  id: number;
  name: string;
  description?: string;
}

export interface CaseSummary {
  id: number;
  title: string;
  description?: string;
  difficulty?: string;
  profession_id?: number;
  published: boolean;
  created_at?: string;
}

export interface StudentProgress {
  id: number;
  user_id: string;
  case_id: number;
  completed: boolean;
  score?: number;
  completed_at?: string;
}
