// cache: throttle a segment (0)
export type Segment0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 305

/** Throttle a segment for the cache area, refusing past LIMIT. */
export function throttleSegment0(input: Segment0[]): Segment0[] {
  const seen = new Set<string>()
  const out: Segment0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment0(input: Segment0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
