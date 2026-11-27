// storage: diff a batch (19)
export type Batch19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 436

/** Diff a batch for the storage area, refusing past LIMIT. */
export function diffBatch19(input: Batch19[]): Batch19[] {
  const seen = new Set<string>()
  const out: Batch19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch19(input: Batch19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
