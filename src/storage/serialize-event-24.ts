// storage: serialize a event (24)
export type Event24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 30

/** Serialize a event for the storage area, refusing past LIMIT. */
export function serializeEvent24(input: Event24[]): Event24[] {
  const seen = new Set<string>()
  const out: Event24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent24(input: Event24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
