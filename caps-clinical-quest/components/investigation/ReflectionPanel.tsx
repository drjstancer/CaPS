'use client';

import { useState } from 'react';

interface ReflectionPanelProps {
  onSubmit: (reflection: string) => Promise<void> | void;
}

export default function ReflectionPanel({
  onSubmit,
}: ReflectionPanelProps) {
  const [reflection, setReflection] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!reflection.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(reflection);
      setReflection('');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
        Reflection & Debrief
      </p>

      <h3 className="text-3xl font-black text-white mb-6">
        Reflect on Your Clinical Reasoning
      </h3>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Describe how you interpreted the evidence, approached uncertainty, and arrived at your conclusions during this investigation..."
        className="w-full min-h-[220px] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-6 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
      >
        {submitting
          ? 'Submitting Reflection...'
          : 'Submit Reflection'}
      </button>
    </div>
  );
}
