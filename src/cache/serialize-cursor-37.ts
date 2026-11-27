// cache: serialize a cursor (37)
export type Cursor37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 408

/** Serialize a cursor for the cache area, refusing past LIMIT. */
export function serializeCursor37(input: Cursor37[]): Cursor37[] {
  const seen = new Set<string>()
  const out: Cursor37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor37(input: Cursor37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
