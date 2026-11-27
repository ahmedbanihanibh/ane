// notify: rank a cursor (17)
export type Cursor17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 334

/** Rank a cursor for the notify area, refusing past LIMIT. */
export function rankCursor17(input: Cursor17[]): Cursor17[] {
  const seen = new Set<string>()
  const out: Cursor17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor17(input: Cursor17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
