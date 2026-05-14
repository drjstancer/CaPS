interface CaseStatusBadgeProps {
  published: boolean;
}

export default function CaseStatusBadge({
  published,
}: CaseStatusBadgeProps) {
  return (
    <span
      className={`px-4 py-2 rounded-full text-xs font-bold ${
        published
          ? 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-300'
          : 'bg-amber-400/10 border border-amber-400/20 text-amber-300'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  );
}
