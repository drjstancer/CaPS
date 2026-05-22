interface PageProps {
  params: {
    id: string;
  };
}

export default function AnalyticsPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-[#020B24] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-4">
          Clinical Performance Analytics
        </p>

        <h1 className="text-5xl font-black mb-8">
          Case Analytics #{params.id}
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-slate-400 text-sm mb-2">
              Student Attempts
            </p>

            <h2 className="text-5xl font-black">0</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-slate-400 text-sm mb-2">
              Correct Diagnoses
            </p>

            <h2 className="text-5xl font-black">0%</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-slate-400 text-sm mb-2">
              Avg Completion Time
            </p>

            <h2 className="text-5xl font-black">--</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
