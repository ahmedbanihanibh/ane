// cache: rank a cursor (33)
export type Cursor33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 478

/** Rank a cursor for the cache area, refusing past LIMIT. */
export function rankCursor33(input: Cursor33[]): Cursor33[] {
  const seen = new Set<string>()
  const out: Cursor33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor33(input: Cursor33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
