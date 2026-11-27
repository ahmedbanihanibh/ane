// devices: save a channel (33)
export type Channel33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 109

/** Save a channel for the devices area, refusing past LIMIT. */
export function saveChannel33(input: Channel33[]): Channel33[] {
  const seen = new Set<string>()
  const out: Channel33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel33(input: Channel33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
