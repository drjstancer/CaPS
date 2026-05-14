export type UserRole = 'student' | 'faculty' | 'admin';

export interface Profession {
  id: number;

  name: string;
  slug?: string;

  category?: string;
  description?: string;

  education?: string;
  salary?: string;
  work_environment?: string;
  skills?: string;

  icon?: string;
  color?: string;
  image_url?: string;

  created_at?: string;
  updated_at?: string;
}

export interface CaseSummary {
  id: number;

  title: string;
  slug?: string;

  description?: string;
  scenario?: string;

  difficulty?: string;

  profession?: string;
  profession_id?: number;

  published: boolean;

  estimated_minutes?: number;
  thumbnail_url?: string;

  created_at?: string;
  updated_at?: string;
}

export interface StudentProgress {
  id: number;

  user_id?: string;
  case_id: number;

  current_step?: number;

  completed: boolean;

  score?: number;

  time_spent_seconds?: number;

  started_at?: string;
  completed_at?: string;
  updated_at?: string;
}
