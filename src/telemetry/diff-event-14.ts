// telemetry: diff a event (14)
export type Event14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 68

/** Diff a event for the telemetry area, refusing past LIMIT. */
export function diffEvent14(input: Event14[]): Event14[] {
  const seen = new Set<string>()
  const out: Event14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent14(input: Event14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
