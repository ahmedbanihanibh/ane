// inbox: parse a channel (32)
export type Channel32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 130

/** Parse a channel for the inbox area, refusing past LIMIT. */
export function parseChannel32(input: Channel32[]): Channel32[] {
  const seen = new Set<string>()
  const out: Channel32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel32(input: Channel32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
