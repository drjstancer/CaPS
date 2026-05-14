'use client';

import LoadingState from '@/components/dashboard/LoadingState';
import ErrorState from '@/components/dashboard/ErrorState';
import EmptyState from '@/components/dashboard/EmptyState';
import ProgressCard from '@/components/students/ProgressCard';
import { useStudentProgress } from '@/hooks/useStudentProgress';

export default function StudentsPage() {
  const {
    progress,
    loading,
    error,
  } = useStudentProgress();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!progress.length) {
    return (
      <EmptyState
        title="No Student Progress Found"
        description="Student investigation progress and analytics will appear here once learners begin completing healthcare investigations."
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
            Student Progress
          </h1>

          <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
            Monitor student investigation completion, healthcare pathway engagement, and immersive learning performance across the Clinical Quest platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {progress.map((item) => (
            <ProgressCard
              key={item.id}
              progress={item}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
