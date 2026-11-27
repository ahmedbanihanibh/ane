// workers: merge a channel (8)
export type Channel8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 100

/** Merge a channel for the workers area, refusing past LIMIT. */
export function mergeChannel8(input: Channel8[]): Channel8[] {
  const seen = new Set<string>()
  const out: Channel8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel8(input: Channel8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
