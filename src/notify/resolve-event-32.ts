// notify: resolve a event (32)
export type Event32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 421

/** Resolve a event for the notify area, refusing past LIMIT. */
export function resolveEvent32(input: Event32[]): Event32[] {
  const seen = new Set<string>()
  const out: Event32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent32(input: Event32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
