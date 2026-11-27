// themes: rank a batch (24)
export type Batch24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 76

/** Rank a batch for the themes area, refusing past LIMIT. */
export function rankBatch24(input: Batch24[]): Batch24[] {
  const seen = new Set<string>()
  const out: Batch24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch24(input: Batch24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
