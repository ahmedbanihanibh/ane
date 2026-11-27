// scheduler: compact a job (3)
export type Job3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 64

/** Compact a job for the scheduler area, refusing past LIMIT. */
export function compactJob3(input: Job3[]): Job3[] {
  const seen = new Set<string>()
  const out: Job3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob3(input: Job3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
