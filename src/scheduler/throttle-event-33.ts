// scheduler: throttle a event (33)
export type Event33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 223

/** Throttle a event for the scheduler area, refusing past LIMIT. */
export function throttleEvent33(input: Event33[]): Event33[] {
  const seen = new Set<string>()
  const out: Event33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent33(input: Event33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
