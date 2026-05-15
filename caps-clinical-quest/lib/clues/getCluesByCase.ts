import { supabase } from '@/lib/supabase/client';

export interface InvestigationClue {
  id: number;
  case_id: number;
  title?: string;
  content?: string;
  step_order?: number;
  points?: number;
}

export async function getCluesByCase(
  caseId: number,
): Promise<InvestigationClue[]> {
  const { data, error } = await supabase
    .from('clues')
    .select('*')
    .eq('case_id', caseId)
    .order('step_order', { ascending: true });

  if (error) {
    console.error('Error loading clues:', error.message);
    return [];
  }

  return (
    (data || []).map((clue) => ({
      ...clue,
      content:
        clue.content || clue.clue_text || '',
      step_order:
        clue.step_order || clue.clue_order || 1,
    })) || []
  );
}
