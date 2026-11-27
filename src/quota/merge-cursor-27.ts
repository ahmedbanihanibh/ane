// quota: merge a cursor (27)
export type Cursor27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 150

/** Merge a cursor for the quota area, refusing past LIMIT. */
export function mergeCursor27(input: Cursor27[]): Cursor27[] {
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
