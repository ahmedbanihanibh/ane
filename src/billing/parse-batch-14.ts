// billing: parse a batch (14)
export type Batch14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 326

/** Parse a batch for the billing area, refusing past LIMIT. */
export function parseBatch14(input: Batch14[]): Batch14[] {
  const seen = new Set<string>()
  const out: Batch14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch14(input: Batch14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
