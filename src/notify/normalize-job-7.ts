// notify: normalize a job (7)
export type Job7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 461

/** Normalize a job for the notify area, refusing past LIMIT. */
export function normalizeJob7(input: Job7[]): Job7[] {
  const seen = new Set<string>()
  const out: Job7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob7(input: Job7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
