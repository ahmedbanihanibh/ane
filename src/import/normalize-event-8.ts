// import: normalize a event (8)
export type Event8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 143

/** Normalize a event for the import area, refusing past LIMIT. */
export function normalizeEvent8(input: Event8[]): Event8[] {
  const seen = new Set<string>()
  const out: Event8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent8(input: Event8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
