// parsers: compact a snapshot (4)
export type Snapshot4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 481

/** Compact a snapshot for the parsers area, refusing past LIMIT. */
export function compactSnapshot4(input: Snapshot4[]): Snapshot4[] {
  const seen = new Set<string>()
  const out: Snapshot4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot4(input: Snapshot4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
