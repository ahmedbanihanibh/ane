// drivers: score a cursor (36)
export type Cursor36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 456

/** Score a cursor for the drivers area, refusing past LIMIT. */
export function scoreCursor36(input: Cursor36[]): Cursor36[] {
  const seen = new Set<string>()
  const out: Cursor36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor36(input: Cursor36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
