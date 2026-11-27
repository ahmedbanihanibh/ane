// sync: retry a batch (29)
export type Batch29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 102

/** Retry a batch for the sync area, refusing past LIMIT. */
export function retryBatch29(input: Batch29[]): Batch29[] {
  const seen = new Set<string>()
  const out: Batch29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch29(input: Batch29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
