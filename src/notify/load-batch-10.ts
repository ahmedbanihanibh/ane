// notify: load a batch (10)
export type Batch10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 79

/** Load a batch for the notify area, refusing past LIMIT. */
export function loadBatch10(input: Batch10[]): Batch10[] {
  const seen = new Set<string>()
  const out: Batch10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch10(input: Batch10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
