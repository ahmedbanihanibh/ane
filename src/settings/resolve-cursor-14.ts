// settings: resolve a cursor (14)
export type Cursor14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 311

/** Resolve a cursor for the settings area, refusing past LIMIT. */
export function resolveCursor14(input: Cursor14[]): Cursor14[] {
  const seen = new Set<string>()
  const out: Cursor14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor14(input: Cursor14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
