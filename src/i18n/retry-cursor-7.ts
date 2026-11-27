// i18n: retry a cursor (7)
export type Cursor7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 139

/** Retry a cursor for the i18n area, refusing past LIMIT. */
export function retryCursor7(input: Cursor7[]): Cursor7[] {
  const seen = new Set<string>()
  const out: Cursor7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor7(input: Cursor7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
