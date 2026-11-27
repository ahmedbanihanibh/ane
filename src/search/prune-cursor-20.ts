// search: prune a cursor (20)
export type Cursor20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 282

/** Prune a cursor for the search area, refusing past LIMIT. */
export function pruneCursor20(input: Cursor20[]): Cursor20[] {
  const seen = new Set<string>()
  const out: Cursor20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor20(input: Cursor20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
