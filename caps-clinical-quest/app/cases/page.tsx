'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

type Case = {
  id: number
  title: string
  track: string
  difficulty: string
  scenario: string
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([])

  useEffect(() => {
    async function fetchCases() {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('id')

      if (data) {
        setCases(data)
      }

      if (error) {
        console.log(error)
      }
    }

    fetchCases()
  }, [])

  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_25%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_25%)]" />

      <div className="relative z-10 px-6 py-10 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* HERO */}
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-10 md:p-14 mb-14 shadow-2xl shadow-cyan-500/10">

            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm mb-5">
                Mizzou MedPrep Interactive Platform
              </p>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                Medical Mysteries
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl">
                Investigate healthcare scenarios, reveal clinical clues,
                and discover the professionals behind patient care.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="px-5 py-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                  Investigation Library
                </div>

                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300">
                  {cases.length} Active Cases
                </div>
              </div>
            </div>
          </div>

          {/* SECTION TITLE */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
                Clinical Investigation Database
              </p>

              <h2 className="text-4xl font-black">
                Choose Your Case
              </h2>
            </div>
          </div>

          {/* CASE GRID */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {cases.map((item) => (
              <Link
                key={item.id}
                href={`/cases/${item.id}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_35%)]" />

                <div className="relative z-10 p-8 h-full flex flex-col">

                  {/* Top Tags */}
                  <div className="flex items-center gap-3 flex-wrap mb-6">

                    <span className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs uppercase tracking-[0.25em]">
                      {item.track}
                    </span>

                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs">
                      {item.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-black leading-tight mb-5 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Scenario */}
                  <p className="text-slate-300 text-lg leading-relaxed flex-grow">
                    {item.scenario}
                  </p>

                  {/* CTA */}
                  <div className="mt-8 flex items-center justify-between">

                    <span className="text-cyan-300 font-semibold tracking-wide">
                      Begin Investigation
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* EMPTY STATE */}
          {cases.length === 0 && (
            <div className="mt-20 text-center border border-dashed border-white/10 rounded-[2rem] p-16 bg-white/[0.02]">
              <h3 className="text-3xl font-black mb-4">
                No Cases Found
              </h3>

              <p className="text-slate-400 text-lg">
                Your investigation database is currently empty.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}