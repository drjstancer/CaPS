'use client';

import { useState } from 'react';
import type { WorkflowStatus } from '@/lib/workflows/status';
import { workflowStatuses } from '@/lib/workflows/status';
import { updatePublicationStatus } from '@/lib/publishing/updatePublicationStatus';
import StatusIndicator from '@/components/publishing/StatusIndicator';

interface PublicationControlPanelProps {
  caseId: number;
  initialStatus?: string | null;
}

export default function PublicationControlPanel({
  caseId,
  initialStatus = 'draft',
}: PublicationControlPanelProps) {
  const [status, setStatus] = useState<WorkflowStatus>(
    initialStatus === 'published' || initialStatus === 'archived'
      ? initialStatus
      : 'draft',
  );
  const [saving, setSaving] = useState(false);

  async function handleStatusChange(nextStatus: WorkflowStatus) {
    try {
      setSaving(true);
      setStatus(nextStatus);

      await updatePublicationStatus({
        caseId,
        status: nextStatus,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
            Publication Workflow
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <h3 className="text-2xl font-black text-white">
              Visibility Status
            </h3>

            <StatusIndicator status={status} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {workflowStatuses.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleStatusChange(item)}
              disabled={saving}
              className={`rounded-2xl px-5 py-3 font-bold capitalize transition-all duration-300 ${
                item === status
                  ? 'bg-cyan-400 text-slate-950'
                  : 'border border-white/10 bg-white/[0.03] text-white hover:border-cyan-400/30'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
