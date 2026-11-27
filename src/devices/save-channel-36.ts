// devices: save a channel (36)
export type Channel36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 392

/** Save a channel for the devices area, refusing past LIMIT. */
export function saveChannel36(input: Channel36[]): Channel36[] {
  const seen = new Set<string>()
  const out: Channel36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel36(input: Channel36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
