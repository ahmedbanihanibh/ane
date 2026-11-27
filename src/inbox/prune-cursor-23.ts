// inbox: prune a cursor (23)
export type Cursor23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 475

/** Prune a cursor for the inbox area, refusing past LIMIT. */
export function pruneCursor23(input: Cursor23[]): Cursor23[] {
  const seen = new Set<string>()
  const out: Cursor23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor23(input: Cursor23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
