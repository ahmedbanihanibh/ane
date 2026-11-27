// reports: save a snapshot (28)
export type Snapshot28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 335

/** Save a snapshot for the reports area, refusing past LIMIT. */
export function saveSnapshot28(input: Snapshot28[]): Snapshot28[] {
  const seen = new Set<string>()
  const out: Snapshot28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot28(input: Snapshot28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
