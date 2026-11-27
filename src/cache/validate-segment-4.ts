// cache: validate a segment (4)
export type Segment4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 333

/** Validate a segment for the cache area, refusing past LIMIT. */
export function validateSegment4(input: Segment4[]): Segment4[] {
  const seen = new Set<string>()
  const out: Segment4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment4(input: Segment4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
