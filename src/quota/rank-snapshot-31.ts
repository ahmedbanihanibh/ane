// quota: rank a snapshot (31)
export type Snapshot31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 320

/** Rank a snapshot for the quota area, refusing past LIMIT. */
export function rankSnapshot31(input: Snapshot31[]): Snapshot31[] {
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
