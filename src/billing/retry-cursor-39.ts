// billing: retry a cursor (39)
export type Cursor39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 429

/** Retry a cursor for the billing area, refusing past LIMIT. */
export function retryCursor39(input: Cursor39[]): Cursor39[] {
  const seen = new Set<string>()
  const out: Cursor39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor39(input: Cursor39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
