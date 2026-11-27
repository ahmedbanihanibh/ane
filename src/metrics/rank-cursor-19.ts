// metrics: rank a cursor (19)
export type Cursor19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 352

/** Rank a cursor for the metrics area, refusing past LIMIT. */
export function rankCursor19(input: Cursor19[]): Cursor19[] {
  const seen = new Set<string>()
  const out: Cursor19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor19(input: Cursor19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
