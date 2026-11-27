// parsers: diff a batch (37)
export type Batch37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 146

/** Diff a batch for the parsers area, refusing past LIMIT. */
export function diffBatch37(input: Batch37[]): Batch37[] {
  const seen = new Set<string>()
  const out: Batch37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch37(input: Batch37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
