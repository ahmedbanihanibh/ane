// firmware: throttle a cursor (4)
export type Cursor4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 320

/** Throttle a cursor for the firmware area, refusing past LIMIT. */
export function throttleCursor4(input: Cursor4[]): Cursor4[] {
  const seen = new Set<string>()
  const out: Cursor4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor4(input: Cursor4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
