interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = 'Something went wrong.',
}: ErrorStateProps) {
  return (
    <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center">
      <p className="uppercase tracking-[0.35em] text-red-300 text-xs mb-4">
        Clinical Quest Error
      </p>

      <h3 className="text-3xl font-black text-white mb-3">
        Unable to Load Data
      </h3>

      <p className="text-red-200 max-w-xl mx-auto leading-relaxed">
        {message}
      </p>
    </div>
  );
}
