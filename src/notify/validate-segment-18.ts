// notify: validate a segment (18)
export type Segment18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 439

/** Validate a segment for the notify area, refusing past LIMIT. */
export function validateSegment18(input: Segment18[]): Segment18[] {
  const seen = new Set<string>()
  const out: Segment18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment18(input: Segment18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
