import { normalizeWorkflowStatus } from '@/lib/workflows/status';

interface StatusIndicatorProps {
  status?: string | null;
}

const styles = {
  draft: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  published: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  archived: 'border-slate-400/20 bg-slate-400/10 text-slate-300',
};

export default function StatusIndicator({
  status,
}: StatusIndicatorProps) {
  const normalizedStatus = normalizeWorkflowStatus(status);

  return (
    <span
      className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] ${styles[normalizedStatus]}`}
    >
      {normalizedStatus}
    </span>
  );
}
