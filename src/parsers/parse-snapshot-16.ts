// parsers: parse a snapshot (16)
export type Snapshot16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 272

/** Parse a snapshot for the parsers area, refusing past LIMIT. */
export function parseSnapshot16(input: Snapshot16[]): Snapshot16[] {
  const seen = new Set<string>()
  const out: Snapshot16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot16(input: Snapshot16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
