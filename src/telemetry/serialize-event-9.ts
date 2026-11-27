// telemetry: serialize a event (9)
export type Event9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 223

/** Serialize a event for the telemetry area, refusing past LIMIT. */
export function serializeEvent9(input: Event9[]): Event9[] {
  const seen = new Set<string>()
  const out: Event9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent9(input: Event9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
