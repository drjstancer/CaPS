import type { UserRole } from '@/types/database';

export function isFaculty(role?: UserRole): boolean {
  return role === 'faculty' || role === 'admin';
}

export function isAdmin(role?: UserRole): boolean {
  return role === 'admin';
}
