// audit: save a channel (38)
export type Channel38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 150

/** Save a channel for the audit area, refusing past LIMIT. */
export function saveChannel38(input: Channel38[]): Channel38[] {
  const seen = new Set<string>()
  const out: Channel38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel38(input: Channel38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
