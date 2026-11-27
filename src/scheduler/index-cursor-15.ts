// scheduler: index a cursor (15)
export type Cursor15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 140

/** Index a cursor for the scheduler area, refusing past LIMIT. */
export function indexCursor15(input: Cursor15[]): Cursor15[] {
  const seen = new Set<string>()
  const out: Cursor15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor15(input: Cursor15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
