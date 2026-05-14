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

      if (data) setCases(data)
      if (error) console.log(error)
    }

    fetchCases()
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-8 py-24 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto">
          <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm mb-6">
            Mizzou MedPrep Interactive Platform
          </p>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
            Medical Mysteries
          </h1>

          <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed">
            Investigate healthcare scenarios, reveal clinical clues, and discover the professionals behind patient care.
          </p>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-cyan-300 uppercase tracking-[0.2em] text-sm mb-3">
                Investigation Library
              </p>

              <h2 className="text-4xl font-black">
                Choose Your Case
              </h2>
            </div>

            <div className="text-slate-400">
              {cases.length} Active Cases
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {cases.map((item) => (
              <Link
                href={`/cases/${item.id}`}
                key={item.id}
                className="group rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs uppercase tracking-[0.2em]">
                    {item.track}
                  </span>

                  <span className="text-slate-500 text-sm">
                    {item.difficulty}
                  </span>
                </div>

                <h3 className="text-3xl font-black mb-5 leading-tight group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 leading-relaxed mb-8">
                  {item.scenario}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <span className="text-cyan-300 font-bold">
                    Begin Investigation
                  </span>

                  <span className="text-2xl">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
