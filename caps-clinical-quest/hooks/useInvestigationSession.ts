'use client';

import { useEffect, useState } from 'react';
import type { InvestigationSession } from '@/types/investigation';
import { getSession } from '@/lib/investigations/getSession';

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
    async function initializeSession() {
      const existingSession = await getSession(caseId);

      if (existingSession) {
        const restoredSession: InvestigationSession = {
          session_id: existingSession.id,
          case_id: existingSession.case_id,
          current_step: existingSession.current_step || 1,
          unlocked_clues: Array.from(
            {
              length: existingSession.current_step || 1,
            },
            (_, index) => index + 1,
          ),
          selected_answers: [],
          score: existingSession.score || 0,
          completed: existingSession.completed || false,
          started_at: existingSession.started_at,
          updated_at: existingSession.updated_at,
          completed_at: existingSession.completed_at,
        };

        setSession(restoredSession);
        setLoading(false);
        return;
      }

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
    }

    initializeSession();
  }, [caseId]);

  function unlockClue(step: number) {
    if (!session) return;

    if (session.unlocked_clues.includes(step)) {
      setSession({
        ...session,
        current_step: step,
      });

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
