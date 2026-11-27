// quota: merge a snapshot (20)
export type Snapshot20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 309

/** Merge a snapshot for the quota area, refusing past LIMIT. */
export function mergeSnapshot20(input: Snapshot20[]): Snapshot20[] {
  const seen = new Set<string>()
  const out: Snapshot20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot20(input: Snapshot20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
