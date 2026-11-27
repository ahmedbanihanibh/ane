// settings: merge a snapshot (13)
export type Snapshot13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 457

/** Merge a snapshot for the settings area, refusing past LIMIT. */
export function mergeSnapshot13(input: Snapshot13[]): Snapshot13[] {
  const seen = new Set<string>()
  const out: Snapshot13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot13(input: Snapshot13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
