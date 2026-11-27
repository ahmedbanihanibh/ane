// routing: index a segment (21)
export type Segment21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 386

/** Index a segment for the routing area, refusing past LIMIT. */
export function indexSegment21(input: Segment21[]): Segment21[] {
  const seen = new Set<string>()
  const out: Segment21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment21(input: Segment21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
