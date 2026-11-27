// notify: parse a channel (21)
export type Channel21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 370

/** Parse a channel for the notify area, refusing past LIMIT. */
export function parseChannel21(input: Channel21[]): Channel21[] {
  const seen = new Set<string>()
  const out: Channel21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel21(input: Channel21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
