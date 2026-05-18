import { supabase } from '@/lib/supabase/client';
import type { WorkflowStatus } from '@/lib/workflows/status';
import { normalizeWorkflowStatus } from '@/lib/workflows/status';

type UpdatePublicationStatusInput = {
  caseId: number;
  status: WorkflowStatus | string | null;
};

export async function updatePublicationStatus({
  caseId,
  status,
}: UpdatePublicationStatusInput) {
  const normalizedStatus = normalizeWorkflowStatus(status);

  const { data, error } = await supabase
    .from('clinical_cases')
    .update({
      status: normalizedStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', caseId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
