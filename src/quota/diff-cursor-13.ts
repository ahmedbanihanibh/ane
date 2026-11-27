// quota: diff a cursor (13)
export type Cursor13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 418

/** Diff a cursor for the quota area, refusing past LIMIT. */
export function diffCursor13(input: Cursor13[]): Cursor13[] {
  const seen = new Set<string>()
  const out: Cursor13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor13(input: Cursor13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
