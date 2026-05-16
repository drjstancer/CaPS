export type WorkflowStatus = 'draft' | 'published' | 'archived';

export const workflowStatuses: WorkflowStatus[] = [
  'draft',
  'published',
  'archived',
];

export function normalizeWorkflowStatus(
  status?: string | null,
): WorkflowStatus {
  if (
    status === 'draft' ||
    status === 'published' ||
    status === 'archived'
  ) {
    return status;
  }

  return 'draft';
}

export function isPublished(status?: string | null) {
  return normalizeWorkflowStatus(status) === 'published';
}

export function isArchived(status?: string | null) {
  return normalizeWorkflowStatus(status) === 'archived';
}

export function isLearnerVisible(status?: string | null) {
  return isPublished(status);
}

export function isFacultyVisible(status?: string | null) {
  return !isArchived(status);
}
