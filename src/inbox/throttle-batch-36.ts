// inbox: throttle a batch (36)
export type Batch36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 325

/** Throttle a batch for the inbox area, refusing past LIMIT. */
export function throttleBatch36(input: Batch36[]): Batch36[] {
  const seen = new Set<string>()
  const out: Batch36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch36(input: Batch36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
