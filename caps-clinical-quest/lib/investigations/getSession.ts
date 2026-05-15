import { supabase } from '@/lib/supabase/client';

export async function getSession(caseId: number) {
  const { data, error } = await supabase
    .from('student_progress')
    .select('*')
    .eq('case_id', caseId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Session retrieval error:', error.message);
    return null;
  }

  return data;
}
