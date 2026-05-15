import { supabase } from '@/lib/supabase/client';

export interface DiagnosisOption {
  label: string;
  correct?: boolean;
  points?: number;
}

export async function getDiagnosisOptions(caseId: number) {
  const { data, error } = await supabase
    .from('cases')
    .select('diagnosis_options')
    .eq('id', caseId)
    .single();

  if (error) {
    console.error('Diagnosis option retrieval error:', error.message);
    return [];
  }

  return (data?.diagnosis_options || []) as DiagnosisOption[];
}
