import { supabase } from '@/lib/supabase/client';

interface CreateInvestigationInput {
  title: string;
  description?: string;
  profession?: string;
  estimated_minutes?: number;
}

export async function createInvestigation(
  input: CreateInvestigationInput,
) {
  const { data, error } = await supabase
    .from('cases')
    .insert({
      ...input,
      publication_status: 'draft',
      published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Investigation creation error:', error.message);
    throw error;
  }

  return data;
}
