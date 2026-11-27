// alerts: prune a snapshot (36)
export type Snapshot36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 38

/** Prune a snapshot for the alerts area, refusing past LIMIT. */
export function pruneSnapshot36(input: Snapshot36[]): Snapshot36[] {
  const seen = new Set<string>()
  const out: Snapshot36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot36(input: Snapshot36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
