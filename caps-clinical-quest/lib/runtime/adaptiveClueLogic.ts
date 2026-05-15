interface AdaptiveClueLogicInput {
  currentScore: number;
  elapsedSeconds: number;
  incorrectAnswers: number;
}

export interface AdaptiveRuntimeState {
  unlockBonusClue: boolean;
  revealSupportEvidence: boolean;
  triggerFacultyReview: boolean;
}

export function evaluateAdaptiveClueLogic({
  currentScore,
  elapsedSeconds,
  incorrectAnswers,
}: AdaptiveClueLogicInput): AdaptiveRuntimeState {
  const unlockBonusClue = currentScore >= 90;

  const revealSupportEvidence =
    incorrectAnswers >= 2 || elapsedSeconds > 600;

  const triggerFacultyReview =
    currentScore < 70 || incorrectAnswers >= 3;

  return {
    unlockBonusClue,
    revealSupportEvidence,
    triggerFacultyReview,
  };
}
