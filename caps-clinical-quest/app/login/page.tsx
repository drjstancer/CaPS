'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    document.cookie = `clinicalquest-session=active; path=/`;

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[2rem] border border-cyan-500/20 bg-slate-950/80 p-10 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
        <div className="mb-10 text-center">
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
            Mizzou MedPrep
          </p>

          <h1 className="text-5xl font-black mb-4">
            Clinical Quest
          </h1>

          <p className="text-slate-400">
            Faculty & Student Access Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-400 px-5 py-4 font-black text-slate-950 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Access Platform'}
          </button>
        </form>
      </div>
    </main>
  );
}
