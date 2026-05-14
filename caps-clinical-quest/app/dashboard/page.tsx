'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function DashboardPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
      } else {
        setEmail(user.email || '')
      }
    }

    getUser()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()

    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
              CaPS Clinical Quest
            </p>

            <h1 className="text-5xl font-black">
              Dashboard
            </h1>

            <p className="text-slate-400 mt-3">
              Logged in as:
            </p>

            <p className="text-cyan-300 text-xl font-medium">
              {email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition-all px-5 py-3 rounded-2xl font-bold"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            'Medical Mysteries',
            'Career Pathways',
            'Leaderboard',
            'Healthcare Professions',
            'Live Sessions',
            'Reflections',
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-cyan-400 transition-all"
            >
              <h2 className="text-2xl font-bold">
                {item}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}