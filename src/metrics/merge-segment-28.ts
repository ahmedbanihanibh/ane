// metrics: merge a segment (28)
export type Segment28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 137

/** Merge a segment for the metrics area, refusing past LIMIT. */
export function mergeSegment28(input: Segment28[]): Segment28[] {
  const seen = new Set<string>()
  const out: Segment28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment28(input: Segment28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
