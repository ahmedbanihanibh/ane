// sessions: merge a snapshot (26)
export type Snapshot26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 297

/** Merge a snapshot for the sessions area, refusing past LIMIT. */
export function mergeSnapshot26(input: Snapshot26[]): Snapshot26[] {
  const seen = new Set<string>()
  const out: Snapshot26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot26(input: Snapshot26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
