'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Account created successfully! Check your email.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3 text-center">
          CaPS Clinical Quest
        </p>

        <h1 className="text-4xl font-black text-center mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Begin your healthcare exploration journey.
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-cyan-400 text-slate-950 font-bold py-4 rounded-2xl"
          >
            Create Account
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-sm text-cyan-300">
            {message}
          </p>
        )}
      </div>
    </main>
  )
}