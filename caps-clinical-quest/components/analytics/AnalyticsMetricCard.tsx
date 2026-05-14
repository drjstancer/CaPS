interface AnalyticsMetricCardProps {
  label: string;
  value: number;
  description: string;
}

export default function AnalyticsMetricCard({
  label,
  value,
  description,
}: AnalyticsMetricCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 hover:border-cyan-400/30 transition-all duration-300">
      <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-4">
        {label}
      </p>

      <h3 className="text-5xl font-black text-white mb-4">
        {value.toLocaleString()}
      </h3>

      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
