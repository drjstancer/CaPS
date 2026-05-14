'use client';

import { useEffect, useState } from 'react';
import {
  getAnalyticsOverview,
  type AnalyticsOverview,
} from '@/lib/analytics/getAnalyticsOverview';

export function useAnalyticsOverview() {
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshAnalytics() {
    try {
      setLoading(true);
      setError(null);

      const data = await getAnalyticsOverview();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load analytics overview.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAnalytics();
  }, []);

  return {
    analytics,
    loading,
    error,
    refreshAnalytics,
  };
}
