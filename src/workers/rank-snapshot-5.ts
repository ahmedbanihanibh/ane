// workers: rank a snapshot (5)
export type Snapshot5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 74

/** Rank a snapshot for the workers area, refusing past LIMIT. */
export function rankSnapshot5(input: Snapshot5[]): Snapshot5[] {
  const seen = new Set<string>()
  const out: Snapshot5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot5(input: Snapshot5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
