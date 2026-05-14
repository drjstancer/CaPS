interface DiagnosisSelectorProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
}

export default function DiagnosisSelector({
  options,
  selected,
  onSelect,
}: DiagnosisSelectorProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
        Clinical Decision Point
      </p>

      <h3 className="text-3xl font-black text-white mb-6">
        Select Your Diagnosis
      </h3>

      <div className="space-y-4">
        {options.map((option) => {
          const active = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`w-full rounded-2xl border px-6 py-5 text-left transition-all duration-300 ${
                active
                  ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                  : 'border-white/10 bg-white/[0.03] text-white hover:border-cyan-400/30'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-lg">
                  {option}
                </span>

                {active && (
                  <span className="text-xs uppercase tracking-[0.25em]">
                    Selected
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
