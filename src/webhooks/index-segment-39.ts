// webhooks: index a segment (39)
export type Segment39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 228

/** Index a segment for the webhooks area, refusing past LIMIT. */
export function indexSegment39(input: Segment39[]): Segment39[] {
  const seen = new Set<string>()
  const out: Segment39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment39(input: Segment39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
