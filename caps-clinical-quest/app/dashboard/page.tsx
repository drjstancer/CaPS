'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Shield,
  Stethoscope,
  LogOut,
  Plus,
} from 'lucide-react';

type StatCard = {
  title: string;
  value: string;
  sub: string;
};

type CaseSummary = {
  title: string;
  track: string;
  difficulty: string;
  attempts: number;
};

type NavItem = {
  name: string;
  icon: any;
  href: string;
};

const stats: StatCard[] = [
  {
    title: 'Active Cases',
    value: '12',
    sub: '+3 this month',
  },
  {
    title: 'Student Investigations',
    value: '1,284',
    sub: '+18% engagement',
  },
  {
    title: 'Avg Completion Score',
    value: '84%',
    sub: 'Strong performance',
  },
  {
    title: 'Most Difficult Case',
    value: 'Neurology',
    sub: '61% accuracy',
  },
];

const recentStudents = [
  {
    name: 'Jordan Ellis',
    profession: 'Emergency Medicine',
    score: '91%',
  },
  {
    name: 'Amaya Brooks',
    profession: 'Neurology',
    score: '87%',
  },
  {
    name: 'Marcus Reed',
    profession: 'Orthopedic Surgery',
    score: '94%',
  },
];

const cases: CaseSummary[] = [
  {
    title: 'The Collapse on the Court',
    track: 'Emergency Care',
    difficulty: 'Intermediate',
    attempts: 312,
  },
  {
    title: 'The Mysterious Headache',
    track: 'Diagnostics',
    difficulty: 'Beginner',
    attempts: 214,
  },
  {
    title: 'Learning to Walk Again',
    track: 'Rehabilitation',
    difficulty: 'Advanced',
    attempts: 117,
  },
];

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    name: 'Cases',
    icon: FileText,
    href: '/dashboard/cases',
  },
  {
    name: 'Professions',
    icon: Stethoscope,
    href: '/dashboard/professions',
  },
  {
    name: 'Students',
    icon: Users,
    href: '/dashboard/students',
  },
  {
    name: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
  },
  {
    name: 'Settings',
    icon: Shield,
    href: '/dashboard/settings',
  },
];

function assertDashboardData(): void {
  console.assert(stats.length === 4, 'Expected four dashboard stat cards.');
  console.assert(cases.length >= 3, 'Expected at least three sample cases.');
  console.assert(
    navItems.some((item) => item.name === 'Dashboard'),
    'Expected Dashboard navigation item.',
  );
}

export default function ClinicalQuestDashboard() {
  const [userEmail, setUserEmail] = useState<string>('faculty@missouri.edu');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    assertDashboardData();

    const storedEmail = window.localStorage.getItem('clinicalQuestUserEmail');

    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const filteredCases = cases.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.track.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleSignOut(): void {
    window.localStorage.removeItem('clinicalQuestUserEmail');
    window.location.href = '/';
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_25%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_25%)]" />

      <div className="relative z-10 flex">
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
              const isActive = item.name === 'Dashboard';

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

          <div className="mt-10 border border-white/10 rounded-3xl p-5 bg-white/[0.03]">
            <div className="mb-5 pb-5 border-b border-white/10">
              <p className="text-slate-500 text-xs uppercase tracking-[0.25em] mb-2">
                Logged In
              </p>

              <p className="text-sm text-cyan-300 break-all">
                {userEmail}
              </p>
            </div>

            <p className="text-slate-400 text-sm mb-2">
              Faculty Access
            </p>

            <h3 className="font-bold text-lg mb-2">
              Administrative Console
            </h3>

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
        </aside>

        <section className="flex-1 px-6 py-8 md:px-10 lg:px-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-10 mb-10 shadow-2xl shadow-cyan-500/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
                Faculty Dashboard
              </p>

              <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
                Clinical Quest Command Center
              </h2>

              <p className="text-xl text-slate-300 max-w-4xl leading-relaxed">
                Manage investigations, analyze student engagement, and build immersive healthcare career exploration experiences.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-7 hover:border-cyan-400/30 transition-all duration-300"
              >
                <p className="text-slate-400 text-sm mb-4 tracking-wide uppercase">
                  {stat.title}
                </p>

                <h3 className="text-4xl font-black mb-3">
                  {stat.value}
                </h3>

                <p className="text-cyan-300 text-sm">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search investigations or profession tracks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-2">
                    Investigation Management
                  </p>

                  <h3 className="text-3xl font-black">
                    Active Cases
                  </h3>
                </div>

                <button
                  type="button"
                  className="px-6 py-4 rounded-2xl bg-cyan-400 text-slate-950 font-black hover:scale-105 transition-all duration-300"
                >
                  <Plus className="inline mr-2" size={18} />
                  Create Case
                </button>
              </div>

              <div className="space-y-5">
                {filteredCases.map((item) => (
                  <div
                    key={item.title}
                    className="border border-white/10 rounded-3xl p-6 bg-white/[0.03] hover:border-cyan-400/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                      <div>
                        <h4 className="text-2xl font-black mb-3">
                          {item.title}
                        </h4>

                        <div className="flex flex-wrap gap-3">
                          <span className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs uppercase tracking-[0.25em]">
                            {item.track}
                          </span>

                          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs">
                            {item.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-slate-400 text-sm mb-1">
                          Student Attempts
                        </p>

                        <p className="text-3xl font-black text-cyan-300">
                          {item.attempts}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 flex-wrap mt-6">
                      <button
                        type="button"
                        className="px-5 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-bold hover:scale-105 transition-all duration-300"
                      >
                        Edit Case
                      </button>

                      <button
                        type="button"
                        className="px-5 py-3 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.03] transition-all duration-300"
                      >
                        View Analytics
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
                  Top Student Activity
                </p>

                <h3 className="text-3xl font-black mb-8">
                  Recent Investigators
                </h3>

                <div className="space-y-5">
                  {recentStudents.map((student) => (
                    <div
                      key={student.name}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h4 className="font-bold text-lg">
                          {student.name}
                        </h4>

                        <span className="text-cyan-300 font-black text-xl">
                          {student.score}
                        </span>
                      </div>

                      <p className="text-slate-400 text-sm">
                        Exploring: {student.profession}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
                  Student Engagement
                </p>

                <h3 className="text-3xl font-black mb-8">
                  Platform Activity
                </h3>

                <div className="space-y-6">
                  {[
                    ['Cases Completed', '78%'],
                    ['Correct First Guess', '64%'],
                    ['Average Session Length', '14m'],
                    ['Career Exploration Growth', '+22%'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">
                          {label}
                        </span>

                        <span className="font-black text-cyan-300">
                          {value}
                        </span>
                      </div>

                      <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full bg-cyan-400 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
                  Quick Actions
                </p>

                <h3 className="text-3xl font-black mb-8">
                  Faculty Tools
                </h3>

                <div className="space-y-4">
                  {[
                    'Upload New Profession',
                    'Create Investigation',
                    'View Student Rankings',
                    'Export Analytics Report',
                    'Manage Faculty Access',
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="w-full text-left px-5 py-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300 font-semibold"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
