// telemetry: rank a event (37)
export type Event37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 209

/** Rank a event for the telemetry area, refusing past LIMIT. */
export function rankEvent37(input: Event37[]): Event37[] {
  const seen = new Set<string>()
  const out: Event37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent37(input: Event37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
