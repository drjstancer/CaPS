export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3 text-center">
          CaPS Clinical Quest
        </p>

        <h1 className="text-4xl font-black text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Sign in to continue your healthcare exploration journey.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="student@email.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-400 text-slate-950 font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
}
