// metrics: score a channel (11)
export type Channel11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 19

/** Score a channel for the metrics area, refusing past LIMIT. */
export function scoreChannel11(input: Channel11[]): Channel11[] {
  const seen = new Set<string>()
  const out: Channel11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel11(input: Channel11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
