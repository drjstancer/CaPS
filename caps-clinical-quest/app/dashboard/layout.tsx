'use client';

import { ReactNode, useEffect, useState } from 'react';

import Sidebar from '@/components/dashboard/Sidebar';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [userEmail, setUserEmail] = useState<string>(
    'faculty@missouri.edu',
  );

  useEffect(() => {
    const storedEmail = window.localStorage.getItem(
      'clinicalQuestUserEmail',
    );

    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_25%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_25%)]" />

      <div className="relative z-10 flex">
        <Sidebar userEmail={userEmail} />

        <section className="flex-1 px-6 py-8 md:px-10 lg:px-14">
          {children}
        </section>
      </div>
    </main>
  );
}
