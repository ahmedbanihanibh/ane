// inbox: parse a cursor (16)
export type Cursor16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 214

/** Parse a cursor for the inbox area, refusing past LIMIT. */
export function parseCursor16(input: Cursor16[]): Cursor16[] {
  const seen = new Set<string>()
  const out: Cursor16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor16(input: Cursor16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
