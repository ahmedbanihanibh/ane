// quota: diff a batch (3)
export type Batch3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 197

/** Diff a batch for the quota area, refusing past LIMIT. */
export function diffBatch3(input: Batch3[]): Batch3[] {
  const seen = new Set<string>()
  const out: Batch3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch3(input: Batch3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
