'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/lib/dashboard-data';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-72 min-h-screen border-r border-white/10 bg-slate-950/70 backdrop-blur-xl flex-col p-8">
      <div className="mb-12">
        <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-3">
          Mizzou MedPrep
        </p>

        <h1 className="text-3xl font-black leading-tight">
          Clinical Quest
        </h1>
      </div>

      <nav className="space-y-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              href={item.href}
              key={item.name}
              className={`w-full flex items-center gap-4 text-left px-5 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300'
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
