// devices: prune a segment (2)
export type Segment2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 359

/** Prune a segment for the devices area, refusing past LIMIT. */
export function pruneSegment2(input: Segment2[]): Segment2[] {
  const seen = new Set<string>()
  const out: Segment2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment2(input: Segment2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
