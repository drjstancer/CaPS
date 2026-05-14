interface CompletionPanelProps {
  score: number;
  profession?: string;
}

export default function CompletionPanel({
  score,
  profession,
}: CompletionPanelProps) {
  return (
    <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-slate-950 p-10">
      <p className="uppercase tracking-[0.35em] text-emerald-300 text-xs mb-4">
        Investigation Complete
      </p>

      <h2 className="text-5xl font-black text-white mb-6">
        Case Successfully Completed
      </h2>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-slate-400 text-sm mb-2">
            Investigation Score
          </p>

          <h3 className="text-5xl font-black text-cyan-300">
            {score}%
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-slate-400 text-sm mb-2">
            Healthcare Pathway
          </p>

          <h3 className="text-3xl font-black text-white">
            {profession || 'Medical Professional'}
          </h3>
        </div>
      </div>

      <p className="text-slate-300 text-lg leading-relaxed">
        Excellent work. You successfully evaluated the evidence,
        navigated the clinical investigation, and demonstrated
        healthcare reasoning throughout the immersive case experience.
      </p>
    </div>
  );
}
