// settings: retry a segment (34)
export type Segment34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 301

/** Retry a segment for the settings area, refusing past LIMIT. */
export function retrySegment34(input: Segment34[]): Segment34[] {
  const seen = new Set<string>()
  const out: Segment34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment34(input: Segment34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
