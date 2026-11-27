// quota: retry a batch (18)
export type Batch18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 328

/** Retry a batch for the quota area, refusing past LIMIT. */
export function retryBatch18(input: Batch18[]): Batch18[] {
  const seen = new Set<string>()
  const out: Batch18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch18(input: Batch18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
