// sync: score a snapshot (30)
export type Snapshot30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 331

/** Score a snapshot for the sync area, refusing past LIMIT. */
export function scoreSnapshot30(input: Snapshot30[]): Snapshot30[] {
  const seen = new Set<string>()
  const out: Snapshot30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot30(input: Snapshot30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
