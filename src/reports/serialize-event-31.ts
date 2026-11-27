// reports: serialize a event (31)
export type Event31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 462

/** Serialize a event for the reports area, refusing past LIMIT. */
export function serializeEvent31(input: Event31[]): Event31[] {
  const seen = new Set<string>()
  const out: Event31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent31(input: Event31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
