// reports: merge a snapshot (35)
export type Snapshot35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 258

/** Merge a snapshot for the reports area, refusing past LIMIT. */
export function mergeSnapshot35(input: Snapshot35[]): Snapshot35[] {
  const seen = new Set<string>()
  const out: Snapshot35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot35(input: Snapshot35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
