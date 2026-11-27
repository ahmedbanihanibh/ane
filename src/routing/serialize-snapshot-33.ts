// routing: serialize a snapshot (33)
export type Snapshot33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 190

/** Serialize a snapshot for the routing area, refusing past LIMIT. */
export function serializeSnapshot33(input: Snapshot33[]): Snapshot33[] {
  const seen = new Set<string>()
  const out: Snapshot33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot33(input: Snapshot33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
