import { supabase } from '@/lib/supabase/client';
import type { InvestigationSession } from '@/types/investigation';

export async function createSession(
  session: InvestigationSession,
) {
  const { data, error } = await supabase
    .from('student_progress')
    .insert({
      user_id: session.user_id,
      case_id: session.case_id,
      current_step: session.current_step,
      completed: session.completed,
      score: session.score,
      started_at:
        session.started_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Session creation error:', error.message);
    throw error;
  }

  return data;
}
