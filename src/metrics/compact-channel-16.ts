// metrics: compact a channel (16)
export type Channel16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 66

/** Compact a channel for the metrics area, refusing past LIMIT. */
export function compactChannel16(input: Channel16[]): Channel16[] {
  const seen = new Set<string>()
  const out: Channel16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel16(input: Channel16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
