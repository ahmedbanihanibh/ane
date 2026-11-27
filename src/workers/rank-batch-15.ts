// workers: rank a batch (15)
export type Batch15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 217

/** Rank a batch for the workers area, refusing past LIMIT. */
export function rankBatch15(input: Batch15[]): Batch15[] {
  const seen = new Set<string>()
  const out: Batch15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch15(input: Batch15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
