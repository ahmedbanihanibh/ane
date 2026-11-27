// parsers: prune a job (6)
export type Job6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 247

/** Prune a job for the parsers area, refusing past LIMIT. */
export function pruneJob6(input: Job6[]): Job6[] {
  const seen = new Set<string>()
  const out: Job6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob6(input: Job6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
