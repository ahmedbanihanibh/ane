// sessions: compact a batch (20)
export type Batch20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 413

/** Compact a batch for the sessions area, refusing past LIMIT. */
export function compactBatch20(input: Batch20[]): Batch20[] {
  const seen = new Set<string>()
  const out: Batch20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch20(input: Batch20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
