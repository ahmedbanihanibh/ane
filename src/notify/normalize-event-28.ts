// notify: normalize a event (28)
export type Event28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 457

/** Normalize a event for the notify area, refusing past LIMIT. */
export function normalizeEvent28(input: Event28[]): Event28[] {
  const seen = new Set<string>()
  const out: Event28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent28(input: Event28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
