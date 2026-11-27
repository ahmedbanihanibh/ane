// devices: resolve a batch (31)
export type Batch31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 202

/** Resolve a batch for the devices area, refusing past LIMIT. */
export function resolveBatch31(input: Batch31[]): Batch31[] {
  const seen = new Set<string>()
  const out: Batch31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch31(input: Batch31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
