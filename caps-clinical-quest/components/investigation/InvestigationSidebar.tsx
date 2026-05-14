interface InvestigationSidebarProps {
  currentStep: number;
  totalSteps: number;
  unlockedClues: number[];
}

export default function InvestigationSidebar({
  currentStep,
  totalSteps,
  unlockedClues,
}: InvestigationSidebarProps) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sticky top-6">
      <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
        Investigation Navigator
      </p>

      <h3 className="text-3xl font-black text-white mb-8">
        Case Progression
      </h3>

      <div className="space-y-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;

          const unlocked = unlockedClues.includes(step);
          const active = currentStep === step;

          return (
            <div
              key={step}
              className={`rounded-2xl border px-5 py-4 transition-all duration-300 ${
                active
                  ? 'border-cyan-400 bg-cyan-400/10'
                  : unlocked
                    ? 'border-emerald-400/20 bg-emerald-400/5'
                    : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-1">
                    Investigation Step
                  </p>

                  <h4 className="text-lg font-bold text-white">
                    Step {step}
                  </h4>
                </div>

                <div
                  className={`w-4 h-4 rounded-full ${
                    active
                      ? 'bg-cyan-400'
                      : unlocked
                        ? 'bg-emerald-400'
                        : 'bg-slate-600'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
