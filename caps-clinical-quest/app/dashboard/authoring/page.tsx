'use client';

import Link from 'next/link';
import CreateInvestigationForm from '@/components/authoring/CreateInvestigationForm';

export default function AuthoringDashboardPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-10 md:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
            Faculty Authoring System
          </p>

          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Investigation Authoring
          </h1>

          <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
            Create, manage, and publish immersive healthcare investigations for pathway students, enrichment participants, and future clinical learning experiences.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <CreateInvestigationForm />

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
              <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-4">
                Clue Engine
              </p>

              <h2 className="text-3xl font-black mb-4">
                Manage Evidence
              </h2>

              <p className="text-slate-400 leading-relaxed mb-8">
                Add, reorder, and organize investigative evidence files and progression logic.
              </p>

              <button
                type="button"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 font-bold text-white"
              >
                Coming Soon
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
              <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-4">
                Publishing
              </p>

              <h2 className="text-3xl font-black mb-4">
                Publish Cases
              </h2>

              <p className="text-slate-400 leading-relaxed mb-8">
                New investigations now default to draft status. Publishing controls are available through the investigation workflow layer so faculty can move content from draft to learner-visible when ready.
              </p>

              <Link
                href="/cases"
                className="inline-flex rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 hover:scale-[1.02] transition-all duration-300"
              >
                View Learner Library
              </Link>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
              <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-4">
                Runtime Architecture
              </p>

              <h2 className="text-3xl font-black mb-4">
                Investigation Systems
              </h2>

              <p className="text-slate-400 leading-relaxed mb-8">
                Configure adaptive investigations, runtime telemetry, reflections, progression systems, and educational simulation logic.
              </p>

              <Link
                href="/dashboard/analytics"
                className="inline-flex rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 hover:scale-[1.02] transition-all duration-300"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
