'use client';

import { useEffect, useState } from 'react';
import { getProfessions } from '@/lib/professions/getProfessions';
import type { Profession } from '@/types/database';

export function useProfessions() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshProfessions() {
    try {
      setLoading(true);
      setError(null);

      const data = await getProfessions();
      setProfessions(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load professions.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshProfessions();
  }, []);

  return {
    professions,
    loading,
    error,
    refreshProfessions,
  };
}
