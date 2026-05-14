export interface InvestigationSession {
  session_id?: number;

  user_id?: string;
  case_id: number;

  current_step: number;

  unlocked_clues: number[];
  selected_answers: string[];

  score: number;

  started_at?: string;
  updated_at?: string;
  completed_at?: string;

  completed: boolean;
}
