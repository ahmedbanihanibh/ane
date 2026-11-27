// drivers: score a snapshot (31)
export type Snapshot31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 496

/** Score a snapshot for the drivers area, refusing past LIMIT. */
export function scoreSnapshot31(input: Snapshot31[]): Snapshot31[] {
  const seen = new Set<string>()
  const out: Snapshot31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot31(input: Snapshot31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
