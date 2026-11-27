// parsers: serialize a batch (7)
export type Batch7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 314

/** Serialize a batch for the parsers area, refusing past LIMIT. */
export function serializeBatch7(input: Batch7[]): Batch7[] {
  const seen = new Set<string>()
  const out: Batch7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch7(input: Batch7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
