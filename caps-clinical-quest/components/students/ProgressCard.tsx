import type { StudentProgress } from '@/types/database';

interface ProgressCardProps {
  progress: StudentProgress;
}

export default function ProgressCard({
  progress,
}: ProgressCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-cyan-400/30 transition-all duration-300">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <p className="uppercase tracking-[0.25em] text-cyan-400 text-xs mb-2">
            Investigation Progress
          </p>

          <h3 className="text-2xl font-black text-white">
            Case #{progress.case_id}
          </h3>
        </div>

        <div
          className={`px-4 py-2 rounded-full text-xs font-bold ${
            progress.completed
              ? 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-300'
              : 'bg-amber-400/10 border border-amber-400/20 text-amber-300'
          }`}
        >
          {progress.completed ? 'Completed' : 'In Progress'}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-slate-500 text-sm mb-2">
            Performance Score
          </p>

          <div className="h-3 rounded-full bg-white/5 overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: `${progress.score || 0}%` }}
            />
          </div>

          <p className="text-cyan-300 font-bold">
            {progress.score || 0}%
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Last Updated
          </span>

          <span className="text-white font-medium">
            {progress.completed_at || 'Active Session'}
          </span>
        </div>
      </div>
    </div>
  );
}
