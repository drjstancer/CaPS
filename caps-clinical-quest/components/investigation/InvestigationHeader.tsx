interface InvestigationHeaderProps {
  title: string;
  subtitle?: string;
}

export default function InvestigationHeader({
  title,
  subtitle,
}: InvestigationHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-10 shadow-2xl shadow-cyan-500/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-4xl">
        <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
          Clinical Quest Investigation
        </p>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6 text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xl text-slate-300 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
