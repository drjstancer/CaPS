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
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-10">
          Medical Mysteries
        </h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
       {cases.map((item) => (
  <Link
    href={`/cases/${item.id}`}
    key={item.id}
    className="bg-slate-900 border border-slate-800 rounded-3xl p-6 block hover:border-cyan-400 transition-all"
  >
    <p className="text-cyan-400 text-sm mb-2">
      {item.track}
    </p>

    <h2 className="text-2xl font-bold mb-4">
      {item.title}
    </h2>

    <p className="text-slate-400 mb-4">
      Difficulty: {item.difficulty}
    </p>

    <p className="text-slate-300">
      {item.scenario}
    </p>
  </Link>
))}
        </div>
      </div>
    </main>
  )
}