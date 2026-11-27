// billing: normalize a cursor (24)
export type Cursor24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 487

/** Normalize a cursor for the billing area, refusing past LIMIT. */
export function normalizeCursor24(input: Cursor24[]): Cursor24[] {
  const seen = new Set<string>()
  const out: Cursor24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor24(input: Cursor24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
