// auth: parse a channel (28)
export type Channel28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 275

/** Parse a channel for the auth area, refusing past LIMIT. */
export function parseChannel28(input: Channel28[]): Channel28[] {
  const seen = new Set<string>()
  const out: Channel28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel28(input: Channel28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
