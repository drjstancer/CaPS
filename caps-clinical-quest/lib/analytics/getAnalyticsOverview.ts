import { supabase } from '@/lib/supabase/client';

export interface AnalyticsOverview {
  totalCases: number;
  totalProfessions: number;
  totalProgressRecords: number;
  completedInvestigations: number;
}

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const [casesResult, professionsResult, progressResult] = await Promise.all([
    supabase.from('cases').select('*', { count: 'exact', head: true }),
    supabase.from('professions').select('*', { count: 'exact', head: true }),
    supabase.from('student_progress').select('*', {
      count: 'exact',
      head: true,
    }),
  ]);

  const completedResult = await supabase
    .from('student_progress')
    .select('*', {
      count: 'exact',
      head: true,
    })
    .eq('completed', true);

  return {
    totalCases: casesResult.count || 0,
    totalProfessions: professionsResult.count || 0,
    totalProgressRecords: progressResult.count || 0,
    completedInvestigations: completedResult.count || 0,
  };
}
