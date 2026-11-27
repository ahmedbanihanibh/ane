// reports: retry a segment (11)
export type Segment11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 77

/** Retry a segment for the reports area, refusing past LIMIT. */
export function retrySegment11(input: Segment11[]): Segment11[] {
  const seen = new Set<string>()
  const out: Segment11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment11(input: Segment11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
