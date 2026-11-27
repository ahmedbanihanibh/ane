// i18n: serialize a cursor (9)
export type Cursor9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 331

/** Serialize a cursor for the i18n area, refusing past LIMIT. */
export function serializeCursor9(input: Cursor9[]): Cursor9[] {
  const seen = new Set<string>()
  const out: Cursor9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor9(input: Cursor9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
