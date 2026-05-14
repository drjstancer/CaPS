'use client';

import { useEffect, useState } from 'react';
import type { InvestigationSession } from '@/types/investigation';

interface UseInvestigationSessionProps {
  caseId: number;
}

export function useInvestigationSession({
  caseId,
}: UseInvestigationSessionProps) {
  const [session, setSession] =
    useState<InvestigationSession | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialSession: InvestigationSession = {
      case_id: caseId,
      current_step: 1,
      unlocked_clues: [1],
      selected_answers: [],
      score: 0,
      completed: false,
    };

    setSession(initialSession);
    setLoading(false);
  }, [caseId]);

  function unlockClue(step: number) {
    if (!session) return;

    if (session.unlocked_clues.includes(step)) {
      return;
    }

    setSession({
      ...session,
      unlocked_clues: [
        ...session.unlocked_clues,
        step,
      ],
      current_step: step,
    });
  }

  function submitAnswer(answer: string) {
    if (!session) return;

    setSession({
      ...session,
      selected_answers: [
        ...session.selected_answers,
        answer,
      ],
    });
  }

  function completeInvestigation(score: number) {
    if (!session) return;

    setSession({
      ...session,
      completed: true,
      score,
      completed_at: new Date().toISOString(),
    });
  }

  return {
    session,
    loading,
    unlockClue,
    submitAnswer,
    completeInvestigation,
  };
}
