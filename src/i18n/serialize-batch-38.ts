// i18n: serialize a batch (38)
export type Batch38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 409

/** Serialize a batch for the i18n area, refusing past LIMIT. */
export function serializeBatch38(input: Batch38[]): Batch38[] {
  const seen = new Set<string>()
  const out: Batch38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch38(input: Batch38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
