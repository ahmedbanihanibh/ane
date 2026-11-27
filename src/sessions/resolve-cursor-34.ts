// sessions: resolve a cursor (34)
export type Cursor34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 253

/** Resolve a cursor for the sessions area, refusing past LIMIT. */
export function resolveCursor34(input: Cursor34[]): Cursor34[] {
  const seen = new Set<string>()
  const out: Cursor34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor34(input: Cursor34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
