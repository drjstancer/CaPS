'use client';

import { useEffect, useState } from 'react';

interface TimerPanelProps {
  initialSeconds?: number;
}

export default function TimerPanel({
  initialSeconds = 900,
}: TimerPanelProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <p className="uppercase tracking-[0.35em] text-cyan-400 text-xs mb-4">
        Investigation Timer
      </p>

      <div className="flex items-center justify-between gap-6">
        <div>
          <h3 className="text-5xl font-black text-white leading-none">
            {minutes.toString().padStart(2, '0')}:
            {remainingSeconds
              .toString()
              .padStart(2, '0')}
          </h3>

          <p className="text-slate-400 mt-3">
            Remaining Investigation Time
          </p>
        </div>

        <div className="w-5 h-5 rounded-full bg-red-400 animate-pulse" />
      </div>
    </div>
  );
}
