'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Shield,
  Stethoscope,
  LogOut,
  Plus,
  X,
  Trash2,
  Pencil,
  TrendingUp,
} from 'lucide-react';

type CaseSummary = {
  id: number;
  title: string;
  track: string;
  difficulty: string;
  attempts: number;
  published: boolean;
  lastUpdated: string;
};

type NavItem = {
  name: string;
  icon: any;
  href: string;
};

const initialCases: CaseSummary[] = [
  {
    id: 1,
    title: 'The Collapse on the Court',
    track: 'Emergency Care',
    difficulty: 'Intermediate',
    attempts: 312,
    published: true,
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    title: 'The Mysterious Headache',
    track: 'Diagnostics',
    difficulty: 'Beginner',
    attempts: 214,
    published: true,
    lastUpdated: 'Yesterday',
  },
  {
    id: 3,
    title: 'Learning to Walk Again',
    track: 'Rehabilitation',
    difficulty: 'Advanced',
    attempts: 117,
    published: false,
    lastUpdated: '3 days ago',
  },
];

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Cases', icon: FileText, href: '/dashboard/cases' },
  { name: 'Professions', icon: Stethoscope, href: '/dashboard/professions' },
  { name: 'Students', icon: Users, href: '/dashboard/students' },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { name: 'Settings', icon: Shield, href: '/dashboard/settings' },
];

const recentStudents = [
  { name: 'Jordan Ellis', profession: 'Emergency Medicine', score: '91%' },
  { name: 'Amaya Brooks', profession: 'Neurology', score: '87%' },
  { name: 'Marcus Reed', profession: 'Orthopedic Surgery', score: '94%' },
];

const trendData = [72, 88, 64, 91, 76];

