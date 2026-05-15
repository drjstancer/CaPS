import type { ReactNode } from 'react';

interface InvestigationLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  timer: ReactNode;
  progress: ReactNode;
  children: ReactNode;
  navigation?: ReactNode;
}

export default function InvestigationLayout({
  header,
  sidebar,
  timer,
  progress,
  children,
  navigation,
}: InvestigationLayoutProps) {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-10 md:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto space-y-8">
        {header}

        <div className="grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-8">
            {sidebar}
            {timer}
            {progress}
          </div>

          <div className="space-y-8">
            {children}
            {navigation}
          </div>
        </div>
      </div>
    </main>
  );
}
