import { supabase } from '@/lib/supabase/client';

interface SaveProgressInput {
  user_id?: string;
  case_id: number;
  current_step?: number;
  completed?: boolean;
  score?: number;
  time_spent_seconds?: number;
}

export async function saveProgress({
  user_id,
  case_id,
  current_step = 1,
  completed = false,
  score,
  time_spent_seconds = 0,
}: SaveProgressInput) {
  const payload = {
    user_id,
    case_id,
    current_step,
    completed,
    score,
    time_spent_seconds,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('student_progress')
    .upsert(payload)
    .select()
    .single();

  if (error) {
    console.error('Error saving progress:', error.message);
    throw error;
  }

  return data;
}
