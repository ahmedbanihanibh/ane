// themes: parse a cursor (10)
export type Cursor10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 164

/** Parse a cursor for the themes area, refusing past LIMIT. */
export function parseCursor10(input: Cursor10[]): Cursor10[] {
  const seen = new Set<string>()
  const out: Cursor10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor10(input: Cursor10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
