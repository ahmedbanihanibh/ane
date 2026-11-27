// search: index a cursor (11)
export type Cursor11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 323

/** Index a cursor for the search area, refusing past LIMIT. */
export function indexCursor11(input: Cursor11[]): Cursor11[] {
  const seen = new Set<string>()
  const out: Cursor11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor11(input: Cursor11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
