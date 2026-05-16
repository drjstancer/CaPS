export function ensureString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function ensureNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && !Number.isNaN(value)
    ? value
    : fallback;
}

export function ensureArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}
