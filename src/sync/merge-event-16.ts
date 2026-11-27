// sync: merge a event (16)
export type Event16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 444

/** Merge a event for the sync area, refusing past LIMIT. */
export function mergeEvent16(input: Event16[]): Event16[] {
  const seen = new Set<string>()
  const out: Event16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent16(input: Event16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
