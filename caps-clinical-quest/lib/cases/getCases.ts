import { supabase } from '@/lib/supabase/client';
import type { CaseSummary } from '@/types/database';

export async function getCases(): Promise<CaseSummary[]> {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching cases:', error.message);
    return [];
  }

  return (
    (data as CaseSummary[]).map((item) => ({
      ...item,
      description: item.description || item.scenario,
    })) || []
  );
}
