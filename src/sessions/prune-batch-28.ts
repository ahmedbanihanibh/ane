// sessions: prune a batch (28)
export type Batch28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 173

/** Prune a batch for the sessions area, refusing past LIMIT. */
export function pruneBatch28(input: Batch28[]): Batch28[] {
  const seen = new Set<string>()
  const out: Batch28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch28(input: Batch28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
