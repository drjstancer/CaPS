'use client';

import type { ReactNode } from 'react';
import type { UserRole } from '@/types/database';
import { canAccess, type PlatformPermission } from '@/lib/auth/roles';

interface ProtectedRouteProps {
  role?: UserRole;
  permission: PlatformPermission;
  children: ReactNode;
}

export default function ProtectedRoute({
  role = 'student',
  permission,
  children,
}: ProtectedRouteProps) {
  const allowed = canAccess(role, permission);

  if (!allowed) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">
        <div className="max-w-xl rounded-[2rem] border border-red-400/20 bg-red-500/10 p-10 text-center">
          <p className="uppercase tracking-[0.35em] text-red-300 text-xs mb-4">
            Access Restricted
          </p>

          <h1 className="text-4xl font-black mb-6">
            Permission Required
          </h1>

          <p className="text-slate-300 leading-relaxed">
            Your account does not currently have permission to access this platform feature.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
