// reports: compact a batch (0)
export type Batch0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 258

/** Compact a batch for the reports area, refusing past LIMIT. */
export function compactBatch0(input: Batch0[]): Batch0[] {
  const seen = new Set<string>()
  const out: Batch0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch0(input: Batch0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
