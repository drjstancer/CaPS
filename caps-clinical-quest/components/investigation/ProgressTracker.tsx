interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressTracker({
  currentStep,
  totalSteps,
}: ProgressTrackerProps) {
  const progressPercent =
    (currentStep / totalSteps) * 100;

  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-2">
            Investigation Progress
          </p>

          <h3 className="text-2xl font-black text-white">
            Step {currentStep} of {totalSteps}
          </h3>
        </div>

        <div className="text-cyan-300 text-3xl font-black">
          {Math.round(progressPercent)}%
        </div>
      </div>

      <div className="h-4 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
