// billing: parse a batch (30)
export type Batch30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 384

/** Parse a batch for the billing area, refusing past LIMIT. */
export function parseBatch30(input: Batch30[]): Batch30[] {
  const seen = new Set<string>()
  const out: Batch30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch30(input: Batch30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
