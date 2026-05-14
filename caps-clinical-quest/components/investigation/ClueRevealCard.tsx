interface ClueRevealCardProps {
  title: string;
  content: string;
  unlocked: boolean;
  onReveal?: () => void;
}

export default function ClueRevealCard({
  title,
  content,
  unlocked,
  onReveal,
}: ClueRevealCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-3">
            Clinical Evidence
          </p>

          <h3 className="text-3xl font-black text-white">
            {title}
          </h3>
        </div>

        <div
          className={`px-4 py-2 rounded-full text-xs font-bold ${
            unlocked
              ? 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-300'
              : 'bg-slate-700 border border-slate-600 text-slate-300'
          }`}
        >
          {unlocked ? 'Unlocked' : 'Locked'}
        </div>
      </div>

      {unlocked ? (
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            {content}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-slate-500 leading-relaxed">
            Additional investigation evidence is currently locked.
            Continue progressing through the case to unlock this clue.
          </p>

          <button
            type="button"
            onClick={onReveal}
            className="rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-slate-950 hover:scale-[1.02] transition-all duration-300"
          >
            Reveal Evidence
          </button>
        </div>
      )}
    </div>
  );
}
