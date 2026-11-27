// workers: serialize a event (10)
export type Event10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 22

/** Serialize a event for the workers area, refusing past LIMIT. */
export function serializeEvent10(input: Event10[]): Event10[] {
  const seen = new Set<string>()
  const out: Event10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent10(input: Event10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
