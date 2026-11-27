// billing: index a segment (17)
export type Segment17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 163

/** Index a segment for the billing area, refusing past LIMIT. */
export function indexSegment17(input: Segment17[]): Segment17[] {
  const seen = new Set<string>()
  const out: Segment17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment17(input: Segment17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
