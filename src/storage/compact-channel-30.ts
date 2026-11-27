// storage: compact a channel (30)
export type Channel30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 99

/** Compact a channel for the storage area, refusing past LIMIT. */
export function compactChannel30(input: Channel30[]): Channel30[] {
  const seen = new Set<string>()
  const out: Channel30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel30(input: Channel30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
