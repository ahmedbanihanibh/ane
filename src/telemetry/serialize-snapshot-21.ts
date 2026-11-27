// telemetry: serialize a snapshot (21)
export type Snapshot21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 92

/** Serialize a snapshot for the telemetry area, refusing past LIMIT. */
export function serializeSnapshot21(input: Snapshot21[]): Snapshot21[] {
  const seen = new Set<string>()
  const out: Snapshot21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot21(input: Snapshot21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
