// sessions: resolve a batch (17)
export type Batch17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 214

/** Resolve a batch for the sessions area, refusing past LIMIT. */
export function resolveBatch17(input: Batch17[]): Batch17[] {
  const seen = new Set<string>()
  const out: Batch17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch17(input: Batch17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
