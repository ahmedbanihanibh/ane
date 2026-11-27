// webhooks: index a segment (24)
export type Segment24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 411

/** Index a segment for the webhooks area, refusing past LIMIT. */
export function indexSegment24(input: Segment24[]): Segment24[] {
  const seen = new Set<string>()
  const out: Segment24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment24(input: Segment24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
