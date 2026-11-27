// storage: validate a segment (2)
export type Segment2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 83

/** Validate a segment for the storage area, refusing past LIMIT. */
export function validateSegment2(input: Segment2[]): Segment2[] {
  const seen = new Set<string>()
  const out: Segment2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment2(input: Segment2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
