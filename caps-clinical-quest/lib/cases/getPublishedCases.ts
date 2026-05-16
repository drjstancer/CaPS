import { supabase } from '@/lib/supabase/client';
import { isLearnerVisible } from '@/lib/workflows/status';

export type PublishedCase = {
  id: number;
  title: string;
  track?: string | null;
  difficulty?: string | null;
  scenario?: string | null;
  description?: string | null;
  publication_status?: string | null;
  published?: boolean | null;
};

export async function getPublishedCases(): Promise<PublishedCase[]> {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('id');

  if (error) {
    console.error('Published case retrieval error:', error.message);
    return [];
  }

  return (data || []).filter((item) => {
    const status = item.publication_status ||
      (item.published ? 'published' : 'draft');

    return isLearnerVisible(status);
  });
}
