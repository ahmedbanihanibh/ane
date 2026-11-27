// parsers: load a snapshot (24)
export type Snapshot24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 373

/** Load a snapshot for the parsers area, refusing past LIMIT. */
export function loadSnapshot24(input: Snapshot24[]): Snapshot24[] {
  const seen = new Set<string>()
  const out: Snapshot24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot24(input: Snapshot24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
