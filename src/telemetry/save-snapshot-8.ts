// telemetry: save a snapshot (8)
export type Snapshot8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 391

/** Save a snapshot for the telemetry area, refusing past LIMIT. */
export function saveSnapshot8(input: Snapshot8[]): Snapshot8[] {
  const seen = new Set<string>()
  const out: Snapshot8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot8(input: Snapshot8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
