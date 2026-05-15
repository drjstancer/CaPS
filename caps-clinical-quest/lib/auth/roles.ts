import type { UserRole } from '@/types/database';

export type PlatformPermission =
  | 'analytics'
  | 'authoring'
  | 'publishing';

export const rolePermissions: Record<
  UserRole,
  Record<PlatformPermission, boolean>
> = {
  student: {
    analytics: false,
    authoring: false,
    publishing: false,
  },
  faculty: {
    analytics: true,
    authoring: true,
    publishing: false,
  },
  admin: {
    analytics: true,
    authoring: true,
    publishing: true,
  },
};

export function canAccess(
  role: UserRole = 'student',
  permission: PlatformPermission,
): boolean {
  return rolePermissions[role][permission];
}

export function isFaculty(role?: UserRole): boolean {
  return role === 'faculty' || role === 'admin';
}

export function isAdmin(role?: UserRole): boolean {
  return role === 'admin';
}
