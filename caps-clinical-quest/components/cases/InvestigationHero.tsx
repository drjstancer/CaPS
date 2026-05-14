import type { CaseSummary } from '@/types/database';

interface InvestigationHeroProps {
  caseData: CaseSummary;
}

export default function InvestigationHero({
  caseData,
}: InvestigationHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-10 shadow-2xl shadow-cyan-500/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-4xl">
        <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
          Clinical Investigation
        </p>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6 text-white">
          {caseData.title}
        </h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <span className="px-5 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm uppercase tracking-[0.25em]">
            {caseData.difficulty || 'General'}
          </span>

          <span
            className={`px-5 py-3 rounded-full text-sm font-bold ${
              caseData.published
                ? 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-300'
                : 'bg-amber-400/10 border border-amber-400/20 text-amber-300'
            }`}
          >
            {caseData.published ? 'Published' : 'Draft'}
          </span>
        </div>

        <p className="text-xl text-slate-300 leading-relaxed">
          {caseData.description ||
            'Immersive healthcare investigation experience.'}
        </p>
      </div>
    </section>
  );
}
