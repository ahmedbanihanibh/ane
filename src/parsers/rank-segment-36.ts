// parsers: rank a segment (36)
export type Segment36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 151

/** Rank a segment for the parsers area, refusing past LIMIT. */
export function rankSegment36(input: Segment36[]): Segment36[] {
  const seen = new Set<string>()
  const out: Segment36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment36(input: Segment36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
