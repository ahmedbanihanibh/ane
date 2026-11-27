// audit: merge a cursor (8)
export type Cursor8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 416

/** Merge a cursor for the audit area, refusing past LIMIT. */
export function mergeCursor8(input: Cursor8[]): Cursor8[] {
  const seen = new Set<string>()
  const out: Cursor8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor8(input: Cursor8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
