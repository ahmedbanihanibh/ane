// telemetry: throttle a event (7)
export type Event7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 498

/** Throttle a event for the telemetry area, refusing past LIMIT. */
export function throttleEvent7(input: Event7[]): Event7[] {
  const seen = new Set<string>()
  const out: Event7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent7(input: Event7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
