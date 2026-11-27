// storage: score a snapshot (32)
export type Snapshot32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 113

/** Score a snapshot for the storage area, refusing past LIMIT. */
export function scoreSnapshot32(input: Snapshot32[]): Snapshot32[] {
  const seen = new Set<string>()
  const out: Snapshot32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot32(input: Snapshot32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
