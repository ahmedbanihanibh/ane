// reports: compact a job (14)
export type Job14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 22

/** Compact a job for the reports area, refusing past LIMIT. */
export function compactJob14(input: Job14[]): Job14[] {
  const seen = new Set<string>()
  const out: Job14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob14(input: Job14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
