// workers: score a batch (34)
export type Batch34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 497

/** Score a batch for the workers area, refusing past LIMIT. */
export function scoreBatch34(input: Batch34[]): Batch34[] {
  const seen = new Set<string>()
  const out: Batch34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch34(input: Batch34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
