'use client';

import ProfessionCard from '@/components/dashboard/ProfessionCard';
import LoadingState from '@/components/dashboard/LoadingState';
import ErrorState from '@/components/dashboard/ErrorState';
import EmptyState from '@/components/dashboard/EmptyState';
import { useProfessions } from '@/hooks/useProfessions';

export default function ProfessionsPage() {
  const {
    professions,
    loading,
    error,
  } = useProfessions();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!professions.length) {
    return (
      <EmptyState
        title="No Healthcare Pathways Found"
        description="Create healthcare profession pathways to begin building immersive career exploration experiences."
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-10 md:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
            Clinical Quest
          </p>

          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Healthcare Pathways
          </h1>

          <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
            Explore immersive healthcare profession pathways designed to introduce students to medical careers through interactive investigations and experiential learning.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {professions.map((profession) => (
            <ProfessionCard
              key={profession.id}
              profession={profession}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
