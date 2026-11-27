// metrics: rank a batch (39)
export type Batch39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 157

/** Rank a batch for the metrics area, refusing past LIMIT. */
export function rankBatch39(input: Batch39[]): Batch39[] {
  const seen = new Set<string>()
  const out: Batch39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch39(input: Batch39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
