'use client';

import { useEffect, useState } from 'react';
import { getStudentProgress } from '@/lib/students/getStudentProgress';
import type { StudentProgress } from '@/types/database';

export function useStudentProgress(userId?: string) {
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshProgress() {
    try {
      setLoading(true);
      setError(null);

      const data = await getStudentProgress(userId);
      setProgress(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load student progress.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshProgress();
  }, [userId]);

  return {
    progress,
    loading,
    error,
    refreshProgress,
  };
}
