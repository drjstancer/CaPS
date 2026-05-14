import { supabase } from '@/lib/supabase/client';

interface SubmitReflectionInput {
  user_id?: string;
  case_id: number;
  reflection_text: string;
}

export async function submitReflection({
  user_id,
  case_id,
  reflection_text,
}: SubmitReflectionInput) {
  const { data, error } = await supabase
    .from('reflections')
    .insert({
      user_id,
      case_id,
      reflection_text,
    })
    .select()
    .single();

  if (error) {
    console.error('Reflection submission error:', error.message);
    throw error;
  }

  return data;
}
