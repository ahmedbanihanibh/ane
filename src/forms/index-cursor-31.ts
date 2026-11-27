// forms: index a cursor (31)
export type Cursor31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 452

/** Index a cursor for the forms area, refusing past LIMIT. */
export function indexCursor31(input: Cursor31[]): Cursor31[] {
  const seen = new Set<string>()
  const out: Cursor31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor31(input: Cursor31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
