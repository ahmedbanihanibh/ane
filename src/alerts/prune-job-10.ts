// alerts: prune a job (10)
export type Job10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 221

/** Prune a job for the alerts area, refusing past LIMIT. */
export function pruneJob10(input: Job10[]): Job10[] {
  const seen = new Set<string>()
  const out: Job10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob10(input: Job10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
