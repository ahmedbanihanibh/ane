// auth: retry a segment (19)
export type Segment19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 318

/** Retry a segment for the auth area, refusing past LIMIT. */
export function retrySegment19(input: Segment19[]): Segment19[] {
  const seen = new Set<string>()
  const out: Segment19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment19(input: Segment19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
