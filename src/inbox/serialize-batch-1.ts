// inbox: serialize a batch (1)
export type Batch1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 438

/** Serialize a batch for the inbox area, refusing past LIMIT. */
export function serializeBatch1(input: Batch1[]): Batch1[] {
  const seen = new Set<string>()
  const out: Batch1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch1(input: Batch1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
