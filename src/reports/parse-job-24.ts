// reports: parse a job (24)
export type Job24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 209

/** Parse a job for the reports area, refusing past LIMIT. */
export function parseJob24(input: Job24[]): Job24[] {
  const seen = new Set<string>()
  const out: Job24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob24(input: Job24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
