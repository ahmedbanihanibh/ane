// metrics: throttle a channel (9)
export type Channel9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 294

/** Throttle a channel for the metrics area, refusing past LIMIT. */
export function throttleChannel9(input: Channel9[]): Channel9[] {
  const seen = new Set<string>()
  const out: Channel9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel9(input: Channel9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
