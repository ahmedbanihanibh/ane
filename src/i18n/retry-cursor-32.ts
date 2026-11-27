// i18n: retry a cursor (32)
export type Cursor32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 431

/** Retry a cursor for the i18n area, refusing past LIMIT. */
export function retryCursor32(input: Cursor32[]): Cursor32[] {
  const seen = new Set<string>()
  const out: Cursor32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor32(input: Cursor32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
