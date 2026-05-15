'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import InvestigationLayout from '@/components/investigation/InvestigationLayout';
import InvestigationHeader from '@/components/investigation/InvestigationHeader';
import InvestigationSidebar from '@/components/investigation/InvestigationSidebar';
import TimerPanel from '@/components/investigation/TimerPanel';
import ProgressTracker from '@/components/investigation/ProgressTracker';
import ClueRevealCard from '@/components/investigation/ClueRevealCard';
import DiagnosisSelector from '@/components/investigation/DiagnosisSelector';
import StepNavigator from '@/components/investigation/StepNavigator';
import CompletionPanel from '@/components/investigation/CompletionPanel';
import ReflectionPanel from '@/components/investigation/ReflectionPanel';
import InvestigationTimeline from '@/components/investigation/InvestigationTimeline';
import LoadingState from '@/components/dashboard/LoadingState';
import ErrorState from '@/components/dashboard/ErrorState';
import EmptyState from '@/components/dashboard/EmptyState';
import { useCase } from '@/hooks/useCase';
import { useClues } from '@/hooks/useClues';
import { useDiagnosisOptions } from '@/hooks/useDiagnosisOptions';
import { useInvestigationSession } from '@/hooks/useInvestigationSession';
import { logEvent } from '@/lib/analytics/logEvent';
import { saveProgress } from '@/lib/students/saveProgress';
import { submitReflection } from '@/lib/reflections/submitReflection';

const fallbackDiagnosisOptions = [
  'Emergency Medicine',
  'Neurology',
  'Orthopedic Surgery',
  'Pediatrics',
];

