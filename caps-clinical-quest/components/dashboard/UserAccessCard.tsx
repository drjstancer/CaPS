'use client';

import { LogOut } from 'lucide-react';

type UserAccessCardProps = {
  userEmail: string;
};

export default function UserAccessCard({ userEmail }: UserAccessCardProps) {
  function handleSignOut(): void {
    window.localStorage.removeItem('clinicalQuestUserEmail');
    window.location.href = '/';
  }

  return (
    <>
      <div className="mt-10 border border-white/10 rounded-3xl p-5 bg-white/[0.03]">
        <div className="mb-5 pb-5 border-b border-white/10">
          <p className="text-slate-500 text-xs uppercase tracking-[0.25em] mb-2">
            Logged In
          </p>
          <p className="text-sm text-cyan-300 break-all">{userEmail}</p>
        </div>

        <p className="text-slate-400 text-sm mb-2">Faculty Access</p>
        <h3 className="font-bold text-lg mb-2">Administrative Console</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Build cases, monitor engagement, and track healthcare career exploration outcomes.
        </p>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-6 flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500 hover:text-white transition-all duration-300"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </>
  );
}
