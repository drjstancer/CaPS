import { supabase } from '@/lib/supabase/client';
import type { Profession } from '@/types/database';

export async function getProfessions(): Promise<Profession[]> {
  const { data, error } = await supabase
    .from('professions')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching professions:', error.message);
    return [];
  }

  return (data as Profession[]) || [];
}
