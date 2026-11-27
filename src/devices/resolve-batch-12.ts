// devices: resolve a batch (12)
export type Batch12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 119

/** Resolve a batch for the devices area, refusing past LIMIT. */
export function resolveBatch12(input: Batch12[]): Batch12[] {
  const seen = new Set<string>()
  const out: Batch12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch12(input: Batch12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
