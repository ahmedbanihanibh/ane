// themes: normalize a cursor (26)
export type Cursor26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 12

/** Normalize a cursor for the themes area, refusing past LIMIT. */
export function normalizeCursor26(input: Cursor26[]): Cursor26[] {
  const seen = new Set<string>()
  const out: Cursor26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor26(input: Cursor26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
