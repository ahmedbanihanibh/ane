// metrics: normalize a job (26)
export type Job26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 443

/** Normalize a job for the metrics area, refusing past LIMIT. */
export function normalizeJob26(input: Job26[]): Job26[] {
  const seen = new Set<string>()
  const out: Job26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob26(input: Job26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
