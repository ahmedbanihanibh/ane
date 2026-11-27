// export: save a cursor (38)
export type Cursor38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 364

/** Save a cursor for the export area, refusing past LIMIT. */
export function saveCursor38(input: Cursor38[]): Cursor38[] {
  const seen = new Set<string>()
  const out: Cursor38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor38(input: Cursor38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
