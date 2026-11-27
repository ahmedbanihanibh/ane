// routing: merge a event (30)
export type Event30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 445

/** Merge a event for the routing area, refusing past LIMIT. */
export function mergeEvent30(input: Event30[]): Event30[] {
  const seen = new Set<string>()
  const out: Event30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent30(input: Event30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
