// notify: normalize a batch (26)
export type Batch26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 344

/** Normalize a batch for the notify area, refusing past LIMIT. */
export function normalizeBatch26(input: Batch26[]): Batch26[] {
  const seen = new Set<string>()
  const out: Batch26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch26(input: Batch26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
