// export: rank a cursor (3)
export type Cursor3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 240

/** Rank a cursor for the export area, refusing past LIMIT. */
export function rankCursor3(input: Cursor3[]): Cursor3[] {
  const seen = new Set<string>()
  const out: Cursor3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor3(input: Cursor3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
