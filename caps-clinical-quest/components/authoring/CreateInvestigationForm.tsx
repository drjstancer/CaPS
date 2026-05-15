'use client';

import { useState } from 'react';
import { createInvestigation } from '@/lib/authoring/createInvestigation';

export default function CreateInvestigationForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [profession, setProfession] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState(15);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    try {
      setSubmitting(true);

      await createInvestigation({
        title,
        description,
        profession,
        estimated_minutes: estimatedMinutes,
      });

      setSuccess(true);
      setTitle('');
      setDescription('');
      setProfession('');
      setEstimatedMinutes(15);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
        Faculty Authoring
      </p>

      <h2 className="text-4xl font-black text-white mb-8">
        Create Investigation
      </h2>

      <div className="space-y-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Investigation Title"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Investigation Description"
          className="w-full min-h-[180px] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white"
        />

        <input
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          placeholder="Healthcare Profession"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white"
        />

        <input
          type="number"
          value={estimatedMinutes}
          onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-slate-950"
        >
          {submitting ? 'Creating...' : 'Create Investigation'}
        </button>

        {success && (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-300">
            Investigation successfully created.
          </div>
        )}
      </div>
    </div>
  );
}
