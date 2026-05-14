'use client';

import { useEffect, useState } from 'react';
import { getCases } from '@/lib/cases/getCases';
import type { CaseSummary } from '@/types/database';

export function useCases() {
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshCases() {
    try {
      setLoading(true);
      setError(null);

      const data = await getCases();
      setCases(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load investigations.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshCases();
  }, []);

  return {
    cases,
    loading,
    error,
    refreshCases,
  };
}
