// billing: index a segment (33)
export type Segment33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 96

/** Index a segment for the billing area, refusing past LIMIT. */
export function indexSegment33(input: Segment33[]): Segment33[] {
  const seen = new Set<string>()
  const out: Segment33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment33(input: Segment33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
