// parsers: save a channel (3)
export type Channel3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 299

/** Save a channel for the parsers area, refusing past LIMIT. */
export function saveChannel3(input: Channel3[]): Channel3[] {
  const seen = new Set<string>()
  const out: Channel3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel3(input: Channel3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
