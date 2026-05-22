'use client';

import Link from 'next/link';

import {
  Pencil,
  TrendingUp,
  Trash2,
} from 'lucide-react';

import { CaseSummary } from '@/types/dashboard';

type CaseCardProps = {
  item: CaseSummary;
  onDelete: (id: number) => void;
};

export default function CaseCard({
  item,
  onDelete,
}: CaseCardProps) {
  return (
    <div className="border border-white/10 rounded-3xl p-6 bg-white/[0.03] hover:border-cyan-400/30 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-semibold uppercase tracking-[0.2em]">
              {item.track}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
                item.published
                  ? 'bg-emerald-400/10 text-emerald-300'
                  : 'bg-amber-400/10 text-amber-300'
              }`}
            >
              {item.published ? 'Published' : 'Draft'}
            </span>
          </div>

          <h2 className="text-3xl font-black mb-3">
            {item.title}
          </h2>

          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <p>
              Difficulty:{' '}
              <span className="text-white font-medium">
                {item.difficulty}
              </span>
            </p>

            <p>
              Attempts:{' '}
              <span className="text-white font-medium">
                {item.attempts}
              </span>
            </p>

            <p>
              Updated:{' '}
              <span className="text-white font-medium">
                {item.lastUpdated}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
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
            onClick={() => onDelete(item.id)}
            className="px-5 py-3 rounded-2xl border border-red-500/20 hover:border-red-500/40 bg-red-500/10 text-red-300 transition-all duration-300"
          >
            <Trash2 className="inline mr-2" size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
