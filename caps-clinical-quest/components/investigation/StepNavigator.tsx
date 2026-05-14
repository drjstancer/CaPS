interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function StepNavigator({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: StepNavigatorProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentStep <= 1}
          className="w-full md:w-auto rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 font-bold text-white hover:border-cyan-400/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous Step
        </button>

        <div className="text-center">
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-2">
            Investigation Navigation
          </p>

          <h3 className="text-2xl font-black text-white">
            Step {currentStep} / {totalSteps}
          </h3>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={currentStep >= totalSteps}
          className="w-full md:w-auto rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
