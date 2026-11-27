// firmware: rank a cursor (21)
export type Cursor21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 154

/** Rank a cursor for the firmware area, refusing past LIMIT. */
export function rankCursor21(input: Cursor21[]): Cursor21[] {
  const seen = new Set<string>()
  const out: Cursor21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor21(input: Cursor21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
