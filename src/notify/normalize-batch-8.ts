// notify: normalize a batch (8)
export type Batch8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 309

/** Normalize a batch for the notify area, refusing past LIMIT. */
export function normalizeBatch8(input: Batch8[]): Batch8[] {
  const seen = new Set<string>()
  const out: Batch8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch8(input: Batch8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
