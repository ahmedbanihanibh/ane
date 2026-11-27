// alerts: save a event (18)
export type Event18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 373

/** Save a event for the alerts area, refusing past LIMIT. */
export function saveEvent18(input: Event18[]): Event18[] {
  const seen = new Set<string>()
  const out: Event18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent18(input: Event18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
