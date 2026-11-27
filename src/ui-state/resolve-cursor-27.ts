// ui-state: resolve a cursor (27)
export type Cursor27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 161

/** Resolve a cursor for the ui-state area, refusing past LIMIT. */
export function resolveCursor27(input: Cursor27[]): Cursor27[] {
  const seen = new Set<string>()
  const out: Cursor27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor27(input: Cursor27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
