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
  Plus,
  X,
  Trash2,
  Pencil,
  TrendingUp,
} from 'lucide-react';

import { CaseSummary } from '@/types/dashboard';

import {
  stats,
  professions,
  activityFeed,
  recentStudents,
  cases,
  navItems,
} from '@/lib/dashboard-data';
import Sidebar from '@/components/dashboard/Sidebar';

function assertDashboardData(): void {
  console.assert(stats.length === 4, 'Expected four dashboard stat cards.');
  console.assert(cases.length >= 3, 'Expected at least three sample cases.');
  console.assert(
    navItems.some((item) => item.name === 'Dashboard'),
    'Expected Dashboard navigation item.',
  );
}

export default function ClinicalQuestDashboard() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string>('faculty@missouri.edu');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [savedCases, setSavedCases] = useState<CaseSummary[]>(cases);
  const [newCaseTitle, setNewCaseTitle] = useState<string>('');
  const [newCaseTrack, setNewCaseTrack] = useState<string>('Emergency Care');
  const [newCaseDifficulty, setNewCaseDifficulty] = useState<string>('Beginner');
  const [editingCase, setEditingCase] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  useEffect(() => {
    assertDashboardData();

    const storedEmail = window.localStorage.getItem('clinicalQuestUserEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  function handleDeleteCase(id: number): void {
    setSavedCases(savedCases.filter((item) => item.id !== id));
  }

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

    setSavedCases([createdCase, ...savedCases]);
    setNewCaseTitle('');
    setNewCaseTrack('Emergency Care');
    setNewCaseDifficulty('Beginner');
    setShowCreateModal(false);
  }

  const filteredCases = savedCases
    .filter((item) =>
      selectedFilter === 'All'
        ? true
        : selectedFilter === 'Published'
          ? item.published
          : !item.published,
    )
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.track.toLowerCase().includes(searchTerm.toLowerCase()),
    );

   return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_25%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_25%)]" />

      <div className="relative z-10 flex">
        <Sidebar userEmail={userEmail} />

        <section className="flex-1 px-6 py-8 md:px-10 lg:px-14">
          <div className="lg:hidden flex items-center justify-between mb-6 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-5">
            <div>
              <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-1">
                Clinical Quest
              </p>
              <h2 className="text-2xl font-black">Faculty Console</h2>
            </div>
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          </div>

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
                <h3 className="text-4xl font-black mb-3">{stat.value}</h3>
                <p className="text-cyan-300 text-sm">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex gap-3 flex-wrap mb-4">
                  {['All', 'Published', 'Drafts'].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        selectedFilter === filter
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

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
                  <div
                    key={item.id}
                    className="border border-white/10 rounded-3xl p-6 bg-white/[0.03] hover:border-cyan-400/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                      <div>
                        <h4 className="text-2xl font-black mb-3">{item.title}</h4>

                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs uppercase tracking-[0.25em]">
                            {item.track}
                          </span>
                          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs">
                            {item.difficulty}
                          </span>
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-bold ${
                              item.published
                                ? 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-300'
                                : 'bg-amber-400/10 border border-amber-400/20 text-amber-300'
                            }`}
                          >
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

                   <div className="flex flex-wrap gap-4 mt-6">
  <Link
    href={`/dashboard/cases/${item.id}`}
    className="px-5 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-bold hover:scale-105 transition-all duration-300 inline-flex items-center"
  >
    <Pencil className="mr-2" size={16} />
    Edit Case
  </Link>

  <Link
    href={`/dashboard/analytics/${item.id}`}
    className="px-5 py-3 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.03] transition-all duration-300 inline-flex items-center"
  >
    <TrendingUp className="mr-2" size={16} />
    View Analytics
  </Link>

  <button
    type="button"
    className="px-5 py-3 rounded-2xl border border-red-500/20 hover:border-red-500/40 bg-red-500/10 text-red-300 transition-all duration-300"
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
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
                  Top Student Activity
                </p>
                <h3 className="text-3xl font-black mb-8">Recent Investigators</h3>
                <div className="space-y-5">
                  {recentStudents.map((student) => (
                    <div
                      key={student.name}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h4 className="font-bold text-lg">{student.name}</h4>
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
                  Investigation Insights
                </p>
                <h3 className="text-3xl font-black mb-8">Performance Trends</h3>
                <div className="space-y-5">
                  {[72, 88, 64, 91, 76].map((value, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2 text-sm text-slate-400">
                        <span>Week {index + 1}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-4 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
                  Student Engagement
                </p>
                <h3 className="text-3xl font-black mb-8">Platform Activity</h3>
                <div className="space-y-6">
                  {[
                    ['Cases Completed', '78%'],
                    ['Correct First Guess', '64%'],
                    ['Average Session Length', '14m'],
                    ['Career Exploration Growth', '+22%'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">{label}</span>
                        <span className="font-black text-cyan-300">{value}</span>
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
                  Profession Analytics
                </p>
                <h3 className="text-3xl font-black mb-8">Healthcare Pathways</h3>
                <div className="space-y-5">
                  {professions.map((profession) => (
                    <div
                      key={profession.id}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-white">{profession.name}</h4>
                        <span className="text-emerald-300 font-black">
                          {profession.growth}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500 uppercase tracking-wide mb-1">Cases</p>
                          <p className="text-cyan-300 font-bold text-xl">
                            {profession.cases}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 uppercase tracking-wide mb-1">Students</p>
                          <p className="text-cyan-300 font-bold text-xl">
                            {profession.students}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
                  System Activity
                </p>
                <h3 className="text-3xl font-black mb-8">Live Feed</h3>
                <div className="space-y-4">
                  {activityFeed.map((activity) => (
                    <div
                      key={activity.id}
                      className="border border-white/10 rounded-2xl p-4 bg-white/[0.03]"
                    >
                      <div className="flex items-center justify-between mb-2 gap-3">
                        <p className="font-semibold text-white text-sm">
                          {activity.action}
                        </p>
                        <span className="text-xs text-cyan-300 whitespace-nowrap">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{activity.user}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-3">
                  Quick Actions
                </p>
                <h3 className="text-3xl font-black mb-8">Faculty Tools</h3>
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

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
          <div className="w-full max-w-2xl rounded-[2rem] border border-cyan-400/20 bg-slate-950 p-8 shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-2">
                  Investigation Builder
                </p>
                <h2 className="text-4xl font-black">Create New Case</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-red-500 transition-all duration-300 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5">
              <input
                type="text"
                placeholder="Case Title"
                value={newCaseTitle}
                onChange={(e) => setNewCaseTitle(e.target.value)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <select
                value={newCaseTrack}
                onChange={(e) => setNewCaseTrack(e.target.value)}
                className="rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option>Emergency Care</option>
                <option>Diagnostics</option>
                <option>Surgery</option>
                <option>Rehabilitation</option>
              </select>

              <select
                value={newCaseDifficulty}
                onChange={(e) => setNewCaseDifficulty(e.target.value)}
                className="rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <textarea
                rows={5}
                placeholder="Describe the clinical scenario..."
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <div className="flex gap-4 justify-end mt-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateCase}
                  className="px-6 py-4 rounded-2xl bg-emerald-400 text-slate-950 font-black hover:scale-105 transition-all duration-300"
                >
                  Publish Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