export default function ClinicalQuestDashboard() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState('faculty@missouri.edu');
  const [cases, setCases] = useState<CaseSummary[]>(initialCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCase, setEditingCase] = useState<number | null>(null);
  const [newCaseTitle, setNewCaseTitle] = useState('');
  const [newCaseTrack, setNewCaseTrack] = useState('Emergency Care');
  const [newCaseDifficulty, setNewCaseDifficulty] = useState('Beginner');

  useEffect(() => {
    const storedEmail = window.localStorage.getItem('clinicalQuestUserEmail');
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const filteredCases = cases
    .filter((item) => {
      if (selectedFilter === 'Published') return item.published;
      if (selectedFilter === 'Drafts') return !item.published;
      return true;
    })
    .filter((item) => {
      const value = searchTerm.toLowerCase();
      return item.title.toLowerCase().includes(value) || item.track.toLowerCase().includes(value);
    });

  function handleCreateCase(): void {
    if (!newCaseTitle.trim()) return;

    const createdCase: CaseSummary = {
      id: Date.now(),
      title: newCaseTitle.trim(),
      track: newCaseTrack,
      difficulty: newCaseDifficulty,
      attempts: 0,
      published: false,
      lastUpdated: 'Just now',
    };

    setCases([createdCase, ...cases]);
    setNewCaseTitle('');
    setNewCaseTrack('Emergency Care');
    setNewCaseDifficulty('Beginner');
    setShowCreateModal(false);
  }

  function handleDeleteCase(id: number): void {
    setCases(cases.filter((item) => item.id !== id));
  }

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
            <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-3">Mizzou MedPrep</p>
            <h1 className="text-3xl font-black leading-tight">Clinical Quest</h1>
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

          <div className="mt-10 border border-white/10 rounded-3xl p-5 bg-white/[0.03]">
            <p className="text-slate-500 text-xs uppercase tracking-[0.25em] mb-2">Logged In</p>
            <p className="text-sm text-cyan-300 break-all mb-5 pb-5 border-b border-white/10">{userEmail}</p>
            <h3 className="font-bold text-lg mb-2">Administrative Console</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Build cases, monitor engagement, and track healthcare career exploration outcomes.</p>
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
          <div className="lg:hidden flex items-center justify-between mb-6 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-5">
            <div>
              <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-1">Clinical Quest</p>
              <h2 className="text-2xl font-black">Faculty Console</h2>
            </div>
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-10 mb-10 shadow-2xl shadow-cyan-500/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full" />
            <div className="relative z-10">
              <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">Faculty Dashboard</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">Clinical Quest Command Center</h2>
              <p className="text-xl text-slate-300 max-w-4xl leading-relaxed">Manage investigations, analyze student engagement, and build immersive healthcare career exploration experiences.</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-10">
            {[
              ['Active Cases', String(cases.length), '+3 this month'],
              ['Published Cases', String(cases.filter((item) => item.published).length), 'Student-facing'],
              ['Draft Cases', String(cases.filter((item) => !item.published).length), 'Needs review'],
              ['Avg Completion Score', '84%', 'Strong performance'],
            ].map(([title, value, sub]) => (
              <div key={title} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-7 hover:border-cyan-400/30 transition-all duration-300">
                <p className="text-slate-400 text-sm mb-4 tracking-wide uppercase">{title}</p>
                <h3 className="text-4xl font-black mb-3">{value}</h3>
                <p className="text-cyan-300 text-sm">{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex gap-3 flex-wrap w-full">
                  {['All', 'Published', 'Drafts'].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        selectedFilter === filter ? 'bg-cyan-400 text-slate-950' : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Search investigations or profession tracks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />

                <div>
                  <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-2">Investigation Management</p>
                  <h3 className="text-3xl font-black">Active Cases</h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-4 rounded-2xl bg-cyan-400 text-slate-950 font-black hover:scale-105 transition-all duration-300"
                >
                  <Plus className="inline mr-2" size={18} />
                  Create Case
                </button>
              </div>

              <div className="space-y-5">
                {filteredCases.map((item) => (
                  <div key={item.id} className="border border-white/10 rounded-3xl p-6 bg-white/[0.03] hover:border-cyan-400/30 transition-all duration-300">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                      <div>
                        <h4 className="text-2xl font-black mb-3">{item.title}</h4>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs uppercase tracking-[0.25em]">{item.track}</span>
                          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs">{item.difficulty}</span>
                          <span className={`px-4 py-2 rounded-full text-xs font-bold ${item.published ? 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-300' : 'bg-amber-400/10 border border-amber-400/20 text-amber-300'}`}>
                            {item.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">Updated {item.lastUpdated}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-slate-400 text-sm mb-1">Student Attempts</p>
                        <p className="text-3xl font-black text-cyan-300">{item.attempts}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 flex-wrap mt-6">
                      <button
                        type="button"
                        onClick={() => setEditingCase(editingCase === item.id ? null : item.id)}
                        className="px-5 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-bold hover:scale-105 transition-all duration-300"
                      >
                        <Pencil className="inline mr-2" size={16} />
                        {editingCase === item.id ? 'Editing...' : 'Edit Case'}
                      </button>

                      <button type="button" className="px-5 py-3 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.03] transition-all duration-300">
                        <TrendingUp className="inline mr-2" size={16} />
                        View Analytics
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCase(item.id)}
                        className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        <Trash2 className="inline mr-2" size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">Top Student Activity</p>
                <h3 className="text-3xl font-black mb-8">Recent Investigators</h3>
                <div className="space-y-5">
                  {recentStudents.map((student) => (
                    <div key={student.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h4 className="font-bold text-lg">{student.name}</h4>
                        <span className="text-cyan-300 font-black text-xl">{student.score}</span>
                      </div>
                      <p className="text-slate-400 text-sm">Exploring: {student.profession}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">Investigation Insights</p>
                <h3 className="text-3xl font-black mb-8">Performance Trends</h3>
                <div className="space-y-5">
                  {trendData.map((value, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2 text-sm text-slate-400">
                        <span>Week {index + 1}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-4 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
          <div className="w-full max-w-2xl rounded-[2rem] border border-cyan-400/20 bg-slate-950 p-8 shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-2">Investigation Builder</p>
                <h2 className="text-4xl font-black">Create New Case</h2>
              </div>
              <button type="button" onClick={() => setShowCreateModal(false)} className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-red-500 transition-all duration-300 flex items-center justify-center">
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5">
              <input type="text" placeholder="Case Title" value={newCaseTitle} onChange={(e) => setNewCaseTitle(e.target.value)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400" />

              <select value={newCaseTrack} onChange={(e) => setNewCaseTrack(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
                <option>Emergency Care</option>
                <option>Diagnostics</option>
                <option>Surgery</option>
                <option>Rehabilitation</option>
              </select>

              <select value={newCaseDifficulty} onChange={(e) => setNewCaseDifficulty(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <textarea rows={5} placeholder="Describe the scenario..." className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400" />

              <div className="flex gap-4 justify-end mt-4 flex-wrap">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300">Cancel</button>
                <button type="button" onClick={handleCreateCase} className="px-6 py-4 rounded-2xl bg-emerald-400 text-slate-950 font-black hover:scale-105 transition-all duration-300">Publish Case</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
