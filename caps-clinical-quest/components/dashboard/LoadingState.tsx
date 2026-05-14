export default function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-6">
        <div className="w-14 h-14 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />

        <div className="text-center">
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-3">
            Clinical Quest
          </p>

          <h3 className="text-2xl font-black text-white mb-2">
            Loading Investigations
          </h3>

          <p className="text-slate-400 text-sm">
            Preparing immersive healthcare experiences...
          </p>
        </div>
      </div>
    </div>
  );
}
