interface ReviewMetricCardProps {
  label: string;
  value: string | number;
}

export default function ReviewMetricCard({
  label,
  value,
}: ReviewMetricCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
      <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
        Review Metric
      </p>

      <h3 className="text-4xl font-black text-white mb-3">
        {value}
      </h3>

      <p className="text-slate-400 leading-relaxed">
        {label}
      </p>
    </div>
  );
}
