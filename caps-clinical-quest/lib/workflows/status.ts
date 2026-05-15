export type WorkflowStatus = 'draft' | 'published' | 'archived';

export function isPublished(status: WorkflowStatus) {
  return status === 'published';
}

export function isArchived(status: WorkflowStatus) {
  return status === 'archived';
}
