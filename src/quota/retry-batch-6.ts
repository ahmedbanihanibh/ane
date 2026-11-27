// quota: retry a batch (6)
export type Batch6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 377

/** Retry a batch for the quota area, refusing past LIMIT. */
export function retryBatch6(input: Batch6[]): Batch6[] {
  const seen = new Set<string>()
  const out: Batch6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch6(input: Batch6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
