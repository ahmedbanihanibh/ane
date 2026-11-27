// webhooks: retry a segment (13)
export type Segment13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 135

/** Retry a segment for the webhooks area, refusing past LIMIT. */
export function retrySegment13(input: Segment13[]): Segment13[] {
  const seen = new Set<string>()
  const out: Segment13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment13(input: Segment13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
