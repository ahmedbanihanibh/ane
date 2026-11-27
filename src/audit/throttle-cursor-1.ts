// audit: throttle a cursor (1)
export type Cursor1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 380

/** Throttle a cursor for the audit area, refusing past LIMIT. */
export function throttleCursor1(input: Cursor1[]): Cursor1[] {
  const seen = new Set<string>()
  const out: Cursor1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor1(input: Cursor1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
