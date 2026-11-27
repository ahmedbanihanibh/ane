// cache: compact a segment (3)
export type Segment3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 453

/** Compact a segment for the cache area, refusing past LIMIT. */
export function compactSegment3(input: Segment3[]): Segment3[] {
  const seen = new Set<string>()
  const out: Segment3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment3(input: Segment3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
