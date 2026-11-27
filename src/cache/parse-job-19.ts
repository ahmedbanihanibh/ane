// cache: parse a job (19)
export type Job19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 103

/** Parse a job for the cache area, refusing past LIMIT. */
export function parseJob19(input: Job19[]): Job19[] {
  const seen = new Set<string>()
  const out: Job19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob19(input: Job19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
