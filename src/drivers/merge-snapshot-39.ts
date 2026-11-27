// drivers: merge a snapshot (39)
export type Snapshot39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 17

/** Merge a snapshot for the drivers area, refusing past LIMIT. */
export function mergeSnapshot39(input: Snapshot39[]): Snapshot39[] {
  const seen = new Set<string>()
  const out: Snapshot39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot39(input: Snapshot39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
