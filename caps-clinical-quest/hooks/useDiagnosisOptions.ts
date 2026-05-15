'use client';

import { useEffect, useState } from 'react';
import {
  getDiagnosisOptions,
  type DiagnosisOption,
} from '@/lib/investigations/getDiagnosisOptions';

export function useDiagnosisOptions(caseId: number) {
  const [options, setOptions] = useState<DiagnosisOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOptions() {
      const data = await getDiagnosisOptions(caseId);
      setOptions(data);
      setLoading(false);
    }

    loadOptions();
  }, [caseId]);

  return {
    options,
    loading,
  };
}
