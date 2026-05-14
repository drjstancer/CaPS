import { supabase } from '@/lib/supabase/client';
import type { CaseSummary } from '@/types/database';

interface CreateCaseInput {
  title: string;
  description?: string;
  difficulty?: string;
  profession_id?: number;
}

export async function createCase(input: CreateCaseInput) {
  const payload = {
    ...input,
    published: false,
  };

  const { data, error } = await supabase
    .from('cases')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error('Error creating case:', error.message);
    throw error;
  }

  return data as CaseSummary;
}
