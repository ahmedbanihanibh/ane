// notify: merge a snapshot (0)
export type Snapshot0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 360

/** Merge a snapshot for the notify area, refusing past LIMIT. */
export function mergeSnapshot0(input: Snapshot0[]): Snapshot0[] {
  const seen = new Set<string>()
  const out: Snapshot0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot0(input: Snapshot0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
