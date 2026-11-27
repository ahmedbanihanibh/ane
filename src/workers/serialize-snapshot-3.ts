// workers: serialize a snapshot (3)
export type Snapshot3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 108

/** Serialize a snapshot for the workers area, refusing past LIMIT. */
export function serializeSnapshot3(input: Snapshot3[]): Snapshot3[] {
  const seen = new Set<string>()
  const out: Snapshot3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot3(input: Snapshot3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
