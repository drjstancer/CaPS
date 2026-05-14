interface StatCardProps {
  title: string;
  value: string;
  sub: string;
}

export default function StatCard({
  title,
  value,
  sub,
}: StatCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-7 hover:border-cyan-400/30 transition-all duration-300">
      <p className="text-slate-400 text-sm mb-4 tracking-wide uppercase">
        {title}
      </p>

      <h3 className="text-4xl font-black mb-3">
        {value}
      </h3>

      <p className="text-cyan-300 text-sm">
        {sub}
      </p>
    </div>
  );
}
