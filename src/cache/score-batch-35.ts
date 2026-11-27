// cache: score a batch (35)
export type Batch35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 90

/** Score a batch for the cache area, refusing past LIMIT. */
export function scoreBatch35(input: Batch35[]): Batch35[] {
  const seen = new Set<string>()
  const out: Batch35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch35(input: Batch35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
