import { supabase } from '@/lib/supabase/client';
import type { InvestigationSession } from '@/types/investigation';

export async function updateSession(
  sessionId: number,
  updates: Partial<InvestigationSession>,
) {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('student_progress')
    .update(payload)
    .eq('id', sessionId)
    .select()
    .single();

  if (error) {
    console.error('Session update error:', error.message);
    throw error;
  }

  return data;
}
