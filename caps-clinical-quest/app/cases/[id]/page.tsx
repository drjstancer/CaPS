'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type Case = {
  id: number
  title: string
  track: string
  difficulty: string
  scenario: string
  profession: string
}

type Clue = {
  id: number
  clue_text: string
  clue_order: number
}

export default function CasePage({
  params,
}: {
  params: { id: string }
}) {
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [clues, setClues] = useState<Clue[]>([])
  const [visibleClues, setVisibleClues] = useState(1)
  const [started, setStarted] = useState(false)
  const [guess, setGuess] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [professionData, setProfessionData] = useState<any>(null)

  useEffect(() => {
    async function fetchCase() {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', params.id)
        .single()

      if (data) {
        setCaseData(data)

        const { data: professionInfo } = await supabase
          .from('professions')
          .select('*')
          .eq('name', data.profession)
          .single()

        if (professionInfo) {
          setProfessionData(professionInfo)
        }
      }

      const { data: clueData } = await supabase
        .from('clues')
        .select('*')
        .eq('case_id', Number(params.id))
        .order('clue_order')

      if (clueData) {
        setClues(clueData)
      }

      if (error) {
        console.log(error)
      }
    }

    fetchCase()
  }, [params.id])

  if (!caseData) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Loading case...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Atmosphere */}
      
      <div className="relative z-10 px-6 py-10 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">

          {/* HERO SECTION */}
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-10 md:p-14 mb-10 shadow-2xl shadow-cyan-500/10">

            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm tracking-[0.2em] uppercase">
                  {caseData.track}
                </span>

                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm">
                  Difficulty: {caseData.difficulty}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
                {caseData.title}
              </h1>

              <div className="max-w-4xl">
                <p className="text-xl md:text-2xl leading-relaxed text-slate-300">
                  {caseData.scenario}
                </p>
              </div>
            </div>
          </div>

          {/* START BUTTON */}
          {!started && (
            <div className="flex justify-center mb-12">
              <button
                onClick={() => setStarted(true)}
                className="group relative overflow-hidden bg-cyan-400 text-slate-950 px-10 py-5 rounded-3xl font-black text-xl shadow-2xl shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="relative z-10">
                  Begin Investigation
                </span>
              </button>
            </div>
          )}

          {/* CLUES SECTION */}
          {started && (
            <div className="mb-14">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-cyan-400" />

                <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                  Investigative Clues
                </h2>
              </div>

              <div className="space-y-6">
                {clues.slice(0, visibleClues).map((clue, index) => (
                  <div
                    key={clue.id}
                    className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-md p-8 shadow-xl hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 flex gap-6 items-start">
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-black text-xl">
                        {index + 1}
                      </div>

                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300 mb-2">
                          Evidence File
                        </p>

                        <p className="text-xl md:text-2xl text-slate-100 leading-relaxed">
                          {clue.clue_text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleClues < clues.length && (
                <div className="mt-8">
                  <button
                    onClick={() => setVisibleClues(visibleClues + 1)}
                    className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 px-8 py-4 rounded-2xl font-bold hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300"
                  >
                    Reveal Next Clue
                  </button>
                </div>
              )}
            </div>
          )}

          {/* GUESS SECTION */}
          {started && (
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-10 shadow-2xl mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-cyan-400" />

                <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                  Who Dunnit?
                </h2>
              </div>

              <div className="max-w-2xl">
                <input
                  type="text"
                  placeholder="Enter healthcare profession..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="w-full bg-slate-800/70 border border-slate-700 rounded-2xl px-6 py-5 text-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-6"
                />

                <button
                  onClick={() => setSubmitted(true)}
                  className="bg-cyan-400 text-slate-950 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/20"
                >
                  Submit Guess
                </button>
              </div>

              {submitted && (
                <div className="mt-10">
                  {guess.toLowerCase() ===
                  caseData.profession.toLowerCase() ? (
                    <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-8 mb-10">
                      <p className="uppercase tracking-[0.2em] text-green-300 text-sm mb-3">
                        Investigation Result
                      </p>

                      <h3 className="text-4xl font-black text-green-200 mb-4">
                        Correct!
                      </h3>

                      <p className="text-xl text-slate-200">
                        The healthcare professional was:
                        <span className="text-cyan-300 font-black">
                          {' '}
                          {caseData.profession}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 mb-10">
                      <p className="uppercase tracking-[0.2em] text-red-300 text-sm mb-3">
                        Investigation Result
                      </p>

                      <h3 className="text-4xl font-black text-red-200 mb-4">
                        Not Quite
                      </h3>

                      <p className="text-xl text-slate-200">
                        The healthcare professional was:
                        <span className="text-cyan-300 font-black">
                          {' '}
                          {caseData.profession}
                        </span>
                      </p>
                    </div>
                  )}

                  {professionData && (
                    <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 to-cyan-950/30 p-8 md:p-10 shadow-2xl shadow-cyan-500/10">
                        <img
  src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1600&auto=format&fit=crop"
  alt="Medical Investigation"
  className="absolute inset-0 w-full h-full object-cover opacity-20"
/>
                      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />

                      <div className="relative z-20">
                        <p className="uppercase tracking-[0.2em] text-cyan-300 text-sm mb-3">
                          Career Exploration
                        </p>

                        <h2 className="text-5xl font-black mb-8">
                          {professionData.name}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                          <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6">
                            <p className="text-slate-400 mb-2">
                              Category
                            </p>

                            <p className="text-xl font-bold mb-6">
                              {professionData.category}
                            </p>

                            <p className="text-slate-400 mb-2">
                              Education
                            </p>

                            <p className="text-lg leading-relaxed">
                              {professionData.education}
                            </p>
                          </div>

                          <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6">
                            <p className="text-slate-400 mb-2">
                              Work Environment
                            </p>

                            <p className="text-lg leading-relaxed mb-6">
                              {professionData.work_environment}
                            </p>

                            <p className="text-slate-400 mb-2">
                              Average Salary
                            </p>

                            <p className="text-xl font-bold text-cyan-300">
                              {professionData.salary}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-8 mb-8">
                          <p className="text-slate-400 mb-4 uppercase tracking-[0.2em] text-sm">
                            What They Do
                          </p>

                          <p className="text-xl leading-relaxed text-slate-200">
                            {professionData.description}
                          </p>
                        </div>

                        <div className="rounded-3xl bg-cyan-500/10 border border-cyan-400/20 p-8">
                          <p className="text-slate-300 uppercase tracking-[0.2em] text-sm mb-4">
                            Key Skills
                          </p>

                          <p className="text-2xl font-bold text-cyan-100 leading-relaxed">
                            {professionData.skills}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}