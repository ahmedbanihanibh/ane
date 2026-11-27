// reports: serialize a job (18)
export type Job18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 171

/** Serialize a job for the reports area, refusing past LIMIT. */
export function serializeJob18(input: Job18[]): Job18[] {
  const seen = new Set<string>()
  const out: Job18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob18(input: Job18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
