import { supabase } from '@/lib/supabase/client';
import type { StudentProgress } from '@/types/database';

export async function getStudentProgress(userId?: string) {
  let query = supabase
    .from('student_progress')
    .select('*')
    .order('updated_at', { ascending: false });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching student progress:', error.message);
    return [];
  }

  return (data as StudentProgress[]) || [];
}
