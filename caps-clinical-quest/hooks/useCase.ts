'use client';

import { useEffect, useState } from 'react';
import { getCaseById } from '@/lib/cases/getCaseById';
import type { CaseSummary } from '@/types/database';

export function useCase(id: string) {
  const [caseData, setCaseData] = useState<CaseSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshCase() {
    try {
      setLoading(true);
      setError(null);

      const data = await getCaseById(id);
      setCaseData(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load investigation.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      refreshCase();
    }
  }, [id]);

  return {
    caseData,
    loading,
    error,
    refreshCase,
  };
}
