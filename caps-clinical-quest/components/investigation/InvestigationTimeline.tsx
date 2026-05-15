interface TimelineEvent {
  label: string;
  timestamp?: string;
}

interface InvestigationTimelineProps {
  events: TimelineEvent[];
}

export default function InvestigationTimeline({
  events,
}: InvestigationTimelineProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
        Investigation Timeline
      </p>

      <h3 className="text-3xl font-black text-white mb-8">
        Runtime Activity
      </h3>

      <div className="space-y-6">
        {events.map((event, index) => (
          <div
            key={`${event.label}-${index}`}
            className="flex gap-5 items-start"
          >
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-cyan-400 mt-1" />

              {index !== events.length - 1 && (
                <div className="w-[2px] h-14 bg-cyan-400/20 mt-2" />
              )}
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                {event.label}
              </h4>

              {event.timestamp && (
                <p className="text-sm text-slate-500">
                  {event.timestamp}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
