// cache: serialize a batch (23)
export type Batch23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 472

/** Serialize a batch for the cache area, refusing past LIMIT. */
export function serializeBatch23(input: Batch23[]): Batch23[] {
  const seen = new Set<string>()
  const out: Batch23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch23(input: Batch23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
