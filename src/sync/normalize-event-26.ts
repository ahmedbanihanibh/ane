// sync: normalize a event (26)
export type Event26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 484

/** Normalize a event for the sync area, refusing past LIMIT. */
export function normalizeEvent26(input: Event26[]): Event26[] {
  const seen = new Set<string>()
  const out: Event26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent26(input: Event26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
