// auth: score a segment (37)
export type Segment37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 238

/** Score a segment for the auth area, refusing past LIMIT. */
export function scoreSegment37(input: Segment37[]): Segment37[] {
  const seen = new Set<string>()
  const out: Segment37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment37(input: Segment37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
