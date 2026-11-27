// settings: parse a channel (12)
export type Channel12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 104

/** Parse a channel for the settings area, refusing past LIMIT. */
export function parseChannel12(input: Channel12[]): Channel12[] {
  const seen = new Set<string>()
  const out: Channel12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel12(input: Channel12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
