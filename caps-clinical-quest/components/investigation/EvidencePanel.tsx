interface EvidencePanelProps {
  title: string;
  description: string;
  category?: string;
}

export default function EvidencePanel({
  title,
  description,
  category = 'Clinical Evidence',
}: EvidencePanelProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-3">
            {category}
          </p>

          <h3 className="text-3xl font-black text-white">
            {title}
          </h3>
        </div>

        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
      </div>

      <p className="text-slate-300 text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
}
