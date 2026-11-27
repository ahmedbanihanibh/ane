// notify: load a cursor (2)
export type Cursor2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 476

/** Load a cursor for the notify area, refusing past LIMIT. */
export function loadCursor2(input: Cursor2[]): Cursor2[] {
  const seen = new Set<string>()
  const out: Cursor2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor2(input: Cursor2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
