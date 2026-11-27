// cache: compact a batch (25)
export type Batch25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 61

/** Compact a batch for the cache area, refusing past LIMIT. */
export function compactBatch25(input: Batch25[]): Batch25[] {
  const seen = new Set<string>()
  const out: Batch25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch25(input: Batch25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
