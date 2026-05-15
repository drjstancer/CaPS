'use client';

import { useEffect, useState } from 'react';
import {
  getCluesByCase,
  type InvestigationClue,
} from '@/lib/clues/getCluesByCase';

export function useClues(caseId: number) {
  const [clues, setClues] = useState<InvestigationClue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadClues() {
    try {
      setLoading(true);
      setError(null);

      const data = await getCluesByCase(caseId);
      setClues(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load investigation clues.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (caseId) {
      loadClues();
    }
  }, [caseId]);

  return {
    clues,
    loading,
    error,
    reload: loadClues,
  };
}
