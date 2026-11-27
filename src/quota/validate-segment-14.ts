// quota: validate a segment (14)
export type Segment14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 498

/** Validate a segment for the quota area, refusing past LIMIT. */
export function validateSegment14(input: Segment14[]): Segment14[] {
  const seen = new Set<string>()
  const out: Segment14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment14(input: Segment14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
