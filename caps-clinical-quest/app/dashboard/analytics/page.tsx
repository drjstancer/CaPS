'use client';

import AnalyticsMetricCard from '@/components/analytics/AnalyticsMetricCard';
import LoadingState from '@/components/dashboard/LoadingState';
import ErrorState from '@/components/dashboard/ErrorState';
import { useAnalyticsOverview } from '@/hooks/useAnalyticsOverview';

export default function AnalyticsPage() {
  const {
    analytics,
    loading,
    error,
  } = useAnalyticsOverview();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !analytics) {
    return (
      <ErrorState
        message={error || 'Analytics data unavailable.'}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-10 md:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
            Clinical Quest Analytics
          </p>

          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Platform Insights
          </h1>

          <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
            Monitor engagement, investigation progression, telemetry events, reflective learning behavior, and healthcare pathway participation across the Clinical Quest ecosystem.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <AnalyticsMetricCard
            label="Investigations"
            value={analytics.totalCases}
            description="Total healthcare investigations currently available on the platform."
          />

          <AnalyticsMetricCard
            label="Healthcare Pathways"
            value={analytics.totalProfessions}
            description="Active healthcare profession exploration pathways available to learners."
          />

          <AnalyticsMetricCard
            label="Progress Records"
            value={analytics.totalProgressRecords}
            description="Tracked student investigation sessions and learning progress records."
          />

          <AnalyticsMetricCard
            label="Completed Cases"
            value={analytics.completedInvestigations}
            description="Successfully completed healthcare investigations across all learners."
          />

          <AnalyticsMetricCard
            label="Telemetry Events"
            value={analytics.totalEvents}
            description="Tracked learner interaction and investigation telemetry events."
          />

          <AnalyticsMetricCard
            label="Reflections"
            value={analytics.reflectionsSubmitted}
            description="Submitted reflective learning responses across investigations."
          />

          <AnalyticsMetricCard
            label="Clue Reveals"
            value={analytics.clueReveals}
            description="Evidence reveals and investigative clue progression interactions."
          />
        </div>
      </div>
    </main>
  );
}