export default function CasePage() {
  const params = useParams();
  const id = params.id as string;
  const numericCaseId = Number(id);

  const { caseData, loading: caseLoading, error: caseError } = useCase(id);
  const { clues, loading: cluesLoading, error: cluesError } = useClues(numericCaseId);
  const { options: diagnosisOptions } = useDiagnosisOptions(numericCaseId);

  const {
    session,
    loading: sessionLoading,
    unlockClue,
    submitAnswer,
    completeInvestigation,
  } = useInvestigationSession({ caseId: numericCaseId });

  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState([
    {
      label: 'Investigation Session Initialized',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const totalSteps = Math.max(clues.length, 1);
  const currentStep = session?.current_step || 1;
  const unlockedClues = session?.unlocked_clues || [1];

  const currentClue = useMemo(() => {
    return clues.find((clue) => (clue.step_order || 1) === currentStep) || clues[0];
  }, [clues, currentStep]);

  const expectedProfession = caseData?.profession || 'Healthcare Professional';

  const diagnosisLabels = diagnosisOptions.length
    ? diagnosisOptions.map((option) => option.label)
    : fallbackDiagnosisOptions;

  async function handleRevealNextClue() {
    const nextStep = Math.min(currentStep + 1, totalSteps);

    unlockClue(nextStep);

    setTimelineEvents((prev) => [
      ...prev,
      {
        label: `Evidence File ${nextStep} Revealed`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    await logEvent({
      case_id: numericCaseId,
      event_type: 'clue_revealed',
      metadata: {
        step: nextStep,
      },
    });

    await saveProgress({
      case_id: numericCaseId,
      current_step: nextStep,
      completed: false,
      score: session?.score || 0,
    });
  }

  async function handlePreviousStep() {
    const previousStep = Math.max(currentStep - 1, 1);
    unlockClue(previousStep);

    setTimelineEvents((prev) => [
      ...prev,
      {
        label: `Returned to Step ${previousStep}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    await logEvent({
      case_id: numericCaseId,
      event_type: 'step_previous',
      metadata: {
        step: previousStep,
      },
    });
  }

  async function handleNextStep() {
    await handleRevealNextClue();
  }

  async function handleDiagnosisSelect(value: string) {
    setSelectedDiagnosis(value);
    submitAnswer(value);

    setTimelineEvents((prev) => [
      ...prev,
      {
        label: `Diagnosis Selected: ${value}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    await logEvent({
      case_id: numericCaseId,
      event_type: 'answer_selected',
      metadata: {
        answer: value,
      },
    });
  }

  async function handleCompleteInvestigation() {
    const correct = selectedDiagnosis.toLowerCase() === expectedProfession.toLowerCase();

    const configuredOption = diagnosisOptions.find(
      (option) => option.label === selectedDiagnosis,
    );

    const score = configuredOption?.points || (correct ? 100 : 70);

    completeInvestigation(score);
    setShowReflection(true);

    setTimelineEvents((prev) => [
      ...prev,
      {
        label: 'Investigation Completed',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    await saveProgress({
      case_id: numericCaseId,
      current_step: currentStep,
      completed: true,
      score,
    });

    await logEvent({
      case_id: numericCaseId,
      event_type: 'case_completed',
      metadata: {
        selectedDiagnosis,
        expectedProfession,
        correct,
        score,
      },
    });
  }

  async function handleReflectionSubmit(reflection: string) {
    await submitReflection({
      case_id: numericCaseId,
      reflection_text: reflection,
    });

    setTimelineEvents((prev) => [
      ...prev,
      {
        label: 'Reflection Submitted',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    await logEvent({
      case_id: numericCaseId,
      event_type: 'reflection_submitted',
      metadata: {
        length: reflection.length,
      },
    });

    setReflectionSubmitted(true);
  }

  if (caseLoading || cluesLoading || sessionLoading) {
    return <LoadingState />;
  }

  if (caseError || cluesError) {
    return <ErrorState message={caseError || cluesError || 'Unable to load investigation.'} />;
  }

  if (!caseData) {
    return (
      <EmptyState
        title="Investigation Not Found"
        description="The requested healthcare investigation could not be found."
      />
    );
  }

  return (
    <InvestigationLayout
      header={
        <InvestigationHeader
          title={caseData.title}
          subtitle={caseData.description || caseData.scenario || 'Begin the investigation, review each clue, and make a healthcare pathway decision.'}
        />
      }
      sidebar={
        <InvestigationSidebar
          currentStep={currentStep}
          totalSteps={totalSteps}
          unlockedClues={unlockedClues}
        />
      }
      timer={<TimerPanel initialSeconds={(caseData.estimated_minutes || 15) * 60} />}
      progress={<ProgressTracker currentStep={currentStep} totalSteps={totalSteps} />}
      navigation={
        <StepNavigator
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      }
    >
      {currentClue ? (
        <ClueRevealCard
          title={currentClue.title || `Evidence File ${currentStep}`}
          content={currentClue.content || 'No evidence content available.'}
          unlocked={unlockedClues.includes(currentStep)}
          onReveal={handleRevealNextClue}
        />
      ) : (
        <EmptyState
          title="No Clues Available"
          description="This investigation does not have evidence files attached yet."
        />
      )}

      <DiagnosisSelector
        options={diagnosisLabels}
        selected={selectedDiagnosis}
        onSelect={handleDiagnosisSelect}
      />

      <InvestigationTimeline events={timelineEvents} />

      <button
        type="button"
        onClick={handleCompleteInvestigation}
        disabled={!selectedDiagnosis}
        className="w-full rounded-2xl bg-emerald-400 px-6 py-5 font-black text-slate-950 hover:scale-[1.01] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Complete Investigation
      </button>

      {session?.completed && (
        <CompletionPanel
          score={session.score}
          profession={expectedProfession}
        />
      )}

      {showReflection && !reflectionSubmitted && (
        <ReflectionPanel onSubmit={handleReflectionSubmit} />
      )}

      {reflectionSubmitted && (
        <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8">
          <p className="uppercase tracking-[0.35em] text-emerald-300 text-xs mb-4">
            Reflection Submitted
          </p>

          <h3 className="text-3xl font-black text-white mb-3">
            Debrief Complete
          </h3>

          <p className="text-slate-300 leading-relaxed">
            Your reflection has been saved. This investigation is now ready for faculty review and learning analytics.
          </p>
        </div>
      )}
    </InvestigationLayout>
  );
}
