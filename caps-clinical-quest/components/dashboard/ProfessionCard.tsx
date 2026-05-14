import type { Profession } from '@/types/database';

interface ProfessionCardProps {
  profession: Profession;
}

export default function ProfessionCard({
  profession,
}: ProfessionCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-cyan-400/30 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="uppercase tracking-[0.25em] text-cyan-400 text-xs mb-2">
            Healthcare Pathway
          </p>

          <h3 className="text-2xl font-black text-white">
            {profession.name}
          </h3>
        </div>

        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <p className="text-slate-400 leading-relaxed min-h-[72px]">
        {profession.description ||
          'Immersive healthcare career exploration pathway.'}
      </p>

      <button
        type="button"
        className="mt-6 w-full rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 hover:scale-[1.02] transition-all duration-300"
      >
        Explore Pathway
      </button>
    </div>
  );
}
