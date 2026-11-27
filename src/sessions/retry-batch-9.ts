// sessions: retry a batch (9)
export type Batch9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 433

/** Retry a batch for the sessions area, refusing past LIMIT. */
export function retryBatch9(input: Batch9[]): Batch9[] {
  const seen = new Set<string>()
  const out: Batch9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch9(input: Batch9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
