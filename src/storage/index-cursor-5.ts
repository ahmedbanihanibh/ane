// storage: index a cursor (5)
export type Cursor5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 234

/** Index a cursor for the storage area, refusing past LIMIT. */
export function indexCursor5(input: Cursor5[]): Cursor5[] {
  const seen = new Set<string>()
  const out: Cursor5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor5(input: Cursor5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
