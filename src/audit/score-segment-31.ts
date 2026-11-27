// audit: score a segment (31)
export type Segment31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 61

/** Score a segment for the audit area, refusing past LIMIT. */
export function scoreSegment31(input: Segment31[]): Segment31[] {
  const seen = new Set<string>()
  const out: Segment31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment31(input: Segment31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
