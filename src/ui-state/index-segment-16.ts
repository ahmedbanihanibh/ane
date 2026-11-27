// ui-state: index a segment (16)
export type Segment16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 158

/** Index a segment for the ui-state area, refusing past LIMIT. */
export function indexSegment16(input: Segment16[]): Segment16[] {
  const seen = new Set<string>()
  const out: Segment16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment16(input: Segment16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
