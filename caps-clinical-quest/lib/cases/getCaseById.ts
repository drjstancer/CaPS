import { supabase } from '@/lib/supabase/client';
import type { CaseSummary } from '@/types/database';

export async function getCaseById(id: string) {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching case:', error.message);
    return null;
  }

  return data as CaseSummary;
}
