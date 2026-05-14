export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm mb-4">
          CaPS Clinical Quest
        </p>

        <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          Medical Mysteries
        </h1>

        <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10">
          An interactive healthcare identity-building platform designed for Medical Explorations, PAWS, JPAWS, and future outreach programming through the University of Missouri School of Medicine.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-cyan-400 text-slate-950 px-6 py-4 rounded-2xl font-bold hover:scale-105 transition-all">
            Launch Platform
          </button>

          <button className="border border-slate-700 bg-slate-900 px-6 py-4 rounded-2xl font-medium hover:bg-slate-800 transition-all">
            Explore Cases
          </button>
        </div>
      </div>
    </main>
  )
}
