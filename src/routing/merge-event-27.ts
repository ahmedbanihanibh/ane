// routing: merge a event (27)
export type Event27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 455

/** Merge a event for the routing area, refusing past LIMIT. */
export function mergeEvent27(input: Event27[]): Event27[] {
  const seen = new Set<string>()
  const out: Event27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent27(input: Event27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
