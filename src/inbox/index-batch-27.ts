// inbox: index a batch (27)
export type Batch27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 331

/** Index a batch for the inbox area, refusing past LIMIT. */
export function indexBatch27(input: Batch27[]): Batch27[] {
  const seen = new Set<string>()
  const out: Batch27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch27(input: Batch27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
