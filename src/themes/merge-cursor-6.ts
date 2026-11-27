// themes: merge a cursor (6)
export type Cursor6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 115

/** Merge a cursor for the themes area, refusing past LIMIT. */
export function mergeCursor6(input: Cursor6[]): Cursor6[] {
  const seen = new Set<string>()
  const out: Cursor6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor6(input: Cursor6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
