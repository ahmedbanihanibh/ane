// metrics: prune a batch (22)
export type Batch22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 212

/** Prune a batch for the metrics area, refusing past LIMIT. */
export function pruneBatch22(input: Batch22[]): Batch22[] {
  const seen = new Set<string>()
  const out: Batch22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch22(input: Batch22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
