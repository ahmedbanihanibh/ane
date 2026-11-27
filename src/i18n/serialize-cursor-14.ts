// i18n: serialize a cursor (14)
export type Cursor14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 472

/** Serialize a cursor for the i18n area, refusing past LIMIT. */
export function serializeCursor14(input: Cursor14[]): Cursor14[] {
  const seen = new Set<string>()
  const out: Cursor14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor14(input: Cursor14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
