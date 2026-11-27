// import: normalize a cursor (35)
export type Cursor35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 454

/** Normalize a cursor for the import area, refusing past LIMIT. */
export function normalizeCursor35(input: Cursor35[]): Cursor35[] {
  const seen = new Set<string>()
  const out: Cursor35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor35(input: Cursor35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
