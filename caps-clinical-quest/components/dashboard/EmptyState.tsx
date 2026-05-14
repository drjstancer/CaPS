interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'No Investigations Found',
  description = 'Create your first immersive healthcare investigation to begin building the platform.',
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-12 text-center">
      <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
        Clinical Quest
      </p>

      <h3 className="text-4xl font-black text-white mb-4">
        {title}
      </h3>

      <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}
