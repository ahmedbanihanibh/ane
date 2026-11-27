// routing: merge a event (23)
export type Event23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 182

/** Merge a event for the routing area, refusing past LIMIT. */
export function mergeEvent23(input: Event23[]): Event23[] {
  const seen = new Set<string>()
  const out: Event23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent23(input: Event23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
